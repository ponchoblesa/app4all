/**
* A mixin to be used in the application controller to handle all the {{#crossLink "ValidatableElement"}}{{/crossLink}}
*
* @class ValidationHandler
* @extends ValidationListener
* @extensionfor View, Component, ApplicationView
*/
import Ember from 'ember';
import ValidationListener from './validation-listener';

export default Ember.Mixin.create(ValidationListener, {

  /**
  * Id of the HMTL div where to wrap the errors.
  * Override this property for custom id
  *
  * @property errorContainerId
  * @type {String}
  * @default 'error-handler-errors'
  */
  errorContainerId: 'error-handler-errors',

  /**
  * The h2 label which will have the error container
  * This is needed for assitive technologies and provide
  * a better accessibility of the webpage
  * Override this property for custom title
  *
  * @property errorHeader
  * @type {String}
  * @default 'Errors'
  */
  errorHeader: 'Errors',


  /**
  * Customizations of the view of the component. Listen to 'didInsertElement' event
  *
  * @method afterRenderValidationHandler
  * @private
  */
  afterRenderValidationHandler: function(){
    this.prepareErrorContainer();
  }.on('didInsertElement'),

  /**
  * An override of method {{#crossLink "ValidationListener/addError:method"}}{{/crossLink}}
  *
  * @method addError
  * @param {HTMLElement} element The DOM element with error
  * @param {String} message The error message
  */
  addError: function(element, message){
    var me = this._listenerContext || this;

    this._super(element, message);
    element.classList.add('error-handler-invalid-input');
    me.renderErrors();
  },

  /**
  * An override of method {{#crossLink "ValidationListener/removeError:method"}}{{/crossLink}}
  *
  * @method removeError
  * @param {HTMLElement} element The DOM element with error
  */
  removeError: function(element){
    var me = this._listenerContext || this;

    this._super(element);
    element.classList.remove('error-handler-invalid-input');
    me.renderErrors();
  },


  /**
  * It append to the error container every error in the system
  *
  * @method renderErrors
  */
  renderErrors: function(){
    var errors,
        errorContainer,
        errorList,
        errorHeader,
        me = this;

    errorContainer = me.getErrorContainer();
    errorList = errorContainer.find('ul');
    errorHeader = errorContainer.find('h2');
    errors = me.get('errors');
    errorContainer.prop('hidden', 'hidden');
    errorList.empty();
    errorHeader.prop('hidden', 'hidden');

    errors.forEach(function(item){
      errorList.append(me.renderError(item));
    });

    if(errors.length) {
      errorHeader.removeProp('hidden');
      errorContainer.removeProp('hidden');
    }

  },


  /**
  * Build the template for each particular error. Override this function to customize the template
  *
  * @param {Object} errorElement An object of the {{#crossLink "ValidationListener/errors:property"}}{{/crossLink}} array
  * @method renderErrors
  * @return {DOMElement} The element to be append in the container
  */
  renderError: function(errorElement){
    var prefixTemplate,
        errorTemplate,
        errorDOMElementLink,
        errorDOMElement;

    prefixTemplate = '<span id="error-element-prefix-'+errorElement.id+'" class="error-element-prefix">'+errorElement.prefix+':</span> ';
    errorTemplate = '<a href="#" id="error-element-'+errorElement.id+'" class="error-element-link">'+ prefixTemplate + errorElement.message+'</a>';

    errorDOMElementLink = Ember.$(errorTemplate).on('click', errorElement.element, Ember.run.bind(this, this.goToError));
    errorDOMElement = Ember.$('<li></li>');
    errorDOMElement.append(errorDOMElementLink);

    return errorDOMElement;
  },


  /**
  * Method called when the user click on the error. It scrolls and place the focus where the error is
  *
  * @param {jQuery.Event} evnt Event which contains in its data the DOMElement which triggered it
  * @method goToError
  */
  goToError: function(evnt){
    evnt.preventDefault();

    Ember.$('html, body').animate({
      scrollTop: Ember.$('#'+evnt.data.id).offset().top - 40
    }, 200);
    Ember.$('#'+evnt.data.id).focus();
  },

  /**
  * Bind ARIA roles and properties in order to make the errors accesible to assitive technologies
  * Prepare the collapsible error panel
  *
  * @method prepareErrorContainer
  * @private
  */
  prepareErrorContainer: function(){
    var errorContainer,
        expandButton,
        errorHeader,
        role,
        atomic,
        live,
        me = this;

    errorContainer = me.getErrorContainer();
    errorContainer.prop('hidden', 'hidden');
    role = errorContainer.attr('role');
    atomic = errorContainer.attr('aria-atomic');
    live = errorContainer.attr('aria-live');

    if (role !== 'alert') {
      errorContainer.attr('role', 'alert');
    }

    if (atomic !== 'true') {
      errorContainer.attr('aria-atomic', 'true');
    }

    if (live !== 'assertive') {
      errorContainer.attr('aria-live', 'assertive');
    }

    expandButton = Ember.$('<button aria-expanded="true" aria-controls="error-handler-collapsible-list">'+this.get('errorHeader')+'</button>');
    Ember.$(expandButton).on('click', Ember.run.bind(this, this.toggleCollapse));

    errorHeader = Ember.$('<h2 hidden></h2>');
    errorHeader.append(expandButton);

    errorContainer.append(errorHeader);
    errorContainer.append('<ul id="error-handler-collapsible-list"></ul>');
  },

  /**
  * @method getErrorContainer
  * @private
  */
  getErrorContainer: function(){
    var id = this.get('errorContainerId'),
        container = Ember.$('#'+id);

    if(!container.length){
      container = Ember.$('<div id="'+id+'"></div>');
      Ember.$(this.get('element')).append(container);
    }
    return container;
  },

  /**
  * Method called when the user click on the error buttom. It collapse/expand the error panel
  *
  * @param {jQuery.Event} evnt
  * @method toggleCollapse
  */
  toggleCollapse: function(/*evnt*/) {
    var errorContainer = this.getErrorContainer(),
        errorList = errorContainer.find('ul'),
        errorHeadeButton = errorContainer.find('button');

    errorList.slideToggle('fast', function(){
      if (errorHeadeButton.attr('aria-expanded') === 'true'){
        errorHeadeButton.attr('aria-expanded', false);
      } else {
        errorHeadeButton.attr('aria-expanded', true);
      }
    });
  },

  /**
  * Check if the new subscribed element has already an error in the system and show it
  *
  * @method addBroadcaster
  * @private
  */
  addBroadcaster: function (broadcasterElement) {
    var me = this._listenerContext || this,
        error,
        errorElement,
        errorContainer,
        errorHeader;

    me._super(broadcasterElement);

    error = me.get('errors').findBy('id', broadcasterElement.id);
    if (error) {
      error.element = broadcasterElement.getProperty('element');
      error.element.classList.add('error-handler-invalid-input');
      errorContainer = me.getErrorContainer();
      errorHeader = errorContainer.find('h2');
      errorElement = Ember.$('#error-element-'+error.id);
      errorElement.parent('li').removeProp('hidden');
      errorHeader.removeProp('hidden');
      errorContainer.removeProp('hidden');
    }
  },

  /**
  * Check if the element removed has already an error in the system and hide it
  *
  * @method addBroadcaster
  * @private
  */
  removeBroadcaster: function(broadcasterElement){
    var me = this._listenerContext || this,
        error,
        errorElement,
        errorContainer,
        errorList,
        errorHeader;

    me._super(broadcasterElement);

    me.get('broadcasters').removeObject(me.get('broadcasters').findBy('id',broadcasterElement.id));

    error = me.get('errors').findBy('id', broadcasterElement.id);
    if (error) {
      error.element.classList.remove('error-handler-invalid-input');
      errorElement = Ember.$('#error-element-'+error.id);
      errorElement.parent('li').prop('hidden', 'hidden');
      errorContainer = me.getErrorContainer();
      errorList = errorContainer.find('ul');
      errorHeader = errorContainer.find('h2');
      if(errorList.children(':visible').length === 0) {
        errorContainer.prop('hidden', 'hidden');
        errorHeader.prop('hidden', 'hidden');
      }
    }
  }

});
