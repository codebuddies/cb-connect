import './entry_process.html';

import { ReactiveVar } from 'meteor/reactive-var';
import { categories } from '../../../lib/data/categories';
import { timezones } from '../../../lib/data/timezones';

Template.entry_process.onCreated(function() {
  const instance = this;
  // This represents current step of the process.
  instance.processStep = new ReactiveVar(1);
  instance.entryData = new ReactiveVar({});
});

Template.entry_process.helpers({
  categories() {
    return categories;
  },
  timezones() {
    return timezones;
  },
});

Template.entry_process.events({
  'click #step1-next'(event, template) {
    const form = $('#entry-process1');

    if (form[0].checkValidity() === false) {
      event.preventDefault();
      form.addClass('was-validated');
      return;
    }

    const step1 = {
      category: $(template.find('input:radio[name=category]:checked')).val(),
    };

    // get set
    const data = template.entryData.get();
    data['step1'] = step1;
    template.entryData.set(data);
    template.processStep.set(2);
  },
  'click #step2-previous'(event, template) {
    template.processStep.set(1);
  },
  'click #step2-next'(event, template) {
    const form = $('#entry-process2');

    if (form[0].checkValidity() === false) {
      event.preventDefault();
      form.addClass('was-validated');
      return;
    }

    const step2 = {
      name: $.trim(template.find('#entry-name').value),
      intro: $.trim(template.find('#entry-intro').value),
      request: $.trim(template.find('#entry-request').value),
    };

    // get set
    const data = template.entryData.get();
    data['step2'] = step2;
    template.entryData.set(data);

    // change view
    template.processStep.set(3);
  },
  'click #step3-previous'(event, template) {
    template.processStep.set(2);
  },
  'click #step3-submit'(event, template) {
    //submit - create an entry.

    const form = $('#entry-process3');

    if (form[0].checkValidity() === false) {
      event.preventDefault();
      form.addClass('was-validated');
      return;
    }

    const step3 = {
      email: $.trim(template.find('#entry-email').value),
      timezone: $('#entry-timezone option:selected').val(),
      timezoneId: $('#entry-timezone option:selected').attr('data-id'),
      timezoneDaylightSaving: $('#entry-timezone option:selected').attr('data-daylight'),
    };

    // get set
    const data = template.entryData.get();
    data['step3'] = step3;
    template.entryData.set(data);
    // template.processStep.set(3)

    //submit an entry
  },
});
