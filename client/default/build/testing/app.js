
Ext.define('Ext.ux.TouchCalendarView', {

  extend: 'Ext.Container',
  xtype: 'touchcalendar',
  config: {
    /**
     * @cfg {String} mode The mode the Calendar will be displayed in. Possible values 'month', 'week' or 'day'.
     */
    viewMode: 'month',

    /**
     * cfg {Number} weekStart Starting day of the week. (0 = Sunday, 1 = Monday ... etc)
     */
    weekStart: 1,

    /**
     * @cfg {String} todayCls CSS class added to the today's date cell
     */
    todayCls: 'today',

    /**
     * @cfg {String} selectedItemCls CSS class added to the date cell that is currently selected
     */
    selectedItemCls: 'selected',

    /**
     * @cfg {String} unselectableCls CSS class added to any date cells that are unselectable
     */
    unselectableCls: 'unselectable',

    /**
     * @cfg {String} prevMonthCls CSS class added to any date cells that are part of the previous month
     */
    prevMonthCls: 'prev-month',

    /**
     * @cfg {String} nextMonthCls CSS class added to any date cells that are part of the next month
     */
    nextMonthCls: 'next-month',

    /**
     * @cfg {String} weekendCls CSS class added to any date cells that are on the weekend
     */
    weekendCls: 'weekend',

    /**
     * @cfg {String} prevPeriodCls CSS class added to the previous period navigation cell in the calendar's header
     */
    prevPeriodCls: 'goto-prev',

    /**
     * @cfg {String} nextPeriodCls CSS class added to the next period navigation cells in the calendar's header
     */
    nextPeriodCls: 'goto-next',

    /**
     * @cfg {String} selectPeriodCls CSS class added to the month + year title cell in the calendar's header
     */
    selectPeriodCls: 'goto-mnth',

    /**
     * @cfg {Number} dayTimeSlotSize The number of minutes the Day View's time slot will increment by. Defaults to 30 minutes.
     */
    dayTimeSlotSize: 30,

    value: null,

    store: null,

    baseTpl: [
      '<table class="{[this.me.getViewMode().toLowerCase()]}">',
      '<thead>',
      '<tr>',
      '<tpl for="this.getDaysArray(values)">',
      '<th class="{[this.getHeaderClass(xindex)]}">',
      '<tpl if="xindex === 4">',
      '<span>{[Ext.Date.format(this.me.currentDate, "F")]} {[Ext.Date.format(this.me.currentDate, "Y")]}</span>',
      '</tpl>',
      '{date:date("D")}',
      '</th>',
      '</tpl>',
      '</tr>',
      '</thead>',
      '<tbody>',
      '<tr>',
      '<tpl for=".">',

      '<td class="time-block {[this.getClasses(values)]}" datetime="{[this.me.getDateAttribute(values.date)]}">',
      '{date:date("j")}',
      '</td>',

      '<tpl if="this.isEndOfRow(xindex)">',
      '</tr>',
      '<tpl if="!this.isEndOfPeriod(xindex)">',
      '<tr>',
      '</tpl>',
      '</tpl>',

      '</tpl>',
      '</tr>',
      '</tbody>',
      '</table>'],

    cls: 'touch-calendar-view',

    itemSelector: 'td.time-block'

  },

  /**
   * Object containing common functions to be passed to XTemplate for internal use
   * @property {Object} commonTemplateFunctions
   * @private
   */
  commonTemplateFunctions: {

    /**
     * Gets the classes that should be applied to the current day's cell
     * @method
     * @private
     * @param {Object} values
     * @return {String}
     */
    getClasses: function(values){
      var classes = [];

      if(values.selected){
        classes.push(this.me.getSelectedItemCls());
      }
      if(values.unselectable){
        classes.push(this.me.getUnselectableCls());
      }
      if(values.prevMonth){
        classes.push(this.me.getPrevMonthCls());
      }
      if(values.nextMonth){
        classes.push(this.me.getNextMonthCls());
      }
      if(values.weekend){
        classes.push(this.me.getWeekendCls());
      }
      if(values.today){
        classes.push(this.me.getTodayCls());
      }

      return classes.join(' ');
    },

    /**
     * Returns true if the specific index is at the end of the row
     * Used to determine if a row terminating tag is needed
     * @method
     * @private
     * @param {Number} currentIndex
     * @return {Boolean}
     */
    isEndOfRow: function(currentIndex){
      return (currentIndex % 7) === 0 && (currentIndex > 0);
    },

    /**
     * Returns true if the specific index is at the start of the row.
     * USed to determine whether if a row opening tag is needed
     * @method
     * @private
     * @param {Number} currentIndex
     * @return {Boolean}
     */
    isStartOfRow: function(currentIndex){
      return ((currentIndex-1) % 7) === 0 && (currentIndex-1 >= 0);
    },

    /**
     * Gets an array containing the first 7 dates to be used in headings
     * @method
     * @private
     * @param {Object} values
     * @return {Date[]}
     */
    getDaysArray: function(values){
      var daysArray = [],
      i;

      for(i = 0; i < this.me.periodRowDayCount; i++){
        daysArray.push(values[i]);
      }

      return daysArray;
    },

    /**
     * Gets the class to be added to the header cells
     * @method
     * @private
     * @param {Number} currentIndex
     * @return {Boolean}
     */
    getHeaderClass: function(currentIndex){
      return currentIndex === 1 ? this.me.getPrevPeriodCls() : currentIndex === 7 ? this.me.getNextPeriodCls() : '';
    }
  },

  constructor: function(config){

    this.initModel();

    var store = Ext.create('Ext.data.Store', {
      model: 'TouchCalendarViewModel'
    });
    this.store = store;
    this.setStore(store);

    Ext.apply(this, config || {
    });

    /**
     * @event selectionchange Fires when the Calendar's selected date is changed
     * @param {Ext.ux.TouchCalendarView} this
     * @param {Array[Ext.ux.TouchCalendarViewModel]} selectedDates An array of the selected date records
     */

    /**
     * @event periodchange Fires when the calendar changes to a different date period (i.e. switch using the arrows)
     * @param {Ext.ux.TouchCalendarView} this
     * @param {Date} minDate New view's minimum date
     * @param {Date} maxDate New view's maximum date
     * @param {string} direction Direction that the view moved ('forward' or 'back')
     */

    this.callParent(arguments);

    this.minDate = this.minDate ? Ext.Date.clearTime(this.minDate, true) : null;
    this.maxDate = this.maxDate ? Ext.Date.clearTime(this.maxDate, true) : null;

    this.refresh();
  },

  /**
   * Override of onRender method. Attaches event handlers to the element to handler
   * day taps and period switch taps
   * @method
   * @private
   * @return {void}
   */
  initialize: function() {
    this.callParent();

    this.element.on({
      tap: this.onTableHeaderTap,
      scope: this,
      delegate: 'th'
    });

    this.element.on({
      tap: this.onTimeSlotTap,
      scope: this,
      delegate: this.getItemSelector()
    });

    this.on({
      painted: this.syncHeight,
      scope: this
    });


  },

  /**
   * Creates the Calendar's Model if it doesn't already exist
   * @method
   * @private
   */
  initModel: function(){
    if(!Ext.ModelManager.isRegistered('TouchCalendarViewModel')) // TODO: Throws an error in opening Ext.ux.TouchCalendar.html example??
    {
      Ext.define('TouchCalendarViewModel', {
        extend: 'Ext.data.Model',
        config: {
          fields: [
            {name: 'date', type: 'date'},
            {name: 'today', type: 'boolean'},
            {name: 'unselectable', type: 'boolean'},
            {name: 'selected', type: 'boolean'},
            {name: 'prevMonth', type: 'boolean'},
            {name: 'nextMonth', type: 'boolean'},
            {name: 'weekend', type: 'boolean'},
            'timeSlots'
          ]
        }
      });
    }
  },

  /**
   * Updater for the viewMode configuration option.
   * Refreshes the calendar once the new viewMode is applied and set.
   * @param viewMode
   * @param oldViewMode
   */
  updateViewMode: function(viewMode, oldViewMode){
    this.refresh();
  },

  /**
   * Applies the view mode change requested to the Calendar. Possible values are 'month', 'week' or 'day'.
   * @param {String} mode Either 'month', 'week' or 'day'
   */
  applyViewMode: function(viewMode){

    var viewModeFns = Ext.ux.TouchCalendarView[viewMode.toUpperCase()];

    // Update the mode specific functions/values
    this.getStartDate = viewModeFns.getStartDate;
    this.getTotalDays = viewModeFns.getTotalDays;
    this.dateAttributeFormat = viewModeFns.dateAttributeFormat;
    this.getNextIterationDate = viewModeFns.getNextIterationDate;
    this.getDeltaDate = viewModeFns.getDeltaDate;
    this.periodRowDayCount = viewModeFns.periodRowDayCount;

    Ext.apply(this.commonTemplateFunctions, {me: this})

    // Create the template
    this.setTpl(new Ext.XTemplate((viewModeFns.tpl || this.getBaseTpl()).join(''), this.commonTemplateFunctions));

    this.setScrollable(viewMode.toUpperCase() === 'DAY' ? 'vertical' : false);

    return viewMode;
  },

  collectData: function(records){
    var data = [];

    Ext.each(records, function(record, index){
      data.push(record.data);
    }, this);

    return data;
  },

  /**
   * Builds a collection of dates that need to be rendered in the current configuration
   * @method
   * @private
   * @param {Number} day
   * @param {Number} month
   * @param {Number} year
   * @return {Ext.util.MixedCollection} Mixed Collection of Objects with configuration for each date cell
   */
  populateStore: function(options) {
    this.currentDate = this.currentDate || this.value || new Date();

    var unselectable = true, // variable used to indicate whether a day is allowed to be selected
    baseDate = this.currentDate, // date to use as base
    iterDate = this.getStartDate(baseDate), // date current mode will start at
    totalDays = this.getTotalDays(baseDate), // total days to be rendered in current mode
    record;

    this.getStore().suspendEvents();
    this.getStore().data.clear();

    // create dates based on startDate and number of days to render
    for(var i = 0; i < totalDays; i++){

      // increment the date by one day (except on first run)
      iterDate = this.getNextIterationDate(iterDate, (i===0?0:1));

      unselectable = (this.minDate && iterDate < this.minDate) || (this.maxDate && iterDate > this.maxDate);

      record = Ext.create('TouchCalendarViewModel', {
        today: this.isSameDay(iterDate, new Date()),
        unselectable: unselectable,
        selected: this.isSameDay(iterDate, this.value) && !unselectable,
        prevMonth: (iterDate.getMonth() < baseDate.getMonth()),
        nextMonth: (iterDate.getMonth() > baseDate.getMonth()),
        weekend: this.isWeekend(iterDate),
        date: iterDate
      });

      this.getStore().add(record);
    }

    this.getStore().resumeEvents();
  },

  /**
   * Refreshes the calendar moving it forward (delta = 1) or backward (delta = -1)
   * @method
   * @param {Number} delta - integer representing direction (1 = forward, =1 = backward)
   * @return {void}
   */
  refreshDelta: function(delta, options) {
    var self = this;

    var v = this.currentDate || new Date();
    var newDate = this.getDeltaDate(v, delta);

    // don't move if we've reached the min/max dates
    if (this.isOutsideMinMax(newDate)) {
      return;
    }

    this.currentDate = newDate;

    this.refresh(options);

    var minMaxDate = this.getPeriodMinMaxDate();

    //this.fireEvent('periodchange', this, minMaxDate.min.get('date'), minMaxDate.max.get('date'), (delta > 0 ? 'forward' : 'back'));    

//    var eventController = GSS.app.getController("tsm.EventController");
//    if (eventController) {
//      var dateRange  = eventController.getDateRange();
//      var dateOffset = ((this.periodRowDayCount-1) * 86400000); // 3 Days
//
//      if (this.currentDate >= dateRange.from && this.currentDate <= (dateRange.to - dateOffset)) {      
//        this.fireEvent('periodchange', this, minMaxDate.min.get('date'), minMaxDate.max.get('date'), (delta > 0 ? 'forward' : 'back'));    
//      } else {
//        eventController.fetchEvents(this.currentDate, function() {
//          self.fireEvent('periodchange', self, minMaxDate.min.get('date'), minMaxDate.max.get('date'), (delta > 0 ? 'forward' : 'back'));        
//        });          
//      }    
//    }
  },

  /**
   * Returns the current view's minimum and maximum date collection objects
   * @method
   * @private
   * @return {Object} Object in the format {min: {}, max: {}}
   */
  getPeriodMinMaxDate: function(){
    return {
      min: this.getStore().data.first(),
      max: this.getStore().data.last()
    };
  },

  /**
   * Returns true or false depending on whether the view that is currently on display is outside or inside the min/max dates set
   * @method
   * @private
   * @param {Date} date A date within the current period, generally the selected date
   * @return {Boolean}
   */
  isOutsideMinMax: function(date){
    var outside = false;

    if(this.viewMode === 'MONTH'){
      outside = ((this.minDate && date.getLastDateOfMonth() < this.minDate) || (this.maxDate && date.getFirstDateOfMonth() > this.maxDate));
    } else {
      outside = ((this.minDate && this.getWeekendDate(date) < this.minDate) || (this.maxDate && this.getStartDate(date) > this.maxDate));
    }

    return outside;
  },

  /**
   * Handler for a tap on the table header
   * @method
   * @private
   * @param {Object} e
   * @param {Object} el
   * @return {void}
   */
  onTableHeaderTap: function(e, el){
    el = Ext.fly(el);
    if (el.hasCls(this.getPrevPeriodCls()) || el.hasCls(this.getNextPeriodCls())) {
      this.refreshDelta(el.hasCls(this.getPrevPeriodCls()) ? -1 : 1);
    }
    else if (el.hasCls(this.getSelectPeriodCls())) {   
      var self = this;
      var showTodayFn = function() {
        var d1 = self.currentDate.getTime();
        var d2 = new Date().getTime();

        self.onDatePickerChange(d1, d2, {
          today: true
        });

        // Close the date picker
        datePicker.hide();
      };
      var currentDate = this.currentDate;

      var datePicker = Ext.create('Ext.ux.DateTimePicker', {
        slotOrder: ['month', 'year'],
        daySlotEnabled: false,
        yearFrom: (new Date().getFullYear() - 1),
        yearTo: (new Date().getFullYear() + 1),
        toolbar: {          
          items: [{
            xtype: 'button',
            text: 'Today',
            ui: 'action',
            align: 'right',
            handler: showTodayFn
          }]
        },
        listeners: {
          cancel: function() {},
          change: function(picker, objValue) {
            var d1 = self.currentDate.getTime();
            var d2 = new Date(objValue.getFullYear(), objValue.getMonth(), 01).getTime();

            self.onDatePickerChange(d1, d2, {
              datePicker: d2
            });
          },
          show: function() {
            datePicker.setValueAnimated({
              month: currentDate.getMonth() + 1,
              year: currentDate.getFullYear()
            });
          }
        }
      });
      Ext.Viewport.add( datePicker );
      datePicker.show();
    }
  },

  onDatePickerChange: function(d1, d2, options) {
    var day   = 1000 * 60 * 60 * 24;
    var delta = Math.floor((Math.ceil((d2 - d1) / day)) / this.periodRowDayCount);
    if (delta === 0) return;

    this.refreshDelta(delta, options);
  },

  /**
   * Handler for taps on the Calendar's timeslot elements.
   * Processes the tapped element and selects it visually then fires the selectionchange event
   * @method
   * @private
   * @param {Ext.EventObject} e The taps event object
   * @return {void}
   */
  onTimeSlotTap: function(e){
    var target = Ext.fly(e.getTarget());

    this.selectCell(target);

    var newDate = this.getCellDate(target);

    var previousValue = this.getValue();

    this.setValue(newDate);

    this.fireEvent('selectionchange', this, newDate, previousValue);
  },

  /**
   * Override for the Ext.DataView's refresh method. Repopulates the store, calls parent then sync the height of the table
   * @method
   */
  refresh: function(options, callback) {   
    var me = this;
    var records = null;

    setTimeout(function(){
        //@Karan: performing store updates asyncs to improve performance on device
        me.populateStore(options);
        records = me.getStore().getRange();
        me.setData(me.collectData(records));
        me.syncHeight();

        callback && callback();
    }, 5);
  },

  /**
   * Syncs the table's Ext.Element to the height of the Ext.DataView's component. (Only if it isn't in DAY mode)
   */
  syncHeight: function(){
    if (this.getViewMode().toUpperCase() !== 'DAY') {
      var table = this.element.select('table');
      if (table && table.elements.length>0){
        table.first().setHeight(this.element.getHeight());
      }
    }
  },

  /**
   * Selects the specified cell
   * @method
   * @param {Ext.Element} cell
   */
  selectCell: function(cell){
    var selCls = this.getSelectedItemCls();

    var selectedEl = this.element.select('td.' + selCls).first();
    while(selectedEl){
        if(selectedEl){
            selectedEl.removeCls(selCls);
        }
        selectedEl = this.element.select('td.' + selCls).first();
    }
    cell.addCls(selCls);
    
    //TODO: fetch from function
    var selHdrCls = 'selectedHeaders';
    var selectedHdrEl = this.element.select('th.' + selHdrCls).first();
    if(selectedHdrEl){
        selectedHdrEl.removeCls(selHdrCls);
    }
    
  },

  /**
   * Returns the TouchCalendarViewModel model instance containing the passed in date
   * @method
   * @privatee
   * @param {Date} date
   */
  getDateRecord: function(date){
    return this.getStore().findBy(function(record){
      var recordDate = Ext.Date.clearTime(record.get('date'), true).getTime();

      return recordDate === Ext.Date.clearTime(date, true).getTime();
    }, this);
  },

  /**
   * Returns the same day
   * @method
   * @private
   * @param {Number} day
   * @param {Number} month - 0 based month representation (0 = Jan, 11 = Dec)
   * @param {Number} year
   * @return {Date}
   */
  getDayStartDate: function(date){
    return date;
  },

  /**
   * Returns true if the two dates are the same date (ignores time)
   * @method
   * @private
   * @param {Date} date1
   * @param {Date} date2
   * @return {Boolean}
   */
  isSameDay: function(date1, date2){
    if(!date1 || !date2){
      return false;
    }
    return Ext.Date.clearTime(date1, true).getTime() === Ext.Date.clearTime(date2, true).getTime();
  },

  /**
   * Returns true if the specified date is a Saturday/Sunday
   * @method
   * @private
   * @param {Object} date
   * @return {Boolean}
   */
  isWeekend: function(date){
    return date.getDay() === 0 || date.getDay() === 6;
  },

  /**
   * Returns the last day of the week based on the specified date.
   * @method
   * @private
   * @param {Date} date
   * @return {Date}
   */
  getWeekendDate: function(date){
    var dayOffset = date.getDay() - this.getWeekStart();
    dayOffset = dayOffset < 0 ? 6 : dayOffset;

    return new Date(date.getFullYear(), date.getMonth(), date.getDate()+0+dayOffset);
  },

  /**
   * Returns the Date associated with the specified cell
   * @method
   * @param {Ext.Element} dateCell
   * @return {Date}
   */
  getCellDate: function(dateCell) {
    var date = dateCell.dom.getAttribute('datetime');
    return this.stringToDate(date);
  },

  /**
   * Returns the cell representing the specified date
   * @method
   * @param {Ext.Element} date
   * @return {Ext.Element}
   */
  getDateCell: function(date){
    return this.element.select('td[datetime="' + this.getDateAttribute(date) + '"]').first();
  },

  /**
   * Returns a string format of the specified date
   * Used when assigning the datetime attribute to a table cell
   * @method
   * @private
   * @param {Date} date
   * @return {String}
   */
  getDateAttribute: function(date){    
    return Ext.Date.format(date, this.dateAttributeFormat);
  },

  /**
   * Converts a string date (used to add to table cells) to a Date object
   * @method
   * @private
   * @param {String} dateString
   * @return {Date}
   */
  stringToDate: function(dateString) {
    return Ext.Date.parseDate(dateString, this.dateAttributeFormat);
  },

  statics: {

    MONTH: {

      dateAttributeFormat: 'd-m-Y',

      /**
       * Called during the View's Store population. This calculates the next date for the current period.
       * The MONTH mode's version just adds 1 (or 0 on the first iteration) to the specified date.
       * @param {Date} d Current Iteration date
       * @param {Number} index
       */
      getNextIterationDate: function(d, index){
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (index===0?0:1));
      },

      /**
       * Returns the total number of days to be shown in this view.
       * @method
       * @private
       * @param {Date} date
       */
      getTotalDays: function(date){
        var firstDate = Ext.Date.getFirstDateOfMonth(date);

        return this.isWeekend(firstDate) ? 42 : 35;
      },

      /**
       * Returns the first day that should be visible for a month view (may not be in the same month)
       * Gets the first day of the week that the 1st of the month falls on.
       * @method
       * @private
       * @param {Date} date
       * @return {Date}
       */
      getStartDate: function(date){
        return Ext.bind(Ext.ux.TouchCalendarView.WEEK.getStartDate, this)(new Date(date.getFullYear(), date.getMonth(), 1));
      },

      /**
       * Returns a new date based on the date passed and the delta value for MONTH view.
       * @method
       * @private
       * @param {Date} date
       * @param {Number} delta
       * @return {Date}
       */
      getDeltaDate: function(date, delta){
        var newMonth = date.getMonth() + delta,
        newDate = new Date(date.getFullYear(), newMonth, 1);

        newDate.setDate(Ext.Date.getDaysInMonth(newDate) < date.getDate() ? Ext.Date.getDaysInMonth(newDate) : date.getDate());

        return newDate;
      },

      periodRowDayCount: 7
    },

    WEEK: {

      dateAttributeFormat: 'd-m-Y',

      /**
       * Called during the View's Store population. This calculates the next date for the current period.
       * The WEEK mode's version just adds 1 (or 0 on the first iteration) to the specified date.
       * @param {Date} d Current Iteration date
       * @param {Number} index
       */
      getNextIterationDate: function(d, index){
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (index===0?0:1));
      },

      /**
       * Returns the total number of days to be shown in this view.
       * As it is the WEEK view it is always 7
       * @method
       * @private
       * @param {Date} date
       */
      getTotalDays: function(date){
        return 4;
      },

      /**
       * Returns the first day of the week based on the specified date.
       * @method
       * @private
       * @param {Date} date
       * @return {Date}
       */
      getStartDate: function(date){
//          var dayOffset = date.getDay() - this.getWeekStart();
//          dayOffset = dayOffset < 0 ? 3 : dayOffset;
// 
//          return new Date(date.getFullYear(), date.getMonth(), date.getDate()-0-dayOffset);
          
        var dayOffset = date.getDay() - this.getWeekStart();
        dayOffset = dayOffset < 0 ? 3 : 0;

        return new Date(date.getFullYear(), date.getMonth(), date.getDate()-0);  //dayOffset); @Karan using 4 instead of 7(dayOffset)
      },

      /**
       * Returns a new date based on the date passed and the delta value for WEEK view.
       * @method
       * @private
       * @param {Date} date
       * @param {Number} delta
       * @return {Date}
       */
      getDeltaDate: function(date, delta){
        //return new Date(date.getFullYear(), date.getMonth(), date.getDate() + (delta * 4));
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + (delta * this.periodRowDayCount));
      },

      periodRowDayCount: 4
    },

    DAY: {
      /**
       * Date format that the 'datetime' attribute, given to each time slot, has. Day mode needs the time in aswell so
       * events etc know what time slot it is
       */
      dateAttributeFormat: 'd-m-Y H:i',

      /**
       * Template for the DAY view
       */
      tpl: [
        '<table class="{[this.me.getViewMode().toLowerCase()]}">',
        '<thead>',
        '<tr>',
        '<th class="{[this.me.getPrevPeriodCls()]} style="display: block;">',
        '</th>',
        '<th>',
        '<span style="position: static;">{[Ext.Date.format(values[0].date, "D jS M Y")]}</span>',
        '</th>',
        '<th class="{[this.me.getNextPeriodCls()]} style="display: block;"">',
        '</th>',
        '</tr>',
        '</thead>',
        '<tbody>',
        '<tpl for=".">',
        '<tr>',

        '<td class="time-block" datetime="{[this.me.getDateAttribute(values.date)]}" colspan="3">',

        '{date:date("H:i")}',

        '</td>',
        '</tr>',
        '</tpl>',
        '</tbody>',
        '</table>'],

      /**
       * Called during the View's Store population. This calculates the next date for the current period.
       * The DAY mode's version just adds another time period on.
       * @param {Date} currentIterationDate
       * @param {Number} index
       */
      getNextIterationDate: function(currentIterationDate, index){
        var d = currentIterationDate.getTime() + ((index===0?0:1) * (this.getDayTimeSlotSize() * 60 * 1000));

        return new Date(d);
      },

      /**
       * Returns the total number of time slots to be shown in this view.
       * This is derived from the dayTimeSlotSize property
       * @method
       * @private
       * @param {Date} date
       */
      getTotalDays: function(date){
        return 1440 / this.getDayTimeSlotSize();
      },

      /**
       * Returns the same date as passed in because there is only one date visible
       * @method
       * @private
       * @param {Date} date
       * @return {Date}
       */
      getStartDate: function(date){
        return Ext.Date.clearTime(date, true);
      },

      /**
       * Returns a new date based on the date passed and the delta value for DAY view.
       * @method
       * @private
       * @param {Date} date
       * @param {Number} delta
       * @return {Date}
       */
      getDeltaDate: function(date, delta){
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta);
      },

      periodRowDayCount: 1
    }
  }
});

