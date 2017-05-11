import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  question: DS.attr('string'),
  a: DS.attr('string'),
  b: DS.attr('string'),
  c: DS.attr('string'),
  d: DS.attr('string'),
  answer: DS.attr('string'),
  // This attribute is computed from other attributes
  // Returns the text belonging to the letter saved in 'answer'
  reveal: Ember.computed('answer', function() {
    return `${this.get(this.get('answer'))}`;
  })
});
