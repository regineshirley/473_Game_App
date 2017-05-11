/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'trivia',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    // Eric: Firebase Integration
    // For development, replace the values below with your own
    // Do not add this file to commit since it has your API key!
    firebase: {
      apiKey: 'AIzaSyC1f1JP8qFiNGJyy8Og_cd9VsLTP2bjVCs',
      authDomain: 'trivia-66f08.firebaseapp.com',
      databaseURL: 'https://trivia-66f08.firebaseio.com/',
      storageBucket: 'trivia-66f08.appspot.com',
    },

    // Eric: Sessions
    torii: {
      sessionServiceName: 'session'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
