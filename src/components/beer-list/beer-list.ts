import { Component, Input } from '@angular/core';
import Beer from "../../models/Beer";

/**
 * Generated class for the BeerListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'beer-list',
  templateUrl: 'beer-list.html'
})
export class BeerListComponent {

  @Input() beers: Array<Beer>;

  constructor() {
  }

}
