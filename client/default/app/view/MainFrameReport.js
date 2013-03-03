/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define("FRIENDAPP.view.MainFrameReport", {

  extend: 'Ext.Panel',
  requires:["FRIENDAPP.view.ExpenReport",
  'Ext.field.Select',
  'Ext.field.DatePicker'],
  xtype: 'MainFrameReport',
  //id : 'MainPanel',
  config: {
    fullscreen: true,
    layout: 'card',
    activeItem: 0,
    items:[
    {
     xtype:'toolbar',
     docked: 'top'
    },
    {
      xtype:'ExpenReport'
    },
    {
      xtype:'panel',
      cls:'formPanelCls',
      width:'100%',
      docked:'bottom',
      layout:'vbox',
     items:[
       {   
        xtype: 'datepickerfield',
        name: 'dayWise',
        hidden:false,
        itemId:'dayWise',
        width:'100%',
        value: new Date(),
        dateFormat:'d-M-Y',
        picker: {
          yearFrom: 2011,
          dateFormat:'d/m/Y',
          slotOrder: ['day','month','year']
        }
      },
       {   
        xtype: 'datepickerfield',
        name: 'monthWise',
        itemId:'monthWise',
        hidden:true,
        width:'100%',
        value: new Date(),
        dateFormat:'M-Y',
        picker: {
          yearFrom: 2011,
          dateFormat:'d/m/Y',
          slotOrder: ['month','year']
        }
      },
      {   
        xtype: 'datepickerfield',
        name: 'yearWise',
        itemId:'yearWise',
        hidden:true,
        value: new Date(),
        dateFormat:'Y',
        picker: {
          yearFrom: 2011,
          dateFormat:'d/m/Y',
          slotOrder: ['year']
        }
      },
      {
        xtype:'selectfield',
        name:'select_type',
        itemId:'select_type',
        options: [
            {text: 'Day Wise',  value: 'day'},
            {text: 'Month Wise', value: 'month'},
            {text: 'Year Wise',  value: 'year'}
        ]}          
     ]
    }
    ]
  }

});