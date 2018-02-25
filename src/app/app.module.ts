import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistrationPageModule } from "../pages/registration/registration.module";
import { PreferencesPageModule } from "../pages/preferences/preferences.module";
import { SignInPageModule } from "../pages/sign-in/sign-in.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthProvider } from '../providers/auth/auth';
import { SearchPageModule } from "../pages/search/search.module";
import { HomePageModule } from "../pages/home/home.module";



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
    HomePageModule,
    HttpClientModule
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
    AuthProvider
  ]
})
export class AppModule {}
