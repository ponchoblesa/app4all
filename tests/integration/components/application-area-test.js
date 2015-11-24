import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('application-area', 'Integration | Component | application area', {
  integration: true
});

test('it renders', function(assert) {
  var errorPanelText='Errors';
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{application-area}}`);

  assert.equal(this.$().text().trim(), errorPanelText);

  // Template block usage:
  this.render(hbs`
    {{#application-area}}
      template block text
    {{/application-area}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