/**
 * @copyright     (c) 2011, by SwarmOnline.com
 * @date          2nd November 2011
 * @version       0.1
 * @documentation  
 * @website        http://www.swarmonline.com
 */
/**
 * @class Ext.ux.TouchCalendar
 * @author Stuart Ashworth
 * 
 * This extension wraps the Ext.ux.TouchCalendarView in a Ext.Carousel component and allows the calendar to respond to swipe
 * gestures to switch the displayed period. It works by creating 3 Ext.ux.TouchCalendarViews and dynamically creating/removing
 * views as the user moves back/forward through time. 
 * 
 * ![Ext.ux.TouchCalendar Screenshot](http://www.swarmonline.com/Ext.ux.TouchCalendar/screenshots/Ext.ux.TouchCalendar-month-ss.png)
 * 
 * [Ext.ux.TouchCalendar Demo](http://www.swarmonline.com/wp-content/uploads/Ext.ux.TouchCalendar/examples/Ext.ux.TouchCalendar.html)
 * 
 */
//Ext.ux.TouchCalendar = Ext.extend(Ext.carousel.Carousel, {
Ext.define('Ext.ux.TouchCalendar',{
  extend: 'Ext.carousel.Carousel',
  requires: ['Ext.ux.TouchCalendarView'],
  xtype: 'calendar',
  
  /**
   * @cfg {Boolean} enableSwipeNavigate True to allow the calendar's period to be change by swiping across it.
   */
  enableSwipeNavigate: true,
  
  /**
   * @cfg {Boolean} enableSimpleEvents True to enable the Ext.ux.TouchCalendarSimpleEvents plugin. When true the Ext.ux.TouchCalendarSimpleEvents JS and CSS files
   * must be included and an eventStore option, containing an Ext.data.Store instance, be given to the viewConfig.
   */
  enableSimpleEvents: false,
  
  /**
   * @cfg {Boolean} enableEventBars True to enable the Ext.ux.TouchCalendarEvents plugin. When true the Ext.ux.TouchCalendarEvents JS and CSS files
   * must be included and an eventStore option, containing an Ext.data.Store instance, be given to the viewConfig.
   */
  enableEventBars: false,
  
  /**
   * @cfg {Object} viewConfig A set of configuration options that will be applied to the TouchCalendarView component 
   */
  viewConfig: {
    
  },
  
  defaultViewConfig: {
    mode: 'MONTH',
    weekStart: 1,
    bubbleEvents: ['selectionchange']
  },
  indicator: false,
  
  initialize: function(){
        
    this.viewConfig = Ext.applyIf(this.viewConfig || {}, this.defaultViewConfig);
    
    this.viewConfig.currentDate = this.viewConfig.currentDate || this.viewConfig.value || new Date();
    
    this.mode = this.viewConfig.mode.toUpperCase();
  
    this.initViews();
    
    Ext.apply(this, {
      cls: 'touch-calendar',
      activeItem: (this.enableSwipeNavigate ? 1: 0),
      direction: 'horizontal'      
    });
        
    this.setIndicator(false); // for some reason, indicator: false is not being applied unless explicitly set.
    this.setActiveItem(1); // for some reason, activeItem: 1 is not being applied unless explicitly set.
        
    this.on('selectionchange', this.onSelectionChange);
    this.on('activeitemchange', this.onActiveItemChange);
    
    if (this.enableSwipeNavigate) {
      // Bind the required listeners
      this.on(this.element, {
        drag: this.onDrag,
        dragThreshold: 5,
        dragend: this.onDragEnd,
        direction: this.direction,
        scope: this
      });
      
      this.element.addCls(this.baseCls + '-' + this.direction);
    }
  },
   
  /**
   * Builds the necessary configuration object for the creation of the TouchCalendarView.
   * @param {Date} viewValue The date Value that the new TouchCalendarView will have
   * @method
   * @private 
   * @return {Object} The new config object for the view
   */
  getViewConfig: function(viewValue){
    var plugins = [];
  
    if(this.enableSimpleEvents){
      plugins.push(new Ext.ux.TouchCalendarSimpleEvents());        
    } else if (this.enableEventBars){
      plugins.push(new Ext.ux.TouchCalendarEvents());        
    }

    Ext.apply(this.viewConfig, {
      plugins: plugins,
      currentDate: viewValue,
      onTableHeaderTap: Ext.bind(this.onTableHeaderTap, this)
    });
    
    return this.viewConfig;      
  },
    
  getViewDate: function(date, i){
    var scale = (this.mode === 'WEEK' ? 'DAY' : this.mode.toUpperCase()),
    number = (this.mode === 'WEEK' ? (8 * i) : i);
    
    return date.add(Date[scale], number)
  },

  /**
     * Creates all the TouchCalendarView instances needed for the Calendar
     * @method
     * @private
     * @return {void}
     */
  initViews: function(){
    var items = [];
    var origCurrentDate = this.viewConfig.currentDate.clone(),
    i = (this.enableSwipeNavigate ? -1 : 0),
    iMax = (this.enableSwipeNavigate ? 1 : 0),
    plugins = [];
    
    // first out of view
    var viewValue = this.getViewDate(origCurrentDate, -1);
    items.push(
      new Ext.ux.TouchCalendarView(Ext.applyIf({
        currentDate: viewValue
      }, this.getViewConfig(viewValue)))
      );
    
    // active view
    items.push(
      new Ext.ux.TouchCalendarView(this.getViewConfig(origCurrentDate))
      );
    
    // second out of view (i.e. third)
    viewValue = this.getViewDate(origCurrentDate, 1);
    items.push(
      new Ext.ux.TouchCalendarView(Ext.applyIf({
        currentDate: viewValue
      }, this.getViewConfig(viewValue)))
      );
    
    this.setItems(items);
    this.view = items[(this.enableSwipeNavigate ? 1: 0)];
  },
  
  /**
   * Override for the TouchCalendarView's onTableHeaderTap method which is executed when the view's header (specificly the arrows) is tapped.
   * When using the TouchCalendar wrapper we must intercept it and use the carousel's prev/next methods to do the switching.
   */
  onTableHeaderTap: function(e, el){
    el = Ext.fly(el);    
    if (el.hasCls(this.view.prevPeriodCls) || el.hasCls(this.view.nextPeriodCls)) {
      this[(el.hasCls(this.view.prevPeriodCls) ? 'prev' : 'next')]();
    }
  },
  
  /**
   * Changes the mode of the calendar to the specified string's value. Possible values are 'month', 'week' and 'day'.
   * @method
   * @returns {void}
   */
  setMode: function(mode){
    this.mode = mode.toUpperCase();
    this.viewConfig.mode = this.mode;
    
    this.getItems().each(function(view, index){
      
      view.currentDate = this.getViewDate(this.view.currentDate.clone(), index-1);
      
      view.setMode(mode, true);
      view.refresh();
    }, this);
  },
  
  /**
   * Returns the Date that is selected.
   * @method
   * @returns {Date} The selected date
   */
  getValue: function(){
    var selectedDates = this.view.getSelectionModel().selected;

    return (selectedDates.getCount() > 0) ? selectedDates.first().get('date') : null;
  },
  
  /**
   * Set selected date.
   * @method
   * @param {Date} v Date to select.
   * @return {void}
   */
  setValue: function(v) {
    this.view.setValue(v)
  },
  
  /**
   * Override of the Ext.Carousel's afterRender method to enable/disable the swipe navigation if the enableSwipeNavigate option is set to true/false.
   */
  /*afterRender: function() {
        Ext.Carousel.superclass.afterRender.call(this);

    
    },*/
  
  /**
     * Override of the onCardSwitch method which adds a new card to the end/beginning of the carousel depending on the direction configured with the next period's
     * dates.
     * @method
     * @private
     */
  onActiveItemChange: function(container, newCard, oldCard){
    if (this.enableSwipeNavigate) {
      var items = this.getItems();
      var newIndex = items.indexOf(newCard), oldIndex = items.indexOf(oldCard), direction = (newIndex > oldIndex) ? 'forward' : 'backward';
      
      this.counter = (this.counter || 0) + 1;
      
      if (direction === 'forward') {
        this.remove(items.get(0));
        var newCalendar = new Ext.ux.TouchCalendarView(this.getViewConfig(newCard.currentDate.add(Date[this.mode], 1)));
        this.add(newCalendar);
      }
      else {
        this.remove(items.get(items.getCount() - 1));
        var newCalendar = new Ext.ux.TouchCalendarView(this.getViewConfig(newCard.currentDate.add(Date[this.mode], -1)));
        this.insert(0, newCalendar);
      }
      
      this.view = newCard;
    }
  }
    
    
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.model.userExpenModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'date', type:'string'},
            { name: 'amount', type: 'int' },
            { name: 'expen', type: 'string'},
            
//            {name: 'username',type :'string'}
        ]
    }
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.model.UserDataModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            {name: 'username',type :'string'},
            {name: 'password',type :'string'},
            {name:'status',type:'string'},
            {name:'theme',type:'string'},
        ]
    }
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */ 
 
