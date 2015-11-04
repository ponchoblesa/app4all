import Ember from 'ember';

export default Ember.Controller.extend({
	user_name: null,
	user_password: null,
	actions: {
		authenticate: function () {
			Ember.$('form').valid(); //trigger default browser validation
		}
	}
});
