import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Forecast } from 'src/app/models/forecast.model';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent implements OnInit {
  twoWeeksForecast: Forecast[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.twoWeeksForecast.subscribe(forecast => {
      this.twoWeeksForecast = forecast;
    });
  }

}
