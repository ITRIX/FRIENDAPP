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
            }
        }
    },
    
    onSortChange:function(field,newValue,oldValue,eOpts){
      var store=Ext.getStore('userExpenStore');
      switch(field.getValue()){
        case 'day':
                   store.clearFilter();
                   this.getReportYearWise().setHidden(true);
                   this.getReportMonthWise().setHidden(true);
                   this.getReportDayWise().setHidden(false);
                   break;
        
        case 'month':
                   store.clearFilter();
                   this.getReportYearWise().setHidden(true);
                   this.getReportMonthWise().setHidden(false);
                   this.getReportDayWise().setHidden(true);
                   break;
          
        case 'year':
                   store.clearFilter();
                   this.getReportYearWise().setHidden(false);
                   this.getReportMonthWise().setHidden(true);
                   this.getReportDayWise().setHidden(true);
                   break;
        case 'refresh':
                    store.clearFilter();
                    break;
      }
    },
    
    onMonthSort:function(field,newValue,oldValue){
        var store=Ext.getStore('userExpenStore');
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
      var store=Ext.getStore('userExpenStore');
        store.clearFilter();
        store.filter(function(item){
            var year=new Date(item.get('date')).getYear();
            if(year===newValue.getYear()){
                return true;
            }
        });
    },
    onDaySort:function(field,newValue,oldValue){
      var store=Ext.getStore('userExpenStore');
        store.clearFilter();
        store.filter(function(item){
            var day=new Date(item.get('date')).getDay();
            var month=new Date(item.get('date')).getMonth();
            var year=new Date(item.get('date')).getYear();
            if(day===newValue.getDay() && month===newValue.getMonth() && year===newValue.getYear()){
                return true;
            }
        });
    }
    
});