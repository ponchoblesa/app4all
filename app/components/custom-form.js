/**
* A customize form component to handle form actions like "submit" at this level
*
* @class CustomForm
* @extends ValidationListener
*/
import Ember from 'ember';
import ValidationListener from '../mixins/validation-listener';


export default Ember.Component.extend(ValidationListener, {

  /**
  * @property tagName
  * @type {String}
  */
  tagName: 'form',

  /**
  * @property attributeBindings
  * @type {Array}
  */
  attributeBindings: ['novalidate', 'action'],

  /**
  * Bind empty "action" attribute as a web accessibility attribute
  *
  * @property action
  * @type {String}
  */
  action: "",

 /**
  * Prevent the built-in browser navigation error messages to pop up
  *
  * @property novalidate
  * @type {String}
  */
  novalidate: 'novalidate',

  /**
  * The action trigger in parent controller on submit
  *
  * @property controllerAction
  * @type {String}
  * @default submitForm
  */
  controllerAction: 'submitForm',

  /**
  * Send the controllerAction bound to the submit event if the form is valid
  *
  * @method submit
  * @returns {Boolean} True on valid and action triggered
  */
  submit: function() {
    if (event) { event.preventDefault(); }

    if (this.validateAllElements()){
      this.sendAction('controllerAction');
      return true;
    } else {
      this.goToFirstError();
      this.displayAlert();
    }

    return false;
  },

  /**
  * @method goToFirstError
  * @private
  */
  goToFirstError: function() {
    var firstError = this.get('errors')[0];

    Ember.$('html, body').animate({
      scrollTop: Ember.$(firstError.element).offset().top - 40
    }, 200);
    firstError.element.focus();
  },

  /**
  * Display on mobile devices an alert with the errors
  *
  * @method displayAlert
  * @private
  */
  displayAlert: function() {
    var errors = this.get('errors'),
        stringAlert = '';

    if (this.mobileChecker.get('isMobile')) {

      errors.forEach(function(item){
        stringAlert+=item.prefix+': '+item.message+'\n';
      });
      alert(stringAlert);
    }
  }

});
