import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BeerProvider } from '../../services/beer/beer';
import Beer from '../../models/Beer';
import { UserProvider } from '../../services/user/user';
import User from '../../models/User';
import { PreferencesProvider } from '../../services/preferences/preferences';
import UserPreferences from '../../models/UserPreferences';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeerFavoriteInfoPage } from '../beer-favorite-info/beer-favorite-info';
import { BasePage } from '../BasePage';
import { ToastProvider } from '../../services/toast/toast';

/**
 * Generated class for the PreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
  styleUrls: ['./preferences.scss']
})
// TODO rename this to profile or beer profile
// TODO create feature for more than one beer profile per user
export class PreferencesPage extends BasePage {

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
   */
  constructor(public navCtrl: NavController,
              public toastProvider: ToastProvider, public beerProvider: BeerProvider,
              private userProvider: UserProvider, private preferencesProvider: PreferencesProvider,
              public formBuilder: FormBuilder) {
    super('preferences');
    this.beerSearch = '';
    this.goToBeerFavoriteInfoPage = BeerFavoriteInfoPage;
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
      if (prefs) {
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
   */
  public async savePrefs() {
    this.toastProvider.successToast('Your recommendations will be here soon!');

    this.prefsForm.value.abv_low = this.prefsForm.value.abv_low === '' ? null : this.prefsForm.value.abv_low;
    this.prefsForm.value.abv_hi = this.prefsForm.value.abv_hi === '' ? null : this.prefsForm.value.abv_hi;
    this.prefsForm.value.ibu_hi = this.prefsForm.value.ibu_hi === '' ? null : this.prefsForm.value.ibu_hi;
    this.prefsForm.value.ibu_low = this.prefsForm.value.ibu_low === '' ? null : this.prefsForm.value.ibu_low;

    this.preferencesProvider.save(
      Object.assign({}, this.prefs, this.prefsForm.value, {user: this.user.uuid})).then((prefs: UserPreferences) => {
      this.prefs = prefs;
      this.toastProvider.successToast('Your recommendations have arrived! Go to the home tab to see them!');
    }, () => {
      this.toastProvider.errorToast('We couldn\'t save your profile at the moment. Please try again.');
    });

  }

  /**
   * Called when a user selects a favorite.
   * @param beer - Beer object
   */
  favoriteSelected(beer: Beer) {
    if (this.user.favorite_beers.indexOf(beer) < 0) {
      this.user.favorite_beers.push(beer);
      this.userProvider.update(this.user).then((user: User) => {
        this.user.favorite_beers = user.favorite_beers;
      });
    }
    this.beerSearch = '';
  }

  /**
   * Called when a user removes a beer from their favorites.
   * @param beer - beer object
   */
  removeFavorite(beer: Beer) {
    this.user.favorite_beers = this.user.favorite_beers.filter((b: Beer) => {
      return b.uuid !== beer.uuid;
    });
    this.userProvider.update(this.user);
  }

  /**
   * Called in the autocomplete in response to entry
   * @param event - Event object
   */
  search(event: Event) {
    if (this.beerSearch && this.beerSearch.length > 0) {
      this.beerProvider.search(this.beerSearch).toPromise().then((results: Array<Beer>) => {
        // TODO: This would be better used as an observable.
        this.beerResults = results;
      });
    }
  }
}