Ext.define('FRIENDAPP.model.GraphModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'month', type:'string'},
            { name: 'amount', type: 'int' },
            { name: 'year', type: 'string'}
        ]
    }
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.model.YearModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'amount', type: 'int'},
            { name: 'year', type: 'string'},
            
//            {name: 'username',type :'string'}
        ]
    }
});

/* 
 * @author Prakash
 * company Itrix Inc.
 * Login for User
 * 
 */

Ext.define("FRIENDAPP.view.Login",{
    extend: 'Ext.form.Panel',
    xtype: 'loginview',
    
    requires: ['Ext.form.FieldSet','Ext.field.Text','Ext.field.Password'],
    
    config:{
    
        layout:{
            type:'vbox',
            align:'middle'
        },
        cls: 'loginview',
        //    styleHtmlContent: true,
        scrollable:false,
        items:[
        {
           xtype:'panel',
           height:5,
           cls:'ribbonCls',
           width:'100%',
           docked:'top'
        },
        {
            xtype: 'spacer'
        },   
        {
            xtype: 'image',
            mode: 'element',
            width: '322px',
            height :'133px',
            src: "resources/images/logo.png"
        },
        {
            xtype: 'spacer',
            height:'30px'
        },                
        {
            xtype: "fieldset",
            name: "loginForm",
            width :'90%',
      
            items: [
            {
                xtype: "textfield",
                name: "username",
                id :'usernameid',
                placeHolder: "Username or Email Address",
                required: true
            },
            {
                xtype: "passwordfield",
                name: "password",
                id :'passwordid',
                placeHolder: "Password",
                required: true
            },
            {
                xtype: 'checkboxfield',
                label: 'Stay Signed In?',
                labelWidth: '75%',
                itemId: 'rememberPassword'
            }
        ]
        },
        {
            xtype: "button",
            id: "loginButton",
            width : '30%',
            text: "LOGIN",
            ui: "login"
      
        },
        {
            xtype: "spacer",
            height:'10px'
        },
        {
            xtype:'panel',
            itemId:'validateMessage',
            height:'50px',
            width:'90%'
        },
        {
            xtype: "spacer"
        },
        {
           xtype:'panel',
           height:5,
           cls:'ribbonCls',
           width:'100%',
           docked:'bottom'
        },
       ]
    }
    
});
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.LicenceView", {
  extend: 'Ext.Panel',
    xtype: 'MainFrameLicenceView',
  config: {
    fullscreen: true,
    layout: 'card',
     title: 'Email',
    activeItem: 0,
    items:[
    {
      xtype: 'toolbar',
      cls: 'mainToolbar',
      docked: 'top',
      itemId:'dateLabel',
      name:'dateLabel',
      title:'Pocket Finder App',
      items:[  
      {
        xtype:'spacer'
      },    
//      {
//       text:'Pocket Finder App',
//        iconMask: true, 
//        ui: 'plain'   
//      },
      {
        xtype:'spacer'
      }
      ]
    },
    {
       xtype:'panel',
       height:5,
       cls:'ribbonCls',
       width:'100%',
       docked:'top'
    },
    {               
      xtype:'FrameLicence'
    },
    {               
      xtype:'FormPasswordChange'
    }
]
  }
});
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.Licence", {
    extend: 'Ext.Panel',
    requires: ['Ext.field.Radio'],

    xtype: 'FrameLicence',
    config: {
        scrollable:true,  
        fullscreen: true,
        layout: {
            type:"vbox",
            align:'middle'
        },
        title: 'Email',
        activeItem: 0,
        items:[
        {
            xtype:'toolbar',
            docked:'bottom',
            items:[
            {
                xtype:'spacer'
            },
            {
                text:"Next",
                itemId:'btn_licence_next',
                hidden:true
            },
            ]
        },
        {               
            xtype:'panel',
            cls:'graphPanelCls',
            html:'<body style=\'text-align: justify;\'><div> \n\
    <strong>Software license terms and conditions</strong> \n\
</div>\n\
<div>\n\
    <br/>\n\
</div>\n\
<div>\n\
    (a) Single-User License Grant.\n\
</div>\n\
<div>\n\
    This Section 2.2(a) applies only to a Customer whose License and Authorization Key document issued by\n\
</div>\n\
<div>\n\
    ITRIX specifies the “License Type” as “Single User”. A Single-User License is for a named individual\n\
</div>\n\
<div>\n\
    who is identified as the only Authorized User.\n\
</div>\n\
<div>\n\
    <br/>\n\
</div>\n\
<div>\n\
    <strong>2.7 Restrictions.</strong>\n\
</div>\n\
<div>\n\
    Customer shall not, nor permit any person (including any Authorized User) to:\n\
</div>\n\
<div>\n\
    (i) reverse engineer, reverse\n\
</div>\n\
<div>\n\
    compile, decry pt, disassemble, or otherwise attempt to derive the source code of the Licensed Software\n\
</div>\n\
<div>\n\
    (except to the extent that this restriction is expressly prohibited by law);\n\
</div>\n\
<div>\n\
    (ii) modify, translate, or create derivative works of the Licensed Software; (iii) sublicense, resell, rent, lease, distribute, market, commercialize, or\n\
    otherwise transfer rights or usage to the Licensed Software (except as expressly permitted under this Agreement);\n\
</div>\n\
<div>\n\
    <br/>\n\
</div>\n\
<div>\n\
    <strong>3.1 Technical Support.</strong>\n\
</div>\n\
<div>\n\
    ITRIX agrees to provide Customer with technical support services which include periodic distribution of bug fixes and minor enhancements as Updates\n\
    scheduled by ITRIX. All registered users of the then-current release\n\
</div>\n\
<div>\n\
    of App and the previous release of App are eligible for free limited technical support.\n\
</div>\n\
<div>\n\
    <br/>\n\
</div>\n\
<div>\n\
    <strong>CONFIDENTIALITY.</strong>\n\
</div>\n\
<div>\n\
    Customer and ITRIX agree to maintain the confidentiality of any confidential or proprietary information of\n\
</div>\n\
<div>\n\
    one party (the “disclosing party”) received by the other party (the “receiving party”) during, or prior to\n\
</div>\n\
<div>\n\
    entering into, this Agreement that the receiving party should know is considered confidential or proprietary\n\
</div>\n\
<div>\n\
    by the disclosing party based on the circumstances surrounding the disclosure, including, without limitation,\n\
</div>\n\
<div>\n\
    non-public technical and business information (“Confidential Information”).\n\
</div><body>\n\ '
     
        },
        {
            xtype: 'panel',
            width:'100%',
            layout:{
                type:'hbox',
                align:'middle'
            },
            docked:'bottom',
            items:[

                {
                    xtype: 'radiofield',
                    name : 'allow',
                    value:'true',
                    width:'50%',
                    labelWidth:'60%',
                    label:'I Accept'
                },
                {
                    xtype: 'radiofield',
                    name : 'allow',
                    value:'false',
                    width:'50%',
                    labelWidth:'60%',
                    label:'I Decline'
                }
                
             
            ]
        },
        ]
    }
});

