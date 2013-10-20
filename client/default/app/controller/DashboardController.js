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
            themeButton:'dashboard button[action=theme]',
            expenReportView:'ExpenReport',
            mainFrameCal:'MainFrameCalender',
            mainFrameChart:'MainFrameChart',
            mainFrameReport:'MainFrameReport',
            themePanel:'themePanel',
            mainFrame:'MainFrameview',
            mainPanel:'mainPanel',
            graphChart:'graphChart',
            monthChart:'graphChart chart[name=monthChart]',
            yearChart:'graphChart chart[name=yearChart]',
            dailyChart:'graphChart chart[name=dailyChart]',
            hintPanel:'panel[name=hint]',

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
            themeButton:{
                tap:'onScreenSelection'
            },
            graphChart:{
                activeitemchange:'ónGraphChange'
            },
            mainFrameCal:{
                initialize:'onPanelInit'
            },
            mainFrameChart:{
                initialize:'onPanelInit'
            },
            mainFrameReport:{
                initialize:'onPanelInit'
            },
            themePanel:{
                initialize:'onPanelInit'
            },
            mainFrameLicenceView:{
                initialize:'onPanelInit'
            }
        }
    },
      
    onDashboard:function(){
        if(this.getDashboard().getHidden() == true){
            //            this.getDashboard().getLayout().setAnimation('slideup');
            this.getDashboard().show();
            //this.getDashboard().setHeight(135);

            this.growDashboard();
        //            this.getDashboard().removeCls('slidedown');
        //            this.getDashboard().addCls('slideup');
        //            this.getDashboard().config.expand = true;
        }
        else{
            this.shrinkDashboard();
            
        //            this.getDashboard().setHeight(10);
            
        //            this.getDashboard().removeCls('slideup');
        //            this.getDashboard().addCls('slidedown');
        //            this.getDashboard().config.expand = false;
        }
    },
    
    growDashboard:function(){
        var self=this;
        setTimeout(function(){
            var height = self.getDashboard().getHeight()+40;
            if(height < 135){
                self.getDashboard().setHeight(height);
                self.growDashboard();
            }
                
        },1)
    },
    
    shrinkDashboard:function(){
        var self=this;
        setTimeout(function(){
            var height = self.getDashboard().getHeight()-40;
            if(height > 0){
                self.getDashboard().setHeight(height);
                self.shrinkDashboard();
            }else{
                self.getDashboard().hide();
            }
                
        },1)
    },
   
   /*
    * Initialize tap event to handle dashboard
    */
   onPanelInit:function(panel){
       var self = this;
       panel.element.on('tap',function(){
           self.getDashboard().hide();
       });
   },

    onScreenSelection:function(button,e,eOpts){
        this.onDashboard();
        if(this.activeButton!== null){
            this.activeButton.removeCls('activeCls');
        }
        this.activeButton=button;
        button.addCls('activeCls');
        
        var self = this;
        
        setTimeout(function(){
            switch(button.config.action)
            {
                case 'calendar':
                    self.getMainFrame().setActiveItem(0);
                    self.getMainFrameCal().setActiveItem(0);
                    break;
        
                case 'graph':
                    self.getMainFrame().setActiveItem(1);
                    var store=Ext.getStore('DailyExpenseStore');
                    store.load();
                    store.clearFilter();
                    Ext.getStore('MonthStore').clearFilter();
                    FRIENDAPP.app.getController('GraphController').onGraphFilter(null,new Date());
                    self.getMonthChart().setData(Ext.getStore('MonthStore').getData());
                    break;
                    
                case 'report':
                    self.getMainFrame().setActiveItem(2)
                    var store=Ext.getStore('UserExpenseStore');
                    store.clearFilter();
                    store.load();
                    break;
                    
                case 'logout':
                    self.activeButton.removeCls('activeCls');
                    self.getDashboard().hide();
                    var store=Ext.getStore('UserDataStore');
                    var id=store.getById(1);
                    id.set('status', 'no');
                    store.sync();
                    store.load();
                    self.getRememberPassword().enable();
                    self.getMainFrame().setActiveItem(0);
                    self.getMainFrameCal().setActiveItem(0);
                    self.getMainPanel().setActiveItem(0);
                    clearLoginFields();
                
                    break;             
                    
                case 'settings':
                    self.getMainFrame().setActiveItem(3);
                    self.getMainFrameLicenceView().setActiveItem(1);
                    self.getUpdateButton().setHidden(false);
                    self.getSaveButton().setHidden(true);
                    break;
                
                case 'theme':
                    self.getMainFrame().setActiveItem(4);
                    break;
            }
        },200)

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


