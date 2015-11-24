import Ember from 'ember';
import ValidatableElementMixin from '../../../mixins/validatable-element';
import ValidationListenerMixin from '../../../mixins/validation-listener';
import { module, test } from 'qunit';

var textFieldInstance,
    listenerInstance,
    stubTextFieldGet,
    sandbox;

function setMockEnvironment() {
  var broadcaster,
      listeners,
      publicProperties,
      publicMethods;

  broadcaster = textFieldInstance.get('broadcaster');
  listeners = textFieldInstance.get('listeners');
  publicProperties = textFieldInstance.get('publicProperties');
  publicMethods = textFieldInstance.get('publicMethods');

  stubTextFieldGet = sandbox.stub(textFieldInstance, 'get');
  stubTextFieldGet.withArgs('broadcaster').returns(broadcaster);
  stubTextFieldGet.withArgs('listeners').returns(listeners);

  publicProperties.pushObject('wasValidated');
  stubTextFieldGet.withArgs('publicProperties').returns(publicProperties);
  stubTextFieldGet.withArgs('wasValidated').returns(textFieldInstance.wasValidated);

  publicMethods.pushObject('validate');
  stubTextFieldGet.withArgs('publicMethods').returns(publicMethods);

  stubTextFieldGet.withArgs('parentView').returns(listenerInstance);

  textFieldInstance.onElementInserted();
}

function createHTMLElement(template) {
  return Ember.$(template)[0];
}

function stubTextFieldTemplate(HTMLTemplate) {
  if (HTMLTemplate) {
    stubTextFieldGet.withArgs('element').returns(HTMLTemplate);
  } else {
    stubTextFieldGet.withArgs('element').returns(createHTMLElement('<input id="username" required="" type="email">'));
  }
  return textFieldInstance;
}

module('Unit | Mixin | validatable element', {
  beforeEach: function() {
    var TextFieldExtended = Ember.TextField.extend(ValidatableElementMixin),
        ValidationListenerObject = Ember.Object.extend(ValidationListenerMixin);

    textFieldInstance = TextFieldExtended.create();
    listenerInstance = ValidationListenerObject.create();

    sandbox = sinon.sandbox.create();
  },
  afterEach: function() {
    textFieldInstance.onElementDestroyed();
    sandbox.restore();
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  var ValidatableElementObject = Ember.Object.extend(ValidatableElementMixin);
  var subject = ValidatableElementObject.create();
  assert.ok(subject);
});

test('Public methods and properties should be properly initialized', function(assert) {
  var wasValidated,
      validate;

  textFieldInstance.initializeValidatableElement();

  wasValidated = textFieldInstance.get('publicProperties').contains('wasValidated');
  validate = textFieldInstance.get('publicMethods').contains('validate');

  assert.ok(wasValidated, 'Property "wasValidated" initialized');
  assert.ok(validate, 'Method "validate" initialized');
});


test('Listeners should be able to access to public properties', function(assert) {
  var publicWasValidated;

  setMockEnvironment();
  publicWasValidated = listenerInstance.get('broadcasters')[0].getProperty('wasValidated');

  assert.ok(textFieldInstance.wasValidated === publicWasValidated, 'The property was read by the listener');
});

test('Listeners should be able to access to public methods', function(assert) {
  var spyTextFieldValidate;

  setMockEnvironment();
  stubTextFieldTemplate();
  spyTextFieldValidate = sandbox.spy(textFieldInstance,'validate');

  listenerInstance.get('broadcasters')[0].callMethod('validate');

  assert.ok(spyTextFieldValidate.called, 'The method was called by the listener');
});

test('Listeners should be notified on input errors', function(assert) {
  var spyListenerProcessAction;

  spyListenerProcessAction = sandbox.spy(listenerInstance,'processAction');
  setMockEnvironment();
  stubTextFieldTemplate();

  textFieldInstance.validate();

  assert.strictEqual('new_error', spyListenerProcessAction.getCall(0).args[0], 'The action "new_error" is received in by the listener');
});

test('Listeners should be notified on corrected errors', function(assert) {
  var spyListenerProcessAction,
      inputCorrected = '<input id="username" required="" type="email" value="user@email.com">';

  spyListenerProcessAction = sandbox.spy(listenerInstance,'processAction');
  setMockEnvironment();
  stubTextFieldTemplate();
  stubTextFieldGet.withArgs('hasError').returns(textFieldInstance.hasError);
  textFieldInstance.validate();

  stubTextFieldTemplate(createHTMLElement(inputCorrected));
  stubTextFieldGet.withArgs('hasError').returns(textFieldInstance.hasError);
  textFieldInstance.validate();

  assert.strictEqual('error_corrected', spyListenerProcessAction.getCall(1).args[0], 'The action "error_corrected" is received in by the listener');
});

test('The validation flag should be updated on first validation', function(assert) {
  setMockEnvironment();
  stubTextFieldTemplate();

  textFieldInstance.validate();

  assert.ok(textFieldInstance.wasValidated, 'Property "wasValidated" correctly updated');
});

test('Validation returns false on invalid fields', function(assert) {
  var valid;

  setMockEnvironment();
  stubTextFieldTemplate();
  valid = textFieldInstance.validate();

  assert.notOk(valid, 'The validation returns false');
});

test('Validation returns true on valid fields', function(assert) {
  var validInput = '<input id="username" required="" type="email" value="user@email.com">',
      valid;

  setMockEnvironment();
  stubTextFieldTemplate(createHTMLElement(validInput));
  valid = textFieldInstance.validate();

  assert.ok(valid, 'The validation returns true');
});

test('Validation on invalid inputs with "formnovalidate" should not notify the listeners and returns true', function(assert) {
  var invalidInput = '<input id="username" required="" type="email" formnovalidate>',
      valid,
      spyListenerProcessAction;

  spyListenerProcessAction = sandbox.spy(listenerInstance,'processAction');
  setMockEnvironment();
  stubTextFieldTemplate(createHTMLElement(invalidInput));

  valid = textFieldInstance.validate();

  assert.ok(valid, 'The validation returns true');
  assert.notOk(spyListenerProcessAction.called, 'The listener were not notify');
});

