/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.ExpenFormController', {
    extend: 'Ext.app.Controller',
    
     requires:[ 
    'FRIENDAPP.util.util',
    ],
    
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
              expenField:'AddExpenForm #expen'
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
          
        if (!this.getAmountField().getValue() || FRIENDAPP.util.util.isBlank(this.getAmountField().getValue())) {
            return;
            alert("eroor");
        } 
        
        if (!this.getExpenField().getValue() || FRIENDAPP.util.util.isBlank(this.getExpenField().getValue())) {
            return;
            alert("eroor");
        } 
    
    var store=Ext.getStore('UserExpenseStore');
    store.add({amount: this.getAmountField().getValue(),
               expen: this.getExpenField().getValue(),
               date: Ext.util.Format.date(this.getDateField().getValue(),'d M Y ')
             });
    store.sync();
    store.load();
    this.getMainFrameCal().setActiveItem(this.getExpenseList());
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
    },
    
    itemDelete:function(){
    var store=Ext.getStore('UserExpenseStore');
    var selectedRec=(this.getExpenList().getSelection());
    store.remove(store.getById(selectedRec[0].data.id));
    store.sync();
    store.load();
    this.getMainFrameCal().setActiveItem(this.getExpenseList());
    }
});