/* 
 * @author Prakash
 * company Itrix Inc.
 * Login for User
 * 
 */

Ext.define("FRIENDAPP.view.PasswordChange",{
  extend: 'Ext.form.FormPanel',
  xtype: 'FormPasswordChange',
  requires: ['Ext.form.FieldSet','Ext.field.Text','Ext.field.Password'],
    
  config:{
    iconMask: true,
    ui: 'confirm-round',
    iconCls: 'compose',
    title:'Add Expen',
    styleHtmlContent: true,
    scrollable:false,
    cls: 'loginview',
    height: '100%',
    width: '100%',
    layout: {
      type:"vbox",
      align:'middle'
    },
    items:[ 
    {
      xtype:'toolbar',
      docked:'bottom',
      items:[
      {
        text:"Save",
        itemId:'btn_pass_save'
       
      },
      {
        text:"Update",
        itemId:'btn_pass_update',
        hidden:true
      },
      {
          xtype:'spacer'
      },
      {
        text:"Reset",
        itemId:'btn_pass_reset'
      }
      ]
    },    
    {
      xtype:'spacer'
    },
                             
    {
      xtype: "fieldset",
      width :'100%',
      cls: 'expenfieldcls',
      height :'100%',
                    
      items: [
      {   
        xtype: 'textfield',
        name: 'text_username',
        itemId:'text_username',
        label: 'User Name'
        
      },
      {
        xtype: 'passwordfield',
        name: 'text_password',
        itemId:'text_password',
        label: 'Password'
      },
      {
        xtype: "passwordfield",
        name:'text_cpassword',
        itemId:"text_cpassword",
        label: 'Confirm Password'
      },
      ]
    },
    {
      xtype:'panel',
      itemId:'formValidateMsg',
      height:'50px',
      cls:'validatemsg',
      width:'90%'
    },
    {
      xtype:'spacer'
    },
    ]
  }
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        currentDate:'',
        refs: {
            calendar:'MainFrameview touchcalendar[title=Calendar]',
            expenseList:'userExpenListView1',
            expenList:'userExpenListView1 #expenseList',
            mainFrame:'MainFrameview',
            mainFrameCal:'MainFrameCalender',
            backButton:'MainFrameCalender button[action=back]',
            dateLabel:'MainFrameview toolbar[name=dateLabel]',
            totalAmtLabel:'userExpenListView1 #totalAmtLabel'
//            graphChart:'graphChart',
//            graphDate:'graphChart datepickerfield[name=date]'
        },
        control: {
            calendar:{
                selectionchange:'onDateSelection',
                activate:'removeBackLabel'
            },
            backButton:{
                tap:'itemTap'
            },
            mainFrameCal:{
                initialize:'removeBackLabel'
            }
//            graphChart:{
//                activeitemchange:'ónGraphChange'
//            }
        }
    },
    
//    onGraphChange:function(){
//        var store=this.getGraphChart().getActiveItem().getStore();
//        var self=this;
//        var datepicker = this.getGraphDate();
//        switch(store.getStoreId()){
//            case 'DailyExpenseStore':
//                datepicker.setDateFormat('Y/m');
//                datepicker.setHidden(false);
//                break;
//            case 'MonthStore':
//                datepicker.setDateFormat('Y');
//                datepicker.setHidden(false);
//                break;
//            case 'YearStore':
//                datepicker.setHidden(true);
//                break;
//                                        
//        }
//    },
    
    itemTap:function(){
        var mainview=this.getMainFrameCal();
        var active=mainview.getActiveItem();
        switch(active.xtype)
        {
            case 'userExpenListView1':
                mainview.setActiveItem(0);
                break;
        
            case 'AddExpenForm':
                mainview.setActiveItem(this.getExpenseList())
                break;
        }
    },
        
    onDateSelection:function(){
        if (!this.getExpenseList()){
            var expenseList=Ext.create("FRIENDAPP.view.userExpenListView");
        }
        this.currentDate=Ext.util.Format.date(this.getCalendar().getValue(),'d M Y');
        this.getDateLabel().setTitle(this.currentDate);
        var store=Ext.getStore('UserExpenseStore');
        store.load();
        store.clearFilter();
        store.filter('date',Ext.util.Format.date(this.getCalendar().getValue(),'d M Y'));
        this.getBackButton().setHidden(false);
        this.getMainFrameCal().setActiveItem(this.getExpenseList());
    },
    
    removeBackLabel:function(){
        this.getBackButton().setHidden(true);        
        //this.getDateLabel().setTitle(this.currentDate);
    }
});
/* 
 * itrixit.com
 * Controller to calulate total expen for that day and display on toolbar
 * @author Neha @Modify By Prakash
 */
