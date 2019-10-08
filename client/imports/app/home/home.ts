import { Component, OnInit, OnDestroy } from '@angular/core';

import * as $ from 'jquery';



@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  ngOnInit() {

  }
  ngOnDestroy() {

  }

  scrollFunction(idstring) {
    $('html, body').animate({
      scrollTop: $(idstring).offset().top
    }, 1000);
  };

}
