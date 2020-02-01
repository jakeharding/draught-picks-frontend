import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment as env } from '../environments/environment';
import ga from 'universal-ga';

export const LIMIT = 100;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.loadGoogleAnalytics();
  }

  loadGoogleAnalytics() {
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
