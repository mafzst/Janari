import {Component} from '@angular/core';
import {Auth, User} from '@ionic/cloud-angular';
import {
  ToastController,
  NavController,
  PopoverController,
  AlertController,
  LoadingController, Storage, LocalStorage
} from 'ionic-angular';
import {HomePage} from '../home/home';
import {AppPopover} from "../../global/popover";

@Component({
  templateUrl: 'build/pages/authentication/authentication.html'
})

export class AuthenticationPage {
  private email;
  private password;
  private local: Storage;

  constructor(public auth: Auth,
              public user: User,
              private toastController: ToastController,
              private popoverController: PopoverController,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private nav: NavController) {
    this.local = new Storage(LocalStorage);
  }

  handleGoogleLogin() {
    this.auth.login('google').then(() => {
      this.nav.push(HomePage);
      this.welcomeUser(this.user.social.google.data.full_name);
    });
  }

  handleFacebookLogin() {
    this.auth.login('facebook').then(()=> {
      this.nav.push(HomePage);
      this.welcomeUser(this.user.social.facebook.data.full_name);
    });
  }

  handleTwitterLogin() {
    this.auth.login('twitter').then(()=> {
      this.nav.push(HomePage);
      this.welcomeUser(this.user.social.twitter.data.full_name);
    });
  }

  loginOrRegister() {
    const loading = this.loadingController.create({
      content: "Merci de patienter nous vérifions votre compte..."
    })
    loading.present();
    var details = {email: this.email, password: this.password};

    this.auth.signup(details).then(() => {
      this.nav.push(HomePage);
      loading.dismiss();
    }, (error) => {
      if (error.details.find((message) => message == 'conflict_email')) {
        this.auth.login('basic', details).then(
          () => {
            this.nav.push(HomePage);
            loading.dismiss();
          },
          (error) => {
            loading.dismiss().then(() => {
              this.alertController.create({
                title: "Erreur de connexion",
                message: "La connexion à échouée, veuillez vérifier votre mot de passe et réessayez.",
                buttons: [
                  {
                    text: "Réessayer",
                    role: 'cancel'
                  }
                ]
              }).present();
            });
          })
      } else {
        if (error.details.find((message) => message == 'required_email' || message == "invalid_email")) {
          loading.dismiss().then(() => {
            this.alertController.create({
              title: "Formulaire non valide",
              message: "Merci de saisir une addresse email valide est réessayez",
              buttons: [
                {
                  text: "Réessayer",
                  role: 'cancel'
                }
              ]
            }).present();
          });
          return;
        }
        loading.dismiss().then(() => {
          this.alertController.create({
            title: "Formulaire non valide",
            message: "Merci de saisir un mot de passe est réessayez",
            buttons: [
              {
                text: "Réessayer",
                role: 'cancel'
              }
            ]
          }).present();
        });
      }
    })
  }

  handleIgnore() {
    this.local.set('authIgnored', true);
    this.nav.push(HomePage);
  }

  welcomeUser(name) {
    this.toastController.create({
      message: `Bienvenue ${name} !`,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  openPopover(event) {
    let popover = this.popoverController.create(AppPopover);
    popover.present({
      ev: event
    });
  }
}
