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

            mainFrameLicenceView:'MainFrameLicenceView',
            updateButton:'FormPasswordChange #btn_pass_update',
            saveButton:'FormPasswordChange #btn_pass_save',
            rememberPassword: 'loginview #rememberPassword'
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
                FRIENDAPP.app.getController('GraphController').onGraphFilter(null,new Date());
                this.getMonthChart().setData(Ext.getStore('MonthStore').getData());
                
               Ext.Viewport.add({
                  xtype: 'panel',
                  layout: 'vbox',
                  html:'<center><small>Tap any bar to show total information<small><center>',
                  height:'10%',
                  width:'80%',
                  //modal: true,
                  bottom:'10%',
                  left:'10%',
                  floating: true

             });
 
                
                break;
                    
            case 'report':
                this.getMainFrame().setActiveItem(2)
                var store=Ext.getStore('UserExpenseStore');
                store.clearFilter();
                store.load();
                break;
                    
            case 'logout':
                this.activeButton.removeCls('activeCls');
                this.getDashboard().hide();
                var store=Ext.getStore('UserDataStore');
                var id=store.getById(1);
                id.set('status', 'no');
                store.sync();
                store.load();
                this.getRememberPassword().enable();
                this.getMainFrame().setActiveItem(0);
                this.getMainFrameCal().setActiveItem(0);
                this.getMainPanel().setActiveItem(0);
                clearLoginFields();
                
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
function clearLoginFields(){
    var passwdField = Ext.getCmp('passwordid');
    var usernameField = Ext.getCmp('usernameid');
    if(passwdField || usernameField){
        passwdField.reset();
        usernameField.reset();
        return; 
    }
        
}


