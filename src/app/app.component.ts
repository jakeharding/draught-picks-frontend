import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import env from '../env';
import ga from 'universal-ga';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.loadGoogelAnalytics();
    });
  }

  loadGoogelAnalytics() {
    if (env.GA_ENV === 'prod') {
      const gaScript = document.createElement('script');
      gaScript.setAttribute('async', 'true');
      gaScript.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${env.GA_TRACKING}`);
      ga.initialize(env.GA_TRACKING);

      const gaConfig = document.createTextNode(`window.dataLayer = window.dataLayer || []; \
        function gtag(){window.dataLayer.push(arguments);} \
        gtag('js', new Date()); \
        gtag('config', '${env.GA_TRACKING}');`);

      const gaConfigScript = document.createElement('script');
      gaConfigScript.appendChild(gaConfig);

      document.head.appendChild(gaScript);
      document.head.appendChild(gaConfigScript);
    }

  }
}
