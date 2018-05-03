import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
export class IbupagePage {

  /**
   * IbupagePage constructor
   * Empty but required constructor for the IbupagePage class
   * */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IbupagePage');
  }

}
