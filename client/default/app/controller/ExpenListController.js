/* 
 * itrixit.com
 * Controller to calulate total expen for that day and display on toolbar
 * @author Neha @Modify By Prakash
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
            totalAmtLabel:'userExpenListView1 #totalAmtLabel',
            formValidateMsg:'AddExpenForm #formValidateMsg'
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
        this.getFormValidateMsg().setHtml('');
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
        this.getFormValidateMsg().setHtml('');
        this.getMainFrameCal().setActiveItem(this.getAddExpenForm());
    },
  
    calTotalAmt:function(){
        var store=Ext.getStore('UserExpenseStore');
        var i,amounttot;
        i=0,amounttot=0;
        while(store.getCount()>i)
        {
            amounttot=amounttot + store.getAt(i).get('amount');
            i++;
        }
        this.getTotalAmtLabel().setText('Total Amount  : '+ amounttot);
        return amounttot;
    },
    
    calculateOtherStores:function(){     
        var date,flag, currentamt,yeartot, store, amounttot,record;
        flag=false;
        date = FRIENDAPP.app.getController('Main').currentDate;
        
        store=Ext.getStore('DailyExpenseStore');
        store.clearFilter();
        store.load();
        flag=store.find('date',date);
        currentamt=0; 
        amounttot = this.calTotalAmt();
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
        
        
        /*
         * Code for calculating the total monthly and yearly expenditure
         * Will be use to display monthly and yearly graphs
         * TO DO optimize and test this code later
         * @author Neha @Modify By Prakash
         */
        // Code to add data in year store
        var monthsArray= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = new Date(date).getMonth();
        var year = new Date(date).getFullYear();
        var yearstore=Ext.getStore('YearStore');
        yearstore.clearFilter();
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
        
        // Code to add data in month store
        var monthstore=Ext.getStore('MonthStore');
        monthstore.clearFilter();
        monthstore.filter('year',year);
        flag=monthstore.find('month',monthsArray[month]);
        if(flag!=-1){
            record=monthstore.getAt(flag);
            amounttot= record.get('amount')+(amounttot-currentamt);
            record.set('amount',amounttot);
        }else{
            monthstore.add({
                month:monthsArray[month],
                amount:amounttot,
                year:year
            });
        }
        debugger;
        monthstore.clearFilter();
    }
});
