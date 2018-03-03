import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginRequired} from "../../providers/auth/auth";
import {BeerProvider} from "../../providers/beer/beer";
import Beer from "../../models/Beer";

/**
 * Generated class for the BeerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@LoginRequired
@IonicPage({
  name: 'beer-detail',
  segment: 'beer/:uuid'
})
@Component({
  selector: 'page-beer-detail',
  templateUrl: 'beer-detail.html',
})
export class BeerDetailPage {

  beer: Beer;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider) {
    this.beer = this.navParams.data;
    if (!this.beer.name) {
      // If for some reason the app doesn't have the beer data.
      this.beerProvider.retrieve(this.beer.uuid).then((beer: Beer) => {
        this.beer = beer;
      });
    }
  }
}
