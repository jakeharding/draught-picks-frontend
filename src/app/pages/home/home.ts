import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import Beer from '../../models/Beer';
import { BeerProvider } from '../../services/beer/beer';
import { EMPTY } from 'rxjs';
import { BasePage } from '../BasePage';
import { LIMIT } from '../../app.component';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss']
})
export class HomePage extends BasePage {
  recents: Array<Beer>;
  recommended: Array<Beer>;
  beerForABV: Array<Beer>;
  BACcalc: boolean;
  totalCount: number;
  isRecentBeersSelected = 'no';
  recommendedOffset: number;
  recentOffset: number;
  loadMoreRecommended: boolean;
  loadMoreRecent: boolean;
  recScrollCallback: () => void;
  recentScrollCallback: () => void;


  /**
   * HomePage constructor
   * Required constructor for the HomePage class, sets the offset, loadMoreRecommended, loadMoreRecent,
   * and recommended values
   */
  constructor(public navCtrl: NavController,
              public beerProvider: BeerProvider) {
    super('home');
    this.recommendedOffset = 0;
    this.recentOffset = 0;
    this.loadMoreRecommended = true;
    this.loadMoreRecent = true;
    this.recommended = [];
    this.recents = [];
  }

  /**
   * ionViewWillEnter function
   * No Parameters
   * Gets the recent and recommended beers and sets the LIMIT and offset values for the scrolling functionality.
   * Also calls the scrolling functionality
   */
  ionViewWillEnter() {
    const time = new Date();
    time.setHours(time.getHours() - 3);
    const pastTime =  new Date(time);

    this.beerProvider.recents({limit: LIMIT, offset: 0}).toPromise().then(results => {

      this.recents = results;
      this.beerForABV = this.recents.filter(beer => {
        beer.recents = beer.recents.filter( currentBeer => {

          return (new Date(currentBeer.created_at)) > pastTime;
        });
        return beer.recents.length > 0;
      });

      this.totalCount = 0;
      if ( this.beerForABV.length > 0) {
        this.totalCount = this.beerForABV.map((current) => current.recents.length).reduce((acc, c) => {
          return acc + c;
        });
      }
      this.BACcalc = this.totalCount >= 4;
    });

    this.beerProvider.recommended({limit: LIMIT, offset: 0}).toPromise().then(results => {
      this.recommended = results;
    });

  }

  /**
   * Get more recent beers if available.
   * @returns - recents
   */
  getRecentBeers(event) {
    if (this.loadMoreRecent) {
      const queryParams = {
        limit: LIMIT,
        offset: this.recentOffset
      };
      return this.beerProvider.recents(queryParams).toPromise().then(beers => this.processRecentBeers(beers, event));
    }
    return EMPTY;
  }

  /**
   * Get more recommended beers if available.
   * @returns - recommended
   */
  getRecommendedBeers(event) {
    if (this.loadMoreRecommended) {
      const queryParams = {
        limit: LIMIT,
        offset: this.recommendedOffset
      };
      return this.beerProvider.recommended(queryParams).toPromise().then(beers => this.processRecommendedBeers(beers, event));
    }
    return EMPTY;

  }

  /**
   * processRecommendedBeers function
   * Parameters: Beer list
   * increases the offset and loads more beers while scrolling through the beer list
   */
  private processRecommendedBeers = (beers, event) => {
    event.target.complete();
    if (beers.length === 0) {
      this.loadMoreRecommended = false;
      return;
    }
    this.recommendedOffset += LIMIT;
    this.recommended = this.recommended.concat(beers);
  }


  /**
   * processRecentBeers function
   * Parameters: Beer list
   * increases the offset and loads more beers while scrolling through the beer list
   */
  private processRecentBeers = (beers, event) => {
    event.target.complete();
    if (beers.length === 0) {
      this.loadMoreRecent = false;
      return;
    }
    this.recentOffset += LIMIT;
    this.recents = this.recents.concat(beers);
  }

}
