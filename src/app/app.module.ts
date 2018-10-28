import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LocationStrategy, PathLocationStrategy } from "@angular/common";

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistrationPageModule } from "../pages/registration/registration.module";
import { PreferencesPageModule } from "../pages/preferences/preferences.module";
import { DisclaimerPageModule } from "../pages/disclaimer/disclaimer.module";
import { SignInPageModule } from "../pages/sign-in/sign-in.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthProvider } from '../providers/auth/auth';
import { SearchPageModule } from "../pages/search/search.module";
import { HomePageModule } from "../pages/home/home.module";
import { UserProvider } from "../providers/user/user";
import { BeerProvider } from '../providers/beer/beer';
import { HttpModule } from "@angular/http";
import { PreferencesProvider } from '../providers/preferences/preferences';
import { ComponentsModule } from "../components/components.module";
import { RatingProvider } from '../providers/rating/rating';
import { BeerFavoriteInfoPageModule } from "../pages/beer-favorite-info/beer-favorite-info.module";
import { AbvInfoPageModule } from "../pages/abv-info/abv-info.module";
import { IbupagePageModule } from "../pages/ibupage/ibupage.module";
import { EmailSentPageModule } from "../pages/email-sent/email-sent.module";
import { ResendEmailPageModule } from "../pages/resend-email/resend-email.module";
import { ToastProvider } from '../providers/toast/toast';

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
    EmailSentPageModule,
    ResendEmailPageModule,
    HomePageModule,
    HttpClientModule,
    HttpModule,
    BeerFavoriteInfoPageModule,
    ComponentsModule,
    AbvInfoPageModule,
    IbupagePageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthProvider,
      multi: true
    },
    AuthProvider,
    UserProvider,
    BeerProvider,
    PreferencesProvider,
    RatingProvider,
    ToastProvider
  ]
})
export class AppModule {}
