/**
* A mixin to be used in every child of {{#crossLink "ValidationListener"}}{{/crossLink}} that should be validated
*
* @class ValidatableElement
* @extends ChildBroadcaster
* @extensionfor Input
*/
import Ember from 'ember';
import ChildBroadcaster from './child-broadcaster';

export default Ember.Mixin.create(ChildBroadcaster, {

  /**
  * Flag to control if any validation was triggered
  *
  * @property wasValidated
  * @type {Boolean}
  * @default false
  * @public
  */
  wasValidated: false,


  /**
  * Initialization of component. Listen to 'willInsertElement' event
  *
  * @method initializeValidatableElement
  * @private
  */
  initializeValidatableElement: function(){
    this.get('publicProperties').pushObject('wasValidated');
    this.get('publicProperties').pushObject('element');
    this.get('publicMethods').pushObject('validate');
    this.get('publicMethods').pushObject('markErrorOnField');
  }.on('willInsertElement'),

  /**
  * Bind the events that will trigger the validation. Listen to 'didInsertElement' event
  *
  * @method bindValidation
  * @private
  */
  bindValidation: function() {
    Ember.$(this.get('element')).on('focusout', Ember.run.bind(this, this.validate));
  }.on('didInsertElement'),

  /**
  * Turn off all the registered events. Listen to 'willDestroyElement' event
  *
  * @method unBindValidation
  * @private
  */
  unBindValidation: function() {
    Ember.$(this.get('element')).off();
  }.on('willDestroyElement'),

  /**
  * Trigger the field validation and send the error to the
  * {{#crossLink "ValidationListener"}}{{/crossLink}} when required.
  *
  *
  * @method validate
  * @return {Boolean} Returns true on valid
  * @public
  */
  validate: function () {
    var input = this.get('element');

    this.set('wasValidated', true);

    // According to spec, inputs that have "formnovalidate" should bypass any validation
    if (input.hasAttribute('formnovalidate')) {
      return true;
    }

    if (!input.validity.valid) {
      this.notifyNewError();
      return false;
    }

    if (this.get('hasError')) {
      this.notifyErrorCorrected();
    }

    return true;
  },

  /**
  * Notify the listeners to add the error.
  * It trigger action 'new_error' with {{#crossLink "ChildBroadcaster/notifyAction:method"}}{{/crossLink}}
  *
  * @method notifyNewError
  * @private
  */
  notifyNewError: function() {
    var me = this,
        input = this.get('element');

    this.notifyAction('new_error', {
      input: input,
      message: me.getErrorMessage()
    });

    this.set('hasError', true);
  },

  /**
  * Notify the listeners to remove the error
  * It trigger action 'error_corrected' with {{#crossLink "ChildBroadcaster/notifyAction:method"}}{{/crossLink}}
  *
  * @method notifyErrorCorrected
  * @private
  */
  notifyErrorCorrected: function(){
    var input = this.get('element');

    this.notifyAction('error_corrected', {
      input: input
    });
    this.set('hasError', false);
  },

  /**
  * Mark the element as field with error. Used by the {{#crossLink "ValidationListener"}}{{/crossLink}}
  * when it is subscribed an element which has already an error in the system
  *
  * @method markErrorOnField
  * @public
  */
  markErrorOnField: function() {
    this.set('hasError', true);
  },

  /**
  * Return the error message of the browser
  *
  * Override this method to return a custom validation message
  *
  * @method getErrorMessage
  * @return {String} Returns error message
  */
  getErrorMessage: function() {
    var input = this.get('element');

    return input.validationMessage;
  }

});
