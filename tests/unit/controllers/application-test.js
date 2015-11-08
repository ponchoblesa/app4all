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


test('Collapse navigation should collapse navigation bar', function(assert) {
  var controller = this.subject();
  controller.set('navigationDisplayed', true);

  controller.send('collapseNavigation');

  assert.notOk(controller.get('navigationDisplayed'));
});

