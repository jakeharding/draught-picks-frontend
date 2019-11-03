import { Component, EventEmitter, Input, Output } from '@angular/core';
import BeerRating from '../../models/BeerRating';
import { RatingProvider } from '../../services/rating/rating';
import { ToastController } from '@ionic/angular';

/**
 * Generated class for the RatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rating',
  templateUrl: 'rating.html',
  styleUrls: ['./rating.scss']
})
export class RatingComponent {

  constructor(public ratingProvider: RatingProvider, public toastController: ToastController) {}

  private static readonly LARGE = 'large';

  @Input() rating: BeerRating = { beer: 'beerId'} as BeerRating;
  @Input() size = 'small';
  @Output() setRating = new EventEmitter<BeerRating>();

  /**
   * updateRating function
   * Parameters: rating
   * updates the rating of a beer
   */
  updateRating(rating: number) {
    if (this.size === RatingComponent.LARGE) {
      const success = async beerRating => {
        this.rating = beerRating; // Update the beerRating returned from REST API
        const toast = await this.toastController.create({
          message: 'Your rating is saved.',
          duration: 3000,
          position: 'top',
          cssClass: 'success-toast'
        });
        await toast.present();
        this.setRating.emit(beerRating); // Update parent component
      };

      if (this.rating && this.rating.uuid) {
        return this.ratingProvider.partialUpdate({rating, uuid: this.rating.uuid} as BeerRating).then(success);
      } else {
        return this.createRating(this.rating.beer, rating).then(success);
      }
    }
  }

  /**
   * createRating function
   * Parameters: rating
   * creates a new rating for a beer if none exist
   */
  createRating(beer: string, rating: number) {
    const newRating = {beer, rating} as BeerRating;
    return this.ratingProvider.create(newRating);
  }
}
