import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
//FIXME : Ignore this warning :)
import { AppModuleNgFactory } from './app.module.ngfactory';

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);