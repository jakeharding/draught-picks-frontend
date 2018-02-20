/**
 * PreferencesPageObject.ts
 *
 * Created by jake
 * Created on 2/18/18
 *
 * Preferences page object.
 */

import { ElementFinder, by, ElementArrayFinder } from "protractor";
import BasePage from "../base/BasePage";
import {Input} from "../base/Input";


export default class PreferencesPageObject extends BasePage {
  submitBtn: ElementFinder;
  addAnotherBtn: ElementFinder;
  enterBeerInput: Input;
  enterAbvHigh: Input;
  enterAbvLow: Input;
  enterIbuHigh: Input;
  enterIbuLow: Input;
  enterTextArea: ElementArrayFinder;
  // TODO Add the other elements on the page

  constructor () {
    super();
    this.submitBtn = this.getElementByTid("submitBtn");
    this.addAnotherBtn = this.getElementByTid("addAnotherBtn");
    this.enterBeerInput = new Input("enterBeerInput");
    this.enterAbvHigh = new Input("enterAbvHigh");
    this.enterAbvLow = new Input("enterAbvLow");
    this.enterIbuHigh = new Input("enterIbuHigh");
    this.enterIbuLow = new Input("enterIbuLow");
    this.enterTextArea = this.getElementByTid("enterTextArea").all(by.tagName("textarea"))
    // TODO Instantiate the other objects needed for other elements on the page.
  }
}