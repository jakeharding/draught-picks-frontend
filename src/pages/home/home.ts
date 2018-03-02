import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginRequired} from "../../providers/auth/auth";
import Beer from "../../models/Beer";
import {BeerProvider} from "../../providers/beer/beer";

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
  recents: Array<Beer>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider) {

    this.beerProvider.recents().then(results => {
      this.recents = results;
    })
  }
}
