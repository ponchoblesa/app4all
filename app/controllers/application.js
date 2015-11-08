import Ember from 'ember';

export default Ember.Controller.extend({
	navigationDisplayed: false,
	actions: {
		collapseNavigation: function () {
			this.set('navigationDisplayed', false);
		}
	}
});
