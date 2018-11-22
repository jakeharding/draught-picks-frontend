import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../BasePage';

/**
 * Generated class for the IbupagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ibupage',
  templateUrl: 'ibupage.html',
})
export class IbupagePage extends BasePage {

  /**
   * IbupagePage constructor
   * Empty but required constructor for the IbupagePage class
   * */
  constructor() {
    super('ibu-info');
  }
}
