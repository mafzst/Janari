
import {Component, PLATFORM_PIPES} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {StorageService} from './services/storage';
import {HomePage} from './pages/home/home';
import {TranslateLoader, TranslateStaticLoader, TranslateService, TranslatePipe} from "ng2-translate";
import {Http} from "@angular/http";

let prodMode: boolean = !!window.hasOwnProperty('cordava');

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, translate: TranslateService) {
    this.rootPage = HomePage;

    translate.use('fr');
    console.log(translate.getLangs());

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [
  {
    provide: TranslateLoader,
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  },
  {
    provide: PLATFORM_PIPES,
    useValue: TranslatePipe,
    multi: true
  },
  TranslateService
], {prodMode: prodMode});
