import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToMainPage(){
    document.location.reload();
  }

  clickMoreAction(){
    window.location.href ='https://www.gismeteo.ua';
  }

}
