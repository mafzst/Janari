import {Component} from "@angular/core";
import {ViewController, AlertController, PopoverController} from "ionic-angular";

@Component({
  template: `
<ion-list>
  <ion-item (click)="handleAbout()">A propos</ion-item>
</ion-list>
`
})

export class AppPopover {
  constructor(private viewController: ViewController,
              private alertController: AlertController,
              private popoverController: PopoverController) {
  }

  close() {
    return this.viewController.dismiss();
  }

  handleAbout() {
    this.viewController.dismiss().then(() => {
      this.popoverController.create(AboutPopover).present();
    })
  }
}

@Component({
  template: `
<div class="popover-container">
<img src="/img/off_logo.png">
<p>Janari utilise les données de <a href="http://fr.openfoodfacts.org">OpenFoodFacts</a> pour décrypter vos étiquettes</p>
</div>
`
})
class AboutPopover {
  constructor(private viewController: ViewController) {
  }

  close() {
    this.viewController.dismiss();
  }
}
