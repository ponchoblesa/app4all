/**
* A mixin which works as an abstract class to be used in every child of {{#crossLink "ParentListener"}}{{/crossLink}} that should be listened
*
* Inherited in extensions properties:
*
* - {{#crossLink "ChildBroadcaster/publicProperties:property"}}{{/crossLink}}:
*     Array with the names of the properties you would like to share with your {{#crossLink "ParentListener"}}{{/crossLink}}
* - {{#crossLink "ChildBroadcaster/publicMethods:property"}}{{/crossLink}}:
*     Array with the names of the methods you would like to share with your {{#crossLink "ParentListener"}}{{/crossLink}}
*
* There properties should be initialized when the element is inserted (on 'willInsertElement' or on 'didInsertElement' events).
* You can check an example in {{#crossLink "ValidatableElement/initializeValidatableElement:method"}}{{/crossLink}}:


                       initializeValidatableElement: function(){
                         this.get('publicProperties').pushObject('wasValidated');
                         this.get('publicMethods').pushObject('validate');
                       }.on('willInsertElement'),

* This is the only way the parent can call methods {{#crossLink "ChildBroadcaster/getProperty:method"}}{{/crossLink}}
* and {{#crossLink "ChildBroadcaster/callMethod:method"}}{{/crossLink}} to get some child information properly and safely
*
* Inherited in extensions methods:
*
* - {{#crossLink "ChildBroadcaster/notifyAction:method"}}{{/crossLink}}:
*   Any action or event of the child that we would like to share with our listeners should be done using this call
*
*
* @class ChildBroadcaster
* @extensionfor Component, View
*/
import Ember from 'ember';

export default Ember.Mixin.create({

  /**
  * An read only abstraction of this class only with the methods we would like
  * to provide to our {{#crossLink "ParentListener"}}{{/crossLink}}
  *
  * @property broadcaster
  * @type {Object}
  */
  broadcaster: Ember.computed(function() {
    var me = this;
    return Object.create({}, {
      id: {
        value: me.id || me.elementId
      },
      addListener: {
        value: me.addListener
      },
      getProperty: {
        value: me.getProperty
      },
      callMethod: {
        value: me.callMethod
      },
      _broadcasterContext: {
        value: me
      }
    });
  }),

  /**
  * An array of {{#crossLink "ParentListener/listener:property"}}{{/crossLink}} with the
  * subscribed {{#crossLink "ParentListener"}}{{/crossLink}} instances
  *
  * @property listeners
  * @type {Array}
  * @default []
  */
  listeners: null,

  /**
  * An array of strings with the names of the properties shared with the {{#crossLink "ParentListener"}}{{/crossLink}}
  *
  * @property publicProperties
  * @type {Array}
  * @default []
  */
  publicProperties: null,

  /**
  * An array of strings with the names of the methods shared with the {{#crossLink "ParentListener"}}{{/crossLink}}
  *
  * @property publicMethods
  * @type {Array}
  * @default []
  */
  publicMethods: null,

  /**
  * Initialization of component. Listen to 'init' event
  *
  * @method initializeBroadcaster
  * @private
  */
  initializeBroadcaster: function(){
    this.set('listeners', Ember.A());
    this.set('publicProperties', Ember.A());
    this.set('publicMethods', Ember.A());
  }.on('init'),

  /**
  * Before render the component. Listen to 'willInsertElement' event
  *
  * @method onElementInserted
  * @private
  */
  onElementInserted: function() {
    var me = this,
        parent = me.get('parentView');

    me.notifyCreation(parent, me);
  }.on('willInsertElement'),

  /**
  * Before destroy the component. Listen to 'willDestroyElement' event
  *
  * @method onElementInserted
  * @private
  */
  onElementDestroyed: function() {
    this.notifyDestruction();
  }.on('willDestroyElement'),

  /**
  * Inform to the {{#crossLink "ParentListener"}}{{/crossLink}} instances the creation and susbcribe it
  *
  * @method notifyCreation
  * @param {Ember.View} view The view to check and subscribe if it is a {{#crossLink "ParentListener"}}{{/crossLink}}
  * @param {Ember.View} context The context of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
  * @private
  */
  notifyCreation: function (view, context) {
    var me = context,
        parent = view.get('parentView');

    if (view.isParentListener){
      view.addBroadcaster(me.get('broadcaster'));
    }

    if (parent) {
      me.notifyCreation(parent, me);
    }
  },

  /**
  * Inform to the {{#crossLink "ParentListener"}}{{/crossLink}} instances about an action or an event of the child
  *
  * @method notifyAction
  * @param {String} action The name of the action to be received in the {{#crossLink "ParentListener"}}{{/crossLink}}
  * @param {Mixed} params The paremters needed to handle this action
  */
  notifyAction: function (action, params) {
    var me = this,
        listeners = me.get('listeners');

    listeners.forEach(function(listener){
      listener.processAction(action, params);
    });
  },

  /**
  * Inform to the {{#crossLink "ParentListener"}}{{/crossLink}} instances the destruction of the broadcaster
  *
  * @method notifyDestruction
  * @private
  */
  notifyDestruction: function(){
    var me = this,
        listeners = me.get('listeners');

    listeners.forEach(function(listener){
      listener.removeBroadcaster(me.get('broadcaster'));
    });
  },

  /**
  * Used by the {{#crossLink "ParentListener"}}{{/crossLink}} to know the value of a child property.
  * This method only works if the property is inside the {{#crossLink "ChildBroadcaster/publicProperties:property"}}{{/crossLink}}
  *
  * @method getProperty
  * @param {String} property The name of the property
  * @public
  */
  getProperty: function (property) {
    var me = this._broadcasterContext || this;

    if (me.get('publicProperties').contains(property)) {
      return me.get(property);
    }
    return undefined;
  },

  /**
  * Used by the {{#crossLink "ParentListener"}}{{/crossLink}} to call to a method defined in the child.
  * This method only works if the method name is inside the {{#crossLink "ChildBroadcaster/publicMethods:property"}}{{/crossLink}}
  *
  * @method callMethod
  * @param {String} name The name of the method
  * @param {Mixed} params The parameters of the method
  * @public
  */
  callMethod: function (name, params){
    var me = this._broadcasterContext || this;

    if (me.get('publicMethods').contains(name)) {
      return me[name].apply(me, [params]);
    }
    return undefined;

  },

  /**
  * Used by the {{#crossLink "ParentListener"}}{{/crossLink}} to subscribe itself as a listener.
  *
  * @method addListener
  * @param {Object} listenerElement The {{#crossLink "ParentListener/listener:property"}}{{/crossLink}} of the {{#crossLink "ParentListener"}}{{/crossLink}}
  * @public
  */
  addListener: function (listenerElement) {
    var me = this._broadcasterContext || this;
    me.get('listeners').pushObject(listenerElement);
  }

});
