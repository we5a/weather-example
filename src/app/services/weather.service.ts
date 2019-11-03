import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ForecastResponse } from '../models/forecastResponse.model';
import { Forecast } from '../models/forecast.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { timer } from 'rxjs';
import * as moment from 'moment';
import { CoordPosition } from '../models/position.model';

@Injectable()

export class WeatherService {
  city = new BehaviorSubject<string>(null);
  position: CoordPosition;
  countryDetails = new BehaviorSubject<string>(null);
  language = 'en';
  CURRENT_WEATHER_UPDATE_PERIOD = 7200;
  currentWeather = new BehaviorSubject<Forecast>(null);
  twoWeeksForecast = new BehaviorSubject<Forecast[]>(null);

  constructor(private http: HttpClient) {

    this.getYourPosition().subscribe(pos => {
      this.position = pos;

      timer(0, this.CURRENT_WEATHER_UPDATE_PERIOD * 1000 + 3000).subscribe(() => {
        this.defineCurrentWeather();
      });
      this.defineTwoWeeksWeather();
    });

  }

  defineTwoWeeksWeather() {
    const local = JSON.parse(localStorage.getItem('twoWeeksWeather'));
    const today = moment().format('YYYY-MM-DD');
    if (!!local) {
      const updated = local.lastUpdated;
      if (updated === today) {
        this.twoWeeksForecast.next(local.forecast);
        console.log('2 weeks from local');
        return;
      }
    }
    this.get15daysForecast(this.position.lat.toString(), this.position.lng.toString()).subscribe(forecast => {
      this.twoWeeksForecast.next(forecast);
      const localTwoWeeksWeather = JSON.stringify({ lastUpdated: today, forecast: this.twoWeeksForecast.value });
      localStorage.setItem('twoWeeksWeather', localTwoWeeksWeather);
      console.log('2 weeks from remote');
    });
  }

  defineCurrentWeather() {
    const local = JSON.parse(localStorage.getItem('currentWeather'));
    if (!!local) {
      const updatedAgo = moment().unix() - local.lastUpdated;
      if (updatedAgo <= this.CURRENT_WEATHER_UPDATE_PERIOD) {
        this.currentWeather.next(local.forecast);
        this.city.next(local.city);
        console.log('from local');
        return;
      }
    }

    this.getCurrentForecast(this.position.lat.toString(), this.position.lng.toString()).subscribe(forecast => {
      this.currentWeather.next(forecast[0]);
      this.city.next(forecast[0].city_name);
      const ts = moment().unix();
      const localCurrentWeather = JSON.stringify({ lastUpdated: ts, city: this.city.value, forecast: this.currentWeather.value });
      localStorage.setItem('currentWeather', localCurrentWeather);
      console.log('from remote');
    },
      error => {
        this.currentWeather.next(local.forecast);
        console.log('Caught error while updating current weather', error);
      });
  }

  getCurrentForecast(lat: string, lng: string) {
    const URL = `${environment.apiUrl}current`;
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lng)
      .set('key', environment.apiKey)
      .set('lang', this.language);

    return this.http.get<ForecastResponse>(URL, { params }).pipe(map(res => {
      return res.data;
    }));
  }

  get15daysForecast(lat: string, lng: string) {
    let URL = `${environment.apiUrl}forecast/daily`;
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lng)
      .set('key', environment.apiKey)
      .set('lang', this.language)

    return this.http.get<ForecastResponse>(URL, { params }).pipe(map(res => {
      res.data.shift();
      return res.data;
    }));
  }

  getYourPosition() {
    const url = 'https://www.googleapis.com/geolocation/v1/geolocate';
    const params = new HttpParams()
      .set('key', environment.geocodingKey);

    return this.http.post<any>(url, {}, { params }).pipe(map(res => {
      return res.location;
    }));
  }

  getCountryDetails(lat: string, lng: string) {     //get country details -> 1 additional query, optional
    const url = 'https://maps.googleapis.com/maps/api/geocode/json';

    const params = new HttpParams()
      .set('latlng', `${lat},${lng}`)
      .set('key', environment.geocodingKey);

    this.http.get<any>(url, { params }).subscribe(res => {
      let cDet = res.plus_code.compound_code.split(' ');
      cDet.shift();
      this.countryDetails.next(cDet.join(' '));
    });
  }

  changeLocation(location: string) {
    const URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    const params = new HttpParams()
      .set('address', location)
      .set('key', environment.geocodingKey);
    this.http.get<any>(URL, { params }).subscribe(res => {
      const lat: string = res.results[0].geometry.location.lat.toString();
      const lng: string = res.results[0].geometry.location.lng.toString();

      this.getCurrentForecast(lat, lng).subscribe(f => {
        this.currentWeather.next(f[0]);
        this.city.next(f[0].city_name);
        this.countryDetails.next(res.results[0].formatted_address)
      });

      this.get15daysForecast(lat, lng).subscribe(f => {
        this.twoWeeksForecast.next(f);
      });
    });
  }

}
