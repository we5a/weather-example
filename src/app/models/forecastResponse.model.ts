import { Forecast } from './forecast.model';

export class ForecastResponse {
    constructor(
        public data?: Forecast[],
        public count?: number,
        public lat?: string,
        public lon?: string,
        public state_code?: string,
        public timezone?: string,
        public city_name?: string,
        public country_code?: string
    ) { }
}