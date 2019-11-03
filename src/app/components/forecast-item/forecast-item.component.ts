import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Forecast } from 'src/app/models/forecast.model';
import { Weather } from 'src/app/models/weather.model';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.scss']
})
export class ForecastItemComponent implements OnInit {
  currentWeather: Forecast;
  
  constructor(private weatherSerivice: WeatherService) { }

  ngOnInit() {
    this.weatherSerivice.currentWeather.subscribe(forecast=>{
      if (forecast){
        this.currentWeather = forecast;
        

       // console.log('cW', this.currentWeather);
      }
    });
  }

}
