import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super('ibu-info');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IbupagePage');
  }

}
