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
        debugger;
        var store=Ext.getStore('UserExpenseStore');
        var i,amounttot,date,flag, currentamt,yeartot;
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
        currentamt=0; 
        var record;
        if(flag!=-1){
            record=store.getAt(flag);
            currentamt=record.get('amount');
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
        
        /*
         * Code for calculating the total monthly and yearly expenditure
         * Will be use to display monthly and yearly graphs
         * TO DO optimize and test this code later
         * @author Neha
         */
        // Code to add data in year store

        var month= new Date(date).getMonth();
        var year= new Date(date).getFullYear();
        var yearstore=Ext.getStore('YearStore');
        flag=yearstore.find('year',year);
        if(flag!=-1){
            record=yearstore.getAt(flag);
            yeartot= record.get('amount')+(amounttot-currentamt);
            record.set('amount',yeartot);
        }else{
            yearstore.add({
                amount:amounttot,
                year:year
            });
        }
//        yearstore.sync();
//        yearstore.load();
        
        // Code to add data in month store
        var monthstore=Ext.getStore('MonthStore');
        monthstore.filter('year',year);
        flag=monthstore.find('month',month);
        if(flag!=-1){
            record=monthstore.getAt(flag);
            amounttot= record.get('amount')+(amounttot-currentamt);
            record.set('amount',amounttot);
        }else{
            monthstore.add({
                month:month,
                amount:amounttot,
                year:year
            });
        }
//        monthstore.sync();
//        monthstore.load();
        
        
    }
});
