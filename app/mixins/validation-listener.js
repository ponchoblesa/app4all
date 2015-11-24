/**
* A mixin to be used in the component parent of the {{#crossLink "ValidatableElement"}}{{/crossLink}}
*
* @class ValidationListener
* @extends ParentListener
* @extensionfor View, Component, {{#crossLink "ValidationHandler"}}{{/crossLink}}
*/
import Ember from 'ember';
import ParentListener from './parent-listener';

export default Ember.Mixin.create(ParentListener, {

 /**
  * Array of current errors. Every error is an object like follow:
  *
        error: {
          id: [id of the element with error],
          prefix: [the prefix of the error message in this priority: (label - element.name - Error)]
          element: [the DOM element with error],
          message: [the current error message]
        }
  *
  * @property errors
  * @type {Array}
  * @default []
  */
  errors: null,

  /**
  * Computed property. Usage: this.get('hasElementWithError')
  *
  * True if there is any child with error
  *
  * @property hasElementWithError
  * @type {Boolean}
  * @public
  */
  hasElementWithErrorMethod: function() {
    if (this.get('errors').length) {
      return true;
    }
    return false;
  },

  /**
  * Computed property. Usage: this.get('wereAllElementsValidated')
  *
  * True if all the {{#crossLink "ValidatableElement"}}{{/crossLink}} were validated
  * at least once
  *
  * @property wereAllElementsValidated
  * @type {Boolean}
  * @public
  */
  wereAllElementsValidatedMethod: function() {
    var validatableChildren = this.get('broadcasters'),
        nonValidatedChild = null;

    nonValidatedChild = validatableChildren.find(function(child){
                          if (!child.getProperty('wasValidated')) {
                            return true;
                          }
                        });

    return nonValidatedChild?false:true;
  },

  /**
  * Initialization of component. Listen to 'init' event
  *
  * @method initializeValidationListener
  * @private
  */
  initializeValidationListener: function(){
    var me = this;

    me.set('errors', Ember.A());

    Object.defineProperty(me, 'wereAllElementsValidated', {
        get: function() {
          return me.wereAllElementsValidatedMethod();
        }
    });

    Object.defineProperty(me, 'hasElementWithError', {
        get: function() {
          return me.hasElementWithErrorMethod();
        }
    });

  }.on('init'),

  /**
  * Used by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}} to subscribe itself as a broadcaster.
  * Check if the field has an error already in the system and mark it as field with error.
  *
  * @method addBroadcaster
  * @param {Object} broadcasterElement The {{#crossLink "ChildBroadcaster/broadcasterElement:property"}}{{/crossLink}} of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
  * @public
  */
  addBroadcaster: function (broadcasterElement) {
    var me = this._listenerContext || this,
        error;

    me._super(broadcasterElement);

    error = me.get('errors').findBy('id', broadcasterElement.id);
    if (error) {
      broadcasterElement.callMethod('markErrorOnField');
    }
  },

  /**
  * An override of method {{#crossLink "ParentListener/processAction:method"}}{{/crossLink}}
  *
  * @method processAction
  * @param {String} action The name of the action triggered by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
  * @param {Mixed} params The paremters needed to handle this action
  * @public
  */
  processAction: function (action, params){
    var me = this._listenerContext || this;

    me._super(action, params);

    switch(action) {
      case 'new_error':
          me.addError(params.input, params.message);
          break;
      case 'error_corrected':
          me.removeError(params.input);
          break;
      default:
    }

  },


 /**
  * Method used to add an error to the system
  *
  * @method addError
  * @param {HTMLElement} element The DOM element with error
  * @param {String} message The error message
  */
  addError: function(element, message){
    var me = this._listenerContext || this,
        errors = me.get('errors');

    errors.removeObject(errors.findBy('id', element.id));
    errors.pushObject(me.buildError(element, message));
  },

  /**
  * Method used to remove its error from the system
  *
  * @method removeError
  * @param {HTMLElement} element The DOM element with error
  */
  removeError: function(element){
    var me = this._listenerContext || this;

    me.get('errors').removeObject(me.get('errors').findBy('id', element.id));
  },

  /**
  * Trigger the validation on all elements.
  *
  * @method validateAllElements
  * @returns {Boolean} True when all elements were valid
  * @public
  */
  validateAllElements: function() {
    var validatableChildren = this.get('broadcasters'),
        valid = true;

    validatableChildren.filter(function(child){
      if (!child.callMethod('validate')) {
        valid = false;
      }
    });

    return valid;
  },

  /**
  * Build the error store in {{#crossLink "ParentListener/errors:property"}}{{/crossLink}}
  *
  * @method buildError
  * @param {HTMLElement} element The DOM element with error
  * @param {String} message The error message
  * @private
  */
  buildError: function(element, message){
    var prefix;

    prefix = Ember.$('label[for="'+element.id+'"]').text().trim();

    if (!prefix || prefix==='') {
      prefix = element.name;
    }

    if (!prefix || prefix==='') {
      prefix = 'Error';
    }

    return {
      id: element.id,
      prefix: prefix,
      element: element,
      message: message
    };
  }

});
