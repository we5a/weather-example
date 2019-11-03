import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ForecastPageComponent } from './components/forecast-page/forecast-page.component';
import { ForecastItemComponent } from './components/forecast-item/forecast-item.component';
import { ForecastListComponent } from './components/forecast-list/forecast-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WeatherService } from './services/weather.service';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForecastPageComponent,
    ForecastItemComponent,
    ForecastListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TabsModule.forRoot()
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
