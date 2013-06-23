/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.DashboardController',{
    extend:'Ext.app.Controller',
    requires: ['FRIENDAPP.view.MainFrame'],
    activeButton:null,
    config: {
        refs: {
            dashboardButton:'MainFrameview button[action=dashboard]',
            dashboard:'mainPanel dashboard',
            calendarButton:'dashboard button[action=calendar]',
            graphButton:'dashboard button[action=graph]',
            reportButton:'dashboard button[action=report]',
            settingsButton:'dashboard button[action=settings]',
            logoutButton:'dashboard button[action=logout]',
            expenReportView:'ExpenReport',
            mainFrameCal:'MainFrameCalender',
            mainFrame:'MainFrameview',
            mainPanel:'mainPanel',
            graphChart:'graphChart',
            monthChart:'graphChart chart[name=monthChart]',
            yearChart:'graphChart chart[name=yearChart]',
            dailyChart:'graphChart chart[name=dailyChart]',
            graphDate:'graphChart datepickerfield[name=date]',
            mainFrameLicenceView:'MainFrameLicenceView',
            updateButton:'FormPasswordChange #btn_pass_update',
            saveButton:'FormPasswordChange #btn_pass_save'
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
            },
            settingsButton:{
                tap:'onScreenSelection'
            },
            logoutButton:{
                tap:'onScreenSelection'
            },
            graphChart:{
                activeitemchange:'ónGraphChange'
            },
            graphDate:{
                change:'onGraphFilter'
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
    
//    onGraphChange:function(a,b,c,d){
//        debugger;
//        var store=this.getGraphChart().getActiveItem().getStore();
//        var self=this;
//        var datepicker = this.getGraphDate();
//        switch(store.getStoreId()){
//            case 'DailyExpenseStore':
//                datepicker.setDateFormat('Y/m');
//                datepicker.setHidden(false);
//                break;
//            case 'MonthStore':
//                datepicker.setDateFormat('Y');
//                datepicker.setHidden(false);
//                break;
//            case 'YearStore':
//                datepicker.setHidden(true);
//                break;
//                                        
//        }
//    },
    onGraphFilter:function(datepicker, newDate, oldDate, eOpts){
      Ext.getStore('MonthStore').clearFilter()
      Ext.getStore('MonthStore').filter('year',newDate.getFullYear());
    },
    
    onScreenSelection:function(button,e,eOpts){
        this.getDashboard().hide();
        if(this.activeButton!== null){
            this.activeButton.removeCls('activeCls');
        }
        this.activeButton=button;
        button.addCls('activeCls');
        switch(button.action)
        {
            case 'calendar':
                this.getMainFrame().setActiveItem(0);
                this.getMainFrameCal().setActiveItem(0);
                break;
        
            case 'graph':
                this.getMainFrame().setActiveItem(1);
                var store=Ext.getStore('DailyExpenseStore');
                store.load();
                store.clearFilter();
                Ext.getStore('MonthStore').clearFilter();
                this.onGraphFilter(null,new Date());
                this.getMonthChart().setData(Ext.getStore('MonthStore').getData());
                break;
                    
            case 'report':
                this.getMainFrame().setActiveItem(2)
                var store=Ext.getStore('UserExpenseStore');
                store.clearFilter();
                store.load();
                break;
                    
            case 'logout':
                this.getDashboard().hide();
                this.getMainFrame().setActiveItem(0);
                this.getMainFrameCal().setActiveItem(0);
                this.getMainPanel().setActiveItem(0);
                clearPasswordField();
                break;             
                    
            case 'settings':
                this.getMainFrame().setActiveItem(3);
                this.getMainFrameLicenceView().setActiveItem(1);
                this.getUpdateButton().setHidden(false);
                this.getSaveButton().setHidden(true);
                break;
        }
    }
})
function clearPasswordField(){
    var passwdField = Ext.getCmp('passwordid');
    if(passwdField){
        passwdField.reset();
        return; 
    }
}


