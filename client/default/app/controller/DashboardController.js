/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('FRIENDAPP.controller.DashboardController',{
  extend:'Ext.app.Controller',
   
    config: {
              refs: {
                    dashboardButton:'MainFrameview button[action=dashboard]',
                    dashboard:'MainFrameview dashboard',
                    calendarButton:'dashboard button[action=calendar]',
                    graphButton:'dashboard button[action=graph]',
                    reportButton:'dashboard button[action=report]',
                    expenReportView:'ExpenReport',
                    mainFrameCal:'MainFrameCalender',
                    mainFrame:'MainFrameview',
                    feeAreaChart:'graphChart chart[action=chart]'
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
        
    onScreenSelection:function(obj,e,eOpts){
      this.getDashboard().hide();
      switch(obj.action)
      {
        case 'calendar':
                    this.getMainFrame().setActiveItem(0);
                    this.getMainFrameCal().setActiveItem(0);
                    break;
        
        case 'graph':
                    this.getMainFrame().setActiveItem(1);
                    debugger;
                    this.getFeeAreaChart().setData(Ext.getStore('userExpenStore').getData())
                    break;
                    
        case 'report':
                    this.getMainFrame().setActiveItem(2)
                    var store=Ext.getStore('userExpenStore');
                    store.clearFilter();
                    store.load();
                    break;
    }
    }
})