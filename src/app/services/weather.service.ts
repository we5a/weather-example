import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ForecastResponse } from '../models/forecastResponse.model';
import { Forecast } from '../models/forecast.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class WeatherService {
  city = 'Lviv';
  country = 'Ukraine';
  language = 'uk';
  currentWeather = new BehaviorSubject<Forecast>(null);

  constructor(private http: HttpClient) {
    this.getCurrentForecast().subscribe(forecast => {
      this.currentWeather.next(forecast[0]);
    })
   }

    getCurrentForecast(){
      let URL = `${environment.apiUrl}current`;
      let params = new HttpParams()
      .set('city', this.city)
      .set('country', this.country)
      .set('key', environment.apiKey)
      .set('lang', this.language);

      return this.http.get<ForecastResponse>(URL, { params }).pipe(map(res =>{
        return res.data;
      }));
    }
}
