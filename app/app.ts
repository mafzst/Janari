import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {
  FIREBASE_PROVIDERS,
  AuthProviders,
  AuthMethods,
  defaultFirebase,
  firebaseAuthConfig
} from 'angularfire2';
import {HomePage} from './pages/home/home';

let prodMode: boolean = !!window.hasOwnProperty('cordava');

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyBGv-sxpWTwtfs3pO8DpS0lOnMhDvctoYY",
      authDomain: "janari-4f29d.firebaseapp.com",
      databaseURL: "https://janari-4f29d.firebaseio.com",
      storageBucket: "janari-4f29d.appspot.com",
    }),
    firebaseAuthConfig({
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
      remember: 'default',
      scope: ['email']
    })
  ]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [], {prodMode: prodMode});
