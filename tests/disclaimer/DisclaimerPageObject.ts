import BasePage from "../base/BasePage";
import {ElementFinder} from "protractor";

export default class DisclaimerPageObject extends BasePage {
    disclaimerVerified : ElementFinder;

/**
 * DisclaimerPageObject.ts
 *
 * gets dislaimerVerified element by tid
 * */
    constructor() {
      super();
      this.disclaimerVerified = this.getElementByTid("disclaimerVerified");
    }
}