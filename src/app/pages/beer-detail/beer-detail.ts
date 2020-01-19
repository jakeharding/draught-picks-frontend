import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BeerProvider } from '../../services/beer/beer';
import Beer from '../../models/Beer';
import BeerRating from '../../models/BeerRating';
import { RatingProvider } from '../../services/rating/rating';
import { BasePage } from '../BasePage';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastProvider } from '../../services/toast/toast';

/**
 * Generated class for the BeerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-beer-detail',
  templateUrl: 'beer-detail.html',
  styleUrls: ['./beer-detail.scss']
})
export class BeerDetailPage extends BasePage {

  beer: Beer;
  beerRating: BeerRating;

  /**
   * Constructor for BeerDetailPage class
   * Gets the Beer data and beerRating information
   */
  constructor(public navCtrl: NavController, public beerProvider: BeerProvider, public ratingProvider: RatingProvider,
              private route: ActivatedRoute, private router: Router, private toastProvider: ToastProvider) {
    super(`/beers/${route.snapshot.paramMap.get('uuid')}`);
    if (this.router.getCurrentNavigation().extras.state) {
      this.beer = this.router.getCurrentNavigation().extras.state.beer as Beer;
    } else {
      this.beer = { uuid: route.snapshot.paramMap.get('uuid') } as Beer;
    }

    this.beerRating = {
      description: '',
      // Used as flag to tell if this beer ahs been rated since 0 is falsy.
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
      this.beerRating = this.beer.rating[0];
    }
  }

  /**
   * Creates a recent beer entry in the database.
   */
  createRecent() {
    const success = async (recent) => {
      this.toastProvider.successToast('We saved a record of this you! Tell us what you think!');
    };
    const error = async (e) => {
      this.toastProvider.errorToast();
    };
    this.beerProvider.createRecent(this.beer).then(success, error);
  }

  /**
   * Saves the description of the beer for the user.
   */
  saveRatingDescription() {
    const success = (rating) => {
      this.beerRating = rating;
      this.toastProvider.successToast('Your description has been saved!');
    };
    const error = (e) => {
      this.toastProvider.errorToast('Having trouble saving your description.');
    };

    if (this.beerRating.rating) {
      return this.ratingProvider.partialUpdate(this.beerRating).then(success, error);
    } else {
      return this.ratingProvider.create(this.beerRating).then(success, error);
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
