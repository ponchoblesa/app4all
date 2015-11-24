import Ember from 'ember';
import ValidationHandlerMixin from '../../../mixins/validation-handler';
import { module, test } from 'qunit';

var validationHandlerInstance;

module('Unit | Mixin | validation handler', {
  beforeEach: function() {
    var ValidationHandlerObject = Ember.Object.extend(ValidationHandlerMixin);
        validationHandlerInstance = ValidationHandlerObject.create();
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  var ValidationHandlerObject = Ember.Object.extend(ValidationHandlerMixin);
  var subject = ValidationHandlerObject.create();
  assert.ok(subject);
});

test('it should build an accessible ARIA container', function(assert){
  assert.expect(3);
  var errorContainer,
      role,
      atomic,
      live;

  errorContainer = Ember.$('<div id="error-handler-errors" aria-atomic="false"></div>');
  sinon.stub(validationHandlerInstance, 'getErrorContainer').returns(errorContainer);

  validationHandlerInstance.prepareErrorContainer();

  role = errorContainer.attr('role');
  atomic = errorContainer.attr('aria-atomic');
  live = errorContainer.attr('aria-live');

  assert.strictEqual(role,'alert');
  assert.strictEqual(atomic,'true');
  assert.strictEqual(live,'assertive');
});

