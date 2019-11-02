import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastPageComponent } from './components/forecast-page/forecast-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'forecast', component: ForecastPageComponent},
  {path: '', redirectTo: '/forecast', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
