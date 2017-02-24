import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import {enableProdMode} from '@angular/core';

console.log('hello awesome', AppConfig.services[0].url);

platformBrowserDynamic().bootstrapModule(AppModule);
