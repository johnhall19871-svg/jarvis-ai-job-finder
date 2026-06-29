/** Jarvis driver economics & home base — override via .env where noted */

export const HOME_POSTCODE = process.env.HOME_POSTCODE || 'DN22 0QG';

export const HOME = {
  postcode: HOME_POSTCODE,
  latitude: 53.280323,
  longitude: -0.936815,
  label: 'Gamston (DN22 0QG)',
};

/** Working area radius in miles */
export const WORKING_RADIUS_MILES = Number(process.env.WORKING_RADIUS_MILES) || 35;

/** Cost assumptions (GBP) — tune in .env or here */
export const COSTS = {
  fuelPerMile: Number(process.env.FUEL_PENCE_PER_MILE || 13) / 100,
  uberCommissionRate: Number(process.env.UBER_COMMISSION_RATE || 0.25),
  /** Private hire + delivery insurance amortised per active hour */
  insurancePerHour: Number(process.env.INSURANCE_PER_HOUR || 3.0),
  /** Average road speed for deadhead travel estimates */
  travelSpeedMph: Number(process.env.TRAVEL_SPEED_MPH || 35),
  /** Miles driven per hour while on shift (trips + repositioning) */
  workingMilesPerHour: Number(process.env.WORKING_MILES_PER_HOUR || 14),
};

/** Baseline gross £/hr before zone/time multipliers (both apps available) */
export const BASE_RATES = {
  rides: Number(process.env.BASE_RIDES_GBP_HR || 16),
  eats: Number(process.env.BASE_EATS_GBP_HR || 13),
};

/** Minimum acceptable net £/hr when choosing shift length */
export const MIN_NET_PER_HOUR = Number(process.env.MIN_NET_PER_HOUR || 8);

export const PORT = Number(process.env.PORT) || 3002;
