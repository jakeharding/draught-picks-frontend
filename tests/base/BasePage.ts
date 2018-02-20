/**
 * BasePage.ts
 *
 * Created by jake
 * Created on 2/18/18
 *
 * Base page object for protractor tests.
 */

import {$$, by, element, ElementFinder} from 'protractor';

export default class BasePage {

  getElementByTid (tid: string): ElementFinder {
    return element(by.css(`[tid="${tid}"]`));
  }

  expectErrorIsDisplayed () {
    return $$('.error-toast').count().then(count => count > 0).then(isDisplayed => {
      expect(isDisplayed).toBe(true);
    });
  }
}