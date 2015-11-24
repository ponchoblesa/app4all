import Ember from 'ember';
import ChildBroadcasterMixin from '../../../mixins/child-broadcaster';
import ParentListenerMixin from '../../../mixins/parent-listener';
import { module, test } from 'qunit';

var broadcasterInstance,
    listenerInstance,
    sandbox;

function setMockEnvironment() {
  var stubBroadcasterGet,
      broadcaster,
      listeners;

  broadcaster = broadcasterInstance.get('broadcaster');
  listeners = broadcasterInstance.get('listeners');

  stubBroadcasterGet = sandbox.stub(broadcasterInstance, 'get');
  stubBroadcasterGet.withArgs('broadcaster').returns(broadcaster);
  stubBroadcasterGet.withArgs('listeners').returns(listeners);

  stubBroadcasterGet.withArgs('parentView').returns(listenerInstance);
}

module('Unit | Mixin | child broadcaster', {
  beforeEach: function(){
    var ChildBroadcasterObject = Ember.Object.extend(ChildBroadcasterMixin),
        ParentListenerObject = Ember.Object.extend(ParentListenerMixin);

    broadcasterInstance = ChildBroadcasterObject.create();
    listenerInstance = ParentListenerObject.create();

    sandbox = sinon.sandbox.create();
  },
  afterEach: function(){
    sandbox.restore();
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  var ChildBroadcasterObject = Ember.Object.extend(ChildBroadcasterMixin);
  var subject = ChildBroadcasterObject.create();
  assert.ok(subject);
});

test('it should initialize properties', function(assert){
  assert.expect(3);
  var listeners,
      publicProperties,
      publicMethods;

  listeners = broadcasterInstance.get('listeners');
  publicProperties = broadcasterInstance.get('publicProperties');
  publicMethods = broadcasterInstance.get('publicMethods');

  assert.ok(listeners !== null, 'The listeners were initialize');
  assert.ok(publicProperties !== null, 'The public properties were initialize');
  assert.ok(publicMethods !== null, 'The public methods were initialize');
});

test('it should subscribe to its listeners', function(assert){
  var spyListenerAddBroadcaster;

  setMockEnvironment();
  spyListenerAddBroadcaster= sandbox.spy(listenerInstance, 'addBroadcaster');

  broadcasterInstance.onElementInserted();

  assert.ok(spyListenerAddBroadcaster.called, 'The broadcaster were subscribed by the listener');
});

test('it should unsubscribe to its listeners on destruction', function(assert){
  var spyListenerRemoveBroadcasterr;

  setMockEnvironment();
  spyListenerRemoveBroadcasterr = sandbox.spy(listenerInstance, 'removeBroadcaster');
  broadcasterInstance.addListener(listenerInstance.get('listener'));

  broadcasterInstance.onElementDestroyed();

  assert.ok(spyListenerRemoveBroadcasterr.called, 'The broadcaster were unsubscribed');
});

test('it should notify its actions to its listeners', function(assert){
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


