import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginRequired} from "../../providers/auth/auth";
import Beer from "../../models/Beer";
import {BeerProvider } from "../../providers/beer/beer";
import { LIMIT } from "../../directives/infinite-scroller/infinite-scroller";
import {Observable} from "rxjs/Observable";

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
  recommended: Array<Beer>;
  isRecentBeersSelected: string = 'yes';
  offset: number;
  loadMore: boolean;
  scrollCallback;
  searchText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider) {
    this.offset = 0;
    this.loadMore = true;
    this.scrollCallback = this.getBeers.bind(this);

  }

  ionViewWillEnter () {
    this.beerProvider.recents().then(results => {
      this.recents = results;
    });
     this.beerProvider.recommended({limit: LIMIT, offset: 0}).toPromise().then(results => {
       this.recommended = results;
     });

  }
  getBeers(){
    if(this.loadMore){
      let queryParams = {
        limit: LIMIT,
        offset: this.offset
      };
      return this.beerProvider.recommended(queryParams).do(this.processData);
    }
    return Observable.empty();
  }

  private processData = (beers) => {
    if(beers.length == 0){
      this.loadMore = false;
      return;
    }
    this.offset += LIMIT;
    this.recommended = this.recommended.concat(beers);
  };

}
