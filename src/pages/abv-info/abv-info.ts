import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from "../BasePage";

/**
 * Generated class for the AbvInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abv-info',
  templateUrl: 'abv-info.html',
})
export class AbvInfoPage extends BasePage {

  /**
   * Empty but required constructor for AbvInfoPage class
   * */
  constructor() {
    super('abv-info');
  }
}
