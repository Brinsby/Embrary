import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return this.store.createRecord('library');
  },

  action: {
    saveLibrary(newLibrary){
      newLibrary.save().then(() => this.transitionTo('libraries'));
    },

    willTransition(){
      this.controller.get('model').rollbackAttributes();
    }
  }
})
