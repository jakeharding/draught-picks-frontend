'use strict';

describe('Sign in tests', function() {

    // it('Check Max of username', function() {
    //
    // });
    // it('Check Max of username and password', function() {
    //
    // });
    beforeEach(function () {
       //to open the page in the browser
        browser.get('http://localhost:8100/#/sign-in/');

    });
    it('should call signIn',function () {
        element(by.id('signInButton')).click();
        expect(SignInPage.signIn()).toHaveBeenCalled();
    });
});
