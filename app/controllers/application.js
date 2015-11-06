import Ember from 'ember';

export default Ember.Controller.extend({
	navigationDisplayed: false,
	init: function() {
		//Bind actions to link component
		Ember.LinkView.reopen({
			action: null,
		    _invoke: function(e){
			    var action = this.get('action');
			    if(action) {
					this.get('view').get('controller').send(action);
			    }           

			    return this._super(e);
		  	}
		});
	},
	actions: {
		collapseNavigation: function () {
			this.set('navigationDisplayed', false);
		}
	}
});
