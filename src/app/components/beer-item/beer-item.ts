import { Component, Input } from '@angular/core';

/**
 * Generated class for the BeerItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'beer-item',
  templateUrl: 'beer-item.html',
  styleUrls: ['./beer-item.scss']
})
export class BeerItemComponent {

  @Input() beer;

  constructor() {}
}
