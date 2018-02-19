/**
 * BasePage.ts
 *
 * Created by jake
 * Created on 2/18/18
 *
 * Base page object for protractor tests.
 */

import {by, element, ElementFinder} from 'protractor';

export default class BasePage {

  byTid (tid: string): ElementFinder {
    return element(by.css(`[tid="${tid}"]`));
  }
}