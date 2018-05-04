import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginRequired } from '../../providers/auth/auth';
import {BeerProvider} from "../../providers/beer/beer";
import Beer from "../../models/Beer";
import {UserProvider} from "../../providers/user/user";
import User from "../../models/User";
import {PreferencesProvider} from "../../providers/preferences/preferences";
import UserPreferences from '../../models/UserPreferences';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BeerFavoriteInfoPage} from "../beer-favorite-info/beer-favorite-info";
import {AbvInfoPage} from "../abv-info/abv-info";
import {IbupagePage} from "../ibupage/ibupage";

/**
 * Generated class for the PreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@LoginRequired
@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {

  beerResults: Array<Beer>;
  beerSearch: string;
  user: User;
  prefs: UserPreferences;
  prefsForm: FormGroup;
  goToBeerFavoriteInfoPage: any;
  goToABVPage: any;
  goToIBUPage: any;

  /**
   * PreferencesPage constructor
   * Required constructor for the PreferencesPage class
   * Sets the beerSearch, goToBeerFavoriteInfoPage, goToABVPage, goToIBUPage, and userProvider values accordingly
   * */
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController, public beerProvider: BeerProvider,
              private userProvider: UserProvider, private preferencesProvider: PreferencesProvider,
              public formBuilder: FormBuilder) {
    this.beerSearch = "";
    this.goToBeerFavoriteInfoPage = BeerFavoriteInfoPage;
    this.goToABVPage = AbvInfoPage;
    this.goToIBUPage = IbupagePage;
    this.userProvider.retrieve().then( (user: User) => {
      this.user = user;
    });

    this.prefs = {
      uuid: '',
      abv_low: '',
      abv_hi: '',
      ibu_low: '',
      ibu_hi: '',
      like_description: '',
      user: '',
    } as UserPreferences;

    this.preferencesProvider.retrieve().then((prefs: UserPreferences) => {
      if(prefs) {
        this.prefs = prefs;
      }
    });

    this.prefsForm = this.formBuilder.group({
      abv_low: [this.prefs.abv_low, [Validators.pattern('\\d+')]],
      abv_hi: [this.prefs.abv_hi, [Validators.pattern('\\d+')]],
      ibu_low: [this.prefs.ibu_low, [Validators.pattern('\\d+')]],
      ibu_hi: [this.prefs.ibu_hi, [Validators.pattern('\\d+')]],
      like_description: [this.prefs.like_description, []]
    });
  }

  /**
   * savePrefs function
   * No Parameters
   * Gets the user preferences and saves them in the database
   * */
  public savePrefs() {
    this.toastCtrl.create({
      message: "Your recommendations will be here soon!",
      duration: 3000,
      position: "top",
      cssClass: "success-toast"
    }).present();

    this.prefsForm.value.abv_low = this.prefsForm.value.abv_low === "" ? null : this.prefsForm.value.abv_low;
    this.prefsForm.value.abv_hi = this.prefsForm.value.abv_hi === "" ? null : this.prefsForm.value.abv_hi;
    this.prefsForm.value.ibu_hi = this.prefsForm.value.ibu_hi === "" ? null : this.prefsForm.value.ibu_hi;
    this.prefsForm.value.ibu_low = this.prefsForm.value.ibu_low === "" ? null : this.prefsForm.value.ibu_low;

    this.preferencesProvider.save(Object.assign({}, this.prefs, this.prefsForm.value, {user: this.user.uuid})).then((prefs: UserPreferences) => {
      this.prefs = prefs;
      let toast = this.toastCtrl.create({
        message: "Your recommendations have arrived! Go to the home tab to see them!",
        duration: 3000,
        position: "top",
        cssClass: "success-toast"
      });
      toast.present();
    }, () => {
      let toast = this.toastCtrl.create({
        message: "We couldn't save your profile at the moment. Please try again.",
        duration: 3000,
        position: "top",
        cssClass: "error-toast"
      });
      toast.present();
    });

  }

  /**
   * favoriteSelected function
   * Parameters: Beer ArrayList
   * Saves users favorite beers from the Beer List in the database
   * */
  favoriteSelected (beer: Beer) {
    if (this.user.favorite_beers.indexOf(beer) < 0) {
      this.user.favorite_beers.push(beer);
      this.userProvider.update(this.user).then((user: User) => {
        this.user.favorite_beers = user.favorite_beers;
      });
    }
    this.beerSearch = "";
  }

  /**
   * removeFavorite function
   * Parameters: Beer ArrayList
   * Removes users favorite beers from the Beer List in the database
   * */
  removeFavorite (beer: Beer) {
    this.user.favorite_beers = this.user.favorite_beers.filter((b: Beer) => {
      return b.uuid != beer.uuid;
    });
    this.userProvider.update(this.user);
  }

  /**
   * search function
   * Parameters: event of type event
   * searches through the Beer ArrayList and displays results
   * */
  search (event:Event) {
    if(this.beerSearch && this.beerSearch.length > 0) {
      this.beerProvider.search(this.beerSearch).toPromise().then((results: Array<Beer>) => {
        this.beerResults = results;
      });
    }
  }
}
