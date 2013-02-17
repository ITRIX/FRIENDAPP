/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            calendar:'MainFrameview touchcalendar[title=Calendar]',
            expenseList:'userExpenListView1',
            expenList:'userExpenListView1 #expenseList',
            mainFrame:'MainFrameview',
            mainFrameCal:'MainFrameCalender',
            backButton:'MainFrameCalender button[action=back]',
            dateLabel:'MainFrameview toolbar[name=dateLabel]',
            totalAmtLabel:'userExpenListView1 #totalAmtLabel'
        },
        control: {
           calendar:{
             selectionchange:'onDateSelection',
             activate:'removeBackLabel'
           },
           backButton:{
             tap:'itemTap'
           }
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
     this.getDateLabel().setTitle(Ext.util.Format.date(this.getCalendar().getValue(),'d M Y'));
     var store=Ext.getStore('userExpenStore');
     store.load();
     store.clearFilter();
     store.filter('date',Ext.util.Format.date(this.getCalendar().getValue(),'d M Y'));
     this.getBackButton().setHidden(false);
     this.getMainFrameCal().setActiveItem(this.getExpenseList());
    },
    
    removeBackLabel:function(){
      this.getBackButton().setHidden(true);
    }
});