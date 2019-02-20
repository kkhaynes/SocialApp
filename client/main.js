import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.profiles.helpers({
	descALL(){
		return userDB.find({});
	},
});

Template.profiles.events({
	'click .js-like'(event, instance) {
    	console.log("You clicked like");
	},
	'click .js-dislike'(event, instance) {
		console.log("You clicked dislike");
	},	
	'click .js-delete' (event, instance) {
		
		console.log(this._id);
		userDB.remove({_id: this._id});
   }
});

Template.addprofile.events({
	'click .js-save'(event, instance) {
		var fName = $('#exampleModal input[name="firstName"]').val();
		var lName = $('#exampleModal input[name="lastName"]').val();
		var image = $('#exampleModal input[name="imageURL"]').val();
		console.log("Name: ", fName, lName);
		console.log("Picture: ", image);

		$('#exampleModal input[name="firstName"]').val('');
		$('#exampleModal input[name="lastName"]').val('');
		$('#exampleModal input[name="imageURL"]').val('');

		$('#exampleModal').modal('hide');

		userDB.insert({'firstName':fName, 'lastName':lName, 'img':image});

	},
});