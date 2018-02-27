import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginRequired} from "../../providers/auth/auth";
import {PreferencesProvider} from "../../providers/preferences/preferences";
import UserPreferences from "../../models/UserPreferences";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@LoginRequired
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  prefs: UserPreferences;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public prefsProvider: PreferencesProvider) {
    this.prefsProvider.retrieve().then((prefs: UserPreferences) => {
      this.prefs = prefs;
    });
  }
}
