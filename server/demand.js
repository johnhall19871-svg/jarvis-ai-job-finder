/**
 * Demand & surge model (MVP).
 *
 * Uber does not publish a public pricing API. These multipliers approximate
 * typical UK patterns by zone type, hour, and day — replace with live data
 * when a source is available (driver history, manual surge input, etc.).
 */

const DAY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

/**
 * @param {Date} date
 */
function dayName(date) {
  return DAY[date.getDay()];
}

/**
 * @param {number} hour 0-23
 * @param {string} day
 * @param {'city' | 'town'} zoneType
 */
function ridesMultiplier(hour, day, zoneType) {
  let m = zoneType === 'city' ? 1.05 : 0.88;

  if (hour >= 7 && hour <= 9) m *= 1.15;
  if (hour >= 17 && hour <= 19) m *= 1.2;
  if (hour >= 22 || hour <= 1) m *= day === 'fri' || day === 'sat' ? 1.55 : 1.25;
  if (hour >= 2 && hour <= 5) m *= 0.45;
  if (hour >= 10 && hour <= 15) m *= 0.85;
  if (day === 'sun' && hour >= 11 && hour <= 16) m *= 1.1;

  return m;
}

/**
 * @param {number} hour
 * @param {string} day
 * @param {'city' | 'town'} zoneType
 */
function eatsMultiplier(hour, day, zoneType) {
  let m = zoneType === 'city' ? 1.1 : 0.82;

  if (hour >= 11 && hour <= 14) m *= 1.45;
  if (hour >= 17 && hour <= 21) m *= 1.55;
  if (hour >= 7 && hour <= 10) m *= 0.75;
  if (hour >= 22 || hour <= 6) m *= 0.55;
  if (day === 'fri' || day === 'sat') m *= 1.12;

  return m;
}

/**
 * Combined gross opportunity when running Uber + Uber Eats.
 * @param {number} hour
 * @param {Date} date
 * @param {'city' | 'town'} zoneType
 * @param {{ rides: number, eats: number }} baseRates
 */
export function grossPerHour(hour, date, zoneType, baseRates) {
  const day = dayName(date);
  const rides = baseRates.rides * ridesMultiplier(hour, day, zoneType);
  const eats = baseRates.eats * eatsMultiplier(hour, day, zoneType);
  return Math.max(rides, eats) + Math.min(rides, eats) * 0.28;
}

/**
 * @param {number} hour
 * @param {Date} date
 * @param {'city' | 'town'} zoneType
 */
export function demandLabel(hour, date, zoneType) {
  const day = dayName(date);
  if (hour >= 11 && hour <= 14) return 'Lunch rush (Eats)';
  if (hour >= 17 && hour <= 21) return 'Dinner rush (Eats + rides)';
  if ((hour >= 22 || hour <= 1) && (day === 'fri' || day === 'sat')) return 'Weekend nightlife (rides)';
  if (hour >= 7 && hour <= 9) return 'Commute period (rides)';
  if (zoneType === 'city') return 'City baseline demand';
  return 'Town / suburban demand';
}

export { dayName };
