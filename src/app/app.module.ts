import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {Storage} from '@ionic/storage';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

const cloudSettings: CloudSettings = {
    'core': {
        app_id: 'd33141dc'
    }
}

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [Storage]
})
export class AppModule {
}