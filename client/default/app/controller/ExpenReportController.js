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
        alert("year");
    }
    
});