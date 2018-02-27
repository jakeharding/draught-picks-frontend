import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginRequired } from '../../providers/auth/auth';
import {BeerProvider} from "../../providers/beer/beer";
import Beer from "../../models/Beer";
import {UserProvider} from "../../providers/user/user";
import User from "../../models/User";
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController, public beerProvider: BeerProvider, private userProvider: UserProvider) {
    this.userProvider.retrieve().then( (user: User) => {
      this.user = user;
    });
  }

  public showErrorToastWithButton(position: string) {
    let toast = this.toastCtrl.create({
      message: 'No network connection, try again later',
      duration: 3000,
      position: "top",
      cssClass: "error-toast"
    });
    toast.present();
  }

  favoriteSelected (beer: Beer) {
    this.user.favorite_beers.push(beer);
  }

  removeFavorite (beer: Beer) {
    this.user.favorite_beers = this.user.favorite_beers.filter((b: Beer) => {
      return b.uuid != beer.uuid;
    })
  }

  search (event:Event) {
    if(this.beerSearch && this.beerSearch.length > 0) {
      this.beerProvider.search(this.beerSearch).then((results: Array<Beer>) => {
        this.beerResults = results;
      });
    }
  }
}
