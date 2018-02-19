import {browser, element, by, ElementFinder} from 'protractor';


describe('preferences page test', function() {
  it('Test addanother button', function() {
      browser.get('http://localhost:8100/#/preferences/');
        element(by.css('(click)="showErrorToastWithButton(\'top\');'));
  });
});