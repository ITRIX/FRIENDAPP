/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.ExpenReport
 */

Ext.define("FRIENDAPP.view.ExpenReport",{
  extend: 'Ext.form.Panel',
  xtype: 'ExpenReport',
   
  scrollable: false,
  requires:[
  'FRIENDAPP.store.UserExpenseStore',
  'FRIENDAPP.model.userExpenModel',
  'Ext.dataview.List'
  ],
    
  config: {
    layout:'fit',
    iconCls: 'info',
    scrollable: false,
    cls:'listCls',
    items:[
    {
      xtype:'list',
      cls:'userExpenseList',
      itemCls:'userExpenseItem',
      store:'UserExpenseStore',
      itemTpl:'{expen}&nbsp;{amount}{date}',
      itemId:'expenseList',
      onItemDisclosure:true
    }]
  }
  });