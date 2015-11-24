import Ember from 'ember';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
	Ember.Checkbox.reopen({
		attributeBindings: ['aria-describedby', 'aria-controls']
	});

	Ember.TextField.reopen({
		attributeBindings: ['aria-describedby']
	});
	/**
		Keyboard Accessibility: To press space over an action trigger should trigger the action too.
	*/
  Ember.LinkComponent.reopen({
    keyPress: function(e){
      if (e.keyCode === 32 || e.which === 32) {
        Ember.$(e.currentTarget)[0].click();
      }
      return this._super('keyPress', e);
    }
  });
}

export default {
  name: 'a11y',
  after: "customizations",
  initialize: initialize
};
