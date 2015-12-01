import Ember from 'ember';
import { initialize } from '../../../initializers/a11y';
import { initialize as customizationsInitialize } from '../../../initializers/customizations';
import { module, test } from 'qunit';

/* global navigator: false */

var registry, application,
    helpers = {
      // Determine if tests are running in PhantomJS
      is_phantom: navigator.userAgent.toLowerCase().indexOf('phantom') > -1,
    };

module('Unit | Initializer | a11y', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(registry, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

test('Checbox component has bound aria attributes', function(assert){
  initialize(registry, application);

  var checkboxInstance = Ember.Checkbox.create();
  assert.ok(checkboxInstance.attributeBindings.contains('aria-controls'));
  assert.ok(checkboxInstance.attributeBindings.contains('aria-describedby'));
});

test('Input component has bound aria attributes', function(assert){
  initialize(registry, application);

  var checkboxInstance = Ember.TextField.create();
  assert.ok(checkboxInstance.attributeBindings.contains('aria-describedby'));
});

test('Press space over a link should trigger click action', function(assert){
  if (!helpers.is_phantom) {
    initialize(registry, application);
    customizationsInitialize(registry, application);

    var domLinkElement = Ember.$('<a>',{
            text: 'linktest',
            href: '#'
        }).appendTo('body'),
        stub = sinon.stub(Ember.$(domLinkElement)[0], 'click'),
        e = Ember.$.Event('keypress'),
        linkComponentInstance = Ember.LinkComponent.create();

    e.which = 32;
    e.currentTarget = domLinkElement;

    linkComponentInstance.trigger('keyPress', e);

    domLinkElement.remove();

    assert.ok(stub.called);
  } else {
    assert.ok(true, 'Skiped test in phantom');
  }

});

