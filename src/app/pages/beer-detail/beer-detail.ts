import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { BeerProvider } from '../../services/beer/beer';
import Beer from '../../models/Beer';
import BeerRating from '../../models/BeerRating';
import { RatingProvider } from '../../services/rating/rating';
import { BasePage } from '../BasePage';

/**
 * Generated class for the BeerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-beer-detail',
  templateUrl: 'beer-detail.html',
})
export class BeerDetailPage extends BasePage {

  beer: Beer;
  beerRating: BeerRating;
  hasRating = false;

  /**
   * Constructor for BeerDetailPage class
   * Gets the Beer data and beerRating information
   */
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public beerProvider: BeerProvider, public ratingProvider: RatingProvider,
              public toastController: ToastController) {
    super(`/beers/${navParams.data.uuid}`);
    this.beer = this.navParams.data as Beer;
    this.beerRating = {
      description: '',
      rating: 0,
      beer: this.beer.uuid,
    } as BeerRating;

    this.beerProvider.retrieve(this.beer.uuid).then((beer: Beer) => {
      this.beer = beer;
      if (beer.rating.length > 0) {
        this.beerRating = beer.rating[0];
      }
    });
    if (this.beer.rating && this.beer.rating.length > 0) {
      this.hasRating = true;
      this.beerRating = this.beer.rating[0];
    }
  }

  /**
   * Creates a recent beer entry in the database.
   */
  createRecent() {
    // TODO Use toast provider
    const success = async (recent) => {
      const toast = await this.toastController.create({
        message: 'We saved a record of this you! Tell us what you think!',
        duration: 3000,
        position: 'top',
        cssClass: 'success-toast'
      });
      await toast.present();
    };
    const error = async (e) => {
      const toast = await this.toastController.create({
        message: 'Oops! Something is not right!.',
        duration: 3000,
        position: 'top',
        cssClass: 'error-toast'
      });
      await toast.present();
    };
    this.beerProvider.createRecent(this.beer).then(success, error);
  }

  /**
   * Saves the description of the beer for the user.
   */
  saveRatingDescription() {
    // TODO Use toast provider
    const success = async (rating) => {
      this.beerRating = rating;
      const toast = await this.toastController.create({
        message: 'Your description has been saved!',
        duration: 3000,
        position: 'top',
        cssClass: 'success-toast'
      });
      await toast.present();
    };
    const error = async (e) => {
      const toast = await this.toastController.create({
        message: 'Having trouble saving your description.',
        duration: 3000,
        position: 'top',
        cssClass: 'error-toast'
      });
      await toast.present();
    };

    if (this.hasRating) {
      this.ratingProvider.partialUpdate(this.beerRating).then(success, error);
    } else {
      this.ratingProvider.create(this.beerRating).then(success, error);
    }
  }

  /**
   * Setter for setting the rating on the component.
   * @param rating - User's rating
   */
  setRating(rating: BeerRating): void {
    this.beerRating = rating;
  }
}