Ext.define('FRIENDAPP.controller.ExpenListController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            expenseList:'userExpenListView1 #expenseList',
            mainFrame:'MainFrameview',
            addExpenForm:'AddExpenForm',
            dateField:'AddExpenForm #date',
            delButton:'AddExpenForm #expenseFormDelete',
            updateButton:'AddExpenForm #expenseFormUpdate',
            saveButton:'AddExpenForm #expenseFormSave',
            resetButton:'AddExpenForm #expenseFormReset',
            expenAddBut:'userExpenListView1 #expenAdd',
            mainFrameCal:'MainFrameCalender',
            calendar:'MainFrameview touchcalendar[title=Calendar]',
            totalAmtLabel:'userExpenListView1 #totalAmtLabel',
            formValidateMsg:'AddExpenForm #formValidateMsg'
        },
        control: {
            expenseList:{
                itemtap:'itemDoubleTap',
                refresh:'calTotalAmt' 
            },
            expenAddBut:{
                tap:'itemTap'
            }
        }
    },
       
    itemTap:function(){
        if(!this.getAddExpenForm()){
            var addExpenForm=Ext.create("FRIENDAPP.view.AddExpenForm");
        }
        this.getAddExpenForm().reset();
        this.getDateField().setValue(new Date(this.getCalendar().getValue()));
        this.getDelButton().setHidden(true);
        this.getUpdateButton().setHidden(true);
        this.getSaveButton().setHidden(false);
        this.getResetButton().setHidden(false);
        this.getMainFrameCal().setActiveItem(this.getAddExpenForm());
        this.getFormValidateMsg().setHtml('');
    },
    
    itemDoubleTap:function(dataview,index,target,record,e,eOpts){
        if(!this.getAddExpenForm()){
            var addExpenForm=Ext.create("FRIENDAPP.view.AddExpenForm");
        }
        this.getAddExpenForm().reset();
        this.getAddExpenForm().setValues({
            'date':new Date(record.get('date')),
            'amount':record.get('amount'),
            'expen':record.get('expen')
        });
        this.getDelButton().setHidden(false);
        this.getUpdateButton().setHidden(false);
        this.getSaveButton().setHidden(true);
        this.getResetButton().setHidden(true);
        this.getFormValidateMsg().setHtml('');
        this.getMainFrameCal().setActiveItem(this.getAddExpenForm());
    },
  
    calTotalAmt:function(){
        var store=Ext.getStore('UserExpenseStore');
        var i,amounttot;
        i=0,amounttot=0;
        while(store.getCount()>i)
        {
            amounttot=amounttot + store.getAt(i).get('amount');
            i++;
        }
        this.getTotalAmtLabel().setText('Total Amount  : '+ amounttot);
        return amounttot;
    },
    
    calculateOtherStores:function(){     
        var date,flag, currentamt,yeartot, store, amounttot,record;
        flag=false;
        date = FRIENDAPP.app.getController('Main').currentDate;
        
        store=Ext.getStore('DailyExpenseStore');
        store.clearFilter();
        store.load();
        flag=store.find('date',date);
        currentamt=0; 
        amounttot = this.calTotalAmt();
        if(flag!=-1){
            record=store.getAt(flag);
            currentamt=record.get('amount');
            record.set('amount',amounttot);
        }else{
            store.add({
                date:date,
                amount:amounttot
            });
        }
        store.sync();
        store.load();
        
        
        /*
         * Code for calculating the total monthly and yearly expenditure
         * Will be use to display monthly and yearly graphs
         * TO DO optimize and test this code later
         * @author Neha @Modify By Prakash
         */
        // Code to add data in year store
        var monthsArray= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = new Date(date).getMonth();
        var year = new Date(date).getFullYear();
        var yearstore=Ext.getStore('YearStore');
        yearstore.clearFilter();
        flag=yearstore.find('year',year);
        if(flag!=-1){
            record=yearstore.getAt(flag);
            yeartot= record.get('amount')+(amounttot-currentamt);
            record.set('amount',yeartot);
        }else{
            yearstore.add({
                amount:amounttot,
                year:year
            });
        }
        
        // Code to add data in month store
        var monthstore=Ext.getStore('MonthStore');
        monthstore.clearFilter();
        monthstore.filter('year',year);
        flag=monthstore.find('month',monthsArray[month]);
        if(flag!=-1){
            record=monthstore.getAt(flag);
            amounttot= record.get('amount')+(amounttot-currentamt);
            record.set('amount',amounttot);
        }else{
            monthstore.add({
                month:monthsArray[month],
                amount:amounttot,
                year:year
            });
        }
        debugger;
        monthstore.clearFilter();
    }
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.ExpenReportController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            reportMonthWise:'MainFrameReport #monthWise',
            reportYearWise:'MainFrameReport #yearWise',
            reportDayWise:'MainFrameReport #dayWise',
            reportTotalText:'MainFrameReport #reportTotalText',
            reportList:'ExpenReport #expenseListReport',
            reportSelect:'MainFrameReport #select_type'
            
        },
        control: {
            reportMonthWise:{
                change:'onMonthSort'
            },
            reportYearWise:{
                change:'onYearSort'
            },
            reportDayWise:{
                change:'onDaySort'
            },
            reportSelect:{
                change:'onSortChange'
            },
            reportList:{
                refresh:'calTotalReport'
            }
        }
    },
    
    onSortChange:function(field,newValue,oldValue,eOpts){
      var store=Ext.getStore('UserExpenseStore');
      switch(field.getValue()){
        case 'day':
                   store.clearFilter();
                   this.getReportYearWise().setHidden(true);
                   this.getReportMonthWise().setHidden(true);
                   this.getReportDayWise().setHidden(false);
                   var newValue=new Date(this.getReportDayWise().getValue());
                   this.onDaySort(field,newValue,oldValue);
                   break;
        
        case 'month':
                   store.clearFilter();
                   this.getReportYearWise().setHidden(true);
                   this.getReportMonthWise().setHidden(false);
                   this.getReportDayWise().setHidden(true);
                   var newValue=new Date(this.getReportMonthWise().getValue());
                   this.onMonthSort(field,newValue,oldValue);
                   break;
          
        case 'year':
                   store.clearFilter();
                   this.getReportYearWise().setHidden(false);
                   this.getReportMonthWise().setHidden(true);
                   this.getReportDayWise().setHidden(true);
                   var newValue=new Date(this.getReportYearWise().getValue());
                   this.onYearSort(field,newValue,oldValue);
                   break;
        case 'refresh':
                    store.clearFilter();
                    break;
      }
    },
    
    onMonthSort:function(field,newValue,oldValue){
        var store=Ext.getStore('UserExpenseStore');
            store.clearFilter();
            store.filter(function(item){
            var month=new Date(item.get('date')).getMonth();
            var year=new Date(item.get('date')).getYear();
            if(month===newValue.getMonth() && year===newValue.getYear()){
                return true;
            }
        });
    },
    
    onYearSort:function(field,newValue,oldValue){
      var store=Ext.getStore('UserExpenseStore');
        store.clearFilter();
        store.filter(function(item){
            var year=new Date(item.get('date')).getYear();
            if(year===newValue.getYear()){
                return true;
            }
        });
    },
    onDaySort:function(field,newValue,oldValue){
      var store=Ext.getStore('UserExpenseStore');
        store.clearFilter();
        store.filter(function(item){
            var day=new Date(item.get('date')).getDate();
            var month=new Date(item.get('date')).getMonth();
            var year=new Date(item.get('date')).getYear();
            if(day===newValue.getDate() && month===newValue.getMonth() && year===newValue.getYear()){
                return true;
            }
        });
    },
    
    calTotalReport:function(){
        var store=Ext.getStore('UserExpenseStore');
        var i,amounttot;
        i=0,amounttot=0;
        while(store.getCount()>i)
        {
            amounttot=amounttot + store.getAt(i).get('amount');
            i++;
        }
        this.getReportTotalText().setText('Total Amount  : '+ amounttot);
    }
    
});
/* 
 * @author Prakash
 * company Itrix Inc.
 * User can logout from here 
 */
Ext.define('FRIENDAPP.controller.LicenceController', {
    extend: 'Ext.app.Controller',
    
    config: {
              refs: {
                  radioButtnobj: 'FrameLicence radiofield[name=allow]',
                  nextButton:'FrameLicence #btn_licence_next',
                  mainFrameLicenceView:'MainFrameLicenceView'
                 
              },
              control: {
                  
                  nextButton:{
                    tap:"onNextButtonTap"  
                  },
                  radioButtnobj: {
                    uncheck: "onRadioChecked"
                  }
              }      
    },
    
    /**
     * When User Agree or not hit.
     */
    onRadioChecked: function(obj,e,eopts) {
        if(obj.getValue()=='true'){
            this.getNextButton().setHidden(false);
            return;
        }else{
            this.getNextButton().setHidden(true);
            return;
        }
    },
    /**
     * When next button is hit.
     */
    onNextButtonTap: function() {
        this.getMainFrameLicenceView().setActiveItem(1);
    }
});   

/* 
 * @author Prakash
 * company Itrix Inc.
 * User can logout from here 
 */
Ext.define('FRIENDAPP.controller.PasswordChangeController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs:{
            mainFrame:'MainFrameview',
            passwordChangeForm:'FormPasswordChange',
            saveButton:'FormPasswordChange #btn_pass_save',
            resetButton:'FormPasswordChange #btn_pass_reset',
            updateButton:'FormPasswordChange #btn_pass_update',
            mainPanel:'MainPanel',              
            usernameField:'FormPasswordChange #text_username',
            passwordField:'FormPasswordChange #text_password',
            cpasswordField:'FormPasswordChange #text_cpassword',
            formValidateMsg:'FormPasswordChange #formValidateMsg'
        },
        
        control:{
            resetButton:{
                tap:'itemReset'
            },
            saveButton:{
                tap:'itemSave'
            },
            updateButton:{
                tap:'itemUpdate'
            }
          
        }
    },
    
    itemReset:function(){
        this.getPasswordChangeForm().reset();
        this.getFormValidateMsg().setHtml('');
    },
    
    itemSave:function(){
        if(this.dataValidate()){
            var store=Ext.getStore('UserDataStore');
            store.add({
                username: this.getUsernameField().getValue(),
                password: this.getPasswordField().getValue(),
                status: 'no',
                theme:'./resources/css/app.css'
            });
            store.sync();
            store.load();
            window.location.reload();
        }
    },
    
    itemUpdate:function(){
        if(this.dataValidate()){
            var store=Ext.getStore('UserDataStore');             
            if(this.getUsernameField().getValue()!==store.getById(1).get('username')){
                this.getFormValidateMsg().setHtml('Username with existing username not match!...');
                return;
            }else{
                var id=store.getById(1);
                    id.set('username',this.getUsernameField().getValue());
                    id.set('password', this.getPasswordField().getValue());
                store.sync();
                store.load();
                this.getFormValidateMsg().setHtml('Password change successfully!...');
                this.itemReset();
            }
        }
    },
    
    dataValidate:function(){
        if (!this.getUsernameField().getValue() || FRIENDAPP.util.util.isBlank(this.getUsernameField().getValue())) {
            this.getFormValidateMsg().setHtml('Please enter username !...');
            return false;
        } 
        
        if (!this.getPasswordField().getValue() || FRIENDAPP.util.util.isBlank(this.getPasswordField().getValue())) {
            this.getFormValidateMsg().setHtml('Please enter password !...');
            return false;
        }
        if (!this.getCpasswordField().getValue() || FRIENDAPP.util.util.isBlank(this.getCpasswordField().getValue())) {
            this.getFormValidateMsg().setHtml('Please enter confirm password !...');
            return;
        }
        
        if(this.getPasswordField().getValue()!==this.getCpasswordField().getValue()){
            this.getFormValidateMsg().setHtml('Password confirm password not match !...');
            return false;
        }
        return true;
    }
});



