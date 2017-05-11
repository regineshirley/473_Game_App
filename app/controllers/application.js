import Ember from 'ember';

export default Ember.Controller.extend({
hideNav: Ember.computed.equal('currentRouteName', 'login')
});
