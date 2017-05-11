import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  beforeModel: function(){
    const ref = this.get('firebaseApp').auth();

    //if no user logged in, will redirect to login page.
    ref.onAuthStateChanged(function(user){
       if(user)
       {
         this.transitionTo('room');
       }
    }.bind(this)
  );
},

  actions: {
    login: function() {
      var controller = this.get('controller');
      var email = controller.get('email');
      var pass = controller.get('password');
      const ref = this.get('firebaseApp').auth();

      return ref.signInWithEmailAndPassword(email, pass).catch(function(error) {
        console.log('Sign In error', error);
      }).then(function() {
        ref.onAuthStateChanged(function(user){
          console.log('user', user)
        });
      }.bind(this));
    },

    github: function() {
      const ref = this.get('firebaseApp').auth();
      var provider = new Firebase.auth.GithubAuthProvider();

      provider.addScope('profile');
      provider.addScope('user');

      return ref.signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

        this.transitionTo('room');
        ref.onAuthStateChanged(function(user){
        console.log('user ', user);});
      }.bind(this)).catch(function(error){
        console.log(error.code);
      });

    }
  }

});
