import Ember from 'ember';

export default Ember.Controller.extend({
  //The email, message and message the promise will return
  emailAddress: '',
  contactMessage: '',
  responseMessage: '',

  //compute if the email is valid using a really simple regex
  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  //check if the message is greater than 5 characters
  isMessageEnoughLong: Ember.computed.gte('contactMessage.length', 5),

  //if both of these are true then the message/email is valid
  isValid: Ember.computed.and('isValidEmail', 'isMessageEnoughLong'),
  //this disables the button until the above two conditions are met
  isDisabled: Ember.computed.not('isValid'),

  actions: {
      //action taken when the user hits submit
      saveContactMessage(){

        //Get the email address is the email box
        const email = this.get('emailAddress');
        //Get the message in the box
        const message = this.get('contactMessage');

        //Create a new record in which to store this info in the app store
        //YOU NEED TO MAKE SURE YOU ARE PASSING THE MODEL TO THE STORE!!! So in this case my model is called contact
        //(the file name) as opposed to one of the variables created here in the controller
        const newContactMessage = this.store.createRecord('contact',{
          email: email,
          message: message
        });

        //send this to firebase!
        newContactMessage.save().then((response) =>{
          //display a message letting the user know the response attempted to contact the server
          this.set('responseMessage', `Thank you! We saved your message with the following id: ${response.get('id')}`);
          //Reset the fields to nothing
          this.set('emailAddress', '');
          this.set('contactMessage', '');
        });

    }
  }

});
