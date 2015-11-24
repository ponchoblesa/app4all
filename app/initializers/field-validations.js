import Ember from 'ember';
import ValidatableElement from '../mixins/validatable-element';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');

  Ember.Checkbox.reopen(ValidatableElement);
  Ember.TextArea.reopen(ValidatableElement);
  Ember.TextField.reopen(ValidatableElement);

}

export default {
  name: 'field-validations',
  initialize: initialize
};
