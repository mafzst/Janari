import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {OFFService} from '../../services/OFF';
import {DetailsPage} from '../details/details';
import {CategoryPage} from '../category/category';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [OFFService]
})
export class HomePage {
  public foundProduct;
  public productCode;
  public categoryName = "pizza";
  public foundCategories;

  constructor(private openFoodFacts: OFFService,
              private nav: NavController) {}

  getProduct() {
    this.openFoodFacts.getProduct(this.productCode).subscribe(
      data => {
        let json = data.json();
        this.foundProduct = json.product;
      },
      err => console.error(err)
    );
  }

  getCategories() {
    this.openFoodFacts.getCategory(this.categoryName).subscribe(
      data => {
        const json = data.json();
        this.foundCategories = json.slice(0,10);
      },
      err => console.log(err)
    )
  }


  viewProductDetails(product) {
    this.nav.push(DetailsPage, {product: product});
  }
  viewCategoryProducts(category) {
    this.nav.push(CategoryPage, {category: category});
  }
}
