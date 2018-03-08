import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistrationPageModule } from "../pages/registration/registration.module";
import { PreferencesPageModule } from "../pages/preferences/preferences.module";
import { DisclaimerPageModule} from "../pages/disclaimer/disclaimer.module";
import { SignInPageModule } from "../pages/sign-in/sign-in.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthProvider } from '../providers/auth/auth';
import { SearchPageModule } from "../pages/search/search.module";
import { HomePageModule } from "../pages/home/home.module";
import { UserProvider } from "../providers/user/user";
import { BeerProvider } from '../providers/beer/beer';
import {HttpModule} from "@angular/http";
import { PreferencesProvider } from '../providers/preferences/preferences';
import {ComponentsModule} from "../components/components.module";
import { RatingProvider } from '../providers/rating/rating';



@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RegistrationPageModule,
    PreferencesPageModule,
    SignInPageModule,
    SearchPageModule,
    DisclaimerPageModule,
    HomePageModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthProvider,
      multi: true
    },
    AuthProvider,
    UserProvider,
    BeerProvider,
    PreferencesProvider,
    RatingProvider
  ]
})
export class AppModule {}
