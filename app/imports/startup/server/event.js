import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Events } from '../../api/event/event.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.eventHolder} (${data.owner})`);
  Events.insert(data);
}

/** Initialize the collection if empty. */
if (Events.find().count() === 0) {
  console.log('DEBUG Finding defailt Events')
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default Events.');
    Meteor.settings.defaultEvent.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Events', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Events.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('EventsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Events.find();
  }
  return this.ready();
});
