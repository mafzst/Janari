import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
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
              private alertController: AlertController,
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

        this.additives[tag] = additive;
      },
      err => {
        console.log(err);
      }
    )
  }

  showAdditiveInfo() {
    this.alertController.create({
      title: "Additifs aliementaires",
      subTitle: "Cette liste indique les additifs alimentaires utilisés dans ce produit. Ces additifs sont ajoutés pour améliorer le produit. Il peut s'agir de colorants, de conservateurs ou d'arômes.<br>" +
      "<b>Certains présentent un risque pour la santé.</b><br>Une échelle de toxicité est donnée de <ion-badge class='additive-danger-1'>1</ion-badge> (pas ou peu toxique) à <ion-badge class='additive-danger-5'>5</ion-badge> (très toxique)<br><small>La valeur 0 corrrespond à une donnée non renseignée.</small>",
      buttons: [
        {
          text: "OK"
        }
      ]
    }).present()
  }
}
