import BasePage from "../base/BasePage";
import {ElementFinder} from "protractor";

export default class DisclaimerPageObject extends BasePage {
    disclaimerVerified : ElementFinder;

    constructor() {
      super();
      this.disclaimerVerified = this.getElementByTid("disclaimerVerified");
    }
}