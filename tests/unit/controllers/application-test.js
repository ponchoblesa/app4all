import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});


test('Press over a navigation link should collapse them', function(assert){
	var controller = this.subject();
	var fakeView = {
		controller: controller,
		get: function (param) {
			if (param === 'controller') {
				return this.controller;
			}
			return undefined;
		}
	};
	var linkInstance = Ember.LinkView.create({action:'collapseNavigation'});
  	var stubGet = sinon.stub(linkInstance, 'get');
  	sinon.stub(linkInstance, '_super');
  	stubGet.withArgs('view').returns(fakeView);
  	stubGet.withArgs('action').returns('collapseNavigation');

	controller.set('navigationDisplayed', true);

	linkInstance._invoke();

	assert.notOk(controller.get('navigationDisplayed'));
});

test('Links should handle actions', function (assert){
	var linkInstance = Ember.LinkView.create({action:'collapseNavigation'});
	var action = linkInstance.get('action');

	assert.deepEqual(action, 'collapseNavigation');
});
