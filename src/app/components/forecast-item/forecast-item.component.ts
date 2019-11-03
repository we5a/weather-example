import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Forecast } from 'src/app/models/forecast.model';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.scss']
})
export class ForecastItemComponent implements OnInit {
  @Input() forecast: Forecast;
  date: string;
  pressure: number;
  windSpeed: number;

  constructor(private weatherSerivice: WeatherService) { }
  
  ngOnInit() {
    if(this.forecast){
      this.date = moment(this.forecast.datetime, "YYYY-MM-DD").format("DD.MM");
      this.pressure = Math.round(this.forecast.pres);
      this.windSpeed = Math.round(this.forecast.wind_spd * 10) / 10;
    }
  }

}
