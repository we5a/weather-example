import { Weather } from './weather.model';

export class Forecast {
    constructor(
        public wind_cdir?: string,
        public rh?: number,
        public pod?: string,
        public lon?: number,
        public pres?: number,
        public timezone?: string,
        public ob_time?: string,
        public country_code?: string,
        public clouds?: number,
        public vis?: number,
        public wind_spd?: number,
        public wind_cdir_full?: string,
        public app_temp?: number,
        public state_code?: string,
        public ts?: number,
        public h_angle?: number,
        public dewpt?: number,
        public weather?: Weather,
        public uv?: number,
        public aqi?: number,
        public station?: string,
        public wind_dir?: number,
        public elev_angle?: number,
        public datetime?: string,
        public precip?: number,
        public ghi?: number,
        public dni?: number,
        public dhi?: number,
        public solar_rad?: number,
        public city_name?: string,
        public sunrise?: string,
        public sunset?: string,
        public temp?: number,
        public lat?: string,
        public slp?: number,
        public app_max_temp?: number,
        public app_min_temp?: number,
        public clouds_hi?: number,
        public clouds_low?: number,
        public clouds_mid?: number,
        public high_temp?: number,
        public low_temp?: number,
        public max_dhi?: number,
        public max_temp?: number,
        public min_temp?: number,
        public moon_phase?: number,
        public moonrise_ts?: number,
        public moonset_ts?: number,
        public ozone?: number,
        public pop?: number,
        public snow?: number,
        public snow_depth?: number,
        public sunrise_ts?: number,
        public sunset_ts?: number,
        public valid_date?: string,
    ) {

    }
}