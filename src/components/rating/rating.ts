import {Component, Input} from '@angular/core';
import BeerRating from "../../models/BeerRating";

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

  constructor() {}

}
