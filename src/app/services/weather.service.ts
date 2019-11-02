import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ForecastResponse } from '../models/forecastResponse.model';

@Injectable()

export class WeatherService {
  city = 'Lviv';
  country = 'Ukraine';

  constructor(private http: HttpClient) {
    console.log('Hello from service');
   }

    getCurrentForecast(){
      let URL = `${environment.apiUrl}current`;
      let params = new HttpParams()
      .set('city', this.city)
      .set('country', this.country)
      .set('key', environment.apiKey)

      return this.http.get<ForecastResponse>(URL, { params }).pipe(map(res =>{
        return res.data;
      }));
    }
}
