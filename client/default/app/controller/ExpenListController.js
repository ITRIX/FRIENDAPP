/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor9665251539.
 */
Ext.define('FRIENDAPP.controller.ExpenListController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            expenseList:'userExpenListView1 #expenseList',
            mainFrame:'MainFrameview',
            addExpenForm:'AddExpenForm',
            dateField:'AddExpenForm #date',
            delButton:'AddExpenForm #expenseFormDelete',
            updateButton:'AddExpenForm #expenseFormUpdate',
            saveButton:'AddExpenForm #expenseFormSave',
            resetButton:'AddExpenForm #expenseFormReset',
            expenAddBut:'userExpenListView1 #expenAdd',
            mainFrameCal:'MainFrameCalender',
            calendar:'MainFrameview touchcalendar[title=Calendar]',
            totalAmtLabel:'userExpenListView1 #totalAmtLabel'
        },
        control: {
            expenseList:{
                itemtap:'itemDoubleTap',
                refresh:'calTotalAmt' 
            },
            expenAddBut:{
                tap:'itemTap'
            }
        }
    },
       
    itemTap:function(){
        if(!this.getAddExpenForm()){
            var addExpenForm=Ext.create("FRIENDAPP.view.AddExpenForm");
        }
        this.getAddExpenForm().reset();
        this.getDateField().setValue(new Date(this.getCalendar().getValue()));
        this.getDelButton().setHidden(true);
        this.getUpdateButton().setHidden(true);
        this.getSaveButton().setHidden(false);
        this.getResetButton().setHidden(false);
        this.getMainFrameCal().setActiveItem(this.getAddExpenForm());
    },
    
    itemDoubleTap:function(dataview,index,target,record,e,eOpts){
        if(!this.getAddExpenForm()){
            var addExpenForm=Ext.create("FRIENDAPP.view.AddExpenForm");
        }
        this.getAddExpenForm().reset();
        this.getAddExpenForm().setValues({
            'date':new Date(record.get('date')),
            'amount':record.get('amount'),
            'expen':record.get('expen')
        });
        this.getDelButton().setHidden(false);
        this.getUpdateButton().setHidden(false);
        this.getSaveButton().setHidden(true);
        this.getResetButton().setHidden(true);
        this.getMainFrameCal().setActiveItem(this.getAddExpenForm());
    },
  
    calTotalAmt:function(){
        var store=Ext.getStore('userExpenStore');
        var i,amounttot,date,flag;
        flag=false;
        i=0,amounttot=0;
        while(store.getCount()>i)
        {
            amounttot=amounttot + store.getAt(i).get('amount');
            
            i++;
        }
        date = FRIENDAPP.app.getController('Main').currentDate;
        store=Ext.getStore('DailyExpenseStore');
        flag=store.find('date',date);
        if(flag!=-1){
            var record=store.getAt(flag);
            record.set('amount',amounttot);
        }else{
            store.add({
                date:date,
                amount:amounttot
            });
        }
    
        store.sync();
        store.load();
        this.getTotalAmtLabel().setText('Total Amount  : '+ amounttot);
    }
});