/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.GraphController',{
    extend:'Ext.app.Controller',
    config: {
        refs:{
           graphDate:'graphChart datepickerfield[name=graphdate]',
           calendar1:'graphChart'
        },
        
        control: {
            graphDate: {
                change:'onGraphFilter'
            }

        }
        
       },
       
      onGraphFilter:function(datepicker, newDate, oldDate, eOpts){
          Ext.getStore('MonthStore').clearFilter()
          Ext.getStore('MonthStore').filter('year',newDate.getFullYear());
      },
      
      onActive:function(){
          alert();
      }
    
})
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.ThemeController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs:{
            defaultThemeButton:'themePanel #defaultThemeButton',
            blackThemeButton:'themePanel #blackThemeButton',
            pinkThemeButton:'themePanel #pinkThemeButton'
        },
        
        control:{
            defaultThemeButton:{
                tap:'onThemeSelect'
            },
            blackThemeButton:{
                tap:'onThemeSelect'
            },
            pinkThemeButton:{
                tap:'onThemeSelect'
            }
        }
    },
    
    onThemeSelect:function(button,e,eOpts){
        var store=Ext.getStore('UserDataStore');
        store.load();
        var id=store.getById(1);
        var a=FRIENDAPP.util.util.themeSelector();
        switch(button.getText())
        {
            case 'Default':
                    a.href = './resources/css/app.css';
                    id.set('theme','./resources/css/app.css');
                    break;
                            
            case 'Pink':
                    a.href = './resources/css/themePink.css';
                    id.set('theme','./resources/css/themePink.css');
                    break;

            case 'Black':
                    a.href = './resources/css/default.css';
                    id.set('theme','./resources/css/default.css');
                    break
        }
        store.sync();
        store.load();
    }
})

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('FRIENDAPP.store.UserExpenseStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.LocalStorage'],   
 config:{
     model:'FRIENDAPP.model.userExpenModel',
     autoload:true,
     storeId:'UserExpenseStore',
     sorters:{
         property:'amount',
         direction: 'ASC'
     },
     grouper: {
       groupFn: function(record) {
           return record.get('date');
       }
     },
     proxy: {
            type: 'localstorage',
            id  : 'Expen'
     }
 }   
})


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('FRIENDAPP.store.DailyExpenseStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.LocalStorage'],   
 config:{
     model:'FRIENDAPP.model.userExpenModel',
     autoload:true,
     storeId:'DailyExpenseStore',
     proxy: {
            type: 'localstorage',
            id  : 'Daily'
     }
 }   
})


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.store.UserDataStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.LocalStorage'],   
    config:{
    model:'FRIENDAPP.model.UserDataModel',
    autoload:true,
    storeId:'UserDataStore',
    proxy:{
            type: 'localstorage',
            id  : 'UserData'
         }
    }   
})
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.store.MonthStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.Memory'],   
    config:{
    model:'FRIENDAPP.model.GraphModel',
    autoload:true
//    storeId:'MonthStore',
//    proxy:{
//            type: 'memory',
//            id  : 'MonthData'
//         }
    }   
})
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.store.YearStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.Memory'],   
    config:{
    model:'FRIENDAPP.model.YearModel',
    autoload:true
//    storeId:'YearStore',
//    proxy:{
//            type: 'memory',
//            id  : 'YearData'
//         }
    }   
})


Ext.define('FRIENDAPP.view.Dashboard',{
    xtype:'dashboard',
    extend:'Ext.Panel',
    requires:[],
  
    config:{
        layout:{
            type:'vbox',
            align:'middle'
        },
        cls:'dashboardPanelCls',
        width:'100%',
        height:135,
        zIndex:90,
        title:'Dashboard',
        items:[
        {
            xtype:'panel',
            width:'100%',
            height:'50%',
            layout:{
                type:'hbox'
            },
            items:[
            
            {      
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'calendarCls',
                action:'calendar'
            }, 
            {
                xtype :'button',
                height: '100%',
                flex:1,
                id: "logoutButtonHit",
                cls:'toolbarButton',
                iconCls:'logoutCls',
                action:'logout'
            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'graphCls',
                action:'graph'
            },
            ]
        },
        {
            xtype:'panel',
            width:'100%',
            height:'50%',
            layout:{
                type:'hbox'
            },
            items:[
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'reportCls',
                action:'report'
            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'settingsCls',
                action:'settings'
            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'themeCls',
                action:'theme'
            },
            ]
        },
        ]
    }
})
/* 
 * @author Neha
 * company Itrix Inc.
 * Theme View Page
 * 
 */

Ext.define("FRIENDAPP.view.Theme", {
    extend: 'Ext.Panel',
    requires:[''],
    xtype: 'themePanel',
    config: {
        fullscreen: true,
        itemId:'themePanel',
        layout:{
            type:'vbox',
            align:'middle',
            pack:'center'
        },      
        items:[
            {
                xtype:'toolbar',
                title:'Theme',
                width:'100%',
                docked:'top'
            },
            {
                xtype:'spacer'
            },
            {
               xtype:'button',
               text:'Default',
               itemId:'defaultThemeButton',
               width:'80%',
               height:50
            },
            {
                xtype:'spacer'
            },
            {
               xtype:'button',
               text:'Black',
               itemId:'blackThemeButton',
               width:'80%',
               height:50
            },
            {
                xtype:'spacer'
            },
            {
               xtype:'button',
               text:'Pink',
               itemId:'pinkThemeButton',
               width:'80%',
               height:50
            },
            {
                xtype:'spacer'
            },
        ]
    }
});
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.services.LoginServices', {
  singleton: true,
  
  
  loginAuthentication:function(parms,successCb,failureCb){
        var userName = parms.username;
        var password = parms.password;
        var userInfoData=Ext.getStore('UserDataStore');
        userInfoData.load();
        if(userName===userInfoData.getById(1).get('username') && password===userInfoData.getById(1).get('password'))
            {
                var response={
                "code":"200",
                "message":"Right Credentials.."
                }
                return successCb(response);
            }
         else
            {
                var response={
                "code":"400",
                "message":"Wrong Credentials.Please input correct Credentials and try again!........"
                }
                return failureCb(response)
            } 
        }
    })

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.util.util",{
singleton: true,

isBlank: function(field) {
        if (field == null || field == undefined)
            return true;
        
        if (typeof field !== "string")
            return false;

        if (field.trim().length === 0)
            return true;

        return false;
 },
 
 themeSelector:function(){
     var i, a, url, btn;
        for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
            if(a.getAttribute("rel").indexOf("style") != -1) {
                url = a.href;
                if(url.lastIndexOf('main.css') === -1  && url.lastIndexOf('Ext.ux.TouchCalendarView.css')===-1 ) {
                return a;
                }
            } 
        }
 }
 
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.userExpenListView",{
    extend: 'Ext.form.Panel',
    xtype: 'userExpenListView1',
   
    scrollable: false,
    requires:[
        'FRIENDAPP.store.UserExpenseStore',
        'FRIENDAPP.model.userExpenModel',
        'Ext.dataview.List'
    ],
    
    config: {
         
        layout:'fit',
        iconCls: 'info',
        scrollable: false,
        cls:'listCls',
        items:[
            {
                xtype:'list',
                cls:'userExpenseList',
                itemCls:'userExpenseItem',
                store:'UserExpenseStore',
                itemTpl:'<div class="amountCls">Amount:&nbsp;{amount}</div><div class="expenseCls">{expen}</div>',
                itemId:'expenseList',
                onItemDisclosure:true
                         
            },
            {
                xtype:'toolbar',
                docked:'bottom',
                items:[
                    {
                        iconMask: true,
                        itemId:'totalAmtLabel',
                        ui: 'plain'   
                    },
                    {
                        xtype:'spacer'
                    },
                    {
                        iconMask: true,
                        cls:'addButton',
                        ui: 'plain',
                        iconCls: 'addIconCls',
                        itemId: 'expenAdd'
                    }]
            }]
    }
});







/* 
 * @author Prakash
 * company Itrix Inc.
 * Login for User
 */

Ext.define("FRIENDAPP.view.AddExpenForm",{
  extend: 'Ext.form.FormPanel',
  xtype: 'AddExpenForm',
  requires: ['Ext.form.FieldSet','Ext.field.Text','Ext.field.DatePicker','Ext.field.Number'],
    
  config:{
    iconMask: true,
    ui: 'confirm-round',
    iconCls: 'compose',
    title:'Add Expen',
    styleHtmlContent: true,
    scrollable:false,
    cls: 'loginview',
    height: '100%',
    width: '100%',
    layout: {
      type:"vbox",
      align:'middle'
    },
    items:[ 
    {
      xtype:'toolbar',
      docked:'bottom',
      items:[
      {
        text:"Save",
        itemId:'expenseFormSave',
        hidden:true
      },
      {
        text:"Update",
        itemId:'expenseFormUpdate',
        hidden:true                  
      },
      {
        xtype:'spacer'
      },
      {
        text:"Reset",
        itemId:'expenseFormReset',
        hidden:true
      },
      {
        text:"Delete",
        itemId:'expenseFormDelete',
        hidden:true
      },
      ]
    },
    {
      xtype:'spacer'
    },
                             
    {
      xtype: "fieldset",
      width :'100%',
      cls: 'expenfieldcls',
      height :'100%',
                    
      items: [
          {   
       xtype: 'datepickerfield',
        name: 'date',
        itemId:'date',
        label: 'Date',
        hidden:true,
        value: new Date(),
        dateFormat:'d/m/Y',
        picker: {
         yearFrom: 2011,
          dateFormat:'d/m/Y'
          //slotOrder: ['day', 'month', 'year']
        }
      },
      {
        xtype: 'numberfield',
        name: 'amount',
        itemId:'amount',
        label: 'Amount'
      },
      {
        xtype: "textareafield",
        name:'expen',
        itemId:"expen",
        label: 'Expen Text',
        height:'80%',
        useclearicon:true,
        placeholder:"Mail Content"
      },
      ]
    },
    {
      xtype:'panel',
      itemId:'formValidateMsg',
      height:'50px',
      cls:'validatemsg',
      width:'90%'
    },
    {
      xtype:'spacer'
    },
    ]
  }
});

/*
 * The Graph TabPanel represents the Dashboard. Contains the graphs.
 * Contained by the section Panel.
 * @author Neha
 */
Ext.define("FRIENDAPP.view.GraphChart", {
    extend:'Ext.Panel',
    xtype:'graphChart',
    requires: [
    // 'Ext.chart.Panel',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Bar',
    'Ext.draw.engine.ImageExporter',
    'FRIENDAPP.store.DailyExpenseStore',
    'FRIENDAPP.store.MonthStore',
    'Ext.chart.interactions.ItemHighlight',
    'Ext.chart.interactions.Manager',
    'Ext.chart.interactions.ItemInfo',
    'Ext.chart.interactions.ItemCompare'
    
    ],
    config:{
        width:'100%',
        layout:'card',
        activeItem:1,
        items:[
        {
            xtype:'toolbar',
            title:'Balance Graph',
            width:'100%',
            docked:'top'
        },
        {
            xtype:'panel',
            width:'100%',
            height:'20%',
            docked:'bottom',
            layout:{
                type:'vbox',
                align:'middle'
            },
            items:[
            {
                xtype:'fieldset',
                width:'80%',
                items:[
                {   
                    xtype: 'datepickerfield',
                    name: 'graphdate',
                    label:'Select Year',
                    labelWidth:'60%',
                    itemId:'date',
            
                    width:'100%',
                    value: new Date(),
                    dateFormat:'Y',
                    picker: {
                        yearFrom: 2011,
                        dateFormat:'Y',
                        yearTo:2015,
                        slotOrder: ['year']
                    }
                }
                ]
            }
            
            ]
        },
        {
            title:'Emerging Balance',
            cls:'graphPanelCls',
            xtype:'chart',
            action:'chart',
            name:'monthChart',
            width:'100%',
            flex:1,
            animate:true,
            store:'MonthStore',
            
            gradients: [
            {
                'id': 'v-0',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(227, 148, 39)'
                    },
                    100: {
                        color: 'rgb(227, 148, 39)'
                    }
                }
            },
            {
                'id': 'v-1',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(243, 72, 109)'
                    },
                    100: {
                        color: 'rgb(243, 72, 109)'
                    }
                }
            },

            ],
            axes: [{
                type: 'Category',
                position: 'left',
                fields: ['month'],
                title: 'Date',
                minimum: 0
            }, {
                type: 'Numeric',
                position: 'bottom',
                label: {
                    renderer: function (v) {
                        return v.toFixed(0);
                    }
                },
                minimum:0,
                fields: ['amount'],
                title: 'Amount'
            }],
 
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                renderer: function (sprite, storeItem, barAttr, i, store) {
                    if(i%2==0){
                        barAttr.fill = "url(#v-0)";
                    }else{
                        barAttr.fill = "url(#v-1)";
                    }
         
                    return barAttr;
                },  
                xField: 'date',
                yField: ['amount']

            }],
            
            interactions: [{
                type: 'iteminfo',
                gesture: 'tap',
                listeners: {
                    show: function(interaction, item, panel) {
                        panel.setTop(0);
                        panel.setCentered(true);
                        panel.setZIndex(90);
                        panel.setWidth('70%');
                        panel.setHeight('40%');
                        var record = item.storeItem;
                        panel.update(
                            '<ul>' +
                            '<li><b>Month:</b> ' + record.data.month + '</li>' +
                            '<li><b>Year: </b>' + record.data.year + '</li>' +
                            '<li><b>Amount: </b>' + record.data.amount + '</li>' +
                            '</ul>'
                            );
            
                    }
                }
            }]

        },{
            xtype:'panel',
            height:5,
            cls:'ribbonCls',
            width:'100%',
            docked:'top'
        },
        ]
    }
})
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.ExpenReport
 */

