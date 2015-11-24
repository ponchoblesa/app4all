import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var sandbox;

moduleForComponent('custom-form', 'Integration | Component | custom form', {
  integration: true,

  beforeEach: function() {
    sandbox = sinon.sandbox.create();
  },
  afterEach: function() {
    sandbox.restore();
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{custom-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#custom-form}}
      template block text
    {{/custom-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it is a form', function(assert) {
  var formContainer;

  this.render(hbs`{{custom-form}}`);
  formContainer = this.$().children()[0];

  assert.strictEqual(formContainer.tagName.toLowerCase(), 'form');
});

test('it has empty action attribute', function(assert) {
  var formContainer,
      action;

  this.render(hbs`{{custom-form}}`);
  formContainer = this.$().children()[0];
  action = formContainer.getAttribute('action');

  assert.strictEqual(action, '');
});

test('it has novalidate attribute', function(assert) {
  var formContainer,
      novalidate;

  this.render(hbs`{{custom-form}}`);
  formContainer = this.$().children()[0];
  novalidate = formContainer.getAttribute('novalidate');

  assert.strictEqual(novalidate, 'novalidate');
});

