import { HOME, WORKING_RADIUS_MILES, COSTS, BASE_RATES } from './config.js';
import { nextSevenDays, dayKey, formatDayLabel } from './geo.js';
import { getWorkingZones, getHome } from './zones.js';
import { bestShiftForDay, hourlyNetProfile } from './profitability.js';

export function buildWeeklySchedule() {
  const zones = getWorkingZones();
  const days = nextSevenDays();

  return {
    home: getHome(),
    workingRadiusMiles: WORKING_RADIUS_MILES,
    zones,
    costAssumptions: {
      fuelPerMile: COSTS.fuelPerMile,
      uberCommissionRate: COSTS.uberCommissionRate,
      insurancePerHour: COSTS.insurancePerHour,
      travelSpeedMph: COSTS.travelSpeedMph,
      workingMilesPerHour: COSTS.workingMilesPerHour,
    },
    baseRates: BASE_RATES,
    dataSource: {
      type: 'modelled',
      note:
        'Projections use zone/time demand patterns — not live Uber pricing. Uber does not offer a public surge API. Replace with driver history or manual surge input when available.',
    },
    days: days.map((date) => {
      const recommendation = bestShiftForDay(date, zones);
      const hourlyProfile = hourlyNetProfile(date, zones);

      return {
        date: dayKey(date),
        label: formatDayLabel(date),
        weekday: date.toLocaleDateString('en-GB', { weekday: 'long' }),
        recommendation,
        hourlyProfile,
        peakNetPerHour: Math.max(...hourlyProfile.map((h) => h.netPerHour), 0),
      };
    }),
    generatedAt: new Date().toISOString(),
  };
}
