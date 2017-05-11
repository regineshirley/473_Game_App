"use strict";



define('trivia/adapters/application', ['exports', 'ember', 'emberfire/adapters/firebase'], function (exports, _ember, _emberfireAdaptersFirebase) {
  var inject = _ember['default'].inject;
  exports['default'] = _emberfireAdaptersFirebase['default'].extend({
    firebase: inject.service()
  });
});
define('trivia/app', ['exports', 'ember', 'trivia/resolver', 'ember-load-initializers', 'trivia/config/environment'], function (exports, _ember, _triviaResolver, _emberLoadInitializers, _triviaConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _triviaConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _triviaConfigEnvironment['default'].podModulePrefix,
    Resolver: _triviaResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _triviaConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('trivia/components/a-websocket', ['exports', 'ember'], function (exports, _ember) {

  // Tries to parse JSON
  function isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  exports['default'] = _ember['default'].Component.extend({
    /*
      1. First step you need to do is inject the websockets service into your object.
    */
    websockets: _ember['default'].inject.service(),
    socketRef: null,
    firebaseApp: _ember['default'].inject.service(),
    questions: [],
    answer: [],
    a: [],
    b: [],
    c: [],
    d: [],

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      /*
        2. The next step you need to do is to create your actual websocket. Calling socketFor
        will retrieve a cached websocket if one exists or in this case it
        will create a new one for us.
      */
      var socket = this.get('websockets').socketFor('ws://localhost:3001/');

      /*
        3. The next step is to define your event handlers. All event handlers
        are added via the `on` method and take 3 arguments: event name, callback
        function, and the context in which to invoke the callback. All 3 arguments
        are required.
      */
      socket.on('open', this.myOpenHandler, this);
      socket.on('message', this.myMessageHandler, this);
      socket.on('close', this.myCloseHandler, this);

      this.set('socketRef', socket);
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);

      var socket = this.get('socketRef');

      /*
        4. The final step is to remove all of the listeners you have setup.
      */
      socket.off('open', this.myOpenHandler);
      socket.off('message', this.myMessageHandler);
      socket.off('close', this.myCloseHandler);
    },

    myOpenHandler: function myOpenHandler(event) {
      console.log('On open event has been called: ' + event);
    },

    myMessageHandler: function myMessageHandler(event) {
      // Attempt to parse the string for JSON
      if (isJSON(event.data)) {
        var obj = JSON.parse(event.data);
        console.log(obj);

        // Starts change of card
        if (obj.action === 'new_card') {
          //this.actions.changeCard(obj.data); // changeCard is action in a-websocket
          //remove question in 'questions' array before new question loads
          this.get('questions').popObject();
          this.get('answer').popObject();
          this.get('a').popObject();
          this.get('b').popObject();
          this.get('c').popObject();
          this.get('d').popObject();
          this.grab(obj.data);

          console.log('Changing card to ' + obj.data);
        }
      } else {
        console.log('Message: ' + event.data); // Not JSON, so just print String
      }
    },

    grab: function grab(card_id) {
      var fire = this.get('firebaseApp');
      var database = fire.database();
      var question, a, b, c, d, answer;

      //query QUESTIONs from database
      question = database.ref('cards/' + card_id + '/question');
      question.on('value', function (snapshot) {
        question = snapshot.val();
        console.log('question is ' + snapshot.val());
      });
      //add question to 'questions' array
      this.get('questions').pushObject(question);

      //query ANSWER from database
      answer = database.ref('cards/' + card_id + '/answer');
      answer.on('value', function (snapshot) {
        answer = snapshot.val();
        console.log('answer is ' + snapshot.val());
      });
      //add question to 'answer' array
      this.get('answer').pushObject(answer);

      //query ANSWER A
      a = database.ref('cards/' + card_id + '/a');
      a.on('value', function (snapshot) {
        a = snapshot.val();
        console.log('answer a is ' + snapshot.val());
      });
      this.get('a').pushObject(a); //add answer a to array 'a'

      //query ANSWER B
      b = database.ref('cards/' + card_id + '/b');
      b.on('value', function (snapshot) {
        b = snapshot.val();
        console.log('answer b is ' + snapshot.val());
      });
      this.get('b').pushObject(b); //add answer b to array 'b'

      //query ANSWER C
      c = database.ref('cards/' + card_id + '/c');
      c.on('value', function (snapshot) {
        c = snapshot.val();
        console.log('answer c is ' + snapshot.val());
      });
      this.get('c').pushObject(c); //add answer c to array 'c'

      //query ANSWER D
      d = database.ref('cards/' + card_id + '/d');
      d.on('value', function (snapshot) {
        d = snapshot.val();
        console.log('answer d is ' + snapshot.val());
      });
      this.get('d').pushObject(d); //add answer c to array 'c'
    },

    myCloseHandler: function myCloseHandler(event) {
      console.log('On close event has been called: ' + event);
    },

    // Eric: This is the action that gets called when the button is pressed
    actions: {
      sendButtonPressed: function sendButtonPressed() {
        var socket = this.get('socketRef');
        var userAnswer = this.get('user-answer');
        var cardAnswer = this.get('card-answer');

        if (cardAnswer === userAnswer) {
          alert('Congratualtions, You got it Correct!');
        } else {
          alert('Sorry, That is Incorrect!');
        }

        var ses = this.get('session');

        //socket.send(`You answered: ${userAnswer}`);
        var obj = { user: this.email, answer: userAnswer };
        socket.send(JSON.stringify(obj));
      }
      // changeCard(card_id) {
      //   console.log('Changing card to ' + card_id);
      //   // TODO: Update view to new card id
      // }
    }
  });
});
define('trivia/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _emberFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('trivia/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _emberFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaList['default'];
    }
  });
});
define('trivia/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _emberFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFontAwesomeComponentsFaStack['default'];
    }
  });
});
define('trivia/components/radio-button', ['exports', 'ember-radio-buttons/components/radio-button'], function (exports, _emberRadioButtonsComponentsRadioButton) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRadioButtonsComponentsRadioButton['default'];
    }
  });
});
define('trivia/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiComponentsToriiIframePlaceholder) {
  exports['default'] = _toriiComponentsToriiIframePlaceholder['default'];
});
define('trivia/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('trivia/components/x-option', ['exports', 'emberx-select/components/x-option'], function (exports, _emberxSelectComponentsXOption) {
  exports['default'] = _emberxSelectComponentsXOption['default'];
});
define('trivia/components/x-select', ['exports', 'emberx-select/components/x-select'], function (exports, _emberxSelectComponentsXSelect) {
  exports['default'] = _emberxSelectComponentsXSelect['default'];
});
define('trivia/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    hideNav: _ember['default'].computed.equal('currentRouteName', 'login')
  });
});
define('trivia/controllers/cards', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      addCard: function addCard() {

        var question = this.get('question');
        var answer = this.get('answer');
        var a = this.get('a');
        var b = this.get('b');
        var c = this.get('c');
        var d = this.get('d');

        //create new card
        var newCard = this.store.createRecord('card', {
          question: question,
          answer: answer,
          a: a,
          b: b,
          c: c,
          d: d
        });

        // Save to DataBase (firebase.com)
        newCard.save();

        // Clear Form
        this.setProperties({
          question: '',
          answer: '',
          a: '',
          b: '',
          c: '',
          d: ''
        });
      }
    }
  });
});
define('trivia/controllers/players', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('trivia/controllers/players/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      addUser: function addUser() {
        var user = this.get('username');
        var firstName = this.get('fName');
        var lastName = this.get('lName');
        alert('Your last name is ' + lastName);

        //create new player
        var newPlayer = this.store.createRecord('player', {
          username: user,
          firstName: firstName,
          lastName: lastName
        });

        // Save to DataBase (firebase.com)
        newPlayer.save();

        // Clear Form
        this.setProperties({
          username: '',
          fName: '',
          lName: ''
        });
      }
    }
  });
});
define('trivia/controllers/room', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    count: 0,
    actions: {
      // Answer is now checked in the a-websocket component
      //
      // answerCheck: function(ans) {
      //   var answer = this.get('choice');
      //   if (answer === ans) {
      //     alert('Congratualtions, You got it Correct!');
      //     this.count += 1;
      //     console.log(this.count);
      //     this.send('reloadQuestion');
      //   } else {
      //     alert('Sorry, That is Incorrect!');
      //     this.send('reloadQuestion');
      //   }
      // },
      // reloadQuestion: function() {
      //   this.send('invalidateModel');
      // }

      //let trivCard = this.store.createRecord('card');
      // var question;
      // this.store.findRecord('card', id).then(function(item){
      //    alert(item.get('question'));
      // })
      //let question = trivCard.question;
      //alert(this.question);
      //}
    }
  });
});
define('trivia/helpers/app-version', ['exports', 'ember', 'trivia/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _triviaConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _triviaConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('trivia/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('trivia/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('trivia/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'trivia/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _triviaConfigEnvironment) {
  var _config$APP = _triviaConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('trivia/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('trivia/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('trivia/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _emberDataSetupContainer, _emberDataIndex) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('trivia/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfireInitializersEmberfire) {
  exports['default'] = _emberfireInitializersEmberfire['default'];
});
define('trivia/initializers/export-application-global', ['exports', 'ember', 'trivia/config/environment'], function (exports, _ember, _triviaConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_triviaConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _triviaConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_triviaConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('trivia/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, _toriiRedirectHandler) {
  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      application.deferReadiness();
      _toriiRedirectHandler['default'].handle(window)['catch'](function () {
        application.advanceReadiness();
      });
    }
  };
});
define('trivia/initializers/initialize-torii-session', ['exports', 'torii/bootstrap/session', 'torii/configuration'], function (exports, _toriiBootstrapSession, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      if (!configuration.sessionServiceName) {
        return;
      }

      (0, _toriiBootstrapSession['default'])(application, configuration.sessionServiceName);

      var sessionFactoryName = 'service:' + configuration.sessionServiceName;
      application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
    }
  };
});
define('trivia/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'trivia/config/environment'], function (exports, _toriiBootstrapTorii, _toriiConfiguration, _triviaConfigEnvironment) {

  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _toriiConfiguration.configure)(_triviaConfigEnvironment['default'].torii || {});
      (0, _toriiBootstrapTorii['default'])(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports['default'] = initializer;
});
define('trivia/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('trivia/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('trivia/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("trivia/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('trivia/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/router-dsl-ext'], function (exports, _toriiBootstrapRouting, _toriiConfiguration, _toriiRouterDslExt) {
  exports['default'] = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      var router = applicationInstance.get('router');
      var setupRoutes = function setupRoutes() {
        var authenticatedRoutes = router.router.authenticatedRoutes;
        var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
        if (hasAuthenticatedRoutes) {
          (0, _toriiBootstrapRouting['default'])(applicationInstance, authenticatedRoutes);
        }
        router.off('willTransition', setupRoutes);
      };
      router.on('willTransition', setupRoutes);
    }
  };
});
define('trivia/instance-initializers/walk-providers', ['exports', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _toriiLibContainerUtils, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-walk-providers',
    initialize: function initialize(applicationInstance) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in configuration.providers) {
        if (configuration.providers.hasOwnProperty(key)) {
          (0, _toriiLibContainerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
define('trivia/models/card', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    question: _emberData['default'].attr('string'),
    a: _emberData['default'].attr('string'),
    b: _emberData['default'].attr('string'),
    c: _emberData['default'].attr('string'),
    d: _emberData['default'].attr('string'),
    answer: _emberData['default'].attr('string'),
    // This attribute is computed from other attributes
    // Returns the text belonging to the letter saved in 'answer'
    reveal: _ember['default'].computed('answer', function () {
      return '' + this.get(this.get('answer'));
    })
  });
});
define('trivia/models/player', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    username: _emberData['default'].attr('string'),
    firstName: _emberData['default'].attr('string'),
    lastName: _emberData['default'].attr('string')
  });
});
define('trivia/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('trivia/router', ['exports', 'ember', 'trivia/config/environment'], function (exports, _ember, _triviaConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _triviaConfigEnvironment['default'].locationType,
    rootURL: _triviaConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('room');
    this.route('rooms', function () {
      this.route('new');
    });
    this.route('players', function () {
      this.route('new');
    });
    this.route('player', function () {});
    this.route('cards');
    this.route('login');
    this.route('welcomepage');
  });

  exports['default'] = Router;
});
define('trivia/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.get('session').fetch()['catch'](function () {});
    },
    actions: {
      signIn: function signIn(provider) {
        this.get('session').open('firebase', {
          provider: 'github',
          settings: {
            scope: 'user'
          }
        }).then(function (data) {
          console.log(data.currentUser);
        });
      },
      signOut: function signOut() {
        this.get('session').close();
        this.transitionTo('index');
      }
    }
  });
});
define('trivia/routes/cards', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('card');
    }
  });
});
define('trivia/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('trivia/routes/login', ['exports', 'ember', 'firebase'], function (exports, _ember, _firebase) {
  exports['default'] = _ember['default'].Route.extend({
    firebaseApp: _ember['default'].inject.service(),

    beforeModel: function beforeModel() {
      var ref = this.get('firebaseApp').auth();

      //if no user logged in, will redirect to login page.
      ref.onAuthStateChanged((function (user) {
        if (user) {
          this.transitionTo('room');
        }
      }).bind(this));
    },

    actions: {
      login: function login() {
        var controller = this.get('controller');
        var email = controller.get('email');
        var pass = controller.get('password');
        var ref = this.get('firebaseApp').auth();

        return ref.signInWithEmailAndPassword(email, pass)['catch'](function (error) {
          console.log('Sign In error', error);
        }).then((function () {
          ref.onAuthStateChanged(function (user) {
            console.log('user', user);
          });
        }).bind(this));
      },

      github: function github() {
        var ref = this.get('firebaseApp').auth();
        var provider = new _firebase['default'].auth.GithubAuthProvider();

        provider.addScope('profile');
        provider.addScope('user');

        return ref.signInWithPopup(provider).then((function (result) {
          var token = result.credential.accessToken;
          var user = result.user;

          this.transitionTo('room');
          ref.onAuthStateChanged(function (user) {
            console.log('user ', user);
          });
        }).bind(this))['catch'](function (error) {
          console.log(error.code);
        });
      }
    }

  });
});
define('trivia/routes/player', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('trivia/routes/player/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('trivia/routes/players', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('trivia/routes/players/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('player');
    }
  });
});
define('trivia/routes/players/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('trivia/routes/room', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    firebaseApp: _ember['default'].inject.service(),
    beforeModel: function beforeModel() {
      var ref = this.get('firebaseApp').auth();

      //if no user logged in, will redirect to login page.
      ref.onAuthStateChanged((function (user) {
        if (!user) {
          this.transitionTo('login');
        }
      }).bind(this));
    },

    model: function model(id) {
      //return this.store.findAll('card'); // this returns all the questions
      console.log('id is ' + id);
      var triviaCard = this.store.findAll('card').then(function (item) {

        // change the multiplicative number at the end to
        // the number of questions we have in database
        var randomIndex = Math.floor(Math.random() * 3);
        var newCard = item.objectAt(randomIndex);

        return [newCard];
      });

      return triviaCard;
    },
    actions: {
      invalidateModel: function invalidateModel() {
        this.refresh();
      }
    }
  });
});
define('trivia/routes/rooms', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('trivia/routes/rooms/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('trivia/routes/rooms/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('trivia/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('trivia/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _emberfireServicesFirebaseApp) {
  exports['default'] = _emberfireServicesFirebaseApp['default'];
});
define('trivia/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _emberfireServicesFirebase) {
  exports['default'] = _emberfireServicesFirebase['default'];
});
define('trivia/services/popup', ['exports', 'torii/services/popup'], function (exports, _toriiServicesPopup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesPopup['default'];
    }
  });
});
define('trivia/services/socket-io', ['exports', 'ember-websockets/services/socket-io'], function (exports, _emberWebsocketsServicesSocketIo) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWebsocketsServicesSocketIo['default'];
    }
  });
});
define('trivia/services/torii-session', ['exports', 'torii/services/session'], function (exports, _toriiServicesSession) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesSession['default'];
    }
  });
});
define('trivia/services/torii', ['exports', 'torii/services/torii'], function (exports, _toriiServicesTorii) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesTorii['default'];
    }
  });
});
define('trivia/services/websockets', ['exports', 'ember-websockets/services/websockets'], function (exports, _emberWebsocketsServicesWebsockets) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWebsocketsServicesWebsockets['default'];
    }
  });
});
define("trivia/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "drKv5yUx", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"hideNav\"]]],null,8],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default navbar-btn\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signIn\",\"github\"]],[\"flush-element\"],[\"text\",\"Sign in with \"],[\"append\",[\"helper\",[\"fa-icon\"],[\"github\"],null],false],[\"text\",\" GitHub\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"navbar-text\"],[\"flush-element\"],[\"text\",\"Logged in as \"],[\"append\",[\"unknown\",[\"session\",\"currentUser\",\"displayName\"]],false],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default navbar-btn\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign out\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Rooms\"]],\"locals\":[]},{\"statements\":[[\"text\",\"New player\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Cards\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Players\"]],\"locals\":[]},{\"statements\":[[\"text\",\"(Master) Room\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"navbar-brand\"],[\"flush-element\"],[\"text\",\"Trivia\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"header\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"comment\",\" Brand and toggle get grouped for better mobile display \"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"navbar-header\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"navbar-toggle collapsed\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#top-navbar-collapse\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"block\",[\"link-to\"],[\"index\"],null,7],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"comment\",\" Collect the nav links, forms, and other content for toggling \"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"top-navbar-collapse\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"block\",[\"link-to\"],[\"room\"],null,6],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"block\",[\"link-to\"],[\"players\"],null,5],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"dropdown-toggle\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"role\",\"button\"],[\"static-attr\",\"aria-haspopup\",\"true\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"text\",\"Dev Menu \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"caret\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"dropdown-menu\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown-header\"],[\"flush-element\"],[\"text\",\"Data\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"block\",[\"link-to\"],[\"cards\"],null,4],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"role\",\"separator\"],[\"static-attr\",\"class\",\"divider\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"dropdown-header\"],[\"flush-element\"],[\"text\",\"Unused Routes\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"block\",[\"link-to\"],[\"players.new\"],null,3],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"block\",[\"link-to\"],[\"rooms\"],null,2],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1,0],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"comment\",\" /.navbar-collapse \"],[\"text\",\"\\n    \"],[\"close-element\"],[\"comment\",\" /.container-fluid \"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/application.hbs" } });
});
define("trivia/templates/cards", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "MouLFDqe", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"ID\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Question\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Anwswer\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"A\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"B\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"C\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"D\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-heading\"],[\"flush-element\"],[\"text\",\"Add a Card\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"If you feel the need to add more, add from \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://pastebin.com/raw/QRGzxxEy\"],[\"flush-element\"],[\"text\",\"here\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Question\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"question\"]]]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Answer (lower-case letter: a b c d)\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"answer\"]]]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"A\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"a\"]]]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"B\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"b\"]]]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"C\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"c\"]]]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"D\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"d\"]]]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addCard\"]],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"card\",\"id\"]],false],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"card\",\"question\"]],false],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"card\",\"answer\"]],false],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"card\",\"a\"]],false],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"card\",\"b\"]],false],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"card\",\"c\"]],false],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"card\",\"d\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"card\"]}],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/cards.hbs" } });
});
define("trivia/templates/components/a-websocket", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YPV8BtsV", "block": "{\"statements\":[[\"comment\",\" Eric: This is the button for the a-websocket component \"],[\"text\",\"\\n\"],[\"comment\",\" I'm not sure if this is in the ideal location \"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"mainbox\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"triviaForm\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"questions\"]]],null,4],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-block btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"sendButtonPressed\"]],[\"flush-element\"],[\"text\",\"\\n        WebSocket Submit\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Your email: \"],[\"append\",[\"get\",[null,\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"radio\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"radio-button\"],null,[[\"value\",\"checked\"],[\"d\",[\"get\",[\"choice\"]]]]],false],[\"text\",\"\\n            \"],[\"append\",[\"get\",[\"answerD\"]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"answerD\"]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"radio\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"radio-button\"],null,[[\"value\",\"checked\"],[\"c\",[\"get\",[\"choice\"]]]]],false],[\"text\",\"\\n            \"],[\"append\",[\"get\",[\"answerC\"]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"answerC\"]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"radio\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"radio-button\"],null,[[\"value\",\"checked\"],[\"b\",[\"get\",[\"choice\"]]]]],false],[\"text\",\"\\n            \"],[\"append\",[\"get\",[\"answerB\"]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"answerB\"]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"radio\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"append\",[\"helper\",[\"radio-button\"],null,[[\"value\",\"checked\"],[\"a\",[\"get\",[\"choice\"]]]]],false],[\"text\",\"\\n            \"],[\"append\",[\"get\",[\"answerA\"]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"answerA\"]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"open-element\",\"b\",[]],[\"flush-element\"],[\"text\",\"Question:\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"get\",[\"question\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"a\"]]],null,3],[\"block\",[\"each\"],[[\"get\",[\"b\"]]],null,2],[\"block\",[\"each\"],[[\"get\",[\"c\"]]],null,1],[\"block\",[\"each\"],[[\"get\",[\"d\"]]],null,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"question\"]}],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/components/a-websocket.hbs" } });
});
define('trivia/templates/components/x-select', ['exports', 'emberx-select/templates/components/x-select'], function (exports, _emberxSelectTemplatesComponentsXSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberxSelectTemplatesComponentsXSelect['default'];
    }
  });
});
define("trivia/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "knKdMUet", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Welcome to Trivia\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,0],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  Thank you for signing up and logging in.\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/index.hbs" } });
});
define("trivia/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Alhzr0w6", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\"],[\"flush-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-heading\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Welcome\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel-body\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\",\"required\"],[\"email\",\"form-control\",[\"get\",[\"email\"]],\"me@example.com\",true]]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\",\"required\"],[\"password\",\"form-control\",[\"get\",[\"password\"]],\"Password\",true]]],false],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-success\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"login\"]],[\"flush-element\"],[\"text\",\"Log In\"],[\"close-element\"],[\"text\",\"\\n\\n          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"github\"]],[\"flush-element\"],[\"text\",\"Login with Github\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"comment\",\"  <button class=\\\"btn btn-danger\\\" {{action 'logout'}}>Log Out</button> \"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-danger\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"logout\"]],[\"flush-element\"],[\"text\",\"Log Out\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/login.hbs" } });
});
define("trivia/templates/player", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "VNFMBXDQ", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/player.hbs" } });
});
define("trivia/templates/player/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lDzzy5q5", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/player/index.hbs" } });
});
define("trivia/templates/players", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "0iJ/3zD9", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/players.hbs" } });
});
define("trivia/templates/players/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Lx5LGxY5", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Players\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"well\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"ID: \"],[\"append\",[\"unknown\",[\"player\",\"id\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Username: \"],[\"append\",[\"unknown\",[\"player\",\"username\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"First Name: \"],[\"append\",[\"unknown\",[\"player\",\"firstName\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Last Name: \"],[\"append\",[\"unknown\",[\"player\",\"lastName\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h5\",[]],[\"flush-element\"],[\"text\",\"Score: \"],[\"append\",[\"unknown\",[\"player\",\"score\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"player\"]}],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/players/index.hbs" } });
});
define("trivia/templates/players/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "a+RVSp2r", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Register now to play!\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Username\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"text\",\"form-control\",[\"get\",[\"username\"]],\"Enter your username\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"First Name\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"text\",\"form-control\",[\"get\",[\"fName\"]],\"Enter your first name\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Last Name\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\",\"placeholder\"],[\"text\",\"form-control\",[\"get\",[\"lName\"]],\"Enter your last name\"]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addUser\"]],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/players/new.hbs" } });
});
define("trivia/templates/room", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "zy3c5yzD", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Welcome to the Triva Room!\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"comment\",\" <div class = \\\"mainbox\\\">\\n<form class=\\\"triviaForm\\\">\\n  <div class=\\\"row\\\">\\n{{#each model as |card|}}\\n      <h4><b>Question:</b> {{card.question}}</h4>\\n      <ul>\\n        <div class=\\\"radio\\\">\\n          <label>\\n            <input type=\\\"radio\\\" name=\\\"choice\\\" value=\\\"a\\\">{{card.a}}\\n            {{radio-button value='a' checked=choice}}\\n            {{card.a}}\\n          </label>\\n        </div>\\n        <div class=\\\"radio\\\">\\n          <label>\\n            {{radio-button value='b' checked=choice}}\\n            {{card.b}}\\n          </label>\\n        </div>\\n        <div class=\\\"radio\\\">\\n          <label>\\n            {{radio-button value='c' checked=choice}}\\n            {{card.c}}\\n          </label>\\n        </div>\\n        <div class=\\\"radio\\\">\\n          <label>\\n            {{radio-button value='d' checked=choice}}\\n            {{card.d}}\\n          </label>\\n        </div>\\n      </ul>\\n    <button {{action 'answerCheck' card.answer}} class=\\\"btn btn-primary\\\">Submit</button>\\n    {{a-websocket card-answer=card.answer user-answer=choice email=session.currentUser.email}}\\n    {{/each}}\\n  </div>\\n</form>\\n</div> \"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"a-websocket\"],null,[[\"card-answer\",\"user-answer\",\"email\"],[[\"get\",[\"answer\"]],[\"get\",[\"choice\"]],[\"get\",[\"session\",\"currentUser\",\"email\"]]]]],false],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/room.hbs" } });
});
define("trivia/templates/rooms", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "u1Hv7jiy", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Rooms\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/rooms.hbs" } });
});
define("trivia/templates/rooms/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5an8eNRg", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"panel panel-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Room Number\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Status\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"comment\",\" START: Generate list with Handlebars \"],[\"text\",\"\\n      \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"Dummy Cell\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"In Progress\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"comment\",\" END: Generate list with Handlebars \"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/rooms/index.hbs" } });
});
define("trivia/templates/rooms/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3pKU+6X7", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "trivia/templates/rooms/new.hbs" } });
});
define('trivia/torii-adapters/application', ['exports', 'emberfire/torii-adapters/firebase'], function (exports, _emberfireToriiAdaptersFirebase) {
  exports['default'] = _emberfireToriiAdaptersFirebase['default'].extend({});
});
define('trivia/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _emberfireToriiProvidersFirebase) {
  exports['default'] = _emberfireToriiProvidersFirebase['default'];
});


define('trivia/config/environment', ['ember'], function(Ember) {
  var prefix = 'trivia';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("trivia/app")["default"].create({"name":"trivia","version":"0.0.0+5322a472"});
}
//# sourceMappingURL=trivia.map
