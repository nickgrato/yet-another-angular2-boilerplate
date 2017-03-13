# yet-another-angular2-boilerplate

For some reason, it is incredibly hard to find a simple, development, qa, production environment 
buildable and configurable Webpack 2+, Angular2, Typescript example. [I am not the only one](https://medium.com/@dtothefp/why-can-t-anyone-write-a-simple-webpack-tutorial-d0b075db35ed#.po4yoflbn) that has had trouble finding straight forward
Webpack tutorials.

Don't get me wrong, there are [great tutorials out there](https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460#.9rs8sw5j9), 
plenty of Stackoverflow answers saying to use the [DefinePlugin or the EnvironmentPlugin](http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack), video tutorials of high quality 
that announce a next coming segment on environment variables/configurations [but never gets around to it](https://youtu.be/lPhZW8ZyUA4?t=484).

Solutions that use multiple webpack.config.js files and webpack-merge plugin, multiple webpack.configs?!! Is it ok to duplicate even this for multiple webpack.config files?:

```javascript
var webpack = require('webpack'),
    htmlPlugin = require('html-webpack-plugin'),
    revPlugin = require('webpack-rev-replace-plugin'),
    config = require('./build.config.json'),
    path = require('path'),
    extendedDefinePlugin = require('extended-define-webpack-plugin'),
    webpackDelPlugin = require('webpack-del-plugin');
```    
I do not think this is ok, I get it, use webpack-merge to have a core webpack.core.config.js and then environment specific ones, what a pain in the ass. I never had more than one gulp.js or grunt.js file!

Angular CLI has a [build tool](https://github.com/angular/angular-cli/wiki/build) that works with Typescript and conceptually you can see what it does from this main.ts snippet:
```javascript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
```
But no where does the Angular CLI build tool readily give, via quick instruction, a way to a configuration file of your choosing and structure, for example, if you have multiple service urls, Twitter and Facebook APIs, CDN urls etc

There is [easy-webpack](https://github.com/easy-webpack/core), which seems high quality, very generous, lots of templates, still, no directly apparent way to have a configuation available to a Angular2 Typescript app.

There is [this](https://github.com/AngularClass/angular2-webpack-starter/wiki/How-to-pass-environment-variables%3F) which is great and and has Typescript Type Definition explanation, but reading the solution over, if feels like DefinePlugin is boxing me into Node process.env naming conventions, I didn't get the impression I could create my on environment variables of my choosen names or a hiearchy structure of configuration that is meangingful to my domain or my team.

All I wanted was a damn environment varying configuration "instantiation" (is it ok to use that word with Javascript? lol), loaded with some enviroment specific values, be it a (service, constant, whatever) injected, or globally available in my Angular2 Typescript app and still have Typescript compile and have an easy way to define the configuration with complex types and not use a bunch of plugins or read alot of ALL_CAPS tutorials on environment variables that were connected to Node.env process in one way or another.

I do not want multiple webpack.config files, I do want to merge multiple config files, I do not want multiple Typescript environment.ts files, and the DefinePlugin or the EnvironmentPlugin do not give me, in a straight foward, quick manner, anything available in a Typescript app.

**I want to load a environment.json file depending on my env webpack cmd argument and Angular2 Typescript app can read anywhere any time!!!**

yet-another-angular2-bolerplate repo contains a simple solution to environment variables/configuration for a Typescript app, that I have not been able to find anywhere on the internets.

#The Breakdown:
First, lets look at the npm 'package.json' and zoom in on the webpack cmds:

```javascript
"scripts": {
  "build": "webpack --progress --colors",
  "build-prd": "webpack -p --progress --colors --env.env prd", //env is a Webpack 2+ thing, I am setting env.env property 
                                                               //to string prd --env.foo bar would set foo = string bar
  "build-qa": "webpack -p --progress --colors --env.env qa",
  "postinstall": "typings install",
  "serve": "webpack-dev-server --inline --progress --colors"
}
```
  
You can see 'build-prd', take special note of '--env.env prd'. Now we run from cmd, 'npm build-prd', so imagine you just did that. 

Now look at a snippet of the ONLY 'webpack.config.js':
  
```javascript
var config = require('./build.config.json'); //store paths and file names here instead of hardcoded in webpack.config.js
var extendedDefinePlugin = require('extended-define-webpack-plugin'); //why are people uppercasing their Webpack plugins these days I no idea, damn millenials

module.exports = function (env) { //notice the function export that is how we can read the cmd line argument env
   //here is part of the magic!! we can load a environment specific json file!!!
   var appConfigPath = config.envs + config.appConfig.replace('{env}', env.env);
   
  if (!env) { //add this so that you do not have to pass env to your webpack cmds
      env = {};
      env.env = config.envDev;
  }
  
  plugins: [
    //and SWEET JESUS, use the extended-define-webpack-plugin, to AppConfig global var to the json file at appConfigPath
    new extendedDefinePlugin({
        AppConfig: require(appConfigPath)
    })
  ]
}
```

Now how the F would Typescript know about AppConfig! If you try to use AppConfig in your Angular2 app, in main.ts for example, you will get a build error:

```javascript
console.log('work you piece of shit!', AppConfig); //squiggly line no build for you!!
```

And finally, you need a Type Definition file, let's look at 'app.d.ts':

```javascript
declare module App {
  interface Service {
    name: string;
    url: string;
  }

  export interface Configuration {
    services: Service[];
  }
}


declare var AppConfig: App.Configuration; //there is AppConfig!! Typescript is happy
```
You will notice the npm package Typings already installed, so you can add you custom Type Definitions files with cmds like so:
'C:\projects\sandbox\yet-another-angular2-boilerplate\node_modules\.bin/typings install --global --save file:./src/app.d.ts'

And now
```javascript
console.log('Hello my environment configuration containing all the environment stuff I want', AppConfig); //no squiggly line, I build for you!
```

And so you can do shit like this:

```javascript
import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';

if (!AppConfig.isDev) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

And shit like this:
```javascript
console.log('Accounts Service Url for enviroment declared to my webpack or webpack-dev-server cmd line call!!!', AppConfig.Services.filter(function(item){return item.name === 'account'})[0].url);
```
