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
  totalCount: number;
  isRecentBeersSelected: string = 'yes';
  recommendedOffset: number;
  recentOffset: number;
  loadMoreRecommended: boolean;
  loadMoreRecent: boolean;
  recScrollCallback: Function;
  recentScrollCallback: Function;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider) {
    this.recommendedOffset = 0;
    this.recentOffset = 0;
    this.loadMoreRecommended = true;
    this.loadMoreRecent = true;
    this.recommended = [];
    this.recents = [];
    this.recScrollCallback = this.getRecommendedBeers.bind(this);
    this.recentScrollCallback = this.getRecentBeers.bind(this);
  }

  ionViewWillEnter () {
    let time = new Date();
    time.setHours(time.getHours()-3);
    const pastTime =  new Date(time);

    this.beerProvider.recents({limit: LIMIT, offset: 0}).toPromise().then(results => {

      this.recents = results;
      this.beerForABV = this.recents.filter(beer =>{
        beer.recents = beer.recents.filter( currentBeer =>{

          return (new Date(currentBeer.created_at)) > pastTime;
        });
        return beer.recents.length > 0;
      });

      this.totalCount = 0;
      if( this.beerForABV.length>0) {
        this.totalCount = this.beerForABV.map((current) => current.recents.length).reduce((acc, c) => {
          return acc + c;
        });
      }
      this.BACcalc = this.totalCount >= 4
    });

    this.beerProvider.recommended({limit: LIMIT, offset: 0}).toPromise().then(results => {
      this.recommended = results;
    });

  }

  getRecentBeers () {
    if(this.loadMoreRecent){
      let queryParams = {
        limit: LIMIT,
        offset: this.recentOffset
      };
      return this.beerProvider.recents(queryParams).do(this.processRecentBeers);
    }
    return Observable.empty();
  }

  getRecommendedBeers(){
    if(this.loadMoreRecommended){
      let queryParams = {
        limit: LIMIT,
        offset: this.recommendedOffset
      };
      return this.beerProvider.recommended(queryParams).do(this.processRecommendedBeers);
    }
    return Observable.empty();

  }

  private processRecommendedBeers = (beers) => {
    if(beers.length == 0){
      this.loadMoreRecommended = false;
      return;
    }
    this.recommendedOffset += LIMIT;
    this.recommended = this.recommended.concat(beers);
  };

  private processRecentBeers = (beers) => {
    if(beers.length == 0){
      this.loadMoreRecent = false;
      return;
    }
    this.recentOffset += LIMIT;
    this.recents = this.recents.concat(beers);
  };

}