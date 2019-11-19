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
export class BeerProfilePage extends BasePage {
  beerResults: Array<Beer>;
  beerSearch: string;
  user: User;
  beerProfile: BeerProfile;
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

    this.beerProfile = {
      uuid: '',
      abv_low: '',
      abv_hi: '',
      ibu_low: '',
      ibu_hi: '',
      like_description: '',
      user: '',
    } as BeerProfile;

    this.profileProvider.retrieve().then((profile: BeerProfile) => {
      if (profile) {
        this.beerProfile = profile;
      }
    });

    this.beerProfileForm = this.formBuilder.group({
      abv_low: [this.beerProfile.abv_low, [Validators.pattern('\\d+')]],
      abv_hi: [this.beerProfile.abv_hi, [Validators.pattern('\\d+')]],
      ibu_low: [this.beerProfile.ibu_low, [Validators.pattern('\\d+')]],
      ibu_hi: [this.beerProfile.ibu_hi, [Validators.pattern('\\d+')]],
      like_description: [this.beerProfile.like_description, []]
    });
  }

  /**
   * saveProfile function
   * No Parameters
   * Gets the user beer-profile and saves them in the database
   */
  public async saveProfile() {
    this.toastProvider.successToast('Your recommendations will be here soon!');

    this.beerProfileForm.value.abv_low = this.beerProfileForm.value.abv_low === '' ? null : this.beerProfileForm.value.abv_low;
    this.beerProfileForm.value.abv_hi = this.beerProfileForm.value.abv_hi === '' ? null : this.beerProfileForm.value.abv_hi;
    this.beerProfileForm.value.ibu_hi = this.beerProfileForm.value.ibu_hi === '' ? null : this.beerProfileForm.value.ibu_hi;
    this.beerProfileForm.value.ibu_low = this.beerProfileForm.value.ibu_low === '' ? null : this.beerProfileForm.value.ibu_low;

    this.profileProvider.save(
      Object.assign({}, this.beerProfile, this.beerProfileForm.value, {user: this.user.uuid})).then((profile: BeerProfile) => {
      this.beerProfile = profile;
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
