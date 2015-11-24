import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('application-area', 'Unit | Component | application-area');

test('Collapse navigation should collapse navigation bar2', function(assert) {
  var controller = this.subject();
  controller.set('navigationDisplayed', true);

  controller.send('collapseNavigation');

  assert.notOk(controller.get('navigationDisplayed'));
});
