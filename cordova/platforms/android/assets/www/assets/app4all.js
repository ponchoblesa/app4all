"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('app4all/adapters/application', ['exports', 'ember-data', 'app4all/config/environment'], function (exports, DS, config) {

  'use strict';

  exports['default'] = DS['default'].ActiveModelAdapter.extend({
    host: config['default'].apiUrl
  });

});
define('app4all/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'app4all/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('app4all/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'app4all/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('app4all/components/application-area', ['exports', 'ember', 'app4all/mixins/validation-handler'], function (exports, Ember, ValidationHandler) {

  'use strict';

  /**
  * A component used to wrap the application and handle all the global events
  *
  * Uses as a normal application controller
  *
  * @class ApplicationArea
  * @extends ValidationHandler
  */
  exports['default'] = Ember['default'].Component.extend(ValidationHandler['default'], {

    /**
    * To collapse or expand the navigation links on small screens
    * @property navigationDisplayed
    * @type {Boolean}
    */
    navigationDisplayed: false,

    actions: {
      collapseNavigation: function collapseNavigation() {
        this.set('navigationDisplayed', false);
      }
    }
  });

});
define('app4all/components/async-button', ['exports', 'ember-cli-html5-validation/components/async-button'], function (exports, AsyncButton) {

	'use strict';

	exports['default'] = AsyncButton['default'];

});
define('app4all/components/cdv-nav-bar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'header'
  });

});
define('app4all/components/custom-form', ['exports', 'ember', 'app4all/mixins/validation-listener'], function (exports, Ember, ValidationListener) {

  'use strict';

  /**
  * A customize form component to handle form actions like "submit" at this level
  *
  * @class CustomForm
  * @extends ValidationListener
  */
  exports['default'] = Ember['default'].Component.extend(ValidationListener['default'], {

    /**
    * @property tagName
    * @type {String}
    */
    tagName: 'form',

    /**
    * @property attributeBindings
    * @type {Array}
    */
    attributeBindings: ['novalidate', 'action'],

    /**
    * Bind empty "action" attribute as a web accessibility attribute
    *
    * @property action
    * @type {String}
    */
    action: "",

    /**
     * Prevent the built-in browser navigation error messages to pop up
     *
     * @property novalidate
     * @type {String}
     */
    novalidate: 'novalidate',

    /**
    * The action trigger in parent controller on submit
    *
    * @property controllerAction
    * @type {String}
    * @default submitForm
    */
    controllerAction: 'submitForm',

    /**
    * Send the controllerAction bound to the submit event if the form is valid
    *
    * @method submit
    * @returns {Boolean} True on valid and action triggered
    */
    submit: function submit() {
      if (event) {
        event.preventDefault();
      }

      if (this.isFormReadyToSubmit()) {
        this.sendAction('controllerAction');
        return true;
      } else {
        this.goToFirstError();
        this.displayAlert();
      }

      return false;
    },

    /**
    * @method isFormReadyToSubmit
    * @returns {Boolean} True when all fields were validated and valid
    * @private
    */
    isFormReadyToSubmit: function isFormReadyToSubmit() {
      /*
          if (!this.get('hasElementWithError')) {
            if (this.get('wereAllElementsValidated')) {
              return true;
            } else {
              return this.validateNonValidatedElements();
            }
          }
      
          */
      return this.validateAllElements();
    },

    /**
    * @method goToFirstError
    * @private
    */
    goToFirstError: function goToFirstError() {
      var firstError = this.get('errors')[0];

      Ember['default'].$('html, body').animate({
        scrollTop: Ember['default'].$(firstError.element).offset().top - 40
      }, 200);
      firstError.element.focus();
    },

    displayAlert: function displayAlert() {
      var errors = this.get('errors'),
          stringAlert = '';

      if (this.mobileChecker.get('isMobile')) {

        errors.forEach(function (item) {
          stringAlert += item.prefix + ': ' + item.message + '\n';
        });
        alert(stringAlert);
      }
    }

  });

});
define('app4all/components/lf-outlet', ['exports', 'liquid-fire/ember-internals'], function (exports, ember_internals) {

	'use strict';

	exports['default'] = ember_internals.StaticOutlet;

});
define('app4all/components/lf-overlay', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var COUNTER = '__lf-modal-open-counter';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'span',
    classNames: ['lf-overlay'],

    didInsertElement: function didInsertElement() {
      var body = Ember['default'].$('body');
      var counter = body.data(COUNTER) || 0;
      body.addClass('lf-modal-open');
      body.data(COUNTER, counter + 1);
    },

    willDestroy: function willDestroy() {
      var body = Ember['default'].$('body');
      var counter = body.data(COUNTER) || 0;
      body.data(COUNTER, counter - 1);
      if (counter < 2) {
        body.removeClass('lf-modal-open');
      }
    }
  });

});
define('app4all/components/liquid-bind', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var LiquidBind = Ember['default'].Component.extend({
    tagName: '',
    positionalParams: ['value'] // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
  });

  LiquidBind.reopenClass({
    positionalParams: ['value']
  });

  exports['default'] = LiquidBind;

});
define('app4all/components/liquid-child', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['liquid-child'],

    didInsertElement: function didInsertElement() {
      var $container = this.$();
      if ($container) {
        $container.css('visibility', 'hidden');
      }
      this.sendAction('liquidChildDidRender', this);
    }

  });

});
define('app4all/components/liquid-container', ['exports', 'ember', 'liquid-fire/growable', 'app4all/components/liquid-measured'], function (exports, Ember, Growable, liquid_measured) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend(Growable['default'], {
    classNames: ['liquid-container'],

    lockSize: function lockSize(elt, want) {
      elt.outerWidth(want.width);
      elt.outerHeight(want.height);
    },

    unlockSize: function unlockSize() {
      var _this = this;

      var doUnlock = function doUnlock() {
        _this.updateAnimatingClass(false);
        var elt = _this.$();
        if (elt) {
          elt.css({ width: '', height: '' });
        }
      };
      if (this._scaling) {
        this._scaling.then(doUnlock);
      } else {
        doUnlock();
      }
    },

    // We're doing this manually instead of via classNameBindings
    // because it depends on upward-data-flow, which generates warnings
    // under Glimmer.
    updateAnimatingClass: function updateAnimatingClass(on) {
      if (this.isDestroyed || !this._wasInserted) {
        return;
      }
      if (arguments.length === 0) {
        on = this.get('liquidAnimating');
      } else {
        this.set('liquidAnimating', on);
      }
      if (on) {
        this.$().addClass('liquid-animating');
      } else {
        this.$().removeClass('liquid-animating');
      }
    },

    startMonitoringSize: Ember['default'].on('didInsertElement', function () {
      this._wasInserted = true;
      this.updateAnimatingClass();
    }),

    actions: {

      willTransition: function willTransition(versions) {
        if (!this._wasInserted) {
          return;
        }

        // Remember our own size before anything changes
        var elt = this.$();
        this._cachedSize = liquid_measured.measure(elt);

        // And make any children absolutely positioned with fixed sizes.
        for (var i = 0; i < versions.length; i++) {
          goAbsolute(versions[i]);
        }

        // Apply '.liquid-animating' to liquid-container allowing
        // any customizable CSS control while an animating is occuring
        this.updateAnimatingClass(true);
      },

      afterChildInsertion: function afterChildInsertion(versions) {
        var elt = this.$();
        var enableGrowth = this.get('enableGrowth') !== false;

        // Measure  children
        var sizes = [];
        for (var i = 0; i < versions.length; i++) {
          if (versions[i].view) {
            sizes[i] = liquid_measured.measure(versions[i].view.$());
          }
        }

        // Measure ourself again to see how big the new children make
        // us.
        var want = liquid_measured.measure(elt);
        var have = this._cachedSize || want;

        // Make ourself absolute
        if (enableGrowth) {
          this.lockSize(elt, have);
        } else {
          this.lockSize(elt, {
            height: Math.max(want.height, have.height),
            width: Math.max(want.width, have.width)
          });
        }

        // Make the children absolute and fixed size.
        for (i = 0; i < versions.length; i++) {
          goAbsolute(versions[i], sizes[i]);
        }

        // Kick off our growth animation
        if (enableGrowth) {
          this._scaling = this.animateGrowth(elt, have, want);
        }
      },

      afterTransition: function afterTransition(versions) {
        for (var i = 0; i < versions.length; i++) {
          goStatic(versions[i]);
        }
        this.unlockSize();
      }
    }
  });

  function goAbsolute(version, size) {
    if (!version.view) {
      return;
    }
    var elt = version.view.$();
    var pos = elt.position();
    if (!size) {
      size = liquid_measured.measure(elt);
    }
    elt.outerWidth(size.width);
    elt.outerHeight(size.height);
    elt.css({
      position: 'absolute',
      top: pos.top,
      left: pos.left
    });
  }

  function goStatic(version) {
    if (version.view && !version.view.isDestroyed) {
      version.view.$().css({ width: '', height: '', position: '' });
    }
  }

});
define('app4all/components/liquid-if', ['exports', 'ember', 'liquid-fire/ember-internals'], function (exports, Ember, ember_internals) {

  'use strict';

  var LiquidIf = Ember['default'].Component.extend({
    positionalParams: ['predicate'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
    tagName: '',
    helperName: 'liquid-if',
    didReceiveAttrs: function didReceiveAttrs() {
      this._super();
      var predicate = ember_internals.shouldDisplay(this.getAttr('predicate'));
      this.set('showFirstBlock', this.inverted ? !predicate : predicate);
    }
  });

  LiquidIf.reopenClass({
    positionalParams: ['predicate']
  });

  exports['default'] = LiquidIf;

});
define('app4all/components/liquid-measured', ['exports', 'liquid-fire/components/liquid-measured'], function (exports, liquid_measured) {

	'use strict';



	exports['default'] = liquid_measured['default'];
	exports.measure = liquid_measured.measure;

});
define('app4all/components/liquid-modal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['liquid-modal'],
    currentContext: Ember['default'].computed('owner.modalContexts.lastObject', function () {
      var context = this.get('owner.modalContexts.lastObject');
      if (context) {
        context.view = this.innerView(context);
      }
      return context;
    }),

    owner: Ember['default'].inject.service('liquid-fire-modals'),

    innerView: function innerView(current) {
      var self = this,
          name = current.get('name'),
          container = this.get('container'),
          component = container.lookup('component-lookup:main').lookupFactory(name);
      Ember['default'].assert("Tried to render a modal using component '" + name + "', but couldn't find it.", !!component);

      var args = Ember['default'].copy(current.get('params'));

      args.registerMyself = Ember['default'].on('init', function () {
        self.set('innerViewInstance', this);
      });

      // set source so we can bind other params to it
      args._source = Ember['default'].computed(function () {
        return current.get("source");
      });

      var otherParams = current.get("options.otherParams");
      var from, to;
      for (from in otherParams) {
        to = otherParams[from];
        args[to] = Ember['default'].computed.alias("_source." + from);
      }

      var actions = current.get("options.actions") || {};

      // Override sendAction in the modal component so we can intercept and
      // dynamically dispatch to the controller as expected
      args.sendAction = function (name) {
        var actionName = actions[name];
        if (!actionName) {
          this._super.apply(this, Array.prototype.slice.call(arguments));
          return;
        }

        var controller = current.get("source");
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift(actionName);
        controller.send.apply(controller, args);
      };

      return component.extend(args);
    },

    actions: {
      outsideClick: function outsideClick() {
        if (this.get('currentContext.options.dismissWithOutsideClick')) {
          this.send('dismiss');
        } else {
          proxyToInnerInstance(this, 'outsideClick');
        }
      },
      escape: function escape() {
        if (this.get('currentContext.options.dismissWithEscape')) {
          this.send('dismiss');
        } else {
          proxyToInnerInstance(this, 'escape');
        }
      },
      dismiss: function dismiss() {
        var source = this.get('currentContext.source'),
            proto = source.constructor.proto(),
            params = this.get('currentContext.options.withParams'),
            clearThem = {};

        for (var key in params) {
          if (proto[key] instanceof Ember['default'].ComputedProperty) {
            clearThem[key] = undefined;
          } else {
            clearThem[key] = proto[key];
          }
        }
        source.setProperties(clearThem);
      }
    }
  });

  function proxyToInnerInstance(self, message) {
    var vi = self.get('innerViewInstance');
    if (vi) {
      vi.send(message);
    }
  }

});
define('app4all/components/liquid-outlet', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var LiquidOutlet = Ember['default'].Component.extend({
    positionalParams: ['inputOutletName'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
    tagName: '',
    didReceiveAttrs: function didReceiveAttrs() {
      this._super();
      this.set('outletName', this.attrs.inputOutletName || 'main');
    }
  });

  LiquidOutlet.reopenClass({
    positionalParams: ['inputOutletName']
  });

  exports['default'] = LiquidOutlet;

});
define('app4all/components/liquid-spacer', ['exports', 'liquid-fire/components/liquid-spacer'], function (exports, liquid_spacer) {

	'use strict';



	exports['default'] = liquid_spacer['default'];

});
define('app4all/components/liquid-unless', ['exports', 'app4all/components/liquid-if'], function (exports, LiquidIf) {

  'use strict';

  exports['default'] = LiquidIf['default'].extend({
    helperName: 'liquid-unless',
    layoutName: 'components/liquid-if',
    inverted: true
  });

});
define('app4all/components/liquid-versions', ['exports', 'ember', 'liquid-fire/ember-internals'], function (exports, Ember, ember_internals) {

  'use strict';

  var get = Ember['default'].get;
  var set = Ember['default'].set;

  exports['default'] = Ember['default'].Component.extend({
    tagName: "",
    name: 'liquid-versions',

    transitionMap: Ember['default'].inject.service('liquid-fire-transitions'),

    didReceiveAttrs: function didReceiveAttrs() {
      this._super();
      if (!this.versions || this._lastVersion !== this.getAttr('value')) {
        this.appendVersion();
        this._lastVersion = this.getAttr('value');
      }
    },

    appendVersion: function appendVersion() {
      var versions = this.versions;
      var firstTime = false;
      var newValue = this.getAttr('value');
      var oldValue;

      if (!versions) {
        firstTime = true;
        versions = Ember['default'].A();
      } else {
        oldValue = versions[0];
      }

      // TODO: may need to extend the comparison to do the same kind of
      // key-based diffing that htmlbars is doing.
      if (!firstTime && (!oldValue && !newValue || oldValue === newValue)) {
        return;
      }

      this.notifyContainer('willTransition', versions);
      var newVersion = {
        value: newValue,
        shouldRender: newValue || get(this, 'renderWhenFalse')
      };
      versions.unshiftObject(newVersion);

      this.firstTime = firstTime;
      if (firstTime) {
        set(this, 'versions', versions);
      }

      if (!newVersion.shouldRender && !firstTime) {
        this._transition();
      }
    },

    _transition: function _transition() {
      var _this = this;

      var versions = get(this, 'versions');
      var transition;
      var firstTime = this.firstTime;
      this.firstTime = false;

      this.notifyContainer('afterChildInsertion', versions);

      transition = get(this, 'transitionMap').transitionFor({
        versions: versions,
        parentElement: Ember['default'].$(ember_internals.containingElement(this)),
        use: get(this, 'use'),
        // Using strings instead of booleans here is an
        // optimization. The constraint system can match them more
        // efficiently, since it treats boolean constraints as generic
        // "match anything truthy/falsy" predicates, whereas string
        // checks are a direct object property lookup.
        firstTime: firstTime ? 'yes' : 'no',
        helperName: get(this, 'name'),
        outletName: get(this, 'outletName')
      });

      if (this._runningTransition) {
        this._runningTransition.interrupt();
      }
      this._runningTransition = transition;

      transition.run().then(function (wasInterrupted) {
        // if we were interrupted, we don't handle the cleanup because
        // another transition has already taken over.
        if (!wasInterrupted) {
          _this.finalizeVersions(versions);
          _this.notifyContainer("afterTransition", versions);
        }
      }, function (err) {
        _this.finalizeVersions(versions);
        _this.notifyContainer("afterTransition", versions);
        throw err;
      });
    },

    finalizeVersions: function finalizeVersions(versions) {
      versions.replace(1, versions.length - 1);
    },

    notifyContainer: function notifyContainer(method, versions) {
      var target = get(this, 'notify');
      if (target) {
        target.send(method, versions);
      }
    },

    actions: {
      childDidRender: function childDidRender(child) {
        var version = get(child, 'version');
        set(version, 'view', child);
        this._transition();
      }
    }

  });

});
define('app4all/components/liquid-with', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var LiquidWith = Ember['default'].Component.extend({
    name: 'liquid-with',
    positionalParams: ['value'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
    tagName: '',
    iAmDeprecated: Ember['default'].on('init', function () {
      Ember['default'].deprecate("liquid-with is deprecated, use liquid-bind instead -- it accepts a block now.");
    })
  });

  LiquidWith.reopenClass({
    positionalParams: ['value']
  });

  exports['default'] = LiquidWith;

});
define('app4all/components/lm-container', ['exports', 'ember', 'liquid-fire/tabbable'], function (exports, Ember) {

  'use strict';

  /*
     Parts of this file were adapted from ic-modal

     https://github.com/instructure/ic-modal
     Released under The MIT License (MIT)
     Copyright (c) 2014 Instructure, Inc.
  */

  var lastOpenedModal = null;
  Ember['default'].$(document).on('focusin', handleTabIntoBrowser);

  function handleTabIntoBrowser() {
    if (lastOpenedModal) {
      lastOpenedModal.focus();
    }
  }

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['lm-container'],
    attributeBindings: ['tabindex'],
    tabindex: 0,

    keyUp: function keyUp(event) {
      // Escape key
      if (event.keyCode === 27) {
        this.sendAction();
      }
    },

    keyDown: function keyDown(event) {
      // Tab key
      if (event.keyCode === 9) {
        this.constrainTabNavigation(event);
      }
    },

    didInsertElement: function didInsertElement() {
      this.focus();
      lastOpenedModal = this;
    },

    willDestroy: function willDestroy() {
      lastOpenedModal = null;
    },

    focus: function focus() {
      if (this.get('element').contains(document.activeElement)) {
        // just let it be if we already contain the activeElement
        return;
      }
      var target = this.$('[autofocus]');
      if (!target.length) {
        target = this.$(':tabbable');
      }

      if (!target.length) {
        target = this.$();
      }

      target[0].focus();
    },

    constrainTabNavigation: function constrainTabNavigation(event) {
      var tabbable = this.$(':tabbable');
      var finalTabbable = tabbable[event.shiftKey ? 'first' : 'last']()[0];
      var leavingFinalTabbable = finalTabbable === document.activeElement ||
      // handle immediate shift+tab after opening with mouse
      this.get('element') === document.activeElement;
      if (!leavingFinalTabbable) {
        return;
      }
      event.preventDefault();
      tabbable[event.shiftKey ? 'last' : 'first']()[0].focus();
    },

    click: function click(event) {
      if (event.target === this.get('element')) {
        this.sendAction('clickAway');
      }
    }
  });

});
define('app4all/components/validatable-form', ['exports', 'ember-cli-html5-validation/components/validatable-form'], function (exports, ValidatableForm) {

	'use strict';

	exports['default'] = ValidatableForm['default'];

});
define('app4all/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('app4all/controllers/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({
		user_name: null,
		user_password: null,
		actions: {
			submitForm: function submitForm() {
				Ember['default'].debug('Call to submit with user ' + this.get('user_name') + ' and pass: ' + this.get('user_password'));
			}
		}
	});

});
define('app4all/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('app4all/initializers/a11y', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.initialize = initialize;

  function initialize() /* container, application */{
    // application.inject('route', 'foo', 'service:foo');
    Ember['default'].Checkbox.reopen({
      attributeBindings: ['aria-describedby', 'aria-controls']
    });

    Ember['default'].TextField.reopen({
      attributeBindings: ['aria-describedby']
    });
    /**
    	Keyboard Accessibility: To press space over an action trigger should trigger the action too.
    */
    Ember['default'].LinkComponent.reopen({
      keyPress: function keyPress(e) {
        if (e.keyCode === 32 || e.which === 32) {
          Ember['default'].$(e.currentTarget)[0].click();
        }
        return this._super('keyPress', e);
      }
    });
  }

  exports['default'] = {
    name: 'a11y',
    after: "customizations",
    initialize: initialize
  };

});
define('app4all/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'app4all/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('app4all/initializers/customizations', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.initialize = initialize;

  function initialize() /* container, application */{
    // application.inject('route', 'foo', 'service:foo');

    //Bind actions to link component
    Ember['default'].LinkComponent.reopen({
      action: null,
      click: function click(evt) {
        if (evt.type === 'click') {
          var action = this.get('action');
          if (action) {
            this.get('view').send(action);
          }
        }

        return this._super(evt.type, evt);
      }
    });
  }

  exports['default'] = {
    name: 'customizations',
    before: "a11y",
    initialize: initialize
  };

});
define('app4all/initializers/ember-mobiletouch', ['exports', 'app4all/config/environment', 'ember-mobiletouch/default-config', 'ember-mobiletouch/overrides/view', 'ember-mobiletouch/overrides/component', 'ember-mobiletouch/overrides/checkbox', 'ember-mobiletouch/overrides/link-view', 'app4all/overrides/ember-mobiletouch', 'ember-mobiletouch/overrides/action-helper'], function (exports, config, defaultConfig, ModifiedView, ModifiedComponent, ModifiedCheckbox, ModifiedLinkView, ModifiedEventDispatcher, ModifiedActionHelper) {

  'use strict';

  exports['default'] = {

    name: 'mobiletouch',

    initialize: function initialize() {

      var mergedConfig = Ember.merge({}, defaultConfig['default'], config['default']);

      //add config settings to overrides
      ModifiedView['default'].reopen({ __useGesturesHash: mergedConfig.useGesturesHash });
      ModifiedComponent['default'].reopen({ __useGesturesHash: mergedConfig.useGesturesHash });
      ModifiedCheckbox['default'].reopen({ __useGesturesHash: mergedConfig.useGesturesHash });
      ModifiedLinkView['default'].reopen({ __defaultTapOnPress: mergedConfig.defaultTapOnPress });
    }
  };

});
define('app4all/initializers/export-application-global', ['exports', 'ember', 'app4all/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
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
define('app4all/initializers/field-validations', ['exports', 'ember', 'app4all/mixins/validatable-element'], function (exports, Ember, ValidatableElement) {

  'use strict';

  exports.initialize = initialize;

  function initialize() /* container, application */{
    // application.inject('route', 'foo', 'service:foo');

    Ember['default'].Checkbox.reopen(ValidatableElement['default']);
    Ember['default'].TextArea.reopen(ValidatableElement['default']);
    Ember['default'].TextField.reopen(ValidatableElement['default']);
  }

  exports['default'] = {
    name: 'field-validations',
    initialize: initialize
  };

});
define('app4all/initializers/html5-validation', ['exports', 'ember-cli-html5-validation/ext/checkbox', 'ember-cli-html5-validation/ext/text-area', 'ember-cli-html5-validation/ext/text-field', 'ember-cli-html5-validation/ext/select'], function (exports) {

  'use strict';

  exports['default'] = {
    name: 'ember-cli-html5-validation',
    initialize: function initialize() {}
  };

});
define('app4all/initializers/in-app-livereload', ['exports', 'app4all/config/environment', 'ember-cli-cordova/initializers/in-app-livereload'], function (exports, config, reloadInitializer) {

  'use strict';

  /* globals cordova */

  var inAppReload = reloadInitializer['default'].initialize;

  var initialize = function initialize(container, app) {
    if (typeof cordova === 'undefined' || config['default'].environment !== 'development' || config['default'].cordova && (!config['default'].cordova.liveReload || !config['default'].cordova.liveReload.enabled)) {
      return;
    }

    return inAppReload(container, app, config['default']);
  };

  exports['default'] = {
    name: 'cordova:in-app-livereload',
    initialize: initialize
  };

  exports.initialize = initialize;

});
define('app4all/initializers/is-mobile', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var MobileChecker = Ember['default'].Object.extend({
      // isMobile property caches the canonical mobile check method from http://detectmobilebrowsers.com/
      isMobile: (function () {
        var check = false;
        (function (a, b) {
          if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera, 'http://detectmobilebrowser.com/mobile');
        return check;
      }).property()
    });

    container.register('mobile-checker:main', MobileChecker);
    application.inject('controller', 'mobileChecker', 'mobile-checker:main');
    application.inject('route', 'mobileChecker', 'mobile-checker:main');
    application.inject('component', 'mobileChecker', 'mobile-checker:main');

    /*
        registry.register('service:current-user', null, { instantiate: false, singleton: true });
      registry.injection('route', 'currentUser', 'service:current-user');
      registry.injection('controller', 'currentUser', 'service:current-user');
      registry.injection('component', 'currentUser', 'service:current-user');
    
    */
    /*
        container.typeInjection('component', 'mobileChecker', 'mobile-checker:main');
        application.register('mobile-checker:main', MobileChecker, {singleton: true});
        application.inject('component', 'mobileChecker', 'mobile-checker:main');
    
        */
  }

  exports['default'] = {
    name: 'is-mobile',
    initialize: initialize
  };

});
define('app4all/initializers/liquid-fire', ['exports', 'liquid-fire/router-dsl-ext', 'liquid-fire/ember-internals'], function (exports, __dep0__, ember_internals) {

  'use strict';

  // This initializer exists only to make sure that the following
  // imports happen before the app boots.
  ember_internals.registerKeywords();

  exports['default'] = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };

});
define('app4all/liquid-fire/tests/modules/liquid-fire/action.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/action.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/action.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/animate.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/animate.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/animate.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/components/liquid-measured.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire/components');
  QUnit.test('modules/liquid-fire/components/liquid-measured.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/components/liquid-measured.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/components/liquid-spacer.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire/components');
  QUnit.test('modules/liquid-fire/components/liquid-spacer.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/components/liquid-spacer.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/constrainables.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/constrainables.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/constrainables.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/constraint.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/constraint.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/constraint.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/constraints.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/constraints.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/constraints.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/dsl.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/dsl.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/dsl.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/ember-internals.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/ember-internals.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/ember-internals.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/growable.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/growable.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/growable.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/index.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/index.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/internal-rules.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/internal-rules.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/internal-rules.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/modal.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/modal.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/modal.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/modals.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/modals.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/modals.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/mutation-observer.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/mutation-observer.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/mutation-observer.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/promise.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/promise.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/promise.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/router-dsl-ext.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/router-dsl-ext.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/router-dsl-ext.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/rule.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/rule.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/rule.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/running-transition.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/running-transition.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/running-transition.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/tabbable.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/tabbable.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/tabbable.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/transition-map.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/transition-map.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/transition-map.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/velocity-ext.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/velocity-ext.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/velocity-ext.js should pass jshint.');
  });

});
define('app4all/liquid-fire/tests/modules/liquid-fire/version-warnings.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/liquid-fire');
  QUnit.test('modules/liquid-fire/version-warnings.js should pass jshint', function (assert) {
    assert.ok(true, 'modules/liquid-fire/version-warnings.js should pass jshint.');
  });

});
define('app4all/mixins/child-broadcaster', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  /**
  * A mixin which works as an abstract class to be used in every child of {{#crossLink "ParentListener"}}{{/crossLink}} that should be listened
  *
  * Inherited in extensions properties:
  *
  * - {{#crossLink "ChildBroadcaster/publicProperties:property"}}{{/crossLink}}:
  *     Array with the names of the properties you would like to share with your {{#crossLink "ParentListener"}}{{/crossLink}}
  * - {{#crossLink "ChildBroadcaster/publicMethods:property"}}{{/crossLink}}:
  *     Array with the names of the methods you would like to share with your {{#crossLink "ParentListener"}}{{/crossLink}}
  *
  * There properties should be initialized when the element is inserted (on 'willInsertElement' or on 'didInsertElement' events).
  * You can check an example in {{#crossLink "ValidatableElement/initializeValidatableElement:method"}}{{/crossLink}}:


                         initializeValidatableElement: function(){
                           this.get('publicProperties').pushObject('wasValidated');
                           this.get('publicMethods').pushObject('validate');
                         }.on('willInsertElement'),

  * This is the only way the parent can call methods {{#crossLink "ChildBroadcaster/getProperty:method"}}{{/crossLink}}
  * and {{#crossLink "ChildBroadcaster/callMethod:method"}}{{/crossLink}} to get some child information properly and safely
  *
  * Inherited in extensions methods:
  *
  * - {{#crossLink "ChildBroadcaster/notifyAction:method"}}{{/crossLink}}:
  *   Any action or event of the child that we would like to share with our listeners should be done using this call
  *
  *
  * @class ChildBroadcaster
  * @extensionfor Component, View
  */
  exports['default'] = Ember['default'].Mixin.create({

    /**
    * An read only abstraction of this class only with the methods we would like
    * to provide to our {{#crossLink "ParentListener"}}{{/crossLink}}
    *
    * @property broadcaster
    * @type {Object}
    */
    broadcaster: Ember['default'].computed(function () {
      var me = this;
      return Object.create({}, {
        id: {
          value: me.id || me.elementId
        },
        addListener: {
          value: me.addListener
        },
        getProperty: {
          value: me.getProperty
        },
        callMethod: {
          value: me.callMethod
        },
        _broadcasterContext: {
          value: me
        }
      });
    }),

    /**
    * An array of {{#crossLink "ParentListener/listener:property"}}{{/crossLink}} with the
    * subscribed {{#crossLink "ParentListener"}}{{/crossLink}} instances
    *
    * @property listeners
    * @type {Array}
    * @default []
    */
    listeners: null,

    /**
    * An array of strings with the names of the properties shared with the {{#crossLink "ParentListener"}}{{/crossLink}}
    *
    * @property publicProperties
    * @type {Array}
    * @default []
    */
    publicProperties: null,

    /**
    * An array of strings with the names of the methods shared with the {{#crossLink "ParentListener"}}{{/crossLink}}
    *
    * @property publicMethods
    * @type {Array}
    * @default []
    */
    publicMethods: null,

    /**
    * Initialization of component. Listen to 'init' event
    *
    * @method initializeBroadcaster
    * @private
    */
    initializeBroadcaster: (function () {
      this.set('listeners', Ember['default'].A());
      this.set('publicProperties', Ember['default'].A());
      this.set('publicMethods', Ember['default'].A());
    }).on('init'),

    /**
    * Before render the component. Listen to 'willInsertElement' event
    *
    * @method onElementInserted
    * @private
    */
    onElementInserted: (function () {
      var me = this,
          parent = me.get('parentView');

      me.notifyCreation(parent, me);
    }).on('willInsertElement'),

    /**
    * Before destroy the component. Listen to 'willDestroyElement' event
    *
    * @method onElementInserted
    * @private
    */
    onElementDestroyed: (function () {
      this.notifyDestruction();
    }).on('willDestroyElement'),

    /**
    * Inform to the {{#crossLink "ParentListener"}}{{/crossLink}} instances the creation and susbcribe it
    *
    * @method notifyCreation
    * @param {Ember.View} view The view to check and subscribe if it is a {{#crossLink "ParentListener"}}{{/crossLink}}
    * @param {Ember.View} context The context of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
    * @private
    */
    notifyCreation: function notifyCreation(view, context) {
      var me = context,
          parent = view.get('parentView');

      if (view.isParentListener) {
        view.addBroadcaster(me.get('broadcaster'));
      }

      if (parent) {
        me.notifyCreation(parent, me);
      }
    },

    /**
    * Inform to the {{#crossLink "ParentListener"}}{{/crossLink}} instances about an action or an event of the child
    *
    * @method notifyAction
    * @param {String} action The name of the action to be received in the {{#crossLink "ParentListener"}}{{/crossLink}}
    * @param {Mixed} params The paremters needed to handle this action
    */
    notifyAction: function notifyAction(action, params) {
      var me = this,
          listeners = me.get('listeners');

      listeners.forEach(function (listener) {
        listener.processAction(action, params);
      });
    },

    /**
    * Inform to the {{#crossLink "ParentListener"}}{{/crossLink}} instances the destruction of the broadcaster
    *
    * @method notifyDestruction
    * @private
    */
    notifyDestruction: function notifyDestruction() {
      var me = this,
          listeners = me.get('listeners');

      listeners.forEach(function (listener) {
        listener.removeBroadcaster(me.get('broadcaster'));
      });
    },

    /**
    * Used by the {{#crossLink "ParentListener"}}{{/crossLink}} to know the value of a child property.
    * This method only works if the property is inside the {{#crossLink "ChildBroadcaster/publicProperties:property"}}{{/crossLink}}
    *
    * @method getProperty
    * @param {String} property The name of the property
    * @public
    */
    getProperty: function getProperty(property) {
      var me = this._broadcasterContext || this;

      if (me.get('publicProperties').contains(property)) {
        return me.get(property);
      }
      return undefined;
    },

    /**
    * Used by the {{#crossLink "ParentListener"}}{{/crossLink}} to call to a method defined in the child.
    * This method only works if the method name is inside the {{#crossLink "ChildBroadcaster/publicMethods:property"}}{{/crossLink}}
    *
    * @method callMethod
    * @param {String} name The name of the method
    * @param {Mixed} params The parameters of the method
    * @public
    */
    callMethod: function callMethod(name, params) {
      var me = this._broadcasterContext || this;

      if (me.get('publicMethods').contains(name)) {
        return me[name].apply(me, [params]);
      }
      return undefined;
    },

    /**
    * Used by the {{#crossLink "ParentListener"}}{{/crossLink}} to subscribe itself as a listener.
    *
    * @method addListener
    * @param {Object} listenerElement The {{#crossLink "ParentListener/listener:property"}}{{/crossLink}} of the {{#crossLink "ParentListener"}}{{/crossLink}}
    * @public
    */
    addListener: function addListener(listenerElement) {
      var me = this._broadcasterContext || this;
      me.get('listeners').pushObject(listenerElement);
    }

  });

});
define('app4all/mixins/parent-listener', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  /**
  * A mixin which works as an abstract class to be used in every listener of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
  *
  * Inherited properties:
  *
  * - {{#crossLink "ParentListener/broadcasters:property"}}{{/crossLink}}
  *
  * Inherited methods:
  *
  * - {{#crossLink "ParentListener/processAction:method"}}{{/crossLink}}:
  *   Any action or event of the child will end in this method. An example of a proper override of the method is in
  * {{#crossLink "ValidationListener/processAction:method"}}{{/crossLink}}:

                  processAction: function (action, params){
                      var me = this._listenerContext || this;

                      me._super(action, params);

                      switch(action) {
                        case 'new_error':
                            me.addError(params.input, params.message);
                            break;
                        case 'error_corrected':
                            me.removeError(params.input);
                            break;
                        default:
                      }

                    },
  *
  *
  * @class ParentListener
  * @extensionfor Component, View
  */
  exports['default'] = Ember['default'].Mixin.create({

    /**
    * An read only abstraction of this class only with the methods we would like
    * to provide to our {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
    *
    * @property listener
    * @type {Object}
    */
    listener: Ember['default'].computed(function () {
      var me = this;
      return Object.create({}, {
        id: {
          value: me.id || me.elementId
        },
        addBroadcaster: {
          value: me.addBroadcaster
        },
        processAction: {
          value: me.processAction
        },
        removeBroadcaster: {
          value: me.removeBroadcaster
        },
        _listenerContext: {
          value: me
        }
      });
    }),

    /**
    * An array of {{#crossLink "ChildBroadcaster/broadcasters:property"}}{{/crossLink}} with the
    * subscribed {{#crossLink "ChildBroadcaster"}}{{/crossLink}} instances
    *
    * @property broadcasters
    * @type {Array}
    * @default []
    */
    broadcasters: null,

    /**
    * Property read by every {{#crossLink "ChildBroadcaster"}}{{/crossLink}} in order to know if
    * this parent is a listener or not
    *
    * @property isParentListener
    * @type {Boolena}
    * @default true
    * @private
    */
    isParentListener: true,

    /**
    * Initialization of component. Listen to 'init' event
    *
    * @method initializeListener
    * @private
    */
    initializeListener: (function () {
      this.set('broadcasters', Ember['default'].A());
    }).on('init'),

    /**
    * Used by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}} to subscribe itself as a broadcaster.
    *
    * @method addBroadcaster
    * @param {Object} broadcasterElement The {{#crossLink "ChildBroadcaster/broadcasterElement:property"}}{{/crossLink}} of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
    * @public
    */
    addBroadcaster: function addBroadcaster(broadcasterElement) {
      var me = this._listenerContext || this;

      me.get('broadcasters').pushObject(broadcasterElement);
      broadcasterElement.addListener(me.get('listener'));
    },

    /**
    * Used by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}} in {{#crossLink "ChildBroadcaster/notifyAction:method"}}{{/crossLink}}.
    * Any action or event of the child will end in this method. This should be properly override to handle the child actions
    *
    * @method processAction
    * @param {String} action The name of the action triggered by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
    * @param {Mixed} params The paremters needed to handle this action
    * @public
    */
    processAction: function processAction() /** action, params*/{},

    /**
    * Used by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}} to unsubscribe itself as a broadcaster.
    *
    * @method removeBroadcaster
    * @param {Object} broadcasterElement The {{#crossLink "ChildBroadcaster/broadcasterElement:property"}}{{/crossLink}} of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
    * @public
    */
    removeBroadcaster: function removeBroadcaster(broadcasterElement) {
      var me = this._listenerContext || this;
      me.get('broadcasters').removeObject(me.get('broadcasters').findBy('id', broadcasterElement.id));
    }

  });

});
define('app4all/mixins/validatable-element', ['exports', 'ember', 'app4all/mixins/child-broadcaster'], function (exports, Ember, ChildBroadcaster) {

  'use strict';

  /**
  * A mixin to be used in every child of {{#crossLink "ValidationListener"}}{{/crossLink}} that should be validated
  *
  * @class ValidatableElement
  * @extends ChildBroadcaster
  * @extensionfor Input
  */
  exports['default'] = Ember['default'].Mixin.create(ChildBroadcaster['default'], {

    /**
    * Flag to control if any validation was triggered
    *
    * @property wasValidated
    * @type {Boolean}
    * @default false
    * @public
    */
    wasValidated: false,

    /**
    * Initialization of component. Listen to 'willInsertElement' event
    *
    * @method initializeValidatableElement
    * @private
    */
    initializeValidatableElement: (function () {
      this.get('publicProperties').pushObject('wasValidated');
      this.get('publicProperties').pushObject('element');
      this.get('publicMethods').pushObject('validate');
      this.get('publicMethods').pushObject('markErrorOnField');
    }).on('willInsertElement'),

    /**
    * Bind the events that will trigger the validation. Listen to 'didInsertElement' event
    *
    * @method bindValidation
    * @private
    */
    bindValidation: (function () {
      Ember['default'].$(this.get('element')).on('focusout', Ember['default'].run.bind(this, this.validate));
    }).on('didInsertElement'),

    /**
    * Turn off all the registered events. Listen to 'willDestroyElement' event
    *
    * @method unBindValidation
    * @private
    */
    unBindValidation: (function () {
      Ember['default'].$(this.get('element')).off();
    }).on('willDestroyElement'),

    /**
    * Trigger the field validation and send the error to the
    * {{#crossLink "ValidationListener"}}{{/crossLink}} when required.
    *
    *
    * @method validate
    * @return {Boolean} Returns true on valid
    * @public
    */
    validate: function validate() {
      var input = this.get('element');

      this.set('wasValidated', true);

      // According to spec, inputs that have "formnovalidate" should bypass any validation
      if (input.hasAttribute('formnovalidate')) {
        return true;
      }

      if (!input.validity.valid) {
        this.notifyNewError();
        return false;
      }

      if (this.get('hasError')) {
        this.notifyErrorCorrected();
      }

      return true;
    },

    /**
    * Notify the listeners to add the error.
    * It trigger action 'new_error' with {{#crossLink "ChildBroadcaster/notifyAction:method"}}{{/crossLink}}
    *
    * @method notifyNewError
    * @private
    */
    notifyNewError: function notifyNewError() {
      var me = this,
          input = this.get('element');

      this.notifyAction('new_error', {
        input: input,
        message: me.getErrorMessage()
      });

      this.set('hasError', true);
    },

    /**
    * Notify the listeners to remove the error
    * It trigger action 'error_corrected' with {{#crossLink "ChildBroadcaster/notifyAction:method"}}{{/crossLink}}
    *
    * @method notifyErrorCorrected
    * @private
    */
    notifyErrorCorrected: function notifyErrorCorrected() {
      var input = this.get('element');

      this.notifyAction('error_corrected', {
        input: input
      });
      this.set('hasError', false);
    },

    /**
    * Mark the element as field with error. Used by the {{#crossLink "ValidationListener"}}{{/crossLink}}
    * when it is subscribed an element which has already an error in the system
    *
    * @method markErrorOnField
    * @public
    */
    markErrorOnField: function markErrorOnField() {
      this.set('hasError', true);
    },

    /**
    * Return the error message of the browser
    *
    * Override this method to return a custom validation message
    *
    * @method getErrorMessage
    * @return {String} Returns error message
    */
    getErrorMessage: function getErrorMessage() {
      var input = this.get('element');

      return input.validationMessage;
    }

  });

});
define('app4all/mixins/validation-handler', ['exports', 'ember', 'app4all/mixins/validation-listener'], function (exports, Ember, ValidationListener) {

  'use strict';

  /**
  * A mixin to be used in the application controller to handle all the {{#crossLink "ValidatableElement"}}{{/crossLink}}
  *
  * @class ValidationHandler
  * @extends ValidationListener
  * @extensionfor View, Component, ApplicationView
  */
  exports['default'] = Ember['default'].Mixin.create(ValidationListener['default'], {

    /**
    * Id of the HMTL div where to wrap the errors.
    * Override this property for custom id
    *
    * @property errorContainerId
    * @type {String}
    * @default 'error-handler-errors'
    */
    errorContainerId: 'error-handler-errors',

    /**
    * The h2 label which will have the error container
    * This is needed for assitive technologies and provide
    * a better accessibility of the webpage
    * Override this property for custom title
    *
    * @property errorHeader
    * @type {String}
    * @default 'Errors'
    */
    errorHeader: 'Errors',

    /**
    * Customizations of the view of the component. Listen to 'didInsertElement' event
    *
    * @method afterRenderValidationHandler
    * @private
    */
    afterRenderValidationHandler: (function () {
      this.prepareErrorContainer();
    }).on('didInsertElement'),

    /**
    * An override of method {{#crossLink "ValidationListener/addError:method"}}{{/crossLink}}
    *
    * @method addError
    * @param {HTMLElement} element The DOM element with error
    * @param {String} message The error message
    */
    addError: function addError(element, message) {
      var me = this._listenerContext || this;

      this._super(element, message);
      element.classList.add('error-handler-invalid-input');
      me.renderErrors();
    },

    /**
    * An override of method {{#crossLink "ValidationListener/removeError:method"}}{{/crossLink}}
    *
    * @method removeError
    * @param {HTMLElement} element The DOM element with error
    */
    removeError: function removeError(element) {
      var me = this._listenerContext || this;

      this._super(element);
      element.classList.remove('error-handler-invalid-input');
      me.renderErrors();
    },

    /**
    * It append to the error container every error in the system
    *
    * @method renderErrors
    */
    renderErrors: function renderErrors() {
      var errors,
          errorContainer,
          errorList,
          errorHeader,
          me = this;

      errorContainer = me.getErrorContainer();
      errorList = errorContainer.find('ul');
      errorHeader = errorContainer.find('h2');
      errors = me.get('errors');
      errorContainer.prop('hidden', 'hidden');
      errorList.empty();
      errorHeader.prop('hidden', 'hidden');

      errors.forEach(function (item) {
        errorList.append(me.renderError(item));
      });

      if (errors.length) {
        errorHeader.removeProp('hidden');
        errorContainer.removeProp('hidden');
      }
    },

    /**
    * Build the template for each particular error. Override this function to customize the template
    *
    * @param {Object} errorElement An object of the {{#crossLink "ValidationListener/errors:property"}}{{/crossLink}} array
    * @method renderErrors
    * @return {DOMElement} The element to be append in the container
    */
    renderError: function renderError(errorElement) {
      var prefixTemplate, errorTemplate, errorDOMElementLink, errorDOMElement;

      prefixTemplate = '<span id="error-element-prefix-' + errorElement.id + '" class="error-element-prefix">' + errorElement.prefix + ':</span> ';
      errorTemplate = '<a href="#" id="error-element-' + errorElement.id + '" class="error-element-link">' + prefixTemplate + errorElement.message + '</a>';

      errorDOMElementLink = Ember['default'].$(errorTemplate).on('click', errorElement.element, Ember['default'].run.bind(this, this.goToError));
      errorDOMElement = Ember['default'].$('<li></li>');
      errorDOMElement.append(errorDOMElementLink);

      return errorDOMElement;
    },

    /**
    * Method called when the user click on the error. It scrolls and place the focus where the error is
    *
    * @param {jQuery.Event} evnt Event which contains in its data the DOMElement which triggered it
    * @method goToError
    */
    goToError: function goToError(evnt) {
      evnt.preventDefault();

      Ember['default'].$('html, body').animate({
        scrollTop: Ember['default'].$('#' + evnt.data.id).offset().top - 40
      }, 200);
      Ember['default'].$('#' + evnt.data.id).focus();
    },

    /**
    * Bind ARIA roles and properties in order to make the errors accesible to assitive technologies
    * Prepare the collapsible error panel
    *
    * @method prepareErrorContainer
    * @private
    */
    prepareErrorContainer: function prepareErrorContainer() {
      var errorContainer,
          expandButton,
          errorHeader,
          role,
          atomic,
          live,
          me = this;

      errorContainer = me.getErrorContainer();
      errorContainer.prop('hidden', 'hidden');
      role = errorContainer.attr('role');
      atomic = errorContainer.attr('aria-atomic');
      live = errorContainer.attr('aria-live');

      if (role !== 'alert') {
        errorContainer.attr('role', 'alert');
      }

      if (atomic !== 'true') {
        errorContainer.attr('aria-atomic', 'true');
      }

      if (live !== 'assertive') {
        errorContainer.attr('aria-live', 'assertive');
      }

      expandButton = Ember['default'].$('<button aria-expanded="true" aria-controls="error-handler-collapsible-list">' + this.get('errorHeader') + '</button>');
      Ember['default'].$(expandButton).on('click', Ember['default'].run.bind(this, this.toggleCollapse));

      errorHeader = Ember['default'].$('<h2 hidden></h2>');
      errorHeader.append(expandButton);

      errorContainer.append(errorHeader);
      errorContainer.append('<ul id="error-handler-collapsible-list"></ul>');
    },

    /**
    * @method getErrorContainer
    * @private
    */
    getErrorContainer: function getErrorContainer() {
      var id = this.get('errorContainerId'),
          container = Ember['default'].$('#' + id);

      if (!container.length) {
        container = Ember['default'].$('<div id="' + id + '"></div>');
        Ember['default'].$(this.get('element')).append(container);
      }
      return container;
    },

    /**
    * Method called when the user click on the error buttom. It collapse/expand the error panel
    *
    * @param {jQuery.Event} evnt
    * @method toggleCollapse
    */
    toggleCollapse: function toggleCollapse() /*evnt*/{
      var errorContainer = this.getErrorContainer(),
          errorList = errorContainer.find('ul'),
          errorHeadeButton = errorContainer.find('button');

      errorList.slideToggle('fast', function () {
        if (errorHeadeButton.attr('aria-expanded') === 'true') {
          errorHeadeButton.attr('aria-expanded', false);
        } else {
          errorHeadeButton.attr('aria-expanded', true);
        }
      });
    },

    /**
    * Check if the new subscribed element has already an error in the system and show it
    *
    * @method addBroadcaster
    * @private
    */
    addBroadcaster: function addBroadcaster(broadcasterElement) {
      var me = this._listenerContext || this,
          error,
          errorElement,
          errorContainer,
          errorHeader;

      me._super(broadcasterElement);

      error = me.get('errors').findBy('id', broadcasterElement.id);
      if (error) {
        error.element = broadcasterElement.getProperty('element');
        error.element.classList.add('error-handler-invalid-input');
        errorContainer = me.getErrorContainer();
        errorHeader = errorContainer.find('h2');
        errorElement = Ember['default'].$('#error-element-' + error.id);
        errorElement.parent('li').removeProp('hidden');
        errorHeader.removeProp('hidden');
        errorContainer.removeProp('hidden');
      }
    },

    /**
    * Check if the element removed has already an error in the system and hide it
    *
    * @method addBroadcaster
    * @private
    */
    removeBroadcaster: function removeBroadcaster(broadcasterElement) {
      var me = this._listenerContext || this,
          error,
          errorElement,
          errorContainer,
          errorList,
          errorHeader;

      me._super(broadcasterElement);

      me.get('broadcasters').removeObject(me.get('broadcasters').findBy('id', broadcasterElement.id));

      error = me.get('errors').findBy('id', broadcasterElement.id);
      if (error) {
        error.element.classList.remove('error-handler-invalid-input');
        errorElement = Ember['default'].$('#error-element-' + error.id);
        errorElement.parent('li').prop('hidden', 'hidden');
        errorContainer = me.getErrorContainer();
        errorList = errorContainer.find('ul');
        errorHeader = errorContainer.find('h2');
        if (errorList.children(':visible').length === 0) {
          errorContainer.prop('hidden', 'hidden');
          errorHeader.prop('hidden', 'hidden');
        }
      }
    }

  });

});
define('app4all/mixins/validation-listener', ['exports', 'ember', 'app4all/mixins/parent-listener'], function (exports, Ember, ParentListener) {

  'use strict';

  /**
  * A mixin to be used in the component parent of the {{#crossLink "ValidatableElement"}}{{/crossLink}}
  *
  * @class ValidationListener
  * @extends ParentListener
  * @extensionfor View, Component, {{#crossLink "ValidationHandler"}}{{/crossLink}}
  */
  exports['default'] = Ember['default'].Mixin.create(ParentListener['default'], {

    /**
     * Array of current errors. Every error is an object like follow:
     *
           error: {
             id: [id of the element with error],
             prefix: [the prefix of the error message in this priority: (label - element.name - Error)]
             element: [the DOM element with error],
             message: [the current error message]
           }
     *
     * @property errors
     * @type {Array}
     * @default []
     */
    errors: null,

    /**
    * Computed property. Usage: this.get('hasElementWithError')
    *
    * True if there is any child with error
    *
    * @property hasElementWithError
    * @type {Boolean}
    * @public
    */
    hasElementWithErrorMethod: function hasElementWithErrorMethod() {
      if (this.get('errors').length) {
        return true;
      }
      return false;
    },

    /**
    * Computed property. Usage: this.get('wereAllElementsValidated')
    *
    * True if all the {{#crossLink "ValidatableElement"}}{{/crossLink}} were validated
    * at least once
    *
    * @property wereAllElementsValidated
    * @type {Boolean}
    * @public
    */
    wereAllElementsValidatedMethod: function wereAllElementsValidatedMethod() {
      var validatableChildren = this.get('broadcasters'),
          nonValidatedChild = null;

      nonValidatedChild = validatableChildren.find(function (child) {
        if (!child.getProperty('wasValidated')) {
          return true;
        }
      });

      return nonValidatedChild ? false : true;
    },

    /**
    * Initialization of component. Listen to 'init' event
    *
    * @method initializeValidationListener
    * @private
    */
    initializeValidationListener: (function () {
      var me = this;

      me.set('errors', Ember['default'].A());

      Object.defineProperty(me, 'wereAllElementsValidated', {
        get: function get() {
          return me.wereAllElementsValidatedMethod();
        }
      });

      Object.defineProperty(me, 'hasElementWithError', {
        get: function get() {
          return me.hasElementWithErrorMethod();
        }
      });
    }).on('init'),

    /**
    * Used by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}} to subscribe itself as a broadcaster.
    * Check if the field has an error already in the system and mark it as field with error.
    *
    * @method addBroadcaster
    * @param {Object} broadcasterElement The {{#crossLink "ChildBroadcaster/broadcasterElement:property"}}{{/crossLink}} of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
    * @public
    */
    addBroadcaster: function addBroadcaster(broadcasterElement) {
      var me = this._listenerContext || this,
          error;

      me._super(broadcasterElement);

      error = me.get('errors').findBy('id', broadcasterElement.id);
      if (error) {
        broadcasterElement.callMethod('markErrorOnField');
      }
    },

    /**
    * An override of method {{#crossLink "ParentListener/processAction:method"}}{{/crossLink}}
    *
    * @method processAction
    * @param {String} action The name of the action triggered by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
    * @param {Mixed} params The paremters needed to handle this action
    * @public
    */
    processAction: function processAction(action, params) {
      var me = this._listenerContext || this;

      me._super(action, params);

      switch (action) {
        case 'new_error':
          me.addError(params.input, params.message);
          break;
        case 'error_corrected':
          me.removeError(params.input);
          break;
        default:
      }
    },

    /**
     * Method used to add an error to the system
     *
     * @method addError
     * @param {HTMLElement} element The DOM element with error
     * @param {String} message The error message
     */
    addError: function addError(element, message) {
      var me = this._listenerContext || this,
          errors = me.get('errors');

      errors.removeObject(errors.findBy('id', element.id));
      errors.pushObject(me.buildError(element, message));
    },

    /**
    * Method used to remove its error from the system
    *
    * @method removeError
    * @param {HTMLElement} element The DOM element with error
    */
    removeError: function removeError(element) {
      var me = this._listenerContext || this;

      me.get('errors').removeObject(me.get('errors').findBy('id', element.id));
    },

    /**
    * Trigger the validation on elements which were not validated yet.
    *
    * @method validateNonValidatedElements
    * @returns {Boolean} True when all elements were valid
    * @public
    */
    validateNonValidatedElements: function validateNonValidatedElements() {
      var validatableChildren = this.get('broadcasters'),
          nonValidatedChildren = null,
          valid = true;

      nonValidatedChildren = validatableChildren.filter(function (child) {
        if (!child.getProperty('wasValidated')) {
          return true;
        }
      });

      nonValidatedChildren.forEach(function (child) {
        if (!child.callMethod('validate')) {
          valid = false;
        }
      });

      return valid;
    },

    /**
    * Trigger the validation on all elements.
    *
    * @method validateAllElements
    * @returns {Boolean} True when all elements were valid
    * @public
    */
    validateAllElements: function validateAllElements() {
      var validatableChildren = this.get('broadcasters'),
          valid = true;

      validatableChildren.filter(function (child) {
        if (!child.callMethod('validate')) {
          valid = false;
        }
      });

      return valid;
    },

    /**
    * Build the error store in {{#crossLink "ParentListener/errors:property"}}{{/crossLink}}
    *
    * @method buildError
    * @param {HTMLElement} element The DOM element with error
    * @param {String} message The error message
    * @private
    */
    buildError: function buildError(element, message) {
      var prefix;

      prefix = Ember['default'].$('label[for="' + element.id + '"]').text().trim();

      if (!prefix || prefix === '') {
        prefix = element.name;
      }

      if (!prefix || prefix === '') {
        prefix = 'Error';
      }

      return {
        id: element.id,
        prefix: prefix,
        element: element,
        message: message
      };
    }

  });

});
define('app4all/overrides/ember-mobiletouch', ['exports', 'app4all/config/environment', 'ember-mobiletouch/overrides/event-dispatcher', 'app4all/recognizers'], function (exports, config, EventDispatcher, CustomRecognizers) {

  'use strict';

  exports['default'] = EventDispatcher['default'].reopen({
    _mobileTouchCustomizations: config['default'].mobileTouch,
    _customRecognizers: CustomRecognizers['default']
  });

});
define('app4all/recognizers', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function () {

    /**
     * Place your recognizer customizations here
     */

    //this.Manager is a reference to the hammer Manager instance
    //this.Recognizers is a hash of available recognizers
    //   e.g. this.Recognizers.Pan

    //you can add a new recognizer, for instance doubleTap, like below
    //the DOM event will be all lowercase (doubletap)
    //the Ember event will be camelCase (doubleTap)
    //the key in this.Recognizers will be SnakeCase (DoubleTap)
    /*
    this.recognize({
       name : 'doubleTap', //always camelCase this
       gesture : 'tap', //the base Hammer recognizer to use
       tune : { //the settings to pass to the recognizer, event will be added automatically
        taps : 2
      },
       'with' : ['tap'], //an array of recognizers to recognize with.
       without : [] //an array of recognizers that must first fail
    });
    */

  }

});
define('app4all/router', ['exports', 'ember', 'app4all/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('about', {});
  });

  exports['default'] = Router;

});
define('app4all/routes/about', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('app4all/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    actions: {
      back: function back() {
        history.back();
      },

      openLink: function openLink(url) {
        window.open(url, '_system');
      }
    }
  });

});
define('app4all/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('app4all/services/liquid-fire-modals', ['exports', 'liquid-fire/modals'], function (exports, Modals) {

	'use strict';

	exports['default'] = Modals['default'];

});
define('app4all/services/liquid-fire-transitions', ['exports', 'liquid-fire/transition-map'], function (exports, TransitionMap) {

	'use strict';

	exports['default'] = TransitionMap['default'];

});
define('app4all/templates/about', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/about.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        dom.setAttribute(el1,"id","main");
        dom.setAttribute(el1,"role","main");
        dom.setAttribute(el1,"aria-live","polite");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2,"class","invisible");
        var el3 = dom.createTextNode("About");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3,"class","invisible");
        var el4 = dom.createTextNode("What is App4all");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("App4all");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" is a collection of common application features which have been developed taking into account device capabilities, screen size, assistive technologies for users with disabilities and keyboard users.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Check its accessibility");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Resize the screen and see how the elements adapt their size");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Use only the keyboard. Move the focus with TAB or SHIFT+TAB. Watch how the application reflect where is the focus at that time. Trigger any action by pressing either \"enter\" or \"space bar\".");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Users of assistive technologies can read the application properly, navigate over it by pressing the standards shortcuts and to be aware of all live changes of the application.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("If you are not an user of assitive technologies but want to check how it works, install a screen reader such as ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","http://www.chromevox.com/");
        var el5 = dom.createTextNode("ChromeVox");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" or turn on the accessibility option of your mobile phone.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Product");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("App4all is a product of ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","http://www.bleasy.net/");
        var el5 = dom.createTextNode("Bleasy.net");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('app4all/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 37
              },
              "end": {
                "line": 6,
                "column": 105
              }
            },
            "moduleName": "app4all/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("App4all");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 7
              },
              "end": {
                "line": 8,
                "column": 100
              }
            },
            "moduleName": "app4all/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Main");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child2 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 7
              },
              "end": {
                "line": 9,
                "column": 101
              }
            },
            "moduleName": "app4all/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("About");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"role","banner");
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("nav");
          dom.setAttribute(el2,"role","navigation");
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"role","tooltip");
          dom.setAttribute(el3,"hidden","");
          dom.setAttribute(el3,"id","menu-tip");
          var el4 = dom.createTextNode("Show navigation menu");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("label");
          dom.setAttribute(el3,"for","mainNavButton");
          dom.setAttribute(el3,"onclick","");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("ul");
          dom.setAttribute(el3,"id","collapsible-menu");
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("li");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("li");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n		");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n	");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0, 1]);
          var element1 = dom.childAt(element0, [7]);
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(element0,1,1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
          morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
          morphs[4] = dom.createMorphAt(fragment,2,2,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","input",[],["type","checkbox","checked",["subexpr","@mut",[["get","navigationDisplayed",["loc",[null,[4,34],[4,53]]]]],[],[]],"id","mainNavButton","class","invisible","aria-describedby","menu-tip","aria-controls","collapsible-menu"],["loc",[null,[4,2],[4,153]]]],
          ["block","link-to",["index"],["aria-controls","main","class","allow-click"],0,null,["loc",[null,[6,37],[6,117]]]],
          ["block","link-to",["index"],["action","collapseNavigation","aria-controls","main","class","allow-click"],1,null,["loc",[null,[8,7],[8,112]]]],
          ["block","link-to",["about"],["action","collapseNavigation","aria-controls","main","class","allow-click"],2,null,["loc",[null,[9,7],[9,113]]]],
          ["inline","liquid-outlet",[],["name","main"],["loc",[null,[13,0],[13,29]]]]
        ],
        locals: [],
        templates: [child0, child1, child2]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 21
          }
        },
        "moduleName": "app4all/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","application-area",[],["navigationDisplayed",["subexpr","@mut",[["get","navigationDisplayed",["loc",[null,[1,40],[1,59]]]]],[],[]]],0,null,["loc",[null,[1,0],[14,21]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('app4all/templates/cdv-generic-nav-bar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "app4all/templates/cdv-generic-nav-bar.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element2, 'class');
            return morphs;
          },
          statements: [
            ["attribute","class",["concat",["icon"," ",["subexpr","-bind-attr-class",[["get","nav.leftButton.icon",[]],"icon"],[],[]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/cdv-generic-nav-bar.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element3);
          morphs[1] = dom.createMorphAt(element3,1,1);
          morphs[2] = dom.createMorphAt(element3,3,3);
          return morphs;
        },
        statements: [
          ["element","action",["leftButton"],["on","tap"],["loc",[null,[2,10],[2,33]]]],
          ["block","if",[["get","nav.leftButton.icon",["loc",[null,[3,10],[3,29]]]]],[],0,null,["loc",[null,[3,4],[5,11]]]],
          ["content","nav.leftButton.text",["loc",[null,[6,4],[6,27]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/cdv-generic-nav-bar.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["content","nav.title.text",["loc",[null,[12,4],[12,22]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 4
              },
              "end": {
                "line": 20,
                "column": 4
              }
            },
            "moduleName": "app4all/templates/cdv-generic-nav-bar.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            return morphs;
          },
          statements: [
            ["attribute","class",["concat",["icon"," ",["subexpr","-bind-attr-class",[["get","nav.rightButton.icon",[]],"icon"],[],[]]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 0
            },
            "end": {
              "line": 23,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/cdv-generic-nav-bar.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(element1,1,1);
          morphs[2] = dom.createMorphAt(element1,3,3);
          return morphs;
        },
        statements: [
          ["element","action",["rightButton"],["on","tap"],["loc",[null,[17,10],[17,34]]]],
          ["block","if",[["get","nav.rightButton.icon",["loc",[null,[18,10],[18,30]]]]],[],0,null,["loc",[null,[18,4],[20,11]]]],
          ["content","nav.rightButton.text",["loc",[null,[21,4],[21,28]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/cdv-generic-nav-bar.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","nav.leftButton.text",["loc",[null,[1,6],[1,25]]]]],[],0,null,["loc",[null,[1,0],[8,7]]]],
        ["block","if",[["get","nav.title.text",["loc",[null,[10,6],[10,20]]]]],[],1,null,["loc",[null,[10,0],[14,7]]]],
        ["block","if",[["get","nav.rightButton.text",["loc",[null,[16,6],[16,26]]]]],[],2,null,["loc",[null,[16,0],[23,7]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('app4all/templates/components/application-area', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/application-area.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('app4all/templates/components/async-button', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/async-button.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  Loading...\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/async-button.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            return morphs;
          },
          statements: [
            ["content","value",["loc",[null,[5,4],[5,13]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 7,
                  "column": 4
                },
                "end": {
                  "line": 9,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/async-button.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      Success!\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() { return []; },
            statements: [

            ],
            locals: [],
            templates: []
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 9,
                  "column": 4
                },
                "end": {
                  "line": 11,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/async-button.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      Error!\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() { return []; },
            statements: [

            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 12,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/async-button.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","isValid",["loc",[null,[7,10],[7,17]]]]],[],0,1,["loc",[null,[7,4],[11,11]]]]
          ],
          locals: [],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/async-button.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","if",[["get","isDefault",["loc",[null,[4,8],[4,17]]]]],[],0,1,["loc",[null,[4,2],[12,9]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/async-button.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","isLoading",["loc",[null,[1,6],[1,15]]]]],[],0,1,["loc",[null,[1,0],[13,7]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('app4all/templates/components/cdv-nav-bar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/cdv-nav-bar.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('app4all/templates/components/custom-form', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/custom-form.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('app4all/templates/components/liquid-bind', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 5,
                  "column": 4
                },
                "end": {
                  "line": 7,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/liquid-bind.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["inline","yield",[["get","version",["loc",[null,[6,15],[6,22]]]]],[],["loc",[null,[6,6],[6,26]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 7,
                  "column": 4
                },
                "end": {
                  "line": 9,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/liquid-bind.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["content","version",["loc",[null,[8,6],[8,20]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 11,
                "column": 0
              }
            },
            "moduleName": "app4all/templates/components/liquid-bind.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","hasBlock",["loc",[null,[5,11],[5,19]]]]],[],0,1,["loc",[null,[5,4],[9,12]]]]
          ],
          locals: ["version"],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/liquid-bind.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","liquid-versions",[],["value",["subexpr","@mut",[["get","attrs.value",["loc",[null,[2,28],[2,39]]]]],[],[]],"use",["subexpr","@mut",[["get","use",["loc",[null,[2,44],[2,47]]]]],[],[]],"outletName",["subexpr","@mut",[["get","attrs.outletName",["loc",[null,[3,32],[3,48]]]]],[],[]],"name","liquid-bind","renderWhenFalse",true,"class",["subexpr","@mut",[["get","class",["loc",[null,[4,67],[4,72]]]]],[],[]]],0,null,["loc",[null,[2,2],[11,22]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          var child0 = (function() {
            return {
              meta: {
                "revision": "Ember@1.13.7",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 25,
                    "column": 6
                  },
                  "end": {
                    "line": 27,
                    "column": 6
                  }
                },
                "moduleName": "app4all/templates/components/liquid-bind.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [
                ["inline","yield",[["get","version",["loc",[null,[26,17],[26,24]]]]],[],["loc",[null,[26,8],[26,28]]]]
              ],
              locals: [],
              templates: []
            };
          }());
          var child1 = (function() {
            return {
              meta: {
                "revision": "Ember@1.13.7",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 27,
                    "column": 6
                  },
                  "end": {
                    "line": 29,
                    "column": 6
                  }
                },
                "moduleName": "app4all/templates/components/liquid-bind.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [
                ["content","version",["loc",[null,[28,8],[28,22]]]]
              ],
              locals: [],
              templates: []
            };
          }());
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 21,
                  "column": 4
                },
                "end": {
                  "line": 31,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/liquid-bind.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["block","if",[["get","hasBlock",["loc",[null,[25,13],[25,21]]]]],[],0,1,["loc",[null,[25,6],[29,14]]]]
            ],
            locals: ["version"],
            templates: [child0, child1]
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 2
              },
              "end": {
                "line": 32,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/liquid-bind.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","liquid-versions",[],["value",["subexpr","@mut",[["get","attrs.value",["loc",[null,[21,30],[21,41]]]]],[],[]],"notify",["subexpr","@mut",[["get","container",["loc",[null,[21,49],[21,58]]]]],[],[]],"use",["subexpr","@mut",[["get","use",["loc",[null,[21,63],[21,66]]]]],[],[]],"outletName",["subexpr","@mut",[["get","attrs.outletName",["loc",[null,[22,34],[22,50]]]]],[],[]],"name","liquid-bind","renderWhenFalse",true],0,null,["loc",[null,[21,4],[31,26]]]]
          ],
          locals: ["container"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 33,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/liquid-bind.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","liquid-container",[],["id",["subexpr","@mut",[["get","id",["loc",[null,[14,9],[14,11]]]]],[],[]],"class",["subexpr","@mut",[["get","class",["loc",[null,[15,12],[15,17]]]]],[],[]],"growDuration",["subexpr","@mut",[["get","growDuration",["loc",[null,[16,19],[16,31]]]]],[],[]],"growPixelsPerSecond",["subexpr","@mut",[["get","growPixelsPerSecond",["loc",[null,[17,26],[17,45]]]]],[],[]],"growEasing",["subexpr","@mut",[["get","growEasing",["loc",[null,[18,17],[18,27]]]]],[],[]],"enableGrowth",["subexpr","@mut",[["get","enableGrowth",["loc",[null,[19,19],[19,31]]]]],[],[]]],0,null,["loc",[null,[13,2],[32,25]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/liquid-bind.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","containerless",["loc",[null,[1,6],[1,19]]]]],[],0,1,["loc",[null,[1,0],[33,7]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('app4all/templates/components/liquid-container', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 14
          }
        },
        "moduleName": "app4all/templates/components/liquid-container.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","yield",[["get","this",["loc",[null,[1,8],[1,12]]]]],[],["loc",[null,[1,0],[1,14]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('app4all/templates/components/liquid-if', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 4,
                  "column": 4
                },
                "end": {
                  "line": 6,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/liquid-if.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              return morphs;
            },
            statements: [
              ["content","yield",["loc",[null,[5,6],[5,15]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 6,
                  "column": 4
                },
                "end": {
                  "line": 8,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/liquid-if.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","yield",[],["to","inverse"],["loc",[null,[7,6],[7,28]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 9,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/liquid-if.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","valueVersion",["loc",[null,[4,10],[4,22]]]]],[],0,1,["loc",[null,[4,4],[8,11]]]]
          ],
          locals: ["valueVersion"],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/liquid-if.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","liquid-versions",[],["value",["subexpr","@mut",[["get","showFirstBlock",["loc",[null,[2,27],[2,41]]]]],[],[]],"name",["subexpr","@mut",[["get","helperName",["loc",[null,[2,47],[2,57]]]]],[],[]],"use",["subexpr","@mut",[["get","use",["loc",[null,[3,27],[3,30]]]]],[],[]],"renderWhenFalse",["subexpr","hasBlock",["inverse"],[],["loc",[null,[3,47],[3,67]]]],"class",["subexpr","@mut",[["get","class",["loc",[null,[3,74],[3,79]]]]],[],[]]],0,null,["loc",[null,[2,2],[9,22]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          var child0 = (function() {
            return {
              meta: {
                "revision": "Ember@1.13.7",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 21,
                    "column": 6
                  },
                  "end": {
                    "line": 23,
                    "column": 6
                  }
                },
                "moduleName": "app4all/templates/components/liquid-if.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("        ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
                return morphs;
              },
              statements: [
                ["content","yield",["loc",[null,[22,8],[22,17]]]]
              ],
              locals: [],
              templates: []
            };
          }());
          var child1 = (function() {
            return {
              meta: {
                "revision": "Ember@1.13.7",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 23,
                    "column": 6
                  },
                  "end": {
                    "line": 25,
                    "column": 6
                  }
                },
                "moduleName": "app4all/templates/components/liquid-if.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("        ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
                return morphs;
              },
              statements: [
                ["inline","yield",[],["to","inverse"],["loc",[null,[24,8],[24,30]]]]
              ],
              locals: [],
              templates: []
            };
          }());
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 19,
                  "column": 4
                },
                "end": {
                  "line": 26,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/liquid-if.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["block","if",[["get","valueVersion",["loc",[null,[21,12],[21,24]]]]],[],0,1,["loc",[null,[21,6],[25,13]]]]
            ],
            locals: ["valueVersion"],
            templates: [child0, child1]
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 2
              },
              "end": {
                "line": 27,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/liquid-if.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","liquid-versions",[],["value",["subexpr","@mut",[["get","showFirstBlock",["loc",[null,[19,29],[19,43]]]]],[],[]],"notify",["subexpr","@mut",[["get","container",["loc",[null,[19,51],[19,60]]]]],[],[]],"name",["subexpr","@mut",[["get","helperName",["loc",[null,[19,66],[19,76]]]]],[],[]],"use",["subexpr","@mut",[["get","use",["loc",[null,[20,8],[20,11]]]]],[],[]],"renderWhenFalse",["subexpr","hasBlock",["inverse"],[],["loc",[null,[20,28],[20,48]]]]],0,null,["loc",[null,[19,4],[26,24]]]]
          ],
          locals: ["container"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 28,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/liquid-if.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","liquid-container",[],["id",["subexpr","@mut",[["get","id",["loc",[null,[12,9],[12,11]]]]],[],[]],"class",["subexpr","@mut",[["get","class",["loc",[null,[13,12],[13,17]]]]],[],[]],"growDuration",["subexpr","@mut",[["get","growDuration",["loc",[null,[14,19],[14,31]]]]],[],[]],"growPixelsPerSecond",["subexpr","@mut",[["get","growPixelsPerSecond",["loc",[null,[15,26],[15,45]]]]],[],[]],"growEasing",["subexpr","@mut",[["get","growEasing",["loc",[null,[16,17],[16,27]]]]],[],[]],"enableGrowth",["subexpr","@mut",[["get","enableGrowth",["loc",[null,[17,19],[17,31]]]]],[],[]]],0,null,["loc",[null,[11,2],[27,23]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 29,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/liquid-if.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","containerless",["loc",[null,[1,6],[1,19]]]]],[],0,1,["loc",[null,[1,0],[28,7]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('app4all/templates/components/liquid-modal', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/liquid-modal.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"role","dialog");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            morphs[1] = dom.createAttrMorph(element0, 'aria-labelledby');
            morphs[2] = dom.createAttrMorph(element0, 'aria-label');
            morphs[3] = dom.createMorphAt(element0,1,1);
            return morphs;
          },
          statements: [
            ["attribute","class",["concat",["lf-dialog ",["get","cc.options.dialogClass",["loc",[null,[3,28],[3,50]]]]]]],
            ["attribute","aria-labelledby",["get","cc.options.ariaLabelledBy",["loc",[null,[3,86],[3,111]]]]],
            ["attribute","aria-label",["get","cc.options.ariaLabel",["loc",[null,[3,127],[3,147]]]]],
            ["inline","lf-vue",[["get","cc.view",["loc",[null,[4,15],[4,22]]]]],["dismiss","dismiss"],["loc",[null,[4,6],[4,42]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/liquid-modal.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [
          ["block","lm-container",[],["action","escape","clickAway","outsideClick"],0,null,["loc",[null,[2,2],[6,19]]]],
          ["content","lf-overlay",["loc",[null,[7,2],[7,16]]]]
        ],
        locals: ["cc"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/liquid-modal.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","liquid-versions",[],["name","liquid-modal","value",["subexpr","@mut",[["get","currentContext",["loc",[null,[1,45],[1,59]]]]],[],[]],"renderWhenFalse",false],0,null,["loc",[null,[1,0],[8,20]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('app4all/templates/components/liquid-outlet', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 15,
                  "column": 6
                },
                "end": {
                  "line": 17,
                  "column": 6
                }
              },
              "moduleName": "app4all/templates/components/liquid-outlet.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["inline","outlet",[["get","outletName",["loc",[null,[16,17],[16,27]]]]],[],["loc",[null,[16,8],[16,29]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 19,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/liquid-outlet.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","set-outlet-state",[["get","outletName",["loc",[null,[15,26],[15,36]]]],["get","version.outletState",["loc",[null,[15,37],[15,56]]]]],[],0,null,["loc",[null,[15,6],[17,28]]]]
          ],
          locals: ["version"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 20,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/liquid-outlet.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","liquid-bind",[["get","outletState",["loc",[null,[2,17],[2,28]]]]],["id",["subexpr","@mut",[["get","id",["loc",[null,[3,9],[3,11]]]]],[],[]],"class",["subexpr","@mut",[["get","class",["loc",[null,[4,12],[4,17]]]]],[],[]],"use",["subexpr","@mut",[["get","use",["loc",[null,[5,10],[5,13]]]]],[],[]],"name","liquid-outlet","outletName",["subexpr","@mut",[["get","outletName",["loc",[null,[7,17],[7,27]]]]],[],[]],"containerless",["subexpr","@mut",[["get","containerless",["loc",[null,[8,20],[8,33]]]]],[],[]],"growDuration",["subexpr","@mut",[["get","growDuration",["loc",[null,[9,19],[9,31]]]]],[],[]],"growPixelsPerSecond",["subexpr","@mut",[["get","growPixelsPerSecond",["loc",[null,[10,26],[10,45]]]]],[],[]],"growEasing",["subexpr","@mut",[["get","growEasing",["loc",[null,[11,17],[11,27]]]]],[],[]],"enableGrowth",["subexpr","@mut",[["get","enableGrowth",["loc",[null,[12,19],[12,31]]]]],[],[]]],0,null,["loc",[null,[2,2],[19,20]]]]
        ],
        locals: ["outletState"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/liquid-outlet.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","get-outlet-state",[["get","outletName",["loc",[null,[1,21],[1,31]]]]],[],0,null,["loc",[null,[1,0],[20,21]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('app4all/templates/components/liquid-versions', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 3,
                  "column": 4
                },
                "end": {
                  "line": 5,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/liquid-versions.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["inline","yield",[["get","version.value",["loc",[null,[4,14],[4,27]]]]],[],["loc",[null,[4,6],[4,31]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/liquid-versions.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","liquid-child",[],["version",["subexpr","@mut",[["get","version",["loc",[null,[3,28],[3,35]]]]],[],[]],"liquidChildDidRender","childDidRender","class",["subexpr","@mut",[["get","class",["loc",[null,[3,80],[3,85]]]]],[],[]]],0,null,["loc",[null,[3,4],[5,21]]]]
          ],
          locals: [],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/liquid-versions.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","if",[["get","version.shouldRender",["loc",[null,[2,8],[2,28]]]]],[],0,null,["loc",[null,[2,2],[6,9]]]]
        ],
        locals: ["version"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/liquid-versions.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","each",[["get","versions",["loc",[null,[1,8],[1,16]]]]],["key","@identity"],0,null,["loc",[null,[1,0],[7,9]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('app4all/templates/components/liquid-with', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/liquid-with.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["inline","yield",[["get","version",["loc",[null,[3,13],[3,20]]]]],[],["loc",[null,[3,4],[3,24]]]]
          ],
          locals: ["version"],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/liquid-with.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","liquid-versions",[],["value",["subexpr","@mut",[["get","attrs.value",["loc",[null,[2,28],[2,39]]]]],[],[]],"use",["subexpr","@mut",[["get","use",["loc",[null,[2,44],[2,47]]]]],[],[]],"name",["subexpr","@mut",[["get","name",["loc",[null,[2,53],[2,57]]]]],[],[]],"class",["subexpr","@mut",[["get","class",["loc",[null,[2,64],[2,69]]]]],[],[]]],0,null,["loc",[null,[2,2],[4,23]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 14,
                  "column": 4
                },
                "end": {
                  "line": 16,
                  "column": 4
                }
              },
              "moduleName": "app4all/templates/components/liquid-with.hbs"
            },
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["inline","yield",[["get","version",["loc",[null,[15,15],[15,22]]]]],[],["loc",[null,[15,6],[15,26]]]]
            ],
            locals: ["version"],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 17,
                "column": 2
              }
            },
            "moduleName": "app4all/templates/components/liquid-with.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","liquid-versions",[],["value",["subexpr","@mut",[["get","attrs.value",["loc",[null,[14,30],[14,41]]]]],[],[]],"notify",["subexpr","@mut",[["get","container",["loc",[null,[14,49],[14,58]]]]],[],[]],"use",["subexpr","@mut",[["get","use",["loc",[null,[14,63],[14,66]]]]],[],[]],"name",["subexpr","@mut",[["get","name",["loc",[null,[14,72],[14,76]]]]],[],[]]],0,null,["loc",[null,[14,4],[16,25]]]]
          ],
          locals: ["container"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 18,
              "column": 0
            }
          },
          "moduleName": "app4all/templates/components/liquid-with.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","liquid-container",[],["id",["subexpr","@mut",[["get","id",["loc",[null,[7,9],[7,11]]]]],[],[]],"class",["subexpr","@mut",[["get","class",["loc",[null,[8,12],[8,17]]]]],[],[]],"growDuration",["subexpr","@mut",[["get","growDuration",["loc",[null,[9,19],[9,31]]]]],[],[]],"growPixelsPerSecond",["subexpr","@mut",[["get","growPixelsPerSecond",["loc",[null,[10,26],[10,45]]]]],[],[]],"growEasing",["subexpr","@mut",[["get","growEasing",["loc",[null,[11,17],[11,27]]]]],[],[]],"enableGrowth",["subexpr","@mut",[["get","enableGrowth",["loc",[null,[12,19],[12,31]]]]],[],[]]],0,null,["loc",[null,[6,2],[17,23]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/components/liquid-with.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","containerless",["loc",[null,[1,6],[1,19]]]]],[],0,1,["loc",[null,[1,0],[18,7]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('app4all/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 2
            },
            "end": {
              "line": 19,
              "column": 2
            }
          },
          "moduleName": "app4all/templates/index.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("fieldset");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("legend");
          var el3 = dom.createTextNode("Login form");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("label");
          dom.setAttribute(el3,"for","username");
          var el4 = dom.createTextNode("Your username");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"role","tooltip");
          dom.setAttribute(el3,"id","username-tip");
          var el4 = dom.createTextNode("Your username is your email address");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("label");
          dom.setAttribute(el3,"for","password");
          var el4 = dom.createTextNode("Your password");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3,"role","tooltip");
          dom.setAttribute(el3,"id","password-tip");
          var el4 = dom.createTextNode("Was emailed to you when you signed up");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"type","submit");
          var el2 = dom.createTextNode("Log in");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [3]),3,3);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [5]),3,3);
          return morphs;
        },
        statements: [
          ["inline","input",[],["id","username","required",true,"aria-describedby","username-tip","type","email","value",["subexpr","@mut",[["get","user_name",["loc",[null,[9,95],[9,104]]]]],[],[]]],["loc",[null,[9,8],[9,106]]]],
          ["inline","input",[],["id","password","required",true,"aria-describedby","password-tip","type","password","value",["subexpr","@mut",[["get","user_password",["loc",[null,[14,98],[14,111]]]]],[],[]]],["loc",[null,[14,8],[14,113]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "app4all/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        dom.setAttribute(el1,"id","main");
        dom.setAttribute(el1,"role","main");
        dom.setAttribute(el1,"aria-live","polite");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2,"class","invisible");
        var el3 = dom.createTextNode("Login");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),3,3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]],
        ["block","custom-form",[["get","action",["loc",[null,[4,17],[4,23]]]]],["id","login"],0,null,["loc",[null,[4,2],[19,18]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('app4all/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('app4all/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('app4all/tests/components/application-area.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/application-area.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/application-area.js should pass jshint.'); 
  });

});
define('app4all/tests/components/custom-form.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/custom-form.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/custom-form.js should pass jshint.'); 
  });

});
define('app4all/tests/controllers/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/index.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/index.js should pass jshint.'); 
  });

});
define('app4all/tests/helpers/resolver', ['exports', 'ember/resolver', 'app4all/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('app4all/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('app4all/tests/helpers/start-app', ['exports', 'ember', 'app4all/app', 'app4all/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('app4all/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('app4all/tests/initializers/a11y.jshint', function () {

  'use strict';

  QUnit.module('JSHint - initializers');
  QUnit.test('initializers/a11y.js should pass jshint', function(assert) { 
    assert.ok(true, 'initializers/a11y.js should pass jshint.'); 
  });

});
define('app4all/tests/initializers/customizations.jshint', function () {

  'use strict';

  QUnit.module('JSHint - initializers');
  QUnit.test('initializers/customizations.js should pass jshint', function(assert) { 
    assert.ok(true, 'initializers/customizations.js should pass jshint.'); 
  });

});
define('app4all/tests/initializers/field-validations.jshint', function () {

  'use strict';

  QUnit.module('JSHint - initializers');
  QUnit.test('initializers/field-validations.js should pass jshint', function(assert) { 
    assert.ok(true, 'initializers/field-validations.js should pass jshint.'); 
  });

});
define('app4all/tests/initializers/is-mobile.jshint', function () {

  'use strict';

  QUnit.module('JSHint - initializers');
  QUnit.test('initializers/is-mobile.js should pass jshint', function(assert) { 
    assert.ok(false, 'initializers/is-mobile.js should pass jshint.\ninitializers/is-mobile.js: line 8, col 1979, Expected \'{\' and instead saw \'check\'.\ninitializers/is-mobile.js: line 8, col 1989, Missing semicolon.\ninitializers/is-mobile.js: line 8, col 19, \'b\' is defined but never used.\n\n3 errors'); 
  });

});
define('app4all/tests/integration/components/application-area-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('application-area', 'Integration | Component | application area', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    var errorPanelText = 'Errors';
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 20
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'application-area', ['loc', [null, [1, 0], [1, 20]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), errorPanelText);

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'application-area', [], [], 0, null, ['loc', [null, [2, 4], [4, 25]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('app4all/tests/integration/components/application-area-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/application-area-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/application-area-test.js should pass jshint.'); 
  });

});
define('app4all/tests/integration/components/custom-form-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  var sandbox;

  ember_qunit.moduleForComponent('custom-form', 'Integration | Component | custom form', {
    integration: true,

    beforeEach: function beforeEach() {
      sandbox = sinon.sandbox.create();
    },
    afterEach: function afterEach() {
      sandbox.restore();
    }
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 15
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'custom-form', ['loc', [null, [1, 0], [1, 15]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'custom-form', [], [], 0, null, ['loc', [null, [2, 4], [4, 20]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

  ember_qunit.test('it is a form', function (assert) {
    var formContainer;

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 15
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'custom-form', ['loc', [null, [1, 0], [1, 15]]]]],
        locals: [],
        templates: []
      };
    })()));
    formContainer = this.$().children()[0];

    assert.strictEqual(formContainer.tagName.toLowerCase(), 'form');
  });

  ember_qunit.test('it has empty action attribute', function (assert) {
    var formContainer, action;

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 15
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'custom-form', ['loc', [null, [1, 0], [1, 15]]]]],
        locals: [],
        templates: []
      };
    })()));
    formContainer = this.$().children()[0];
    action = formContainer.getAttribute('action');

    assert.strictEqual(action, '');
  });

  ember_qunit.test('it has novalidate attribute', function (assert) {
    var formContainer, novalidate;

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 15
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'custom-form', ['loc', [null, [1, 0], [1, 15]]]]],
        locals: [],
        templates: []
      };
    })()));
    formContainer = this.$().children()[0];
    novalidate = formContainer.getAttribute('novalidate');

    assert.strictEqual(novalidate, 'novalidate');
  });

});
define('app4all/tests/integration/components/custom-form-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/custom-form-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/custom-form-test.js should pass jshint.'); 
  });

});
define('app4all/tests/mixins/child-broadcaster.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/child-broadcaster.js should pass jshint', function(assert) { 
    assert.ok(true, 'mixins/child-broadcaster.js should pass jshint.'); 
  });

});
define('app4all/tests/mixins/parent-listener.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/parent-listener.js should pass jshint', function(assert) { 
    assert.ok(true, 'mixins/parent-listener.js should pass jshint.'); 
  });

});
define('app4all/tests/mixins/validatable-element.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/validatable-element.js should pass jshint', function(assert) { 
    assert.ok(true, 'mixins/validatable-element.js should pass jshint.'); 
  });

});
define('app4all/tests/mixins/validation-handler.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/validation-handler.js should pass jshint', function(assert) { 
    assert.ok(true, 'mixins/validation-handler.js should pass jshint.'); 
  });

});
define('app4all/tests/mixins/validation-listener.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/validation-listener.js should pass jshint', function(assert) { 
    assert.ok(true, 'mixins/validation-listener.js should pass jshint.'); 
  });

});
define('app4all/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('app4all/tests/routes/about.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/about.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/about.js should pass jshint.'); 
  });

});
define('app4all/tests/routes/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('app4all/tests/routes/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('app4all/tests/test-helper', ['app4all/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('app4all/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('app4all/tests/transitions.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('transitions.js should pass jshint', function(assert) { 
    assert.ok(true, 'transitions.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/components/application-area-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('application-area', 'Unit | Component | application-area');

  ember_qunit.test('Collapse navigation should collapse navigation bar2', function (assert) {
    var controller = this.subject();
    controller.set('navigationDisplayed', true);

    controller.send('collapseNavigation');

    assert.notOk(controller.get('navigationDisplayed'));
  });

});
define('app4all/tests/unit/components/application-area-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/components');
  QUnit.test('unit/components/application-area-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/components/application-area-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/components/custom-form-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  var sandbox;

  ember_qunit.moduleForComponent('custom-form', 'Unit | Component | custom form', {
    beforeEach: function beforeEach() {
      sandbox = sinon.sandbox.create();
    },
    afterEach: function afterEach() {
      sandbox.restore();
    }
  });

  ember_qunit.test('it should not submit when has fields with errors', function (assert) {
    var formController = this.subject(),
        controllerAction = formController.get('controllerAction'),
        stubGet,
        spySendAction;

    sandbox.stub(formController, 'goToFirstError');

    spySendAction = sandbox.spy(formController, 'sendAction');
    sandbox.stub(formController, 'validateNonValidatedElements').returns(true);

    stubGet = sandbox.stub(formController, 'get');
    stubGet.withArgs('controllerAction').returns(controllerAction);
    stubGet.withArgs('wereAllElementsValidated').returns(true);

    stubGet.withArgs('hasElementWithError').returns(true);
    formController.submit();

    assert.notOk(spySendAction.called);
  });

  ember_qunit.test('it should not submit when has non validated fields with errors', function (assert) {
    var formController = this.subject(),
        controllerAction = formController.get('controllerAction'),
        stubGet,
        spySendAction;

    sandbox.stub(formController, 'goToFirstError');

    spySendAction = sandbox.spy(formController, 'sendAction');
    stubGet = sandbox.stub(formController, 'get');
    stubGet.withArgs('hasElementWithError').returns(false);
    stubGet.withArgs('controllerAction').returns(controllerAction);

    stubGet.withArgs('wereAllElementsValidated').returns(false);
    sandbox.stub(formController, 'validateNonValidatedElements').returns(false);
    formController.submit();

    assert.notOk(spySendAction.called);
  });

  ember_qunit.test('it should send the action to the controller on submit', function (assert) {
    var formController = this.subject(),
        controllerAction = formController.get('controllerAction'),
        spySendAction,
        stubGet;

    sandbox.stub(formController, 'goToFirstError');

    spySendAction = sandbox.spy(formController, 'sendAction');
    sandbox.stub(formController, 'validateNonValidatedElements').returns(true);

    stubGet = sandbox.stub(formController, 'get');
    stubGet.withArgs('hasElementWithError').returns(false);
    stubGet.withArgs('wereAllElementsValidated').returns(true);
    stubGet.withArgs('controllerAction').returns(controllerAction);

    formController.submit();

    assert.ok(spySendAction.calledWith('controllerAction'));
  });

});
define('app4all/tests/unit/components/custom-form-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/components');
  QUnit.test('unit/components/custom-form-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/components/custom-form-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/controllers/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('app4all/tests/unit/controllers/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/index-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/controllers/index-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/initializers/a11y-test', ['ember', 'app4all/initializers/a11y', 'app4all/initializers/customizations', 'qunit'], function (Ember, a11y, customizations, qunit) {

  'use strict';

  var registry, application;

  qunit.module('Unit | Initializer | a11y', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    a11y.initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

  qunit.test('Checbox component has bound aria attributes', function (assert) {
    a11y.initialize(registry, application);

    var checkboxInstance = Ember['default'].Checkbox.create();
    assert.ok(checkboxInstance.attributeBindings.contains('aria-controls'));
    assert.ok(checkboxInstance.attributeBindings.contains('aria-describedby'));
  });

  qunit.test('Input component has bound aria attributes', function (assert) {
    a11y.initialize(registry, application);

    var checkboxInstance = Ember['default'].TextField.create();
    assert.ok(checkboxInstance.attributeBindings.contains('aria-describedby'));
  });

  qunit.test('Press space over a link should trigger click action', function (assert) {
    a11y.initialize(registry, application);
    customizations.initialize(registry, application);

    var domLinkElement = Ember['default'].$('<a>', {
      text: 'linktest',
      href: '#'
    }).appendTo('body');
    var stub = sinon.stub(Ember['default'].$(domLinkElement)[0], 'click');

    var e = Ember['default'].$.Event('keypress');
    e.which = 32;
    e.currentTarget = domLinkElement;

    var linkComponentInstance = Ember['default'].LinkComponent.create();
    linkComponentInstance.trigger('keyPress', e);

    domLinkElement.remove();

    assert.ok(stub.called);
  });

});
define('app4all/tests/unit/initializers/a11y-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/a11y-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/initializers/a11y-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/initializers/customizations-test', ['ember', 'app4all/initializers/customizations', 'app4all/initializers/a11y', 'qunit'], function (Ember, customizations, a11y, qunit) {

  'use strict';

  var registry, application;

  qunit.module('Unit | Initializer | customizations', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    customizations.initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

  qunit.test('Links should handle actions', function (assert) {
    var linkInstance = Ember['default'].LinkComponent.create({ action: 'actionToTrigger' }),
        action = linkInstance.get('action');

    customizations.initialize(registry, application);

    assert.deepEqual(action, 'actionToTrigger');
  });

  qunit.test('Press over a navigation link should trigger controller action', function (assert) {
    var fakeView = {
      get: function get(param) {
        if (param === 'controller') {
          return this.controller;
        }
        return undefined;
      },
      send: function send(action) {
        return action;
      }
    },
        linkInstance = Ember['default'].LinkComponent.create({ action: 'actionToTrigger' }),
        spyComponent = sinon.spy(fakeView, 'send'),
        stubGet = sinon.stub(linkInstance, 'get'),
        e = Ember['default'].$.Event('click');

    a11y.initialize(registry, application);
    customizations.initialize(registry, application);

    sinon.stub(linkInstance, '_super');
    stubGet.withArgs('view').returns(fakeView);
    stubGet.withArgs('action').returns('actionToTrigger');

    linkInstance.trigger('click', e);

    assert.ok(spyComponent.calledWith('actionToTrigger'));
  });

});
define('app4all/tests/unit/initializers/customizations-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/customizations-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/initializers/customizations-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/initializers/field-validations-test', ['ember', 'app4all/initializers/field-validations', 'qunit'], function (Ember, field_validations, qunit) {

  'use strict';

  var registry, application;

  qunit.module('Unit | Initializer | field validations', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    field_validations.initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

});
define('app4all/tests/unit/initializers/field-validations-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/field-validations-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/initializers/field-validations-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/initializers/is-mobile-test', ['ember', 'app4all/initializers/is-mobile', 'qunit'], function (Ember, is_mobile, qunit) {

  'use strict';

  var registry, application;

  qunit.module('Unit | Initializer | is mobile', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    is_mobile.initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

});
define('app4all/tests/unit/initializers/is-mobile-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/is-mobile-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/initializers/is-mobile-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/mixins/child-broadcaster-test', ['ember', 'app4all/mixins/child-broadcaster', 'app4all/mixins/parent-listener', 'qunit'], function (Ember, ChildBroadcasterMixin, ParentListenerMixin, qunit) {

  'use strict';

  var broadcasterInstance, listenerInstance, sandbox;

  function setMockEnvironment() {
    var stubBroadcasterGet, broadcaster, listeners;

    broadcaster = broadcasterInstance.get('broadcaster');
    listeners = broadcasterInstance.get('listeners');

    stubBroadcasterGet = sandbox.stub(broadcasterInstance, 'get');
    stubBroadcasterGet.withArgs('broadcaster').returns(broadcaster);
    stubBroadcasterGet.withArgs('listeners').returns(listeners);

    stubBroadcasterGet.withArgs('parentView').returns(listenerInstance);
  }

  qunit.module('Unit | Mixin | child broadcaster', {
    beforeEach: function beforeEach() {
      var ChildBroadcasterObject = Ember['default'].Object.extend(ChildBroadcasterMixin['default']),
          ParentListenerObject = Ember['default'].Object.extend(ParentListenerMixin['default']);

      broadcasterInstance = ChildBroadcasterObject.create();
      listenerInstance = ParentListenerObject.create();

      sandbox = sinon.sandbox.create();
    },
    afterEach: function afterEach() {
      sandbox.restore();
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ChildBroadcasterObject = Ember['default'].Object.extend(ChildBroadcasterMixin['default']);
    var subject = ChildBroadcasterObject.create();
    assert.ok(subject);
  });

  qunit.test('it should initialize properties', function (assert) {
    assert.expect(3);
    var listeners, publicProperties, publicMethods;

    listeners = broadcasterInstance.get('listeners');
    publicProperties = broadcasterInstance.get('publicProperties');
    publicMethods = broadcasterInstance.get('publicMethods');

    assert.ok(listeners !== null, 'The listeners were initialize');
    assert.ok(publicProperties !== null, 'The public properties were initialize');
    assert.ok(publicMethods !== null, 'The public methods were initialize');
  });

  qunit.test('it should subscribe to its listeners', function (assert) {
    var spyListenerAddBroadcaster;

    setMockEnvironment();
    spyListenerAddBroadcaster = sandbox.spy(listenerInstance, 'addBroadcaster');

    broadcasterInstance.onElementInserted();

    assert.ok(spyListenerAddBroadcaster.called, 'The broadcaster were subscribed by the listener');
  });

  qunit.test('it should unsubscribe to its listeners on destruction', function (assert) {
    var spyListenerRemoveBroadcasterr;

    setMockEnvironment();
    spyListenerRemoveBroadcasterr = sandbox.spy(listenerInstance, 'removeBroadcaster');
    broadcasterInstance.addListener(listenerInstance.get('listener'));

    broadcasterInstance.onElementDestroyed();

    assert.ok(spyListenerRemoveBroadcasterr.called, 'The broadcaster were unsubscribed');
  });

  qunit.test('it should notify its actions to its listeners', function (assert) {
    var spyListenerProcessAction,
        action = 'action',
        params = {
      param1: 'param1',
      param2: 'param2'
    };

    setMockEnvironment();
    spyListenerProcessAction = sandbox.spy(listenerInstance, 'processAction');
    broadcasterInstance.addListener(listenerInstance.get('listener'));

    broadcasterInstance.notifyAction(action, params);

    assert.ok(spyListenerProcessAction.calledWith(action, params), 'The broadcaster received the action');
  });

});
define('app4all/tests/unit/mixins/child-broadcaster-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/child-broadcaster-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/mixins/child-broadcaster-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/mixins/parent-listener-test', ['ember', 'app4all/mixins/parent-listener', 'app4all/mixins/child-broadcaster', 'qunit'], function (Ember, ParentListenerMixin, ChildBroadcasterMixin, qunit) {

  'use strict';

  var broadcasterInstance, listenerInstance, sandbox;

  qunit.module('Unit | Mixin | parent listener', {
    beforeEach: function beforeEach() {
      var ChildBroadcasterObject = Ember['default'].Object.extend(ChildBroadcasterMixin['default']),
          ParentListenerObject = Ember['default'].Object.extend(ParentListenerMixin['default']);

      broadcasterInstance = ChildBroadcasterObject.create();
      listenerInstance = ParentListenerObject.create();

      sandbox = sinon.sandbox.create();
    },
    afterEach: function afterEach() {
      sandbox.restore();
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ParentListenerObject = Ember['default'].Object.extend(ParentListenerMixin['default']);
    var subject = ParentListenerObject.create();
    assert.ok(subject);
  });

  qunit.test('it should initialize properties', function (assert) {
    var broadcasters;

    broadcasters = listenerInstance.get('broadcasters');

    assert.ok(broadcasters !== null, 'The broadcasters were initialize');
  });

  qunit.test('it should subscribe to its broadcasters', function (assert) {
    var spyBroadcasterAddListener;

    spyBroadcasterAddListener = sandbox.spy(broadcasterInstance, 'addListener');

    listenerInstance.addBroadcaster(broadcasterInstance.get('broadcaster'));

    assert.ok(spyBroadcasterAddListener.called, 'The listener were subscribed');
  });

});
define('app4all/tests/unit/mixins/parent-listener-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/parent-listener-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/mixins/parent-listener-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/mixins/validatable-element-test', ['ember', 'app4all/mixins/validatable-element', 'app4all/mixins/validation-listener', 'qunit'], function (Ember, ValidatableElementMixin, ValidationListenerMixin, qunit) {

  'use strict';

  var textFieldInstance, listenerInstance, stubTextFieldGet, sandbox;

  function setMockEnvironment() {
    var broadcaster, listeners, publicProperties, publicMethods;

    broadcaster = textFieldInstance.get('broadcaster');
    listeners = textFieldInstance.get('listeners');
    publicProperties = textFieldInstance.get('publicProperties');
    publicMethods = textFieldInstance.get('publicMethods');

    stubTextFieldGet = sandbox.stub(textFieldInstance, 'get');
    stubTextFieldGet.withArgs('broadcaster').returns(broadcaster);
    stubTextFieldGet.withArgs('listeners').returns(listeners);

    publicProperties.pushObject('wasValidated');
    stubTextFieldGet.withArgs('publicProperties').returns(publicProperties);
    stubTextFieldGet.withArgs('wasValidated').returns(textFieldInstance.wasValidated);

    publicMethods.pushObject('validate');
    stubTextFieldGet.withArgs('publicMethods').returns(publicMethods);

    stubTextFieldGet.withArgs('parentView').returns(listenerInstance);

    textFieldInstance.onElementInserted();
  }

  function createHTMLElement(template) {
    return Ember['default'].$(template)[0];
  }

  function stubTextFieldTemplate(HTMLTemplate) {
    if (HTMLTemplate) {
      stubTextFieldGet.withArgs('element').returns(HTMLTemplate);
    } else {
      stubTextFieldGet.withArgs('element').returns(createHTMLElement('<input id="username" required="" type="email">'));
    }
    return textFieldInstance;
  }

  qunit.module('Unit | Mixin | validatable element', {
    beforeEach: function beforeEach() {
      var TextFieldExtended = Ember['default'].TextField.extend(ValidatableElementMixin['default']),
          ValidationListenerObject = Ember['default'].Object.extend(ValidationListenerMixin['default']);

      textFieldInstance = TextFieldExtended.create();
      listenerInstance = ValidationListenerObject.create();

      sandbox = sinon.sandbox.create();
    },
    afterEach: function afterEach() {
      textFieldInstance.onElementDestroyed();
      sandbox.restore();
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ValidatableElementObject = Ember['default'].Object.extend(ValidatableElementMixin['default']);
    var subject = ValidatableElementObject.create();
    assert.ok(subject);
  });

  qunit.test('Public methods and properties should be properly initialized', function (assert) {
    var wasValidated, validate;

    textFieldInstance.initializeValidatableElement();

    wasValidated = textFieldInstance.get('publicProperties').contains('wasValidated');
    validate = textFieldInstance.get('publicMethods').contains('validate');

    assert.ok(wasValidated, 'Property "wasValidated" initialized');
    assert.ok(validate, 'Method "validate" initialized');
  });

  qunit.test('Listeners should be able to access to public properties', function (assert) {
    var publicWasValidated;

    setMockEnvironment();
    publicWasValidated = listenerInstance.get('broadcasters')[0].getProperty('wasValidated');

    assert.ok(textFieldInstance.wasValidated === publicWasValidated, 'The property was read by the listener');
  });

  qunit.test('Listeners should be able to access to public methods', function (assert) {
    var spyTextFieldValidate;

    setMockEnvironment();
    stubTextFieldTemplate();
    spyTextFieldValidate = sandbox.spy(textFieldInstance, 'validate');

    listenerInstance.get('broadcasters')[0].callMethod('validate');

    assert.ok(spyTextFieldValidate.called, 'The method was called by the listener');
  });

  qunit.test('Listeners should be notified on input errors', function (assert) {
    var spyListenerProcessAction;

    spyListenerProcessAction = sandbox.spy(listenerInstance, 'processAction');
    setMockEnvironment();
    stubTextFieldTemplate();

    textFieldInstance.validate();

    assert.strictEqual('new_error', spyListenerProcessAction.getCall(0).args[0], 'The action "new_error" is received in by the listener');
  });

  qunit.test('Listeners should be notified on corrected errors', function (assert) {
    var spyListenerProcessAction,
        inputCorrected = '<input id="username" required="" type="email" value="user@email.com">';

    spyListenerProcessAction = sandbox.spy(listenerInstance, 'processAction');
    setMockEnvironment();
    stubTextFieldTemplate();
    stubTextFieldGet.withArgs('hasError').returns(textFieldInstance.hasError);
    textFieldInstance.validate();

    stubTextFieldTemplate(createHTMLElement(inputCorrected));
    stubTextFieldGet.withArgs('hasError').returns(textFieldInstance.hasError);
    textFieldInstance.validate();

    assert.strictEqual('error_corrected', spyListenerProcessAction.getCall(1).args[0], 'The action "error_corrected" is received in by the listener');
  });

  qunit.test('The validation flag should be updated on first validation', function (assert) {
    setMockEnvironment();
    stubTextFieldTemplate();

    textFieldInstance.validate();

    assert.ok(textFieldInstance.wasValidated, 'Property "wasValidated" correctly updated');
  });

  qunit.test('Validation returns false on invalid fields', function (assert) {
    var valid;

    setMockEnvironment();
    stubTextFieldTemplate();
    valid = textFieldInstance.validate();

    assert.notOk(valid, 'The validation returns false');
  });

  qunit.test('Validation returns true on valid fields', function (assert) {
    var validInput = '<input id="username" required="" type="email" value="user@email.com">',
        valid;

    setMockEnvironment();
    stubTextFieldTemplate(createHTMLElement(validInput));
    valid = textFieldInstance.validate();

    assert.ok(valid, 'The validation returns true');
  });

  qunit.test('Validation on invalid inputs with "formnovalidate" should not notify the listeners and returns true', function (assert) {
    var invalidInput = '<input id="username" required="" type="email" formnovalidate>',
        valid,
        spyListenerProcessAction;

    spyListenerProcessAction = sandbox.spy(listenerInstance, 'processAction');
    setMockEnvironment();
    stubTextFieldTemplate(createHTMLElement(invalidInput));

    valid = textFieldInstance.validate();

    assert.ok(valid, 'The validation returns true');
    assert.notOk(spyListenerProcessAction.called, 'The listener were not notify');
  });

});
define('app4all/tests/unit/mixins/validatable-element-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/validatable-element-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/mixins/validatable-element-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/mixins/validation-handler-test', ['ember', 'app4all/mixins/validation-handler', 'qunit'], function (Ember, ValidationHandlerMixin, qunit) {

  'use strict';

  var validationHandlerInstance;

  qunit.module('Unit | Mixin | validation handler', {
    beforeEach: function beforeEach() {
      var ValidationHandlerObject = Ember['default'].Object.extend(ValidationHandlerMixin['default']);
      validationHandlerInstance = ValidationHandlerObject.create();
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ValidationHandlerObject = Ember['default'].Object.extend(ValidationHandlerMixin['default']);
    var subject = ValidationHandlerObject.create();
    assert.ok(subject);
  });

  qunit.test('it should build an accessible ARIA container', function (assert) {
    assert.expect(3);
    var errorContainer, role, atomic, live;

    errorContainer = Ember['default'].$('<div id="error-handler-errors" aria-atomic="false"></div>');
    sinon.stub(validationHandlerInstance, 'getErrorContainer').returns(errorContainer);

    validationHandlerInstance.prepareErrorContainer();

    role = errorContainer.attr('role');
    atomic = errorContainer.attr('aria-atomic');
    live = errorContainer.attr('aria-live');

    assert.strictEqual(role, 'alert');
    assert.strictEqual(atomic, 'true');
    assert.strictEqual(live, 'assertive');
  });

});
define('app4all/tests/unit/mixins/validation-handler-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/validation-handler-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/mixins/validation-handler-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/mixins/validation-listener-test', ['ember', 'app4all/mixins/validation-listener', 'qunit'], function (Ember, ValidationListenerMixin, qunit) {

  'use strict';

  var listenerInstance;

  function createHTMLElement(template) {
    return Ember['default'].$(template)[0];
  }

  qunit.module('Unit | Mixin | validation listener', {
    beforeEach: function beforeEach() {
      var ValidationListenerObject = Ember['default'].Object.extend(ValidationListenerMixin['default']);

      listenerInstance = ValidationListenerObject.create();
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ValidationListenerObject = Ember['default'].Object.extend(ValidationListenerMixin['default']);
    var subject = ValidationListenerObject.create();
    assert.ok(subject);
  });

  qunit.test('The action "new_error" should add an error to the system', function (assert) {
    var invalidInput = createHTMLElement('<input id="username" required="" type="email">'),
        message = invalidInput.validationMessage;

    listenerInstance.processAction('new_error', {
      input: invalidInput,
      message: message
    });

    assert.ok(listenerInstance.get('hasElementWithError'), "An error were added to the system");
  });

  qunit.test('The action "error_corrected" should remove the error of the system', function (assert) {
    var invalidInput = createHTMLElement('<input id="username" required="" type="email">'),
        message = invalidInput.validationMessage;

    listenerInstance.processAction('new_error', {
      input: invalidInput,
      message: message
    });

    listenerInstance.processAction('error_corrected', {
      input: invalidInput
    });

    assert.notOk(listenerInstance.get('hasElementWithError'), "The error were removed of the system");
  });

  qunit.test('The errors are never duplicated in the system', function (assert) {
    var invalidInput = createHTMLElement('<input id="username" required="" type="email">'),
        message = invalidInput.validationMessage;

    listenerInstance.processAction('new_error', {
      input: invalidInput,
      message: message
    });

    listenerInstance.processAction('new_error', {
      input: invalidInput,
      message: message
    });

    assert.ok(listenerInstance.get('errors').length === 1, "There are only an error in the system");
  });

});
define('app4all/tests/unit/mixins/validation-listener-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/validation-listener-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/mixins/validation-listener-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/routes/about-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('app4all/tests/unit/routes/about-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/about-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/about-test.js should pass jshint.'); 
  });

});
define('app4all/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('app4all/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/index-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
define('app4all/transitions/cross-fade', ['exports', 'liquid-fire'], function (exports, liquid_fire) {

  'use strict';


  exports['default'] = crossFade;
  // BEGIN-SNIPPET cross-fade-definition
  function crossFade() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    liquid_fire.stop(this.oldElement);
    return liquid_fire.Promise.all([liquid_fire.animate(this.oldElement, { opacity: 0 }, opts), liquid_fire.animate(this.newElement, { opacity: [opts.maxOpacity || 1, 0] }, opts)]);
  }

  // END-SNIPPET

});
define('app4all/transitions/default', ['exports', 'liquid-fire'], function (exports, liquid_fire) {

  'use strict';


  exports['default'] = defaultTransition;
  function defaultTransition() {
    if (this.newElement) {
      this.newElement.css({ visibility: '' });
    }
    return liquid_fire.Promise.resolve();
  }

});
define('app4all/transitions/explode', ['exports', 'ember', 'liquid-fire'], function (exports, Ember, liquid_fire) {

  'use strict';



  exports['default'] = explode;

  function explode() {
    var _this = this;

    var seenElements = {};
    var sawBackgroundPiece = false;

    for (var _len = arguments.length, pieces = Array(_len), _key = 0; _key < _len; _key++) {
      pieces[_key] = arguments[_key];
    }

    var promises = pieces.map(function (piece) {
      if (piece.matchBy) {
        return matchAndExplode(_this, piece, seenElements);
      } else if (piece.pick || piece.pickOld || piece.pickNew) {
        return explodePiece(_this, piece, seenElements);
      } else {
        sawBackgroundPiece = true;
        return runAnimation(_this, piece);
      }
    });
    if (!sawBackgroundPiece) {
      if (this.newElement) {
        this.newElement.css({ visibility: '' });
      }
      if (this.oldElement) {
        this.oldElement.css({ visibility: 'hidden' });
      }
    }
    return liquid_fire.Promise.all(promises);
  }

  function explodePiece(context, piece, seen) {
    var childContext = Ember['default'].copy(context);
    var selectors = [piece.pickOld || piece.pick, piece.pickNew || piece.pick];
    var cleanupOld, cleanupNew;

    if (selectors[0] || selectors[1]) {
      cleanupOld = _explodePart(context, 'oldElement', childContext, selectors[0], seen);
      cleanupNew = _explodePart(context, 'newElement', childContext, selectors[1], seen);
      if (!cleanupOld && !cleanupNew) {
        return liquid_fire.Promise.resolve();
      }
    }

    return runAnimation(childContext, piece)["finally"](function () {
      if (cleanupOld) {
        cleanupOld();
      }
      if (cleanupNew) {
        cleanupNew();
      }
    });
  }

  function _explodePart(context, field, childContext, selector, seen) {
    var child, childOffset, width, height, newChild;
    var elt = context[field];

    childContext[field] = null;
    if (elt && selector) {
      child = elt.find(selector).filter(function () {
        var guid = Ember['default'].guidFor(this);
        if (!seen[guid]) {
          seen[guid] = true;
          return true;
        }
      });
      if (child.length > 0) {
        childOffset = child.offset();
        width = child.outerWidth();
        height = child.outerHeight();
        newChild = child.clone();

        // Hide the original element
        child.css({ visibility: 'hidden' });

        // If the original element's parent was hidden, hide our clone
        // too.
        if (elt.css('visibility') === 'hidden') {
          newChild.css({ visibility: 'hidden' });
        }
        newChild.appendTo(elt.parent());
        newChild.outerWidth(width);
        newChild.outerHeight(height);
        var newParentOffset = newChild.offsetParent().offset();
        newChild.css({
          position: 'absolute',
          top: childOffset.top - newParentOffset.top,
          left: childOffset.left - newParentOffset.left,
          margin: 0
        });

        // Pass the clone to the next animation
        childContext[field] = newChild;
        return function cleanup() {
          newChild.remove();
          child.css({ visibility: '' });
        };
      }
    }
  }

  function animationFor(context, piece) {
    var name, args, func;
    if (!piece.use) {
      throw new Error("every argument to the 'explode' animation must include a followup animation to 'use'");
    }
    if (Ember['default'].isArray(piece.use)) {
      name = piece.use[0];
      args = piece.use.slice(1);
    } else {
      name = piece.use;
      args = [];
    }
    if (typeof name === 'function') {
      func = name;
    } else {
      func = context.lookup(name);
    }
    return function () {
      return liquid_fire.Promise.resolve(func.apply(this, args));
    };
  }

  function runAnimation(context, piece) {
    return new liquid_fire.Promise(function (resolve, reject) {
      animationFor(context, piece).apply(context).then(resolve, reject);
    });
  }

  function matchAndExplode(context, piece, seen) {
    if (!context.oldElement || !context.newElement) {
      return liquid_fire.Promise.resolve();
    }

    // reduce the matchBy scope
    if (piece.pick) {
      context.oldElement = context.oldElement.find(piece.pick);
      context.newElement = context.newElement.find(piece.pick);
    }

    if (piece.pickOld) {
      context.oldElement = context.oldElement.find(piece.pickOld);
    }

    if (piece.pickNew) {
      context.newElement = context.newElement.find(piece.pickNew);
    }

    // use the fastest selector available
    var selector;

    if (piece.matchBy === 'id') {
      selector = function (attrValue) {
        return "#" + attrValue;
      };
    } else if (piece.matchBy === 'class') {
      selector = function (attrValue) {
        return "." + attrValue;
      };
    } else {
      selector = function (attrValue) {
        var escapedAttrValue = attrValue.replace(/'/g, "\\'");
        return "[" + piece.matchBy + "='" + escapedAttrValue + "']";
      };
    }

    var hits = Ember['default'].A(context.oldElement.find("[" + piece.matchBy + "]").toArray());
    return liquid_fire.Promise.all(hits.map(function (elt) {
      var attrValue = Ember['default'].$(elt).attr(piece.matchBy);

      // if there is no match for a particular item just skip it
      if (attrValue === "" || context.newElement.find(selector(attrValue)).length === 0) {
        return liquid_fire.Promise.resolve();
      }

      return explodePiece(context, {
        pick: selector(attrValue),
        use: piece.use
      }, seen);
    }));
  }

});
define('app4all/transitions/fade', ['exports', 'liquid-fire'], function (exports, liquid_fire) {

  'use strict';


  exports['default'] = fade;

  // BEGIN-SNIPPET fade-definition
  function fade() {
    var _this = this;

    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var firstStep;
    var outOpts = opts;
    var fadingElement = findFadingElement(this);

    if (fadingElement) {
      // We still have some older version that is in the process of
      // fading out, so out first step is waiting for it to finish.
      firstStep = liquid_fire.finish(fadingElement, 'fade-out');
    } else {
      if (liquid_fire.isAnimating(this.oldElement, 'fade-in')) {
        // if the previous view is partially faded in, scale its
        // fade-out duration appropriately.
        outOpts = { duration: liquid_fire.timeSpent(this.oldElement, 'fade-in') };
      }
      liquid_fire.stop(this.oldElement);
      firstStep = liquid_fire.animate(this.oldElement, { opacity: 0 }, outOpts, 'fade-out');
    }
    return firstStep.then(function () {
      return liquid_fire.animate(_this.newElement, { opacity: [opts.maxOpacity || 1, 0] }, opts, 'fade-in');
    });
  }

  function findFadingElement(context) {
    for (var i = 0; i < context.older.length; i++) {
      var entry = context.older[i];
      if (liquid_fire.isAnimating(entry.element, 'fade-out')) {
        return entry.element;
      }
    }
    if (liquid_fire.isAnimating(context.oldElement, 'fade-out')) {
      return context.oldElement;
    }
  }
  // END-SNIPPET

});
define('app4all/transitions/flex-grow', ['exports', 'liquid-fire'], function (exports, liquid_fire) {

  'use strict';


  exports['default'] = flexGrow;
  function flexGrow(opts) {
    liquid_fire.stop(this.oldElement);
    return liquid_fire.Promise.all([liquid_fire.animate(this.oldElement, { 'flex-grow': 0 }, opts), liquid_fire.animate(this.newElement, { 'flex-grow': [1, 0] }, opts)]);
  }

});
define('app4all/transitions/fly-to', ['exports', 'liquid-fire'], function (exports, liquid_fire) {

  'use strict';



  exports['default'] = flyTo;
  function flyTo() {
    var _this = this;

    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!this.newElement) {
      return liquid_fire.Promise.resolve();
    } else if (!this.oldElement) {
      this.newElement.css({ visibility: '' });
      return liquid_fire.Promise.resolve();
    }

    var oldOffset = this.oldElement.offset();
    var newOffset = this.newElement.offset();

    if (opts.movingSide === 'new') {
      var motion = {
        translateX: [0, oldOffset.left - newOffset.left],
        translateY: [0, oldOffset.top - newOffset.top],
        outerWidth: [this.newElement.outerWidth(), this.oldElement.outerWidth()],
        outerHeight: [this.newElement.outerHeight(), this.oldElement.outerHeight()]
      };
      this.oldElement.css({ visibility: 'hidden' });
      return liquid_fire.animate(this.newElement, motion, opts);
    } else {
      var motion = {
        translateX: newOffset.left - oldOffset.left,
        translateY: newOffset.top - oldOffset.top,
        outerWidth: this.newElement.outerWidth(),
        outerHeight: this.newElement.outerHeight()
      };
      this.newElement.css({ visibility: 'hidden' });
      return liquid_fire.animate(this.oldElement, motion, opts).then(function () {
        _this.newElement.css({ visibility: '' });
      });
    }
  }

});
define('app4all/transitions/move-over', ['exports', 'liquid-fire'], function (exports, liquid_fire) {

  'use strict';



  exports['default'] = moveOver;

  function moveOver(dimension, direction, opts) {
    var _this = this;

    var oldParams = {},
        newParams = {},
        firstStep,
        property,
        measure;

    if (dimension.toLowerCase() === 'x') {
      property = 'translateX';
      measure = 'width';
    } else {
      property = 'translateY';
      measure = 'height';
    }

    if (liquid_fire.isAnimating(this.oldElement, 'moving-in')) {
      firstStep = liquid_fire.finish(this.oldElement, 'moving-in');
    } else {
      liquid_fire.stop(this.oldElement);
      firstStep = liquid_fire.Promise.resolve();
    }

    return firstStep.then(function () {
      var bigger = biggestSize(_this, measure);
      oldParams[property] = bigger * direction + 'px';
      newParams[property] = ["0px", -1 * bigger * direction + 'px'];

      return liquid_fire.Promise.all([liquid_fire.animate(_this.oldElement, oldParams, opts), liquid_fire.animate(_this.newElement, newParams, opts, 'moving-in')]);
    });
  }

  function biggestSize(context, dimension) {
    var sizes = [];
    if (context.newElement) {
      sizes.push(parseInt(context.newElement.css(dimension), 10));
      sizes.push(parseInt(context.newElement.parent().css(dimension), 10));
    }
    if (context.oldElement) {
      sizes.push(parseInt(context.oldElement.css(dimension), 10));
      sizes.push(parseInt(context.oldElement.parent().css(dimension), 10));
    }
    return Math.max.apply(null, sizes);
  }

});
define('app4all/transitions/scale', ['exports', 'liquid-fire'], function (exports, liquid_fire) {

  'use strict';



  exports['default'] = scale;
  function scale() {
    var _this = this;

    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return liquid_fire.animate(this.oldElement, { scale: [0.2, 1] }, opts).then(function () {
      return liquid_fire.animate(_this.newElement, { scale: [1, 0.2] }, opts);
    });
  }

});
define('app4all/transitions/scroll-then', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = function (nextTransitionName, options) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    var _this = this;

    Ember['default'].assert("You must provide a transition name as the first argument to scrollThen. Example: this.use('scrollThen', 'toLeft')", 'string' === typeof nextTransitionName);

    var el = document.getElementsByTagName('html');
    var nextTransition = this.lookup(nextTransitionName);
    if (!options) {
      options = {};
    }

    Ember['default'].assert("The second argument to scrollThen is passed to Velocity's scroll function and must be an object", 'object' === typeof options);

    // set scroll options via: this.use('scrollThen', 'ToLeft', {easing: 'spring'})
    options = Ember['default'].merge({ duration: 500, offset: 0 }, options);

    // additional args can be passed through after the scroll options object
    // like so: this.use('scrollThen', 'moveOver', {duration: 100}, 'x', -1);

    return window.$.Velocity(el, 'scroll', options).then(function () {
      nextTransition.apply(_this, rest);
    });
  }

});
define('app4all/transitions/to-down', ['exports', 'app4all/transitions/move-over'], function (exports, moveOver) {

  'use strict';

  exports['default'] = function (opts) {
    return moveOver['default'].call(this, 'y', 1, opts);
  }

});
define('app4all/transitions/to-left', ['exports', 'app4all/transitions/move-over'], function (exports, moveOver) {

  'use strict';

  exports['default'] = function (opts) {
    return moveOver['default'].call(this, 'x', -1, opts);
  }

});
define('app4all/transitions/to-right', ['exports', 'app4all/transitions/move-over'], function (exports, moveOver) {

  'use strict';

  exports['default'] = function (opts) {
    return moveOver['default'].call(this, 'x', 1, opts);
  }

});
define('app4all/transitions/to-up', ['exports', 'app4all/transitions/move-over'], function (exports, moveOver) {

  'use strict';

  exports['default'] = function (opts) {
    return moveOver['default'].call(this, 'y', -1, opts);
  }

});
define('app4all/transitions', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function () {
    this.transition(this.fromRoute('index'), this.toRoute('about'), this.use('toLeft'), this.reverse('toRight'));
  }

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('app4all/config/environment', ['ember'], function(Ember) {
  var prefix = 'app4all';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("app4all/tests/test-helper");
} else {
  require("app4all/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true,"name":"app4all","version":"0.0.0+a21dbbfb"});
}

/* jshint ignore:end */
//# sourceMappingURL=app4all.map