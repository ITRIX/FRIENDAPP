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
      scrollable:{
                outOfBoundRestrictFactor:0
            },
      cls:'userExpenseList',
      itemCls:'userExpenseItem',
      grouped: true,
      store:'UserExpenseStore',
      itemTpl:'<div><span class="expenRptClassText">{expen}</span><br><span>Amount : </span><span class="expenRptClassAmount">{amount} Rs.</span></div>',
      itemId:'expenseListReport',
      onItemDisclosure:true
    }]
  }
  });