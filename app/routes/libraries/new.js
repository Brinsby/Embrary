import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return this.store.createRecord('library');
  },

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Create a new library');
    controller.set('buttonLabel', 'Create');
  },

  renderTemplate(){
    this.render('libraries/form');
  },

  action: {

    saveLibrary(newLibrary){
      newLibrary.save().then(() => this.transitionTo('libraries'));
    },

    willTransition(){
      let model = this.controller.get('model');

      if(mode.get('isNew')){
        model.destroyRecord();
      }
    }
  }
});
