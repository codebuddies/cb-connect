import './entry_process.html';
import './entry_process_step1.js';
import './entry_process_step2.html';
import './entry_process_step3.html';
import './entry_process_complete.html';

import { ReactiveVar } from 'meteor/reactive-var';

Template.entry_process.onCreated(function() {
  const instance = this;
  // This represents current step of the process.
  instance.process_step = new ReactiveVar(4);
  instance.entry_data = new ReactiveVar(0);

});

Template.entry_process.events({
  "click #step1"(event, template) {
    template.process_step.set(1)


  },
  "click #step2"(event, template) {

    const category = $(template.find('input:radio[name=optradio]:checked')).val()

    if (!category) {
      return
    }
    // template.entry_data.set

    template.process_step.set(2)
  },
  "click #step3"(event, template) {
    template.process_step.set(3)
  }
});
