import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OFFService} from '../../services/OFF';

@Component({
  templateUrl: 'build/pages/category/category.html',
  providers: [OFFService]
})

export class CategoryPage {
  public category;

  constructor(private openFoodFacts: OFFService,
              private nav: NavController,
              private navParams: NavParams) {

    this.category = navParams.get('category');
  }
}
