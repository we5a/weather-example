import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ForecastResponse } from '../models/forecastResponse.model';
import { Forecast } from '../models/forecast.model';
import { BehaviorSubject } from 'rxjs';
import { timer } from 'rxjs';
import * as moment from 'moment';

@Injectable()

export class WeatherService {
  city = 'Lviv';
  country = 'Ukraine';
  language = 'uk';
  CURRENT_WEATHER_UPDATE_PERIOD = 7200;
  currentWeather = new BehaviorSubject<Forecast>(null);
  twoWeeksForecast = new BehaviorSubject<Forecast[]>(null);

  constructor(private http: HttpClient) {

    timer(0, this.CURRENT_WEATHER_UPDATE_PERIOD * 1000 + 3000).subscribe(() => {
      this.defineCurrentWeather();
    });

    // this.get15daysForecast().subscribe(forecast => {
    //   this.twoWeeksForecast.next(forecast);
    //   console.log(forecast);
    // });
  }


  defineCurrentWeather() {
    const local = JSON.parse(localStorage.getItem('currentWeather'));
    if (!!local) {
      const updatedAgo = moment().unix() - local.lastUpdated;
      if (updatedAgo <= this.CURRENT_WEATHER_UPDATE_PERIOD) {
        this.currentWeather.next(local.forecast);
        console.log('from local');
        return;
      }
    }
    this.getCurrentForecast().subscribe(forecast => {
      this.currentWeather.next(forecast[0]);
      const ts = moment().unix();
      const localCurrentWeather = JSON.stringify({ lastUpdated: ts, forecast: this.currentWeather.value });
      localStorage.setItem('currentWeather', localCurrentWeather);
      console.log('from remote');
    },
      error => {
        this.currentWeather.next(local.forecast);
        console.log('Caught error while updating current weather', error);
      });
  }


  getCurrentForecast() {
    const URL = `${environment.apiUrl}current`;
    const params = new HttpParams()
      .set('city', this.city)
      .set('country', this.country)
      .set('key', environment.apiKey)
      .set('lang', this.language);

    return this.http.get<ForecastResponse>(URL, { params }).pipe(map(res => {
      return res.data;
    }));
  }

  get15daysForecast() {
    let URL = `${environment.apiUrl}forecast/daily`;
    const params = new HttpParams()
      .set('city', this.city)
      .set('country', this.country)
      .set('key', environment.apiKey)
      .set('lang', this.language)

    return this.http.get<ForecastResponse>(URL, { params }).pipe(map(res => {
      res.data.shift();
      return res.data;
    }));

  }
}
