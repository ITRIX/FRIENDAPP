/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.ExpenFormController', {
    extend: 'Ext.app.Controller',
    
     requires:['FRIENDAPP.util.util'],
    
    config: {
        refs:{
              expenseList:'userExpenListView1',
              expenList:'userExpenListView1 #expenseList',
              mainFrame:'MainFrameview',
              addExpenForm:'AddExpenForm',
              delButton:'AddExpenForm #expenseFormDelete',
              updateButton:'AddExpenForm #expenseFormUpdate',
              saveButton:'AddExpenForm #expenseFormSave',
              resetButton:'AddExpenForm #expenseFormReset',
              expenAddBut:'userExpenListView1 #expenAdd',
              dateField:'AddExpenForm #date',
              amountField:'AddExpenForm #amount',
              mainFrameCal:'MainFrameCalender',
              expenField:'AddExpenForm #expen',
              formValidateMsg:'AddExpenForm #formValidateMsg'
        },
        
        control:{
          resetButton:{
              tap:'itemReset'
          },
          saveButton:{
              tap:'itemSave'
          },
          updateButton:{
              tap:'itemUpdate'
          },
          delButton:{
              tap:'itemDelete'
          }
        }
    },
    
    itemReset:function(){
    var expenform=this.getAddExpenForm();
    expenform.reset();
    },
    
    itemSave:function(){          

    if(this.dataValidate()){
        var store=Ext.getStore('UserExpenseStore');
        store.add({amount: this.getAmountField().getValue(),
                   expen: this.getExpenField().getValue(),
                   date: Ext.util.Format.date(this.getDateField().getValue(),'d M Y ')
                 });
        store.sync();
        store.load();
        this.getMainFrameCal().setActiveItem(this.getExpenseList());
    }
    
    FRIENDAPP.app.getController('ExpenListController').calculateOtherStores();
    },
    
    itemUpdate:function(){
    var store=Ext.getStore('UserExpenseStore');
    var selectedRec=(this.getExpenList().getSelection());
    var id = store.getById(selectedRec[0].data.id);
    id.set('date', Ext.util.Format.date(this.getDateField().getValue(),'d M Y '));
    id.set('amount', this.getAmountField().getValue());
    id.set('expen', this.getExpenField().getValue());
    store.sync();
    store.load();
    this.getMainFrameCal().setActiveItem(this.getExpenseList());
    
    FRIENDAPP.app.getController('ExpenListController').calculateOtherStores();
    },
    
    itemDelete:function(){
    var store=Ext.getStore('UserExpenseStore');
    var selectedRec=(this.getExpenList().getSelection());
    store.remove(store.getById(selectedRec[0].data.id));
    store.sync();
    store.load();
    this.getMainFrameCal().setActiveItem(this.getExpenseList());
    },
    
    dataValidate:function(){
        if (!this.getAmountField().getValue() || FRIENDAPP.util.util.isBlank(this.getAmountField().getValue())) {
            this.getFormValidateMsg().setHtml('Please Enter Amount!...');
            return false;
        }
        
        if(this.getAmountField().getValue()<=0){
            this.getFormValidateMsg().setHtml('Please Enter Amount!...');
            return false;
        }
        
        if (!this.getExpenField().getValue() || FRIENDAPP.util.util.isBlank(this.getExpenField().getValue())) {
            this.getFormValidateMsg().setHtml('Please Enter Expen Text!...');
            return false;
        }
        return true;
    }
});


