/**
 * Input.ts
 *
 * Created by jake
 * Created on 2/19/18
 */
import BasePage from "./BasePage";
import {by} from "protractor";
import {ElementArrayFinder} from "protractor/built/element";


export class Input extends BasePage {
  element: ElementArrayFinder;
  constructor(tid:string) {
    super();
    this.element = this.getElementByTid(tid).all(by.tagName("input"));
  }

  /**
   * enterText function
   * Parameters: text
   * enters text in an element
   * */
  enterText (text:string):void {
    this.element.clear();
    this.element.sendKeys(text);
  }
}