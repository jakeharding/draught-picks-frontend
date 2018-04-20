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
  recommended: Array<Beer>;
  beerForABV: Array<Beer>;
  BACcalc: Boolean;
  isRecentBeersSelected: string = 'yes';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider) {
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

  }
}
