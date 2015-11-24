import Ember from 'ember';
import { initialize } from '../../../initializers/customizations';
import { initialize as a11yInitialize } from '../../../initializers/a11y';
import { module, test } from 'qunit';

var registry, application;

module('Unit | Initializer | customizations', {
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

test('Links should handle actions', function (assert){
  var linkInstance = Ember.LinkComponent.create({action:'actionToTrigger'}),
      action = linkInstance.get('action');

  initialize(registry, application);

  assert.deepEqual(action, 'actionToTrigger');
});

test('Press over a navigation link should trigger controller action', function(assert){
  var fakeView = {
        get: function (param) {
          if (param === 'controller') {
            return this.controller;
          }
          return undefined;
        },
        send: function(action){
          return action;
        }
      },
      linkInstance = Ember.LinkComponent.create({action:'actionToTrigger'}),
      spyComponent = sinon.spy(fakeView, 'send'),
      stubGet = sinon.stub(linkInstance, 'get'),
      e = Ember.$.Event('click');

  a11yInitialize(registry, application);
  initialize(registry, application);

  sinon.stub(linkInstance, '_super');
  stubGet.withArgs('view').returns(fakeView);
  stubGet.withArgs('action').returns('actionToTrigger');

  linkInstance.trigger('click', e);

  assert.ok(spyComponent.calledWith('actionToTrigger'));
});

