import Ember from 'ember';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');

  //Bind actions to link component
  Ember.LinkView.reopen({
    action: null,
    click: function(evt) {
      if (evt.type === 'click') {
        var action = this.get('action');
        if(action) {
         this.get('view').get('controller').send(action);
        }
      }

      return this._super(evt.type, evt);
    }
  });
}

export default {
  name: 'customizations',
  initialize: initialize
};
