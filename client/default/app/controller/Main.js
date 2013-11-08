/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        currentDate:'',
        refs: {
            mainFrameview:'MainFrameview',
            calendar:'MainFrameview touchcalendar[title=Calendar]',
            expenseList:'userExpenListView1',
            expenList:'userExpenListView1 #expenseList',
            mainFrame:'MainFrameview',
            mainFrameCal:'MainFrameCalender',
            backButton:'MainFrameCalender button[action=back]',
            dateLabel:'MainFrameview toolbar[name=dateLabel]',
            totalAmtLabel:'userExpenListView1 #totalAmtLabel'
        //            graphChart:'graphChart',
        //            graphDate:'graphChart datepickerfield[name=date]'
        },
        control: {
            calendar:{
                selectionchange:'onDateSelection',
                activate:'removeBackLabel'
            },
            backButton:{
                tap:'itemTap'
            },
            mainFrameCal:{
                initialize:'removeBackLabel'
            }
        //            graphChart:{
        //                activeitemchange:'ónGraphChange'
        //            }
        }
    },
    
    itemTap:function(){
        var mainview=this.getMainFrameCal();
        var active=mainview.getActiveItem();
        switch(active.xtype)
        {
            case 'userExpenListView1':
                mainview.setActiveItem(0);
                break;
        
            case 'AddExpenForm':
                mainview.setActiveItem(this.getExpenseList())
                break;
        }
    },
        
    onDateSelection:function(){        
        if (!this.getExpenseList()){
            var expenseList=Ext.create("FRIENDAPP.view.userExpenListView");
        }
        this.currentDate=Ext.util.Format.date(this.getCalendar().getValue(),'d M Y');
        this.getDateLabel().setTitle(this.currentDate);
        var store=Ext.getStore('UserExpenseStore');
        store.load();
        store.clearFilter();
        store.filter('date',Ext.util.Format.date(this.getCalendar().getValue(),'d M Y'));
        this.getBackButton().setHidden(false);
        this.getMainFrameCal().setActiveItem(this.getExpenseList());
    },
    
    removeBackLabel:function(){
        this.getBackButton().setHidden(true);        
    //this.getDateLabel().setTitle(this.currentDate);
    }
});

document.addEventListener("backbutton", function(){
    var mainController = FRIENDAPP.app.getController('Main');
    var mainFrame = mainController.getMainFrameview();
    
    if(mainFrame.getActiveItem().xtype == 'MainFrameCalender'){
        var mainFrameCal = FRIENDAPP.app.getController('Main').getMainFrameCal();
        
        if(mainFrameCal.getActiveItem().xtype !== 'touchcalendar'){
            mainController.itemTap();
            return;
        }else{
            Ext.Msg.confirm("My Pocket Finder Says", "Do you really want to exit?", function(res){
                res = res.toLowerCase();
                if(res == "yes")
                    navigator.app.exitApp();
            });
        }
    }
    Ext.Msg.confirm("", "Do you really want to exit?", function(res){
        res = res.toLowerCase();
        if(res == "yes")
            navigator.app.exitApp();
    });
},false);
