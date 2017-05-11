import Ember from 'ember';

export default Ember.Controller.extend({
  count: 0,
  actions: {
    // Answer is now checked in the a-websocket component
    //
    // answerCheck: function(ans) {
    //   var answer = this.get('choice');
    //   if (answer === ans) {
    //     alert('Congratualtions, You got it Correct!');
    //     this.count += 1;
    //     console.log(this.count);
    //     this.send('reloadQuestion');
    //   } else {
    //     alert('Sorry, That is Incorrect!');
    //     this.send('reloadQuestion');
    //   }
    // },
    // reloadQuestion: function() {
    //   this.send('invalidateModel');
    // }

    //let trivCard = this.store.createRecord('card');
    // var question;
    // this.store.findRecord('card', id).then(function(item){
    //    alert(item.get('question'));
    // })
    //let question = trivCard.question;
    //alert(this.question);
    //}
  }
});
