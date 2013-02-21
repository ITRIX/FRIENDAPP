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
        store.clearFilter();
        store.filter(function(item){
            var month=new Date(item.get('date')).getMonth();
            if(month===newValue.getMonth()){
                return true;
            }
        });
    },
    
    onYearSort:function(){
    }
    
});