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
      alert("month");
     var store=Ext.getStore('userExpenStore');
//     store.load();
    
     debugger;
     //var d=store.get('date');
       //alert(d);
    //var store = Ext.data.StoreManager.lookup('userExpenStore');
     store.clearFilter();
    var peoplefilter = function(item) {
            debugger;
            alert(Ext.util.Format.date(item.data.amount,'M'));
            //alert(Ext.util.Format.date(this.getReportMonthWise().getValue(),'M'));
            return item.data.amount=='500' ? true : false            
        }
        
    store.filterBy(peoplefilter);
    },
    
    onYearSort:function(){
      alert("year");
    }
    
});