/**
 * @copyright     (c) 2011, FeedHenry
 */
/**
 * @class Ext.ux.TouchCalendarAvailability
 * @author Cian Clarke
 * 
 */
Ext.define('Ext.ux.TouchCalendarAvailability', {
  extend: 'Ext.ux.TouchCalendarEvents',
  config: {
    /**
     * @cfg {String} eventBarTpl Template that will be used to fill the Event Bar
     */
    eventBarTpl : '{title}', // make this an internal set-able property
    availableColour: 'green',
    busyColour : 'red',
    availabilityField: 'available',
    assigneeField: 'assignto'
  },
  createEventWrapper: function(){
    this.renderEventBars(this.eventBarStore);
    return;
  },
  renderEventBars: function (store) {
    // Set the field colour depending on availability
    var aC = this.getAvailableColour() || 'blue';
    var bC = this.getBusyColour() || 'red';
    this.calendar.eventStore.each(function(r){
      // Get our available colour
      var c = (r.get('available')===true) ? aC : bC;
      // If the user hasn't already set a colour, let's set one to indicate availability
      if (r.get('colour') === undefined || r.get('colour')===null){
        r.set('colour', c);
      }
    });
    
    // TODO: 2x asyncs co-dependent. Risky?
    store.each(function(record){
      var eventRecord = this.getEventRecord(record.get('EventID')),
      doesWrap = this.eventBarDoesWrap(record),
      date = record.get('Date'),
      hasWrapped = this.eventBarHasWrapped(record),
      parentRecord = record.get('Record'),
      assignedTo = parentRecord.get(this.getAssigneeField()),
      availabilityField = this.getAvailabilityField(),
      available = undefined;
      if (availabilityField.indexOf("!")===0){
        availabilityField = availabilityField .slice(1);
        available = !parentRecord.get(availabilityField);
      }else{
        available = parentRecord.get(availabilityField);
      }
      
      
      
      
      if (!assignedTo){
        assignedTo = this.getAssigneeField();
        // This is a bit silly, but allows us to support our hasOne relationship
        // on an eventRecord, of the format "assignedTo/id"
        assignedTo = assignedTo.split('/');
        var m1 = assignedTo[0], m2 = assignedTo[1];
        m1 = m1.charAt(0).toUpperCase() + m1.slice(1);
        assignedTo = parentRecord['get' + m1](); // Call the getter function to get the assignee record
        assignedTo = assignedTo.get(m2); 
      }
      
      var userRow = this.calendar.element.select('tr[class="availabilityRow row-' + assignedTo + '"]');
      var dayEl = this.calendar.element.select('tr[class="availabilityRow row-' + assignedTo + '"] td[datetime="' + this.calendar.getDateAttribute(date) + '"]').first();
      
      if (!dayEl){
        console.warn('Couldnt find TR for ' + assignedTo);
        return;
      }
      //dayEl.addCls('events');
      //@Karan integrated eventDots to touch calendar
      var innerSpan = dayEl.select('span')
      innerSpan.addCls('simple-event-multi');

      //if (available) dayEl.addCls('allday');
      return
      // Instead of creating an event bar, we're just going to colour the relevant day cell!


      // create the event bar
      var eventBar = Ext.DomHelper.append(dayEl, {
        tag: 'div',
        style: {
          'background-color': eventRecord.get(this.colourField)
        },
        html: new Ext.XTemplate(this.getEventBarTpl()).apply(eventRecord.data),
        eventID: record.get('EventID'),
        cls: this.eventBarCls + ' ' + 'ev' + record.get('EventID') + (doesWrap ? ' wrap-end' : '') + (hasWrapped ? ' wrap-start' : '') + ' available-' + available 
      }, true);
      
      eventBar.on('tap', this.onEventWrapperTap, this);
      return;
      
    }, this); // end store.each
    //this.callParent(arguments); // calls Ext.panel.Panel's constructor
  },
  /**
   * Handler function for the tap event on the eventWrapperEl
   * @method
   * @private
   * @param {Event} e
   * @param {Object} node
   */
  onEventWrapperTap: function(e, node){
      e.stopPropagation(); // stop event bubbling up
      
      var eventID = node.attributes['eventID'];
      if (eventID) {
          var eventRecord = this.getEventRecord(node.attributes['eventID'].value);
          this.deselectEvents();
          
          Ext.select('div.ev' + eventRecord.id).addCls(this.eventBarSelectedCls);
          var dom = Ext.query('.ev' + eventRecord.id);
          dom = (dom && dom.length) ? dom[0] : undefined;
          
          this.calendar.fireEvent('eventtap', eventRecord, e, dom);
      }
  }
});

