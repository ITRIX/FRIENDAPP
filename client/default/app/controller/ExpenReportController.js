/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('FRIENDAPP.controller.ExpenReportController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            reportMonthWise:'MainFrameReport #monthWise',
            reportYearWise:'MainFrameReport #yearWise'
            
        },
        control: {
            reportMonthWise:{
                change:'onMonthSort'
            },
            reportYearWise:{
                change:'onYearSort'
            }
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
    }
    
});