/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.userExpenListView",{
    extend: 'Ext.form.Panel',
    xtype: 'userExpenListView1',
   
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
                itemTpl:'<div class="amountCls">Amount:&nbsp;{amount}</div><div class="expenseCls">{expen}</div>',
                itemId:'expenseList',
                onItemDisclosure:true
                         
            },
            {
                xtype:'toolbar',
                docked:'bottom',
                items:[
                    {
                        iconMask: true,
                        itemId:'totalAmtLabel',
                        ui: 'plain'   
                    },
                    {
                        xtype:'spacer'
                    },
                    {
                        iconMask: true,
                        cls:'addButton',
                        ui: 'plain',
                        iconCls: 'addIconCls',
                        itemId: 'expenAdd'
                    }]
            }]
    }
});






