import Ember from 'ember';
import { initialize } from '../../../initializers/customizations';
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
  initialize(registry, application);

  var linkInstance = Ember.LinkView.create({action:'actionToTrigger'});
  var action = linkInstance.get('action');

  assert.deepEqual(action, 'actionToTrigger');
});

test('Press over a navigation link should trigger controller action', function(assert){
  initialize(registry, application);

  var fakeController = {
    send: function(action){
      return action;
    }
  };
  var fakeView = {
    controller: fakeController,
    get: function (param) {
      if (param === 'controller') {
        return this.controller;
      }
      return undefined;
    }
  };

  var linkInstance = Ember.LinkView.create({action:'actionToTrigger'});
  var spyController = sinon.spy(fakeController, 'send');
  var stubGet = sinon.stub(linkInstance, 'get');
  sinon.stub(linkInstance, '_super');
  stubGet.withArgs('view').returns(fakeView);
  stubGet.withArgs('action').returns('actionToTrigger');

  var e = Ember.$.Event('click');
  linkInstance.trigger('click', e);


  assert.ok(spyController.calledWith('actionToTrigger'));
});

