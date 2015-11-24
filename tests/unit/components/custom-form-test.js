import { moduleForComponent, test } from 'ember-qunit';
var sandbox;

moduleForComponent('custom-form', 'Unit | Component | custom form', {
  beforeEach: function() {
    sandbox = sinon.sandbox.create();
  },
  afterEach: function() {
    sandbox.restore();
  }
});

test('it should not submit when has fields with errors', function(assert) {
  var formController = this.subject(),
      spySendAction;

  sandbox.stub(formController, 'goToFirstError');
  formController.mobileChecker = {get: function(){return false;}};

  spySendAction = sandbox.spy(formController,'sendAction');
  sandbox.stub(formController, 'validateAllElements').returns(false);

  formController.submit();

  assert.notOk(spySendAction.called);
});

test('it should send the action to the controller on submit', function(assert) {
  var formController = this.subject(),
      controllerAction = formController.get('controllerAction'),
      spySendAction,
      stubGet;

  sandbox.stub(formController, 'goToFirstError');

  spySendAction = sandbox.spy(formController,'sendAction');

  sandbox.stub(formController, 'validateAllElements').returns(true);
  stubGet = sandbox.stub(formController, 'get');
  stubGet.withArgs('controllerAction').returns(controllerAction);

  formController.submit();

  assert.ok(spySendAction.calledWith('controllerAction'));
});


