import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OFFService} from '../../services/OFF';

@Component({
  templateUrl: 'build/pages/details/details.html',
  providers: [OFFService]
})

export class DetailsPage {
  public product;

  public nutrients = {
    'salt': "Sel",
    'fat': "Matières grasses / Lipides",
    'saturated-fat': "Acides gras saturés"
  }

  constructor(private openFoodFacts: OFFService,
              private nav: NavController,
              private navParams: NavParams) {

    this.product = navParams.get('product');
  }

  getNutrients() {
    return Object.keys(this.product.nutrient_levels);
  }
}
