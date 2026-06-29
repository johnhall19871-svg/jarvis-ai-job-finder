const EARTH_RADIUS_MILES = 3958.8;

/**
 * @param {{ latitude: number, longitude: number }} a
 * @param {{ latitude: number, longitude: number }} b
 */
export function milesBetween(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_MILES * 2 * Math.asin(Math.sqrt(h));
}

/**
 * @param {number} miles
 * @param {number} speedMph
 */
export function travelMinutes(miles, speedMph) {
  return (miles / speedMph) * 60;
}

/**
 * @param {number} value
 * @param {number} [digits=2]
 */
export function gbp(value, digits = 2) {
  return Number(value.toFixed(digits));
}

/**
 * @returns {Date[]}
 */
export function nextSevenDays(from = new Date()) {
  const start = new Date(from);
  start.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

/**
 * @param {Date} date
 */
export function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

/**
 * @param {Date} date
 */
export function formatDayLabel(date) {
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}
