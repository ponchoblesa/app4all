import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
	response: false,
	responseText: '',
	actions: {
		check: function () {
			var controller = this;

			ajax({
				url: 'http://localhost:3000/api/examples',
				type: 'get'
			}).then(function (response) {
				controller.set('response', true);
				controller.set('responseText', JSON.stringify(response));
			});
		}
	}
});
