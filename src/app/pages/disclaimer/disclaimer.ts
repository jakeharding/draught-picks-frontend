import { Component } from '@angular/core';
import { BasePage } from '../BasePage';

/**
 * Generated class for the DisclaimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-disclaimer',
  templateUrl: 'disclaimer.html',
  styleUrls: ['./disclaimer.scss']
})
export class DisclaimerPage extends BasePage {


  /**
   * DisclaimerPage constructor
   * empty but required constructor for the DisclaimerPage Class, does nothing
   */
  constructor() {
    super('disclaimer');
  }
}
