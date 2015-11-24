import Ember from 'ember';
import ParentListenerMixin from '../../../mixins/parent-listener';
import ChildBroadcasterMixin from '../../../mixins/child-broadcaster';
import { module, test } from 'qunit';

var broadcasterInstance,
    listenerInstance,
    sandbox;

module('Unit | Mixin | parent listener', {
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
  var ParentListenerObject = Ember.Object.extend(ParentListenerMixin);
  var subject = ParentListenerObject.create();
  assert.ok(subject);
});


test('it should initialize properties', function(assert){
  var broadcasters;

  broadcasters = listenerInstance.get('broadcasters');

  assert.ok(broadcasters !== null, 'The broadcasters were initialize');
});

test('it should subscribe to its broadcasters', function(assert){
  var spyBroadcasterAddListener;

  spyBroadcasterAddListener= sandbox.spy(broadcasterInstance, 'addListener');

  listenerInstance.addBroadcaster(broadcasterInstance.get('broadcaster'));

  assert.ok(spyBroadcasterAddListener.called, 'The listener were subscribed');
});
