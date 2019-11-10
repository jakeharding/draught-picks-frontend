import { Component } from '@angular/core';
import { BasePage } from '../BasePage';

/**
 * Generated class for the IbupagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ibupage',
  templateUrl: 'ibupage.html',
})
// TODO rename this to IbuInfoPage
export class IbupagePage extends BasePage {

  /**
   * IbupagePage constructor
   * Empty but required constructor for the IbupagePage class
   */
  constructor() {
    super('ibu-info');
  }
}
