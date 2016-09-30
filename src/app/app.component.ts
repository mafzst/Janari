import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {HomePage} from '../pages/home/home';


@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    rootPage = HomePage;

    constructor(platform: Platform, translate: TranslateService) {
        translate.setDefaultLang('fr');
        translate.use('fr');

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }
}