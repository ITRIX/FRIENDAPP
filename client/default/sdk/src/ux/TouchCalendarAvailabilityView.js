
Ext.define('Ext.ux.TouchCalendarAvailabilityView', {
	
	extend: 'Ext.ux.TouchCalendarView',
  xtype: 'touchcalendaravailability',
    config: {

        pinHeaders: false,
        baseTpl: [
                    '<table class="{[this.me.getViewMode().toLowerCase()]}" style="width:100%">',
                        '<thead>',
                            '<tr>',
                                
                                '<tpl if="typeof this.getTeam() == typeof []">',
                                    '<th  colspan="3"><span class="goto-prev"></span><span class="mnth">{[Ext.Date.format(this.me.currentDate, "M")]} {[Ext.Date.format(this.me.currentDate, "Y")]}</span><span class="goto-next"></span></th>',
//                                  '<th class="goto-prev"><!-- Team members heading --></th>', // TODO: If on hasTeam
//                                  '<th class="goto-next"></th>',
                                '</tpl>',
                                '<tpl for="this.getDaysArray(values)">',
                                    //'<th class="{[this.getHeaderClass(xindex)]}"></th>',
                                    '<th class="hdrCell{[(xindex)]} {[this.getHeaderClasses(values)]}">', //remove goto-prev class
                                        '<tpl if="xindex === 4">',
                                            
                                        '</tpl>',
                                        /*
                                        '<tpl if="xindex === 5">',
                                          '<span class="legend"><div class="available-true"></div>Out of Office<div class="available-false"></div>Available</span>',
                                        '</tpl>',
                                        Remove legend from calendar header */
                                        '{[this.getFormattedDay(values.date)]}',   
                                        //'{date:date("D")}',
                                        '<br>',
                                        '{date:date("d")}',
                                    '</th>',
                                '</tpl>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            '<tpl if="this.getTeam()==undefined">',
                            '<tr>',
                              '<tpl for=".">',
                                '<td class="time-block {[this.getClasses(values)]}" datetime="{[this.me.getDateAttribute(values.date)]}">',
                                  '{date:date("j")}',
                                '</td>',
                              '</tpl>',
                            '</tr>',
                            '</tpl>',
                            '<tpl for="this.getTeam()">',
                              '<tr class="availabilityRow row-{id}" data-ownerId="{id}">',
                                    '<td class="calendarTeamMemberBlock" colspan="3">{firstName:ellipsis(16)}</td>', //class="teamMemberBlock"
                                  '<tpl for="parent">',
                                    '<td  style="width:15% !important; height: 34px;"  class="time-block {[this.getClasses(values)]}" datetime="{[this.me.getDateAttribute(values.date)]}">',
                                        '<span></span>',
                                      //'{date:date("j")}',
                                     '</td>',
                                    
                                     '<tpl if="this.isEndOfRow(xindex)">',
                                        '</tr>',
                                        '<tpl if="!this.isEndOfPeriod(xindex)">',
                                            '<tr>',
                                        '</tpl>',
                                     '</tpl>',
                                  
                                  '</tpl>', // end for=parent tpl
                              '</tr>', // end <tr> row-firstName
                            '</tpl>', // end tpl for=this.getTeam()
                                                    '</tbody>',
                    '</table>',
//                    '<span class="legend"><div class="available-true"></div>Out of Office<div class="available-false"></div>Available</span>'
                ],
        
        width: '100%',
        height: '100%',
        
        itemSelector: 'td.time-block',
        team: undefined
        

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
      
      getHeaderClasses: function(values){
          var todayF = Ext.util.Date.format(new Date(), "dmy");
          var evDateF = Ext.util.Date.format(values.date, "dmy");
          if(todayF == evDateF){
              return "todayHeaderCls";
          }
          return '';
      },
      
      getFormattedDay: function(evDate){
          var evDay = Ext.util.Date.format(evDate, "D");
          evDay = evDay.slice(0,evDay.length-1);
          return evDay.toUpperCase();
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
      isEndOfPeriod: function(){
        return false; // Why was this here? Returning undefineds at the moment..
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
        return currentIndex === 1 ? this.me.getPrevPeriodCls() : currentIndex === 4 ? this.me.getNextPeriodCls() : '';
      },
      getTeam: function(){
        var teamStore = this.me.getTeam();
        if (teamStore){
          return teamStore;//.getRange();
        }
        return undefined;

      },
      hasTeam: function(){
        return true;
        if (this.team && this.team.length && this.team.length>0){
          return true;
        }else{
          return false;
        }
      }
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
   
    
    if (this.getTeam() && this.getTeam().length>0){
      this.setScrollable('vertical');   //@Karan changed to vertical initially both
    }else{
      this.setScrollable(viewMode.toUpperCase() === 'DAY' ? 'vertical' : false);
    }

    // Pin headers functionality
    if (this.getPinHeaders()){
      var scroller = this.getScrollable().getScroller();
      scroller.on({
        scroll: function(scroller, x, y){
          // TODO: Make thead absolute
          var thead = this.element.select('thead').first(),
          headHeight = thead.getHeight(),
          offset = headHeight - y;
          if(parseInt(y)<-1){
              thead.dom.style.webkitTransform = "translate3d(0px, -1px, 1px)";
          }else
          if (thead && y){
            thead.dom.style.webkitTransform = "translate3d(0px, " + parseInt(y) + "px, 1px)";
          }
        },
        scope: this
      });
      this.on({
        periodchange : function(){
          var me = this;
          setTimeout(function(){
            var scroller = me.getScrollable().getScroller();
            scroller.fireEvent('scroll', scroller, scroller.position.x, scroller.position.y);
          }, 10);

        }
      });
    }

      
    return viewMode;
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
    populateStore: function(){
        this.currentDate = this.currentDate || this.value || new Date();
		
        var unselectable = true, // variable used to indicate whether a day is allowed to be selected
        baseDate = this.currentDate, // date to use as base
        iterDate = this.getStartDate(baseDate),//@karan changed to baseDate // date current mode will start at       
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
                selected: false,//this.isSameDay(iterDate, this.value) && !unselectable,
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

        this.fireEvent('selectionchange', this, newDate, previousValue, target);
    },

    /**
   	 * Syncs the table's Ext.Element to the height of the Ext.DataView's component. (Only if it isn't in DAY mode)
   	 */
   	syncHeight: function(){
      if (this.getViewMode().toUpperCase() !== 'DAY') {
        var table = this.element.select('table');
        if (table && table.elements.length>0){
          table.first().setHeight(this.getHeight());
          table.first().setWidth(this.getWidth());
        }
        this.element.setHeight('100%');
        this.element.setWidth('100%');
      }
   	},
    getSelectedCellHeader: function(selectedCell){
        var th = selectedCell.parent().parent().parent().select('th.hdrCell' + selectedCell.dom.cellIndex);
        return th;
    }
});

