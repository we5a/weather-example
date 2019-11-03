import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Forecast } from 'src/app/models/forecast.model';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.scss']
})
export class ForecastPageComponent implements OnInit {
  moment = moment;
  currentWeather: Forecast;
  sunrise: string;
  sunset: string;
  pressure: string;
  
  
  constructor(private weatherService: WeatherService) { }
  
  ngOnInit() {
    this.weatherService.currentWeather.subscribe(forecast => {
      if (forecast){
         this.currentWeather = forecast;
         this.pressure = (this.currentWeather.pres / 1.333).toFixed();
         this.sunrise = moment.utc(this.currentWeather.sunrise, 'HH:mm').local().format('HH:mm');
         this.sunset = moment.utc(this.currentWeather.sunset, 'HH:mm').local().format('HH:mm');

      }
      
    });
  }

}
