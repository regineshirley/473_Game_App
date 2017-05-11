'use strict';

define('trivia/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/a-websocket.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/a-websocket.js should pass ESLint\n\n64:5 - Unexpected console statement. (no-console)\n71:7 - Unexpected console statement. (no-console)\n85:9 - Unexpected console statement. (no-console)\n88:7 - Unexpected console statement. (no-console)\n101:7 - Unexpected console statement. (no-console)\n110:7 - Unexpected console statement. (no-console)\n119:7 - Unexpected console statement. (no-console)\n127:7 - Unexpected console statement. (no-console)\n135:7 - Unexpected console statement. (no-console)\n143:7 - Unexpected console statement. (no-console)\n149:5 - Unexpected console statement. (no-console)\n165:11 - \'ses\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/cards.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/cards.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/players.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/players.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/players/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/players/new.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/room.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/room.js should pass ESLint\n\n');
  });

  QUnit.test('models/card.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/card.js should pass ESLint\n\n');
  });

  QUnit.test('models/player.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/player.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/application.js should pass ESLint\n\n8:22 - \'provider\' is defined but never used. (no-unused-vars)\n15:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/cards.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/cards.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/login.js should pass ESLint\n\n28:9 - Unexpected console statement. (no-console)\n31:11 - Unexpected console statement. (no-console)\n44:13 - \'token\' is assigned a value but never used. (no-unused-vars)\n45:13 - \'user\' is assigned a value but never used. (no-unused-vars)\n49:9 - Unexpected console statement. (no-console)\n51:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/player.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/player.js should pass ESLint\n\n');
  });

  QUnit.test('routes/player/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/player/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/players.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/players.js should pass ESLint\n\n');
  });

  QUnit.test('routes/players/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/players/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/players/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/players/new.js should pass ESLint\n\n');
  });

  QUnit.test('routes/room.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/room.js should pass ESLint\n\n22:5 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/rooms.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rooms.js should pass ESLint\n\n');
  });

  QUnit.test('routes/rooms/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rooms/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/rooms/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rooms/new.js should pass ESLint\n\n');
  });

  QUnit.test('torii-adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'torii-adapters/application.js should pass ESLint\n\n');
  });
});
define('trivia/tests/helpers/create-offline-ref', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = createOfflineRef;

  /**
   * Creates an offline firebase reference with optional initial data and url.
   *
   * Be sure to `stubfirebase()` and `unstubfirebase()` in your tests!
   *
   * @param  {!Object} [initialData]
   * @param  {string} [url]
   * @param  {string} [apiKey]
   * @return {!firebase.database.Reference}
   */

  function createOfflineRef(initialData) {
    var url = arguments.length <= 1 || arguments[1] === undefined ? 'https://emberfire-tests-2c814.firebaseio.com' : arguments[1];
    var apiKey = arguments.length <= 2 || arguments[2] === undefined ? 'AIzaSyC9-ndBb1WR05rRF1msVQDV6EBqB752m6o' : arguments[2];

    if (!_firebase['default']._unStub) {
      throw new Error('Please use stubFirebase() before calling this method');
    }

    var config = {
      apiKey: apiKey,
      authDomain: 'emberfire-tests-2c814.firebaseapp.com',
      databaseURL: url,
      storageBucket: ''
    };

    var app = undefined;

    try {
      app = _firebase['default'].app();
    } catch (e) {
      app = _firebase['default'].initializeApp(config);
    }

    var ref = app.database().ref();

    app.database().goOffline(); // must be called after the ref is created

    if (initialData) {
      ref.set(initialData);
    }

    return ref;
  }
});
define('trivia/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
    if (window.server) {
      window.server.shutdown();
    }
  }
});
define('trivia/tests/helpers/destroy-firebase-apps', ['exports', 'ember', 'firebase'], function (exports, _ember, _firebase) {
  exports['default'] = destroyFirebaseApps;
  var run = _ember['default'].run;

  /**
   * Destroy all Firebase apps.
   */

  function destroyFirebaseApps() {
    var deletions = _firebase['default'].apps.map(function (app) {
      return app['delete']();
    });
    _ember['default'].RSVP.all(deletions).then(function () {
      return run(function () {
        // NOOP to delay run loop until the apps are destroyed
      });
    });
  }
});
define('trivia/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'trivia/tests/helpers/start-app', 'trivia/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _triviaTestsHelpersStartApp, _triviaTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _triviaTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _triviaTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('trivia/tests/helpers/replace-app-ref', ['exports'], function (exports) {
  exports['default'] = replaceAppRef;
  /**
   * Updates the supplied app adapter's Firebase reference.
   *
   * @param  {!Ember.Application} app
   * @param  {!firebase.database.Reference} ref
   * @param  {string} [model]  The model, if overriding a model specific adapter
   */

  function replaceAppRef(app, ref) {
    var model = arguments.length <= 2 || arguments[2] === undefined ? 'application' : arguments[2];

    app.register('service:firebaseMock', ref, { instantiate: false, singleton: true });
    app.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
    app.inject('adapter:' + model, 'firebase', 'service:firebaseMock');
  }
});
define('trivia/tests/helpers/replace-firebase-app-service', ['exports'], function (exports) {
  exports['default'] = replaceFirebaseAppService;
  /**
   * Replaces the `firebaseApp` service with your own using injection overrides.
   *
   * This is usually not needed in test modules, where you can re-register over
   * existing names in the registry, but in acceptance tests, some registry/inject
   * magic is needed.
   *
   * @param  {!Ember.Application} app
   * @param  {!Object} newService
   */

  function replaceFirebaseAppService(app, newService) {
    app.register('service:firebaseAppMock', newService, { instantiate: false, singleton: true });
    app.inject('torii-provider:firebase', 'firebaseApp', 'service:firebaseAppMock');
    app.inject('torii-adapter:firebase', 'firebaseApp', 'service:firebaseAppMock');
  }
});
define('trivia/tests/helpers/resolver', ['exports', 'trivia/resolver', 'trivia/config/environment'], function (exports, _triviaResolver, _triviaConfigEnvironment) {

  var resolver = _triviaResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _triviaConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _triviaConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('trivia/tests/helpers/start-app', ['exports', 'ember', 'trivia/app', 'trivia/config/environment'], function (exports, _ember, _triviaApp, _triviaConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var attributes = _ember['default'].merge({}, _triviaConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    return _ember['default'].run(function () {
      var application = _triviaApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('trivia/tests/helpers/stub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = stubFirebase;

  /**
   * When a reference is in offline mode it will not call any callbacks
   * until it goes online and resyncs. The ref will have already
   * updated its internal cache with the changed values so we shortcut
   * the process and call the supplied callbacks immediately (asynchronously).
   */

  function stubFirebase() {
    // check for existing stubbing
    if (!_firebase['default']._unStub) {
      var originalSet = _firebase['default'].database.Reference.prototype.set;
      var originalUpdate = _firebase['default'].database.Reference.prototype.update;
      var originalRemove = _firebase['default'].database.Reference.prototype.remove;

      _firebase['default']._unStub = function () {
        _firebase['default'].database.Reference.prototype.set = originalSet;
        _firebase['default'].database.Reference.prototype.update = originalUpdate;
        _firebase['default'].database.Reference.prototype.remove = originalRemove;
      };

      _firebase['default'].database.Reference.prototype.set = function (data, cb) {
        originalSet.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase['default'].database.Reference.prototype.update = function (data, cb) {
        originalUpdate.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase['default'].database.Reference.prototype.remove = function (cb) {
        originalRemove.call(this);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };
    }
  }
});
define('trivia/tests/helpers/torii', ['exports'], function (exports) {
  exports.stubValidSession = stubValidSession;

  function stubValidSession(application, sessionData) {
    var session = application.__container__.lookup('service:session');
    var sm = session.get('stateMachine');
    Ember.run(function () {
      sm.send('startOpen');
      sm.send('finishOpen', sessionData);
    });
  }
});
define('trivia/tests/helpers/unstub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = unstubFirebase;

  function unstubFirebase() {
    if (typeof _firebase['default']._unStub === 'function') {
      _firebase['default']._unStub();
      delete _firebase['default']._unStub;
    }
  }
});
define('trivia/tests/helpers/x-select', ['exports', 'ember', 'jquery'], function (exports, _ember, _jquery) {
  exports.select = select;

  /**
   * Picks an option from the select and sets it to be `selected` in the DOM.
   *
   * @method select
   * @param {string|<jQuery>} selector - selector for the select to pick from.
   * @param {string} texts - text of the option you are picking
   */

  function select(selector) {
    for (var _len = arguments.length, texts = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      texts[_key - 1] = arguments[_key];
    }

    var $select = selector instanceof _jquery['default'] ? selector : _ember['default'].$(selector);
    var $options = $select.find('option');

    if (!$options.length) {
      throw 'No options found in ' + selector;
    }

    $options.each(function () {
      var _this = this;

      var $option = _ember['default'].$(this);

      _ember['default'].run(function () {
        _this.selected = texts.some(function (text) {
          // uppercase both texts so the helper isn't case sensastive.
          var optionText = $option.text().trim().toUpperCase();

          return optionText === text.toUpperCase();
        });

        if (_this.selected) {
          $option.prop('selected', true).trigger('change');
        }
      });
    });
  }
});
define('trivia/tests/integration/components/a-websocket-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('a-websocket', 'Integration | Component | a websocket', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'XqJzpTSl',
      'block': '{"statements":[["append",["unknown",["a-websocket"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'CYw6K1MN',
      'block': '{"statements":[["text","\\n"],["block",["a-websocket"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('trivia/tests/test-helper', ['exports', 'trivia/tests/helpers/resolver', 'ember-qunit'], function (exports, _triviaTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_triviaTestsHelpersResolver['default']);
});
define('trivia/tests/tests.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/a-websocket-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/a-websocket-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/cards-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/cards-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/players-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/players-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/players/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/players/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/room-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/room-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/card-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/card-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/player-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/player-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/cards-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/cards-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/player-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/player-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/player/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/player/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/players-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/players-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/players/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/players/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/players/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/players/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/room-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/room-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/rooms-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rooms-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/rooms/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rooms/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/rooms/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rooms/new-test.js should pass ESLint\n\n');
  });
});
define('trivia/tests/unit/controllers/cards-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:cards', 'Unit | Controller | cards', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('trivia/tests/unit/controllers/players-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:players', 'Unit | Controller | players', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('trivia/tests/unit/controllers/players/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:players/new', 'Unit | Controller | players/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('trivia/tests/unit/controllers/room-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:room', 'Unit | Controller | room', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('trivia/tests/unit/models/card-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('card', 'Unit | Model | card', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('trivia/tests/unit/models/player-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('player', 'Unit | Model | player', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('trivia/tests/unit/routes/cards-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:cards', 'Unit | Route | cards', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/player-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:player', 'Unit | Route | player', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/player/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:player/index', 'Unit | Route | player/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/players-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:players', 'Unit | Route | players', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/players/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:players/index', 'Unit | Route | players/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/players/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:players/new', 'Unit | Route | players/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/room-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:room', 'Unit | Route | room', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/rooms-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:rooms', 'Unit | Route | rooms', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/rooms/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:rooms/index', 'Unit | Route | rooms/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('trivia/tests/unit/routes/rooms/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:rooms/new', 'Unit | Route | rooms/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
require('trivia/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
