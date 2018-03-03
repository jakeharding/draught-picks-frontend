import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { LoginRequired } from "../../providers/auth/auth";
import Beer from "../../models/Beer";
import {BeerProvider} from "../../providers/beer/beer";
import {FormBuilder} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider,
              private userProvider: UserProvider,
              public formBuilder: FormBuilder) {
  }

  search (event:Event) {
    if(this.beerSearch && this.beerSearch.length > 2) {
        this.beerProvider.search(this.beerSearch).then((results: Array<Beer>) => {
            this.beerResults = results;
        });
    }
  }

}
