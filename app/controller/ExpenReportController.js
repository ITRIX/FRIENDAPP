/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('FRIENDAPP.controller.ExpenReportController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            reportSelectField:'MainFrameReport #searchWise',
            reportMonthWise:'MainFrameReport #monthWise',
            reportYearWise:'MainFrameReport #yearWise'
            
        },
        control: {
           reportSelectField:{
             change:'onSearchSelection'
           }
        }
    },
    onSearchSelection:function(){
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
    }
});