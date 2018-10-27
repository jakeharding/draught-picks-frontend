import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from "../BasePage";

/**
 * Generated class for the BeerFavoriteInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-go-to-beer-favorite-info',
  templateUrl: 'beer-favorite-info.html',
})
export class BeerFavoriteInfoPage extends BasePage {

  /**
   * BeerFavoriteInfoPage constructor
   * empty but required constructor for the BeerFavoriteInfoPage Class, does nothing
   * */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super('beer-favorite-info');
  }

}
