import {Component, Input} from '@angular/core';
import BeerRating from "../../models/BeerRating";
import {RatingProvider} from "../../providers/rating/rating";

/**
 * Generated class for the RatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rating',
  templateUrl: 'rating.html'
})
export class RatingComponent {

  @Input() rating: BeerRating;

  constructor(public ratingProvider: RatingProvider) {}

  updateRating (rating: number) {

  }

  createRating (beer: string, rating: number) {
    const newRating = { beer, rating } as BeerRating;
    this.ratingProvider.create(newRating).then((rating) => {
      this.rating = rating;
    })
  }

}
