import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OFFService} from '../../services/OFF';

@Component({
  templateUrl: 'build/pages/details/details.html',
  providers: [OFFService]
})

export class DetailsPage {
  public product;

  constructor(private openFoodFacts: OFFService,
              private nav: NavController,
              private navParams: NavParams) {

    this.product = navParams.get('product');
  }
}