Ext.define("FRIENDAPP.view.ExpenReport",{
  extend: 'Ext.form.Panel',
  xtype: 'ExpenReport',
   
  scrollable: false,
  requires:[
  'FRIENDAPP.store.UserExpenseStore',
  'FRIENDAPP.model.userExpenModel',
  'Ext.dataview.List'
  ],
    
  config: {
    layout:'fit',
    iconCls: 'info',
    scrollable: false,
    cls:'listCls',
    items:[
    {
      xtype:'list',
      cls:'userExpenseList',
      itemCls:'userExpenseItem',
      grouped: true,
      store:'UserExpenseStore',
      itemTpl:'<div><span class="expenRptClassText">{expen}</span><br><span>Amount : </span><span class="expenRptClassAmount">{amount} Rs.</span></div>',
      itemId:'expenseListReport',
      onItemDisclosure:true
    }]
  }
  });
/* 
 * @author Prakash
 * company Itrix Inc.
 * Main Switch View Page
 * 
 */

Ext.define("FRIENDAPP.view.Main", {
    extend: 'Ext.Panel',
    requires:['FRIENDAPP.view.Dashboard'],
    xtype: 'mainPanel',
    id : 'MainPanel',
    config: {
        
        fullscreen: true,
        layout: 'card',
        activeItem: 0,
        
        items:[
        {
            xtype: 'loginview'
        },
        {
            xtype: 'MainFrameview'  
        },
        {
            xtype:'dashboard',
            docked:'bottom',
            hidden:true
        },
        ]
    }
        
    
});
/* 
 * @author Prakash
 * company Itrix Inc.
 * User can successfully log in from here if pass word and 
 * username is correct..
 */
Ext.define('FRIENDAPP.controller.LoginController', {
    extend: 'Ext.app.Controller',
     requires:['FRIENDAPP.services.LoginServices'],
    config: {
        
              refs: {
                  loginFormPanel: 'loginview',
                  loginButton: 'loginview #loginButton',
                  rememberPassword: 'loginview #rememberPassword',
                  usernameField:'loginview textfield[name=username]',
                  passwordField:'loginview textfield[name=password]',
                  errorMsg: 'loginview #validateMessage'
            
              },
        
              control: {
                  loginButton: {
                  tap: "onLoginTap"
                  },
                  loginFormPanel:{
                      activate:"onSignedIn"
                  }
                  }
    },
    
    /**
     * When login button is hit.
     */
    onLoginTap: function() {         
        var loginForm = this.getLoginFormPanel();
        var errorString = this.getErrorMsg();
        errorString.setHtml("");
        var values = loginForm.getValues();
        FRIENDAPP.services.LoginServices.loginAuthentication(values,
                function success(Response){
                    setIndicator(Response.message);
                    FRIENDAPP.app.getController('LoginController').onSignedChange();
                    setTimeout(function(){
                    evaluateMap();
                    setHomeScreen();
                    }, 2000); 
                },
                function failure(Response){
                    errorString.setHtml('<font color="white" size="2"><center>'+Response.message+'</center></font>');
                    clearPasswordField()
                }   
      );  
          this.calculateStore();
          /*
           * Todo code to calculate monthly and yearly expenses and add them to respective stores
           */
  },
  
  onSignedIn:function(){
       var userInfoData=Ext.getStore('UserDataStore');
        userInfoData.load();
        if(userInfoData.getById(1).get('status')==='yes'){
            setIndicator('Loading...');
            this.getUsernameField().setValue(userInfoData.getById(1).get('username'));
            this.getPasswordField().setValue(userInfoData.getById(1).get('password'));
            setTimeout(function(){
            evaluateMap();
            setHomeScreen();
            }, 3000);
            this.calculateStore();
            this.getRememberPassword().setChecked(true);
        }else if(userInfoData.getById(1).get('status')==='no'){
             this.getRememberPassword().setChecked(false);
        }
  },
  
  onSignedChange:function(){
        if(this.getRememberPassword().getChecked()){
            var store=Ext.getStore('UserDataStore');
            var id=store.getById(1);
            id.set('status', 'yes');
            store.sync();
            store.load();
        }
  },
  
  calculateStore:function(){
    
      var store=Ext.getStore('DailyExpenseStore');
      store.clearFilter();
      store.load();
      var yearsArray = [];
      var monthsArray= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var yearResult;
      for (var i =0; i < store.getCount(); i++){ // loop through store records
        yearResult = store.getAt(i).data.date; //grab the value for the series field
        var year=new Date(yearResult).getFullYear();
        Ext.Array.include(yearsArray,year); // populate aWindows with unique values
      }
      /*
       *Year store calculation
       */
      var yearstore=Ext.getStore('YearStore');
      var monthstore=Ext.getStore('MonthStore');
      monthstore.removeAll(true);
      yearstore.removeAll(true);
      var i,yeartot,yearcnt,monthtot,monthcnt;
      yearcnt=0,monthcnt=0;
      for(yearcnt=0;yearcnt<yearsArray.length;yearcnt++){
        store.clearFilter();
        i=0,yeartot=0,monthtot=0;
        store.filter(function(item){
                var year=new Date(item.get('date')).getFullYear();
                if(year===yearsArray[yearcnt]){
                    return true;
                }
            });            
            
        while(store.getCount()>i){
            yeartot=yeartot + store.getAt(i).get('amount');
            i++;
        }
        yearstore.add({
                amount:yeartot,
                year:yearsArray[yearcnt]
        });
      /*
       *Month store calculation
       */
        for(monthcnt=0;monthcnt<monthsArray.length;monthcnt++){
            monthtot=0,i=0;
            store.clearFilter();
            store.filter(function(item){
                var year=new Date(item.get('date')).getFullYear();
                var month=monthsArray[new Date(item.get('date')).getMonth()];
                if(year===yearsArray[yearcnt] && month==monthsArray[monthcnt]){
                    return true;
                }
            });
         
            while(store.getCount()>i){
                monthtot=monthtot + store.getAt(i).get('amount');
                i++;
            }
            if(monthtot>0){
                 monthstore.add({
                    amount:monthtot,
                    month:monthsArray[monthcnt],
                    year:yearsArray[yearcnt]
            });   
          }
        }
      }
  }
});

function evaluateMap(){
    Ext.Viewport.setMasked(false);
}

function setIndicator(Response){
      Ext.Viewport.setMasked({
      xtype: 'loadmask',
      cls:'maskCls',
      message: Response,
      indicator: true
    });
    
}
/**
 * Set login screen as home screen.
 */
function setHomeScreen(){
    var main = Ext.getCmp('MainPanel');
    var calendarButton = FRIENDAPP.app.getController('DashboardController').getCalendarButton();
    calendarButton.addCls('activeCls');
    FRIENDAPP.app.getController('DashboardController').activeButton = calendarButton;
    main.setActiveItem(1);
    return;
 }
    
/**
 *  Clear the password field if wrong input
 */
function clearPasswordField(){
    var passwdField = Ext.getCmp('passwordid');
    if(passwdField){
        passwdField.reset();
    } 
}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.ExpenFormController', {
    extend: 'Ext.app.Controller',
    
     requires:['FRIENDAPP.util.util'],
    
    config: {
        refs:{
              expenseList:'userExpenListView1',
              expenList:'userExpenListView1 #expenseList',
              mainFrame:'MainFrameview',
              addExpenForm:'AddExpenForm',
              delButton:'AddExpenForm #expenseFormDelete',
              updateButton:'AddExpenForm #expenseFormUpdate',
              saveButton:'AddExpenForm #expenseFormSave',
              resetButton:'AddExpenForm #expenseFormReset',
              expenAddBut:'userExpenListView1 #expenAdd',
              dateField:'AddExpenForm #date',
              amountField:'AddExpenForm #amount',
              mainFrameCal:'MainFrameCalender',
              expenField:'AddExpenForm #expen',
              formValidateMsg:'AddExpenForm #formValidateMsg'
        },
        
        control:{
          resetButton:{
              tap:'itemReset'
          },
          saveButton:{
              tap:'itemSave'
          },
          updateButton:{
              tap:'itemUpdate'
          },
          delButton:{
              tap:'itemDelete'
          }
        }
    },
    
    itemReset:function(){
    var expenform=this.getAddExpenForm();
    this.getFormValidateMsg().setHtml('');
    expenform.reset();
    },
    
    itemSave:function(){
        if(this.dataValidate()){
            var store=Ext.getStore('UserExpenseStore');
            store.add({amount: this.getAmountField().getValue(),
                       expen: this.getExpenField().getValue(),
                       date: Ext.util.Format.date(this.getDateField().getValue(),'d M Y ')
                     });
            store.sync();
            store.load();
            this.getMainFrameCal().setActiveItem(this.getExpenseList());     
            FRIENDAPP.app.getController('ExpenListController').calculateOtherStores();
         }
    },
    
    itemUpdate:function(){
        if(this.dataValidate()){
        var store=Ext.getStore('UserExpenseStore');
        var selectedRec=(this.getExpenList().getSelection());
        var id = store.getById(selectedRec[0].data.id);
        id.set('date', Ext.util.Format.date(this.getDateField().getValue(),'d M Y '));
        id.set('amount', this.getAmountField().getValue());
        id.set('expen', this.getExpenField().getValue());
        store.sync();
        store.load();
        this.getMainFrameCal().setActiveItem(this.getExpenseList());
        FRIENDAPP.app.getController('ExpenListController').calculateOtherStores();
        }
    },
    
    itemDelete:function(){
        var store=Ext.getStore('UserExpenseStore');
        var selectedRec=(this.getExpenList().getSelection());
        store.remove(store.getById(selectedRec[0].data.id));
        store.sync();
        store.load();
        this.getMainFrameCal().setActiveItem(this.getExpenseList());

        FRIENDAPP.app.getController('ExpenListController').calculateOtherStores();
    },
    
    dataValidate:function(){
        if (!this.getAmountField().getValue() || FRIENDAPP.util.util.isBlank(this.getAmountField().getValue())) {
            this.getFormValidateMsg().setHtml('Please enter amount !...');
            return false;
        }
        
        if(this.getAmountField().getValue()<=0){
            this.getFormValidateMsg().setHtml('Please enter amount !...');
            return false;
        }
        
        if (!this.getExpenField().getValue() || FRIENDAPP.util.util.isBlank(this.getExpenField().getValue())) {
            this.getFormValidateMsg().setHtml('Please enter expen Text !...');
            return false;
        }
        return true;
    }
});



