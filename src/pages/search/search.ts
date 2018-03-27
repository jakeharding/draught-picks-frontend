import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { LoginRequired } from "../../providers/auth/auth";
import Beer from "../../models/Beer";
import {BeerProvider} from "../../providers/beer/beer";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@LoginRequired
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  beerResults: Array<Beer>;
  beerSearch: string;
  message: string;
  private static NULL_RESULT_MESSAGE = "Search for a beer and let us know what you like about it.";
  private static ZERO_RESULT_MESSAGE = "We cannot find results on the beers you have entered.";
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider) {
    this.message = SearchPage.NULL_RESULT_MESSAGE;
    this.beerSearch = "";
  }

  /**
   * Method called on input to the search bar.
   * @param {Event} event
   */
  search (event:Event) {
    if(this.beerSearch && this.beerSearch.length > 2) {
        this.beerProvider.search(this.beerSearch).then((results: Array<Beer>) => {
            this.beerResults = results;
            if(this.beerResults.length === 0) {
                this.message = SearchPage.ZERO_RESULT_MESSAGE;
            }
        });
    } else {
        this.beerResults = [];
        this.message = SearchPage.NULL_RESULT_MESSAGE;
    }
  }

  /**
   * Method called when the `X` is clicked in the search bar.
   * @param {Event} event
   */
  clear(event:Event): void {
    this.message = SearchPage.NULL_RESULT_MESSAGE;
    this.beerResults = null;

  }

  /**
   * Method called when view is about to enter.
   * Call the search method in case user has a value in the input.
   */
  ionViewWillEnter() {
    this.search(null);
  }
}
