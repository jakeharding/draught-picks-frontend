import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginRequired} from "../../providers/auth/auth";
import {BeerProvider} from "../../providers/beer/beer";
import Beer from "../../models/Beer";
import BeerRating from "../../models/BeerRating";
import {RatingProvider} from "../../providers/rating/rating";

/**
 * Generated class for the BeerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@LoginRequired
@IonicPage({
  name: 'beer-detail',
  segment: 'beer/:uuid'
})
@Component({
  selector: 'page-beer-detail',
  templateUrl: 'beer-detail.html',
})
export class BeerDetailPage {

  beer: Beer;
  beerRating: BeerRating;
  hasRating: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider, public ratingProvider: RatingProvider,
              public toastController: ToastController) {
    this.beer = this.navParams.data;
    this.beerProvider.retrieve(this.beer.uuid).then((beer: Beer) => {
      this.beer = beer;
      this.beerRating = beer.rating[0];
    });
    if(this.beer.rating && this.beer.rating.length > 0) {
      this.hasRating = true;
      this.beerRating = this.beer.rating[0];
    } else {
      this.beerRating = {
        description: '',
        rating: 0,
        beer: this.beer.uuid,
      } as BeerRating
    }
  }

  createRecent () {
    const success = (rating) => {
      this.beerRating = rating;
      const toast = this.toastController.create({
        message: "Your description has been saved!",
        duration: 3000,
        position: "top",
        cssClass: "success-toast"
      });
      toast.present();
    };
    const error = (error) => {
      const toast = this.toastController.create({
        message: "Oops! Something is not right!.",
        duration: 3000,
        position: "top",
        cssClass: "error-toast"
      });
      toast.present();
    };
    this.beerProvider.createRecent(this.beer).then(success, error);
  }

  saveRating () {

  }

  saveRatingDescription() {
    const success = (rating) => {
      this.beerRating = rating;
      const toast = this.toastController.create({
        message: "Your description has been saved!",
        duration: 3000,
        position: "top",
        cssClass: "success-toast"
      });
      toast.present();
    };
    const error = (error) => {
      const toast = this.toastController.create({
        message: "Having trouble saving your description.",
        duration: 3000,
        position: "top",
        cssClass: "error-toast"
      });
      toast.present();
    };

    if (this.hasRating) {
      this.ratingProvider.partialUpdate(this.beerRating).then(success, error);
    } else {
      this.ratingProvider.create(this.beerRating).then(success, error);
    }
  }
}
