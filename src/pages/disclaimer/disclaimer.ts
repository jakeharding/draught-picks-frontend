import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from "../BasePage";

/**
 * Generated class for the DisclaimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disclaimer',
  templateUrl: 'disclaimer.html',
})
export class DisclaimerPage extends BasePage {


  /**
   * DisclaimerPage constructor
   * empty but required constructor for the DisclaimerPage Class, does nothing
   * */
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    super('disclaimer');
  }
}
