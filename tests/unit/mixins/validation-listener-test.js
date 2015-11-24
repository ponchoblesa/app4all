import Ember from 'ember';
import ValidationListenerMixin from '../../../mixins/validation-listener';
import { module, test } from 'qunit';

var listenerInstance;

function createHTMLElement(template) {
  return Ember.$(template)[0];
}

module('Unit | Mixin | validation listener', {
  beforeEach: function() {
    var ValidationListenerObject = Ember.Object.extend(ValidationListenerMixin);

    listenerInstance = ValidationListenerObject.create();
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  var ValidationListenerObject = Ember.Object.extend(ValidationListenerMixin);
  var subject = ValidationListenerObject.create();
  assert.ok(subject);
});

test('The action "new_error" should add an error to the system', function(assert) {
  var invalidInput = createHTMLElement('<input id="username" required="" type="email">'),
      message = invalidInput.validationMessage;

  listenerInstance.processAction('new_error', {
    input: invalidInput,
    message: message
  });

  assert.ok(listenerInstance.get('hasElementWithError'), "An error were added to the system");
});


test('The action "error_corrected" should remove the error of the system', function(assert) {
  var invalidInput = createHTMLElement('<input id="username" required="" type="email">'),
      message = invalidInput.validationMessage;

  listenerInstance.processAction('new_error', {
    input: invalidInput,
    message: message
  });

  listenerInstance.processAction('error_corrected', {
    input: invalidInput
  });

  assert.notOk(listenerInstance.get('hasElementWithError'), "The error were removed of the system");
});

test('The errors are never duplicated in the system', function(assert) {
  var invalidInput = createHTMLElement('<input id="username" required="" type="email">'),
      message = invalidInput.validationMessage;

  listenerInstance.processAction('new_error', {
    input: invalidInput,
    message: message
  });

  listenerInstance.processAction('new_error', {
    input: invalidInput,
    message: message
  });

  assert.ok(listenerInstance.get('errors').length === 1, "There are only an error in the system");
});

