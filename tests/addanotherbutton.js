

describe('preferences page test', function() {
  it('Test addanother button', function() {
      browser.get('http://localhost:8103/#/preferences/');
        element(by.css('(click)="showErrorToastWithButton(\'top\');'));
  });
});