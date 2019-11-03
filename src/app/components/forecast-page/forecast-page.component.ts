import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Forecast } from 'src/app/models/forecast.model';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { fas, faSearchLocation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forecast-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.scss']
})
export class ForecastPageComponent implements OnInit {
  moment = moment;
  fas = fas;
  faSearchLocation = faSearchLocation;
  currentCity: string;
  currentWeather: Forecast;
  sunrise: string;
  sunset: string;
  pressure: string;


  constructor(private weatherService: WeatherService, private http: HttpClient) { }

  location: string = '';

  onSubmit() {
   if(this.location){
     this.weatherService.changeLocation(this.location);
   }
  }

  ngOnInit() {
    this.weatherService.city.subscribe(city => {
      this.currentCity = city;
    });

    this.weatherService.currentWeather.subscribe(forecast => {
      if (forecast) {
        this.currentWeather = forecast;
        this.pressure = (this.currentWeather.pres / 1.333).toFixed();
        this.sunrise = moment.utc(this.currentWeather.sunrise, 'HH:mm').local().format('HH:mm');
        this.sunset = moment.utc(this.currentWeather.sunset, 'HH:mm').local().format('HH:mm');

      }

    });
  }

}
