import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tasks } from '../imports/api/tasks.js';
import { Mongo } from 'meteor/mongo';

import './main.html';

Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});

Template.taskform.events({
'submit .myform':(event)=>{
	event.preventDefault();
	const task = event.target.task.value;
	Tasks.insert({
		_id:new Mongo.ObjectID,
		text:task
	});
	event.target.task.value = '';
}
});

Template.todos.events({
'click #btndel':(event)=>{
	const id = event.target.getAttribute('data-id');
	Tasks.remove(new Mongo.ObjectID(id));
}
});