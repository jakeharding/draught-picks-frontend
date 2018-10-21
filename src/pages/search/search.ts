import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { LoginRequired } from "../../providers/auth/auth";
import Beer from "../../models/Beer";
import {BeerProvider} from "../../providers/beer/beer";
import {Observable} from "rxjs/Observable";
import {LIMIT} from "../../directives/infinite-scroller/infinite-scroller";
import {BasePage} from "../BasePage";

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
export class SearchPage extends BasePage {

  beerResults: Array<Beer>;
  beerSearch: string;
  message: string;
  offset: number;
  loadMore: boolean;
  scrollCallback;

  private static NULL_RESULT_MESSAGE = "Search for a beer and let us know what you like about it.";
  private static ZERO_RESULT_MESSAGE = "We cannot find results on the beers you have entered.";
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider) {
    super('search');
    this.message = SearchPage.NULL_RESULT_MESSAGE;
    this.beerSearch = "";
    this.offset = 0;
    this.loadMore = true;
    this.scrollCallback = this.getBeers.bind(this);
  }

  /**
   * Method called on input to the search bar.
   * @param {Event} event
   */
  search (event:Event) {
    if(this.beerSearch && this.beerSearch.length > 2) {
        this.beerProvider.search({search: this.beerSearch}).toPromise().then((results: Array<Beer>) => {
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
   * getBeers function
   * No Parameters
   * gets the recent and recommended beers from the database and processes them
   * using the scrolling technique
   * */
  getBeers(){
    if(this.loadMore){
      let queryParams = {
        limit: LIMIT,
        offset: this.offset,
        search: this.beerSearch
      };
      return this.beerProvider.search(queryParams).do(this.processData);
    }
    return Observable.empty();
  }

  /**
   * processData function
   * Parameters: Beer list
   * increases the offset and loads more beers while scrolling through the beer list
   * */
  private processData = (beers) => {
    if(beers.length == 0){
      this.loadMore = false;
      return;
    }
    this.offset += LIMIT;
    this.beerResults = this.beerResults.concat(beers);
  };

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
