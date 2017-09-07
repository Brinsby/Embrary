import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  classNames: ['label label-success label-fade'],
  classNameBindings: ['isShowing:label-show'],

  isShowing: false,

  isShowingChanged: Ember.observer('isShowing', function() {
    this._runLater = Ember.run.later(() => this.set('isShowing', false), 5000);
  }),

  resetRunLater() {
    this.set('isShowing', false);
    Ember.run.cancel(this._runLater);
  },

  willDestroy() {
    this.resetRunLater();
    this._super(...arguments);
  }
});