/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.MainFrameCalender", {
  extend: 'Ext.Panel',
  requires:["FRIENDAPP.view.userExpenListView",
    "FRIENDAPP.view.AddExpenForm",
    
  ],
  xtype: 'MainFrameCalender',
  //id : 'MainPanel',
  config: {
    fullscreen: true,
    layout: 'card',
     title: 'Email',
    activeItem: 0,
    items:[
    {
      xtype: 'toolbar',
      cls: 'mainToolbar',
      docked: 'top',
      itemId:'dateLabel',
      title:'My Pocket Finder',
      name:'dateLabel',
      items:[  
      {
        xtype:'button',
        iconMask: true, 
        ui: 'back',
//        cls:'backButton',
//        iconCls: 'reply',
        action:'back',
        width:60,
//        height:30,
        text:'BACK',
        itemId:'backButton'
      },
      {
        xtype:'spacer'
      }
      ]
    },
    {
       xtype:'panel',
       height:5,
       cls:'ribbonCls',
       width:'100%',
       docked:'top'
    },
    {               
      xtype:'touchcalendar',
      title:'Calendar',
      iconCls:'Calendar'
    },
]
  }
});
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.MainFrameChart", {
  extend: 'Ext.Panel',
  requires:["FRIENDAPP.view.GraphChart"],
  xtype: 'MainFrameChart',
  //id : 'MainPanel',
  config: {
        
    fullscreen: true,
    layout: 'card',
    activeItem: 0,
        
    items:[
    {
      xtype:'graphChart'
    }
    ]
  }
        
    
});
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define("FRIENDAPP.view.MainFrameReport", {

  extend: 'Ext.Panel',
  requires:["FRIENDAPP.view.ExpenReport",
  'Ext.field.Select',
  'Ext.field.DatePicker'],
  xtype: 'MainFrameReport',
  //id : 'MainPanel',
  config: {
    fullscreen: true,
    layout: 'card',
    activeItem: 0,
    items:[
    {
     xtype:'toolbar',
     docked: 'top',
     items:[
         {
          text:"Total Amount",
          ui: 'plain',
          itemId:'reportTotalText'
         }
     ]
    },
    {
       xtype:'panel',
       height:5,
       cls:'ribbonCls',
       width:'100%',
       docked:'top'
    },
    {
      xtype:'ExpenReport'
    },
    {
      xtype:'panel',
      cls:'formPanelCls',
      width:'100%',
      docked:'bottom',
      layout:'vbox',
     items:[
       {   
        xtype: 'datepickerfield',
        name: 'dayWise',
        hidden:false,
        itemId:'dayWise',
        width:'100%',
        value: new Date(),
        dateFormat:'d-M-Y',
        picker: {
          yearFrom: 2011,
          dateFormat:'d/m/Y',
          yearTo:2015,
          slotOrder: ['day','month','year']
        }
      },
       {   
        xtype: 'datepickerfield',
        name: 'monthWise',
        itemId:'monthWise',
        hidden:true,
        width:'100%',
        value: new Date(),
        dateFormat:'M-Y',
        picker: {
          yearFrom: 2011,
          dateFormat:'d/m/Y',
          yearTo:2015,
          slotOrder: ['month','year']
        }
      },
      {   
        xtype: 'datepickerfield',
        name: 'yearWise',
        itemId:'yearWise',
        hidden:true,
        value: new Date(),
        dateFormat:'Y',
        picker: {
          yearFrom: 2011,
          dateFormat:'d/m/Y',
          yearTo:2015,
          slotOrder: ['year']
        }
      },
      {
        xtype:'selectfield',
        name:'select_type',
        itemId:'select_type',
        options: [
            {text: 'Day Wise',  value: 'day'},
            {text: 'Month Wise', value: 'month'},
            {text: 'Year Wise',  value: 'year'},
            {text: 'Refresh Data',  value: 'refresh'}
        ]}          
     ]
    }
    ]
  }

});
/* 
 * @author Prakash
 * company Itrix Inc.
 * MainFrame for the User they can access utiity from here.
 * 
 */
Ext.define("FRIENDAPP.view.MainFrame",{
    extend: 'Ext.Panel',
    requires: ['Ext.TitleBar',
    
    "FRIENDAPP.view.MainFrameCalender",
    "FRIENDAPP.view.MainFrameChart",
    "FRIENDAPP.view.MainFrameReport",
    "FRIENDAPP.view.Theme"
    ],
    xtype: 'MainFrameview',
    //id:'MainFrameview',
    config:{
        fullscreen: true,
        layout: 'card',
        activeItem : 0,
        items:[
        {
            xtype:'button',
            iconMask: true, 
            iconCls:'dashboardIconCls',
            //      text:'DASHBOARD',
            ui:'dashboard',
            action:'dashboard',
            width:'100%',
            itemId:'dashboardButton',
            docked:'bottom'
        },
        
        {               
            xtype:'MainFrameCalender',
            action:'calendar'
        },
        {
            xtype:'MainFrameChart',
            action:'graph'
        },
        {
            xtype:'MainFrameReport',
            action:'report'
        },
        {
            xtype:'MainFrameLicenceView',
            action:'settings'
        },
        {
           xtype:'themePanel',
           action:'theme'
        }
        ]
    }
});
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.DashboardController',{
    extend:'Ext.app.Controller',
    requires: ['FRIENDAPP.view.MainFrame'],
    activeButton:null,
    config: {
        refs: {
            dashboardButton:'MainFrameview button[action=dashboard]',
            dashboard:'mainPanel dashboard',
            calendarButton:'dashboard button[action=calendar]',
            graphButton:'dashboard button[action=graph]',
            reportButton:'dashboard button[action=report]',
            settingsButton:'dashboard button[action=settings]',
            logoutButton:'dashboard button[action=logout]',
            themeButton:'dashboard button[action=theme]',
            expenReportView:'ExpenReport',
            mainFrameCal:'MainFrameCalender',
            mainFrame:'MainFrameview',
            mainPanel:'mainPanel',
            graphChart:'graphChart',
            monthChart:'graphChart chart[name=monthChart]',
            yearChart:'graphChart chart[name=yearChart]',
            dailyChart:'graphChart chart[name=dailyChart]',
            hintPanel:'panel[name=hint]',

            mainFrameLicenceView:'MainFrameLicenceView',
            updateButton:'FormPasswordChange #btn_pass_update',
            saveButton:'FormPasswordChange #btn_pass_save',
            rememberPassword: 'loginview #rememberPassword'
        },
              
        control: {
            dashboardButton:{
                tap:'onDashboard'
            },
            calendarButton:{
                tap:'onScreenSelection'
            },
            graphButton:{
                tap:'onScreenSelection'
            },
            reportButton:{
                tap:'onScreenSelection'
            },
            settingsButton:{
                tap:'onScreenSelection'
            },
            logoutButton:{
                tap:'onScreenSelection'
            },
            themeButton:{
                tap:'onScreenSelection'
            },
            graphChart:{
                activeitemchange:'ónGraphChange'
            }
                  
        }
    },
      
    onDashboard:function(){
        if(this.getDashboard().getHidden()==true){
            this.getDashboard().show();
        }
        else{
            this.getDashboard().hide();
        }
    },

//    onGraphChange:function(a,b,c,d){
//        debugger;
//        var store=this.getGraphChart().getActiveItem().getStore();
//        var self=this;
//        var datepicker = this.getGraphDate();
//        switch(store.getStoreId()){
//            case 'DailyExpenseStore':
//                datepicker.setDateFormat('Y/m');
//                datepicker.setHidden(false);
//                break;
//            case 'MonthStore':
//                datepicker.setDateFormat('Y');
//                datepicker.setHidden(false);
//                break;
//            case 'YearStore':
//                datepicker.setHidden(true);
//                break;
//                                        
//        }
//    },

    //    onGraphChange:function(a,b,c,d){
    //        debugger;
    //        var store=this.getGraphChart().getActiveItem().getStore();
    //        var self=this;
    //        var datepicker = this.getGraphDate();
    //        switch(store.getStoreId()){
    //            case 'DailyExpenseStore':
    //                datepicker.setDateFormat('Y/m');
    //                datepicker.setHidden(false);
    //                break;
    //            case 'MonthStore':
    //                datepicker.setDateFormat('Y');
    //                datepicker.setHidden(false);
    //                break;
    //            case 'YearStore':
    //                datepicker.setHidden(true);
    //                break;
    //                                        
    //        }
    //    },

    onScreenSelection:function(button,e,eOpts){
        this.getDashboard().hide();
        if(this.activeButton!== null){
            this.activeButton.removeCls('activeCls');
        }
        this.activeButton=button;
        button.addCls('activeCls');
        switch(button.config.action)
        {
            case 'calendar':
                this.getMainFrame().setActiveItem(0);
                this.getMainFrameCal().setActiveItem(0);
                break;
        
            case 'graph':
                this.getMainFrame().setActiveItem(1);
                var store=Ext.getStore('DailyExpenseStore');
                store.load();
                store.clearFilter();
                Ext.getStore('MonthStore').clearFilter();
                FRIENDAPP.app.getController('GraphController').onGraphFilter(null,new Date());
                this.getMonthChart().setData(Ext.getStore('MonthStore').getData());
                var hint = Ext.create('Ext.Panel',{
                  layout: 'vbox',
                  name:'hint',
                  html:'<center><small>Tap any bar to show total information<small><center>',
                  height:50,
                  width:'80%',
                  //modal: true,
                  bottom:'10%',
                  left:'10%',
                  floating: true

             })
               
               Ext.Viewport.add(hint);
               setTimeout(function(){
                   hint.setHidden(true);
                   hint.destroy();
               },2000)
 
                
                break;
                    
            case 'report':
                this.getMainFrame().setActiveItem(2)
                var store=Ext.getStore('UserExpenseStore');
                store.clearFilter();
                store.load();
                break;
                    
            case 'logout':
                this.activeButton.removeCls('activeCls');
                this.getDashboard().hide();
                var store=Ext.getStore('UserDataStore');
                var id=store.getById(1);
                id.set('status', 'no');
                store.sync();
                store.load();
                this.getRememberPassword().enable();
                this.getMainFrame().setActiveItem(0);
                this.getMainFrameCal().setActiveItem(0);
                this.getMainPanel().setActiveItem(0);
                clearLoginFields();
                
                break;             
                    
            case 'settings':
                this.getMainFrame().setActiveItem(3);
                this.getMainFrameLicenceView().setActiveItem(1);
                this.getUpdateButton().setHidden(false);
                this.getSaveButton().setHidden(true);
                break;
                
            case 'theme':
                this.getMainFrame().setActiveItem(4);
                break;
        }
    }
})
function clearLoginFields(){
    var passwdField = Ext.getCmp('passwordid');
    var usernameField = Ext.getCmp('usernameid');
    if(passwdField || usernameField){
        passwdField.reset();
        usernameField.reset();
        return; 
    }
        
}




Ext.application({

    controllers: ["Main",
        "LoginController",
        "ExpenListController",
        "ExpenFormController",
        "DashboardController",
        "ExpenReportController",
        "LicenceController",
        "PasswordChangeController",
        "GraphController",
        "ThemeController"
    ],
    stores: ["UserExpenseStore",'DailyExpenseStore','UserDataStore','MonthStore','YearStore'],
     models: ["userExpenModel","UserDataModel",'GraphModel','YearModel'],
    name: 'FRIENDAPP',

    /*
     * external libraries
     **/
    requires: [
        'Ext.MessageBox',
        'Ext.ux.TouchCalendar',
        'Ext.Img',
        'Ext.ux.TouchCalendarView',
        'Ext.util',
        'Ext.draw'
    ],

    views: ['Main','Login','MainFrame','LicenceView','Licence','PasswordChange'],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
    
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
       // Initialize the main view
        var userInfoData=Ext.getStore('UserDataStore');
        userInfoData.load();
        if(null!=userInfoData.getById(1)){
            //var id=userInfoData.getById(1);
            //var a=FRIENDAPP.util.util.themeSelector();
            //a.href=id.get('theme');
            Ext.Viewport.add(Ext.create('FRIENDAPP.view.Main'));
        }
        else{
            Ext.Viewport.add(Ext.create('FRIENDAPP.view.LicenceView'));
       }     
       
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});

