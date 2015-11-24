/**
* A mixin which works as an abstract class to be used in every listener of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
*
* Inherited properties:
*
* - {{#crossLink "ParentListener/broadcasters:property"}}{{/crossLink}}
*
* Inherited methods:
*
* - {{#crossLink "ParentListener/processAction:method"}}{{/crossLink}}:
*   Any action or event of the child will end in this method. An example of a proper override of the method is in
* {{#crossLink "ValidationListener/processAction:method"}}{{/crossLink}}:

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
*
*
* @class ParentListener
* @extensionfor Component, View
*/
import Ember from 'ember';

export default Ember.Mixin.create({

  /**
  * An read only abstraction of this class only with the methods we would like
  * to provide to our {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
  *
  * @property listener
  * @type {Object}
  */
  listener: Ember.computed(function() {
    var me = this;
    return Object.create({}, {
      id: {
        value: me.id || me.elementId
      },
      addBroadcaster: {
        value: me.addBroadcaster
      },
      processAction: {
        value: me.processAction
      },
      removeBroadcaster: {
        value: me.removeBroadcaster
      },
      _listenerContext: {
        value: me
      }
    });
  }),

  /**
  * An array of {{#crossLink "ChildBroadcaster/broadcasters:property"}}{{/crossLink}} with the
  * subscribed {{#crossLink "ChildBroadcaster"}}{{/crossLink}} instances
  *
  * @property broadcasters
  * @type {Array}
  * @default []
  */
  broadcasters: null,

  /**
  * Property read by every {{#crossLink "ChildBroadcaster"}}{{/crossLink}} in order to know if
  * this parent is a listener or not
  *
  * @property isParentListener
  * @type {Boolena}
  * @default true
  * @private
  */
  isParentListener: true,


  /**
  * Initialization of component. Listen to 'init' event
  *
  * @method initializeListener
  * @private
  */
  initializeListener: function(){
    this.set('broadcasters', Ember.A());
  }.on('init'),

  /**
  * Used by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}} to subscribe itself as a broadcaster.
  *
  * @method addBroadcaster
  * @param {Object} broadcasterElement The {{#crossLink "ChildBroadcaster/broadcasterElement:property"}}{{/crossLink}} of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
  * @public
  */
  addBroadcaster: function (broadcasterElement) {
    var me = this._listenerContext || this;

    me.get('broadcasters').pushObject(broadcasterElement);
    broadcasterElement.addListener(me.get('listener'));
  },

  /**
  * Used by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}} in {{#crossLink "ChildBroadcaster/notifyAction:method"}}{{/crossLink}}.
  * Any action or event of the child will end in this method. This should be properly override to handle the child actions
  *
  * @method processAction
  * @param {String} action The name of the action triggered by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
  * @param {Mixed} params The paremters needed to handle this action
  * @public
  */
  processAction: function (/** action, params*/){

  },

  /**
  * Used by the {{#crossLink "ChildBroadcaster"}}{{/crossLink}} to unsubscribe itself as a broadcaster.
  *
  * @method removeBroadcaster
  * @param {Object} broadcasterElement The {{#crossLink "ChildBroadcaster/broadcasterElement:property"}}{{/crossLink}} of the {{#crossLink "ChildBroadcaster"}}{{/crossLink}}
  * @public
  */
  removeBroadcaster: function (broadcasterElement) {
    var me = this._listenerContext || this;
    me.get('broadcasters').removeObject(me.get('broadcasters').findBy('id',broadcasterElement.id));
  }

});
