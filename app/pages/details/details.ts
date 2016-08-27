import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {additivesService} from '../../services/additives'

@Component({
  templateUrl: 'build/pages/details/details.html',
  providers: [additivesService]
})

export class DetailsPage {
  public product;
  public additives = {};

  public nutrients = {
    'salt': "Sel",
    'fat': "Matières grasses / Lipides",
    'saturated-fat': "Acides gras saturés",
    'sugars': "Sucres"
  }

  constructor(private nav: NavController,
              private navParams: NavParams,
              private popoverController: PopoverController,
              private additivesService: additivesService) {

    this.product = navParams.get('product');

    this.product.additives_tags.forEach((tag) => {
      let ecode = tag.split(':')[1].toUpperCase();
      this.populateAdditives(tag, ecode);
    })
  }

  getNutrients() {
    return Object.keys(this.product.nutrient_levels);
  }

  populateAdditives(tag, ecode) {
    let additive = {};
    this.additivesService.getAdditive(ecode).subscribe(
      data => {
        additive = data.json()[0];

        if(additive == null) {
          additive = {
            "code": ecode,
            "name": "Additif non réportorié",
            "danger": 0
          }
        }

        this.additives[tag] = additive;
      },
      err => {
        console.log(err);
      }
    )
  }

  showAdditiveInfo() {
    this.popoverController.create(AdditivesPopover).present();
  }

  showScoreInfo() {
    this.popoverController.create(ScorePopover).present();
  }

  parseIngredients(string) {
    return string.replace(/_(.*?)_/g, "<b>$1</b>");
  }
}

@Component({
  templateUrl: "build/pages/details/additivesPopover.html"
})
class AdditivesPopover {
}

@Component({
  templateUrl: "build/pages/details/scorePopover.html"
})
class ScorePopover {
}
