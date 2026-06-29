import { HOME, WORKING_RADIUS_MILES } from './config.js';
import { milesBetween } from './geo.js';

/**
 * Demand zones within working radius — city centres weighted higher at peak times.
 * Coordinates are approximate town/centre points.
 */
const ZONE_DEFS = [
  { id: 'retford', label: 'Retford town centre', latitude: 53.322, longitude: -0.942, type: 'town' },
  { id: 'worksop', label: 'Worksop', latitude: 53.304, longitude: -1.124, type: 'town' },
  { id: 'doncaster', label: 'Doncaster', latitude: 53.523, longitude: -1.133, type: 'city' },
  { id: 'newark', label: 'Newark', latitude: 53.07, longitude: -0.806, type: 'town' },
  { id: 'mansfield', label: 'Mansfield', latitude: 53.144, longitude: -1.196, type: 'town' },
  { id: 'lincoln', label: 'Lincoln', latitude: 53.23, longitude: -0.544, type: 'city' },
  { id: 'nottingham', label: 'Nottingham city centre', latitude: 52.954, longitude: -1.158, type: 'city' },
  { id: 'sheffield', label: 'Sheffield city centre', latitude: 53.381, longitude: -1.47, type: 'city' },
  { id: 'grantham', label: 'Grantham', latitude: 52.915, longitude: -0.642, type: 'town' },
  { id: 'chesterfield', label: 'Chesterfield', latitude: 53.235, longitude: -1.427, type: 'town' },
];

/** @returns {Array<typeof ZONE_DEFS[0] & { distanceMiles: number }>} */
export function getWorkingZones() {
  return ZONE_DEFS.map((z) => {
    const distanceMiles = milesBetween(HOME, z);
    return { ...z, distanceMiles: Number(distanceMiles.toFixed(1)) };
  }).filter((z) => z.distanceMiles <= WORKING_RADIUS_MILES);
}

export function getHome() {
  return { ...HOME };
}
