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
        name: 'monthWise',
        itemId:'monthWise',
        width:'100%',
        value: new Date(),
        dateFormat:'M',
        picker: {
          yearFrom: 2011,
          dateFormat:'d/m/Y',
          slotOrder: ['month']
        }
      },
      {   
        xtype: 'datepickerfield',
        name: 'yearWise',
        itemId:'yearWise',
        value: new Date(),
        dateFormat:'Y',
        picker: {
          yearFrom: 2011,
          dateFormat:'d/m/Y',
          slotOrder: ['year']
        }
      }
     ]
    }
    ]
  }

});