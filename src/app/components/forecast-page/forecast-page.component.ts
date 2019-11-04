import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Forecast } from 'src/app/models/forecast.model';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { fas, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forecast-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.scss']
})
export class ForecastPageComponent implements OnInit, OnDestroy {
  moment = moment;
  fas = fas;
  faSearchLocation = faSearchLocation;
  currentCity: string;
  countryDetail: string;
  currentWeather: Forecast;
  sunrise: string;
  sunset: string;
  pressure: string;
  location: string = '';
  _subscriptions = new Subscription();

  constructor(private weatherService: WeatherService, private http: HttpClient) { }

  onSubmit() {
   if(this.location){
     this.weatherService.changeLocation(this.location);
   }
  }

  ngOnInit() {
   this._subscriptions.add(this.weatherService.city.subscribe(city => {
    this.currentCity = city;
  })); 

    this._subscriptions.add(this.weatherService.countryDetails.subscribe(detail=>{
      this.countryDetail = detail;
    }));

    this._subscriptions.add(this.weatherService.currentWeather.subscribe(forecast => {
      if (forecast) {
        this.currentWeather = forecast;
        this.countryDetail = forecast.country_code;
        this.pressure = (this.currentWeather.pres / 1.333).toFixed();
        this.sunrise = moment.utc(this.currentWeather.sunrise, 'HH:mm').local().format('HH:mm');
        this.sunset = moment.utc(this.currentWeather.sunset, 'HH:mm').local().format('HH:mm');
      }
    }));
  }

  ngOnDestroy(){
    this._subscriptions.unsubscribe();
  }

}
