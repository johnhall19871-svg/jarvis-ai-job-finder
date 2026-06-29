import { BASE_RATES, COSTS, MIN_NET_PER_HOUR } from './config.js';
import { gbp, travelMinutes } from './geo.js';
import { grossPerHour, demandLabel } from './demand.js';

/**
 * @param {object} params
 * @param {number} params.shiftHours 1-6
 * @param {number} params.startHour 0-23
 * @param {number} params.distanceMiles one-way home → zone
 * @param {'city' | 'town'} params.zoneType
 * @param {Date} params.date
 * @param {string} params.zoneLabel
 */
export function evaluateShift({ shiftHours, startHour, distanceMiles, zoneType, date, zoneLabel }) {
  const travelMilesRoundTrip = distanceMiles * 2;
  const travelHours = (travelMinutes(distanceMiles, COSTS.travelSpeedMph) * 2) / 60;

  let grossTotal = 0;
  let workingMiles = 0;
  const hourlyBreakdown = [];

  for (let i = 0; i < shiftHours; i++) {
    const hour = (startHour + i) % 24;
    const grossHr = grossPerHour(hour, date, zoneType, BASE_RATES);
    grossTotal += grossHr;
    workingMiles += COSTS.workingMilesPerHour;
    hourlyBreakdown.push({ hour, grossHr: gbp(grossHr), label: demandLabel(hour, date, zoneType) });
  }

  const fuelWorking = workingMiles * COSTS.fuelPerMile;
  const fuelTravel = travelMilesRoundTrip * COSTS.fuelPerMile;
  const fuelTotal = fuelWorking + fuelTravel;

  const commission = grossTotal * COSTS.uberCommissionRate;
  const insurance = (shiftHours + travelHours) * COSTS.insurancePerHour;

  const netTotal = grossTotal - commission - fuelTotal - insurance;
  const effectiveHours = shiftHours + travelHours;
  const netPerHour = effectiveHours > 0 ? netTotal / effectiveHours : 0;

  const endHour = (startHour + shiftHours) % 24;

  return {
    zoneLabel,
    startHour,
    endHour,
    shiftHours,
    shiftWindow: formatWindow(startHour, endHour),
    travelMilesOneWay: gbp(distanceMiles, 1),
    travelMinutesOneWay: Math.round(travelMinutes(distanceMiles, COSTS.travelSpeedMph)),
    travelHoursRoundTrip: gbp(travelHours, 2),
    grossTotal: gbp(grossTotal),
    netTotal: gbp(netTotal),
    netPerHour: gbp(netPerHour),
    costs: {
      fuel: gbp(fuelTotal),
      fuelWorking: gbp(fuelWorking),
      fuelTravel: gbp(fuelTravel),
      commission: gbp(commission),
      insurance: gbp(insurance),
    },
    hourlyBreakdown,
    effectiveHours: gbp(effectiveHours, 2),
  };
}

/**
 * @param {number} startHour
 * @param {number} endHour
 */
function formatWindow(startHour, endHour) {
  return `${padHour(startHour)} – ${padHour(endHour)}`;
}

/** @param {number} h */
function padHour(h) {
  return `${String(h).padStart(2, '0')}:00`;
}

/**
 * Find best shift for a day across zones and durations.
 * @param {Date} date
 * @param {Array<{ label: string, distanceMiles: number, type: string }>} zones
 */
export function bestShiftForDay(date, zones) {
  let best = null;

  for (const zone of zones) {
    for (let startHour = 0; startHour < 24; startHour++) {
      for (let hours = 1; hours <= 6; hours++) {
        if (startHour + hours > 24) continue;

        const result = evaluateShift({
          shiftHours: hours,
          startHour,
          distanceMiles: zone.distanceMiles,
          zoneType: zone.type,
          date,
          zoneLabel: zone.label,
        });

        if (result.netPerHour < MIN_NET_PER_HOUR) continue;

        const score = result.netTotal * (1 + result.netPerHour / 100);
        const bestScore = best ? best.netTotal * (1 + best.netPerHour / 100) : -1;

        if (!best || score > bestScore) {
          best = result;
        }
      }
    }
  }

  return best;
}

/**
 * Hourly net £/hr bars for chart (best zone per hour, 1hr shifts).
 * @param {Date} date
 * @param {Array<{ label: string, distanceMiles: number, type: string }>} zones
 */
export function hourlyNetProfile(date, zones) {
  const profile = [];

  for (let startHour = 0; startHour < 24; startHour++) {
    let bestHr = null;
    for (const zone of zones) {
      const r = evaluateShift({
        shiftHours: 1,
        startHour,
        distanceMiles: zone.distanceMiles,
        zoneType: zone.type,
        date,
        zoneLabel: zone.label,
      });
      if (!bestHr || r.netPerHour > bestHr.netPerHour) bestHr = r;
    }
    profile.push({
      hour: startHour,
      label: padHour(startHour),
      netPerHour: bestHr?.netPerHour ?? 0,
      zoneLabel: bestHr?.zoneLabel ?? '',
    });
  }

  return profile;
}
