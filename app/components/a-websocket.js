import Ember from 'ember';

// Tries to parse JSON
function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export default Ember.Component.extend({
  /*
    1. First step you need to do is inject the websockets service into your object.
  */
  websockets: Ember.inject.service(),
  socketRef: null,
  firebaseApp: Ember.inject.service(),
  questions: [],
  answer: [],
  a: [],
  b: [],
  c: [],
  d: [],

  didInsertElement() {
    this._super(...arguments);

    /*
      2. The next step you need to do is to create your actual websocket. Calling socketFor
      will retrieve a cached websocket if one exists or in this case it
      will create a new one for us.
    */
    const socket = this.get('websockets').socketFor('ws://localhost:3001/');

    /*
      3. The next step is to define your event handlers. All event handlers
      are added via the `on` method and take 3 arguments: event name, callback
      function, and the context in which to invoke the callback. All 3 arguments
      are required.
    */
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', this.myCloseHandler, this);

    this.set('socketRef', socket);
  },

  willDestroyElement() {
    this._super(...arguments);

    const socket = this.get('socketRef');

    /*
      4. The final step is to remove all of the listeners you have setup.
    */
    socket.off('open', this.myOpenHandler);
    socket.off('message', this.myMessageHandler);
    socket.off('close', this.myCloseHandler);
  },

  myOpenHandler(event) {
    console.log(`On open event has been called: ${event}`);
  },

  myMessageHandler(event) {
    // Attempt to parse the string for JSON
    if(isJSON(event.data)) {
      let obj = JSON.parse(event.data);
      console.log(obj);

      // Starts change of card
      if (obj.action === 'new_card') {
        //this.actions.changeCard(obj.data); // changeCard is action in a-websocket
        //remove question in 'questions' array before new question loads
        this.get('questions').popObject();
        this.get('answer').popObject();
        this.get('a').popObject();
        this.get('b').popObject();
        this.get('c').popObject();
        this.get('d').popObject();
        this.grab(obj.data);

        console.log('Changing card to ' + obj.data);
      }
    } else {
      console.log(`Message: ${event.data}`); // Not JSON, so just print String
    }
  },

  grab(card_id){
    const fire = this.get('firebaseApp');
    const database = fire.database();
    var question, a, b, c, d, answer;

    //query QUESTIONs from database
    question = database.ref('cards/' + card_id + '/question');
    question.on('value', function(snapshot){
      question = snapshot.val();
      console.log('question is ' + snapshot.val());
    });
    //add question to 'questions' array
    this.get('questions').pushObject(question);

    //query ANSWER from database
    answer = database.ref('cards/' + card_id + '/answer');
    answer.on('value', function(snapshot){
      answer = snapshot.val();
      console.log('answer is ' + snapshot.val());
    });
    //add question to 'answer' array
    this.get('answer').pushObject(answer);

    //query ANSWER A
    a = database.ref('cards/' + card_id + '/a');
    a.on('value', function(snapshot) {
      a = snapshot.val();
      console.log('answer a is ' + snapshot.val());
    });
    this.get('a').pushObject(a);      //add answer a to array 'a'

    //query ANSWER B
    b = database.ref('cards/' + card_id + '/b');
    b.on('value', function(snapshot) {
      b = snapshot.val();
      console.log('answer b is ' + snapshot.val());
    });
    this.get('b').pushObject(b);        //add answer b to array 'b'

    //query ANSWER C
    c = database.ref('cards/' + card_id + '/c');
    c.on('value', function(snapshot) {
      c = snapshot.val();
      console.log('answer c is ' + snapshot.val());
    });
    this.get('c').pushObject(c);      //add answer c to array 'c'

    //query ANSWER D
    d = database.ref('cards/' + card_id + '/d');
    d.on('value', function(snapshot) {
      d = snapshot.val();
      console.log('answer d is ' + snapshot.val());
    });
    this.get('d').pushObject(d);      //add answer c to array 'c'
  },

  myCloseHandler(event) {
    console.log(`On close event has been called: ${event}`);
  },

  // Eric: This is the action that gets called when the button is pressed
  actions: {
    sendButtonPressed() {
      const socket = this.get('socketRef');
      const userAnswer = this.get('user-answer');
      const cardAnswer = this.get('card-answer');

      if (cardAnswer === userAnswer){
        alert('Congratualtions, You got it Correct!');
      } else {
        alert('Sorry, That is Incorrect!');
      }

      let ses = this.get('session');

      //socket.send(`You answered: ${userAnswer}`);
      let obj = { user: this.email, answer: userAnswer };
      socket.send(JSON.stringify(obj));
    }
    // changeCard(card_id) {
    //   console.log('Changing card to ' + card_id);
    //   // TODO: Update view to new card id
    // }
  }
});
