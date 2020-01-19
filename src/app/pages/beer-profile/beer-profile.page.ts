import { Component, OnInit } from '@angular/core';
import Beer from '../../models/Beer';
import User from '../../models/User';
import BeerProfile from '../../models/BeerProfile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastProvider } from '../../services/toast/toast';
import { BeerProvider } from '../../services/beer/beer';
import { UserProvider } from '../../services/user/user';
import { BeerProfileProvider } from '../../services/beer-profile/beer-profile';
import { BasePage } from '../BasePage';

@Component({
  selector: 'app-beer-profile',
  templateUrl: './beer-profile.page.html',
  styleUrls: ['./beer-profile.page.scss'],
})
// TODO Support more than one profile
export class BeerProfilePage extends BasePage {
  beerResults: Array<Beer>;
  beerSearch: string;
  user: User;
  beerProfileForm: FormGroup;

  constructor(public navCtrl: NavController,
              public toastProvider: ToastProvider, public beerProvider: BeerProvider,
              private userProvider: UserProvider, private profileProvider: BeerProfileProvider,
              public formBuilder: FormBuilder) {
    super('beer-profile');
    this.beerSearch = '';
    this.userProvider.retrieve().then( (user: User) => {
      this.user = user;
    });

    this.beerProfileForm = this.formBuilder.group({
      abv_low: ['', [Validators.pattern('\\d+')]],
      abv_hi: ['', [Validators.pattern('\\d+')]],
      ibu_low: ['', [Validators.pattern('\\d+')]],
      ibu_hi: ['', [Validators.pattern('\\d+')]],
      like_description: ['', []],
      user: [],
      uuid: []
    });
    // TODO Beer profile would be better stored in state
    this.profileProvider.retrieve().then((profile: BeerProfile) => {
      this.beerProfileForm.patchValue(profile || {});
    });
  }

  /**
   * saveProfile function
   * No Parameters
   * Gets the user beer-profile and saves them in the database
   */
  public async saveProfile() {
    this.toastProvider.successToast('Your recommendations will be here soon!');

    this.profileProvider.save(
      Object.assign({}, this.beerProfileForm.value, {user: this.user.uuid})).then((profile: BeerProfile) => {
      this.beerProfileForm.patchValue(profile);
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
