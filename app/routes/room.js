import Ember from 'ember';

export default Ember.Route.extend({

  firebaseApp: Ember.inject.service(),
  beforeModel: function(){
    const ref = this.get('firebaseApp').auth();

    //if no user logged in, will redirect to login page.
    ref.onAuthStateChanged(function(user){
       if(!user)
       {
         this.transitionTo('login');
       }
    }.bind(this)
  );
},


  model: function(id) {
    //return this.store.findAll('card'); // this returns all the questions
    console.log('id is ' + id);
    let triviaCard = this.store.findAll('card').then(function(item){

      // change the multiplicative number at the end to
      // the number of questions we have in database
      var randomIndex = Math.floor(Math.random() * 3);
      let newCard = item.objectAt(randomIndex);

      return [newCard];
    });

    return triviaCard;
  },
  actions: {
    invalidateModel: function(){
      this.refresh();
    }
  }
});
