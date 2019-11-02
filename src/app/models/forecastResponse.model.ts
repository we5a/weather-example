import { Forecast } from './forecast.model';

export class ForecastResponse {
    constructor(
        public data: Forecast[],
        public count: number
    ){}
}