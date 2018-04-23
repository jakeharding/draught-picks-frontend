import { ElementFinder, by, ElementArrayFinder } from "protractor";
import BasePage from "../base/BasePage";
import {Input} from "../base/Input";


export default class HomePageObject extends BasePage {
  recentSegment: ElementFinder;
  recommendedSegment: ElementFinder;
  toSearchPage: ElementFinder;
  constructor () {
    super();
    this.recentSegment = this.getElementByTid("recentSegment");
    this.recommendedSegment = this.getElementByTid("recommendedSegment");
    this.toSearchPage = this.getElementByTid("toSearchPage");

  }
}