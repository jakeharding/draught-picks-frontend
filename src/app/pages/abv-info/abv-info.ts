import { Component } from '@angular/core';
import { BasePage } from '../BasePage';

/**
 * Generated class for the AbvInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-abv-info',
  templateUrl: 'abv-info.html',
  styleUrls: ['./abv-info.scss']
})
export class AbvInfoPage extends BasePage {

  constructor() {
    super('abv-info');
  }
}
