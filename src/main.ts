import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/core/core.module';
import { enableProdMode } from '@angular/core';
import  './app/scss/_scssDir.scss'

if (!AppConfig.isDev) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
