/**
 * PreferencesPageObject.ts
 *
 * Created by jake, Revised by Quinn
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
  abvInfoButton: ElementFinder;
  ibuInfoButton: ElementFinder;
  descInfoButton: ElementFinder;
  enterBeerInput: Input;
  enterAbvHigh: Input;
  enterAbvLow: Input;
  enterIbuHigh: Input;
  enterIbuLow: Input;
  enterTextArea: ElementArrayFinder;

  constructor () {
    super();
    this.submitBtn = this.getElementByTid("submitBtn");
    this.addAnotherBtn = this.getElementByTid("addAnotherBtn");
    this.enterBeerInput = new Input("enterBeerInput");
    this.enterAbvHigh = new Input("enterAbvHigh");
    this.enterAbvLow = new Input("enterAbvLow");
    this.enterIbuHigh = new Input("enterIbuHigh");
    this.enterIbuLow = new Input("enterIbuLow");
    this.enterTextArea = this.getElementByTid("enterTextArea").all(by.tagName("textarea"));
    this.abvInfoButton = this.getElementByTid("abvInfoButton");
    this.ibuInfoButton = this.getElementByTid("ibuInfoButton");
    this.descInfoButton = this.getElementByTid("descInfoButton");
  }
}