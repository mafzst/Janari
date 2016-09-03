import {Component} from '@angular/core';

import {NavController, AlertController, PopoverController, LoadingController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';

import {OFFService} from '../../services/OFF';
import {StorageService} from '../../services/storage';
import {DetailsPage} from '../details/details';
import {AppPopover} from '../../global/popover';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [
    OFFService,
    StorageService
  ]
})
export class HomePage {
  public foundProduct;
  public productCode;
  public lastProducts = [];
  private searchLoading;

  constructor(private openFoodFacts: OFFService,
              private storage: StorageService,
              private nav: NavController,
              private alertController: AlertController,
              private popoverController: PopoverController,
              private loadingController: LoadingController) {

    this.searchLoading = this.loadingController.create({
      content: "Recherche..."
    })

    this.storage.getLastProductsObervable().subscribe(
      data => {
        var index = this.lastProducts.findIndex((product) => product._id == data['_id']);
        if(index != -1) {
          this.lastProducts.splice(index, 1);
        }
        this.lastProducts.push(data);
      }
    )
  }

  getProduct(productCode = null, callback: (product) => any = null) {

    if (productCode == null) {
      let alert = this.alertController.create({
        title: "Merci d'entrer un code produit",
        buttons: [
          {
            text: "OK"
          }
        ]
      });
      alert.present();

      return;
    }

    this.searchLoading.present();

    this.openFoodFacts.getProduct(productCode || this.productCode).subscribe(
      data => {
        let json = data.json();

        if (json.status != 1) {
          this.alertController.create({
            title: "Produit non trouvé",
            subTitle: `Le code ${productCode} ne correspond à aucun produit`,
            buttons: ['OK']
          }).present();
          return;
        }

        this.searchLoading.dismiss();
        this.storage.insertLastSeenProduct(json.product);

        if (callback) {
          callback(json.product);
        } else {
          this.foundProduct = json.product;
        }
      },
      err => {
        let alert = this.alertController.create({
          title: "Erreur de recherche",
          subTitle: "Une erreur est survenue lors de la recherche du produit. Vérifiez votre connexion Internet et rézssayez. Infos techniques : " + err,
          buttons: [
            {
              text: "Réessayer",
              handler: () => {
                alert.dismiss().then(() => {
                  this.getProduct(productCode);
                })
                return false;
              }
            },
            {
              text: "OK"
            }
          ]
        });

        alert.present();
      }
    );
  }

  scan() {
    BarcodeScanner.scan()
      .then((result) => {
        if (!result.isCancelled) {
          this.getProduct(result.text, (product) => {
            this.viewProductDetails(product);
          });
        }
      })
      .catch((err) => {
        alert(err);
      })
  }

  viewProductDetails(product) {
    this.nav.push(DetailsPage, {product: product});
  }

  openPopover(event) {
    let popover = this.popoverController.create(AppPopover);
    popover.present({
      ev: event
    });
  }

  handleSearch() {
    if (this.productCode.length == 13) {
      this.getProduct(this.productCode, (product) => {
        this.viewProductDetails(product);
      });
    }
  }
}
