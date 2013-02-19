/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('FRIENDAPP.controller.ExpenReportController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            reportSelectField: 'MainFrameReport #searchWise',
            reportMonthWise:'MainFrameReport #monthWise',
            reportYearWise:'MainFrameReport #yearWise'
            
        },
        control: {
           reportSelectField:{
             change:'onSearchSelection'
           },
           reportMonthWise:{
             change:'onMonthSort'
           },
           reportYearWise:{
             change:'onYearSort'
           }
        }
    },
    onSearchSelection:function(){
      debugger;
      //alert (this.getReportSelectField().getValue());
      switch(this.getReportSelectField().getValue())
      {
        
        case 'monthRpt':
                        this.getReportMonthWise().setHidden(false);
                        this.getReportYearWise().setHidden(true);
                        break;  
        case 'yearRpt':
                        this.getReportYearWise().setHidden(false);
                        this.getReportMonthWise().setHidden(true);
                        break; 
      }
    },
    
    onMonthSort:function(){
    var data=this.getReportMonthWise().getValue();
    var store=Ext.getStore('userExpenStore');
    store.clearFilter();
    var peoplefilter = function(item) {
      return Ext.util.Format.date(item.data.date,'M')==Ext.util.Format.date(data,'M') ? true : false            
    }
    store.filterBy(peoplefilter);
    },
    
    onYearSort:function(){
      alert("year");
    }
    
});