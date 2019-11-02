import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Forecast } from 'src/app/models/forecast.model';

@Component({
  selector: 'app-forecast-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.scss']
})
export class ForecastPageComponent implements OnInit {
  currentForecast: Forecast[];
  temp: number = null;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getCurrentForecast().subscribe(forecast=>{
      this.currentForecast = forecast;
      this.temp = this.currentForecast ? this.currentForecast[0].app_temp : null;
      console.log(this.currentForecast);
    });
  }

}
