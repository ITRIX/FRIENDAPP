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
      switch(field.getValue()){
        case 'day':
                   this.getReportYearWise().setHidden(true);
                   this.getReportMonthWise().setHidden(true);
                   this.getReportDayWise().setHidden(false);
                   break;
        
        case 'month':
                   this.getReportYearWise().setHidden(true);
                   this.getReportMonthWise().setHidden(false);
                   this.getReportDayWise().setHidden(true);
                   break;
          
        case 'year':
                   this.getReportYearWise().setHidden(false);
                   this.getReportMonthWise().setHidden(true);
                   this.getReportDayWise().setHidden(true);
      }
    },
    
    onMonthSort:function(field,newValue,oldValue){
        var store=Ext.getStore('userExpenStore');
        var newValue_year=this.getReportYearWise().getValue();
        this.onYearSort(field, newValue_year, oldValue);
        store.filter(function(item){
            var month=new Date(item.get('date')).getMonth();
            if(month===newValue.getMonth()){
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
            var year=new Date(item.get('date')).getYear();
            if(year===newValue.getYear()){
                return true;
            }
        });
    }
    
});