import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {additivesService} from '../../services/additives'
import {AppPopover} from "../../global/popover";

@Component({
  templateUrl: 'details.html',
  providers: [additivesService]
})

export class DetailsPage {
  public product;
  public additives = {};
  public nutritionalValues;
  public servingSize = "100g";
  public show100g = false;

  constructor(private nav: NavController,
              private navParams: NavParams,
              private popoverController: PopoverController,
              private additivesService: additivesService,
              private translate: TranslateService) {

    this.product = navParams.get('product');

    if (this.product.serving_size != "") this.servingSize = this.product.serving_size;

    this.nutritionalValues = this.parseNutriments();

    this.product.additives_tags.forEach((tag) => {
      let ecode = tag.split(':')[1].toUpperCase();
      this.populateAdditives(tag, ecode);
    })
  }

  getNutrientsLevels() {
    return Object.keys(this.product.nutrient_levels);
  }

  getNutrients() {
    return Object.keys(this.product.nutriments)
      .filter((key) => key.split('_').length == 1)
      .filter((key) => key != "nutrition-score-fr" && key != "nutrition-score-uk");
  }

  parseNutriments() {
    const nutriments = this.product.nutriments;
    const keys = Object.keys(nutriments);
    const primitives = this.getNutrients();
    let parsed = {};

    primitives.forEach((key) => {
      let secondaries = keys.filter((secondKey) => {
        let splitted = secondKey.split('_');

        return splitted.length == 2 && splitted[0] == key;
      }).map((filteredKey) => {
        return filteredKey.split('_')[1];
      })

      let result = {};
      secondaries.forEach((secondary) => {
        result[secondary] = nutriments[`${key}_${secondary}`];
      })

      parsed[key] = result;
    })

    return parsed;
  }

  populateAdditives(tag, ecode) {
    let additive = {};
    this.additivesService.getAdditive(ecode).subscribe(
      data => {
        additive = data.json()[0];

        if (additive == null) {
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

  showAdditiveInfo(event) {
    this.popoverController.create(AdditivesPopover).present({
      ev: event
    });
  }

  showScoreInfo(event) {
    this.popoverController.create(ScorePopover).present({
      ev: event
    });
  }

  parseIngredients(string) {
    return string.replace(/_(.*?)_/g, "<b>$1</b>");
  }

  getNutrimentTranslation(nutriment) {
    let translated;
    this.translate.get(`NUTRIMENTS.${nutriment.toUpperCase()}`)
      .subscribe((returned) => {
        translated = returned
      });
    return translated;
  }

  openPopover(event) {
    let popover = this.popoverController.create(AppPopover);
    popover.present({
      ev: event
    });
  }
}

@Component({
  templateUrl: "additivesPopover.html"
})
class AdditivesPopover {
}

@Component({
  templateUrl: "scorePopover.html"
})
class ScorePopover {
}
