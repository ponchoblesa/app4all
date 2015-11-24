/**
* A component used to wrap the application and handle all the global events
*
* Uses as a normal application controller
*
* @class ApplicationArea
* @extends ValidationHandler
*/
import Ember from 'ember';
import ValidationHandler from '../mixins/validation-handler';

export default Ember.Component.extend(ValidationHandler, {

  /**
  * To collapse or expand the navigation links on small screens
  * @property navigationDisplayed
  * @type {Boolean}
  */
  navigationDisplayed: false,

  actions: {
    collapseNavigation: function () {
      this.set('navigationDisplayed', false);
    }
  }
});
