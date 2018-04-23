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
  loadMoreRecommended: boolean;
  loadMoreRecent: boolean;
  scrollCallback;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider) {
    this.offset = 0;
    this.loadMoreRecommended = true;
    this.loadMoreRecent = true;
    this.recommended = [];
  }

  ionViewWillEnter () {
    this.beerProvider.recents({limit: LIMIT, offset: 0}).toPromise().then(results => {
      this.recents = results;
    });
     this.beerProvider.recommended({limit: LIMIT, offset: 0}).toPromise().then(results => {
       this.recommended = results;
     });
    this.scrollCallback = this.getBeers.bind(this);
  }
  getBeers(){
    if(this.loadMoreRecommended){
      let queryParams = {
        limit: LIMIT,
        offset: this.offset
      };
      return this.beerProvider.recommended(queryParams).do(this.processRecommendedBeers);
    } else if(this.loadMoreRecent){
        let queryParams = {
          limit: LIMIT,
          offset: this.offset
        };
        return this.beerProvider.recents(queryParams).do(this.processRecentBeers);
    }
    return Observable.empty();
  }

  private processRecommendedBeers = (beers) => {
    if(beers.length == 0){
      this.loadMoreRecommended = false;
      return;
    }
    this.offset += LIMIT;
    this.recommended = this.recommended.concat(beers);
  };
  private processRecentBeers = (beers) => {
    if(beers.length == 0){
      this.loadMoreRecent = false;
      return;
    }
    this.offset += LIMIT;
    this.recents = this.recents.concat(beers);
  };

}
