var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const window = {}
exports.config = {
  allScriptsTimeout: 11000,
  directConnect: true,
  capabilities: {
    'browserName': 'chrome',
    'loggingPrefs': {
      'driver': 'OFF',
      'server': 'OFF',
      'browser': 'OFF'
    }
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  specs: ['./tests/**/*.ts'],
  baseUrl: 'http://localhost:8100',
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {

    require('ts-node').register({
      project: 'tests'
    });

    require('connect')().use(require('serve-static')('www')).listen(8100);

  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
  }
}