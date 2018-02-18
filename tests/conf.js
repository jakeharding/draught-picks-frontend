/*
* Now start up a server in terminal with:
webdriver-manager start

then set up the run configs above as protractor and point it to the tests file.
* */

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub/',
    specs: ['../tests/addanotherbutton.js']
};