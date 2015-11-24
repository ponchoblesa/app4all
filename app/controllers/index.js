import Ember from 'ember';

export default Ember.Controller.extend({
  user_name: null,
  user_password: null,
  actions: {
    submitForm: function() {
      Ember.debug('Call to submit with user '+this.get('user_name')+' and pass: '+this.get('user_password'));
    }
  }
});
