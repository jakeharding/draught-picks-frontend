/**
 * PreferencesPageObject.ts
 *
 * Created by jake
 * Created on 2/18/18
 *
 * Preferences page object.
 */

import { ElementFinder } from "protractor";
import BasePage from "../base/BasePage";


export default class PreferencesPageObject extends BasePage {
  submitBtn: ElementFinder;
  // TODO Add the other elements on the page

  constructor () {
    super();
    this.submitBtn = this.getElementByTid("submitBtn");
    // TODO Instantiate the other objects needed for other elements on the page.
  }
}