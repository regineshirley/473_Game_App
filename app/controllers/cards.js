import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addCard: function() {

      var question = this.get('question');
      var answer = this.get('answer');
      var a = this.get('a');
      var b = this.get('b');
      var c = this.get('c');
      var d = this.get('d');

      //create new card
      var newCard = this.store.createRecord('card', {
        question: question,
        answer: answer,
        a: a,
        b: b,
        c: c,
        d: d
      });

      // Save to DataBase (firebase.com)
      newCard.save();

      // Clear Form
      this.setProperties({
        question: '',
        answer: '',
        a: '',
        b: '',
        c: '',
        d: ''
      });
    }
  }
});
