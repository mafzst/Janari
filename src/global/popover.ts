import {Component} from "@angular/core";
import {ViewController, AlertController, PopoverController} from "ionic-angular";
import {TranslateService} from "ng2-translate/ng2-translate";

@Component({
  template: `
<ion-list no-lines>
  <ion-item (click)="changeLanguage()">{{'SETTINGS.LANGUAGE' | translate}}</ion-item>
  <ion-item (click)="handleAbout()">{{'SETTINGS.ABOUT' | translate}}</ion-item>
</ion-list>
`
})

export class AppPopover {
  constructor(private viewController: ViewController,
              private alertController: AlertController,
              private popoverController: PopoverController,
              private translate: TranslateService) {
  }

  close() {
    return this.viewController.dismiss();
  }

  handleAbout() {
    this.viewController.dismiss().then(() => {
      this.popoverController.create(AboutPopover).present();
    })
  }

  changeLanguage() {
    let current = this.translate.currentLang;
    this.translate.use(current == 'fr' ? 'en' : 'fr');
    this.viewController.dismiss();
  }
}

@Component({
  template: `
<div class="popover-container">
<img src="img/off_logo.png">
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
