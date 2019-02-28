import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

function toggleDarkLight() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}

Template.profiles.helpers({
	descALL(){
		return userDB.find({});
	},
});

Template.profiles.events({

	'click .js-like'(event, instance) {
    	console.log("You clicked like");
	var profID = this._id;
	var numLikes = userDB.findOne({_id: profID}).like;
	if (!numLikes) {
		numLikes = 0;
	}
	numLikes = numLikes + 1;
	console.log("You have",numLikes);
	userDB.update({_id:profID}, {$set:{'like':numLikes}});

	},

	'click .js-dislike'(event, instance) {
		console.log("You clicked dislike");
	var profID = this._id;
	var numDisLikes = userDB.findOne({_id: profID}).Dlike;
	if (!numDisLikes) {
		numDisLikes = 0;
	}
	numDisLikes = numDisLikes + 1;
	console.log("You have",numDisLikes);
	userDB.update({_id:profID}, {$set:{'Dlike':numDisLikes}});

	},

	'click .js-delete' (event, instance) {
		
		console.log(this._id);
		userDB.remove({_id: this._id});

		$('#profile').modal('hide');

   },

  //  'click .js-profPic' (event, instance) {
  //           console.log("You clicked Profile Picture");
      
		//       $('#exampleModal').on('show.bs.modal', function (event) {
		//   // var button = $(event.relatedTarget) // Button that triggered the modal
		//   var modal = $(this)
		//   userDB.findOne('.modal-title').text('New message to ' + recipient)
		//   userDB.findOne('.modal-body input').val(recipient)
		// })
  //  }

});

Template.addprofile.events({
	'click .js-save'(event, instance) {
		var fName = $('#exampleModal input[name="firstName"]').val();
		var lName = $('#exampleModal input[name="lastName"]').val();
		var image = $('#exampleModal input[name="imageURL"]').val();
		console.log("Name: ", fName, lName);
		console.log("Picture: ", image);

		if(image == ""){
           image="avatar.png";
       }
       

		$('#exampleModal input[name="firstName"]').val('');
		$('#exampleModal input[name="lastName"]').val('');
		$('#exampleModal input[name="imageURL"]').val('');

		$('#exampleModal').modal('hide');

		userDB.insert({'firstName':fName, 'lastName':lName, 'img':image});
		
	},
});