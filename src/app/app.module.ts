import {NgModule} from '@angular/core';
import {Http, HttpModule} from '@angular/http';
import {IonicApp, IonicModule} from 'ionic-angular';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {Storage} from '@ionic/storage';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AppPopover} from '../global/popover';
import {DetailsPage} from "../pages/details/details";
import {AuthenticationPage} from "../pages/authentication/authentication";

const cloudSettings: CloudSettings = {
    'core': {
        app_id: 'd33141dc'
    }
}

export function instantiateLoader(http: Http){
    return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AppPopover,
        DetailsPage,
        AuthenticationPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: instantiateLoader,
            deps: [Http]
        }),
        HttpModule
    ],
    exports: [HttpModule, TranslateModule],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AppPopover,
        DetailsPage,
        AuthenticationPage
    ],
    providers: [Storage]
})
export class AppModule {
}