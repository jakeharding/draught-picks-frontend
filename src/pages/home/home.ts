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
  beerForABV: Array<Beer>;
  BACcalc: Boolean;
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
    let time = new Date();
    time.setHours(time.getHours()-3);
    var pastTime =  new Date(time).toISOString();
    this.beerProvider.recents().then(results => {

      this.recents = results;
      this.beerForABV = this.recents.filter(beer =>{
        beer.recents = beer.recents.filter( currentBeer =>{

          return currentBeer.created_at.toString() > pastTime;//.toUTCString();
        });
        return beer.recents.length > 0;
      });

      var count = 0, totalCount = 0;
      if( this.beerForABV.length>0)
      this.beerForABV.map((current) => count+=current.recents.length ).reduce((acc, c) => {

        return totalCount = acc + c;
      });
      if(this.beerForABV.length > 4){this.BACcalc = true; }
    });
    this.beerProvider.recommended().then(results => {
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
