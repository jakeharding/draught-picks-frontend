import { ElementFinder, by, ElementArrayFinder } from "protractor";
import BasePage from "../base/BasePage";
import {Input} from "../base/Input";


export default class PreferencesPageObject extends BasePage {
    recentSegment: ElementFinder;
    recommendedSegment: ElementFinder;

    constructor () {
        super();
        this.recentSegment = this.getElementByTid("recentSegment");
        this.recommendedSegment = this.getElementByTid("recommendedSegment");

    }
}