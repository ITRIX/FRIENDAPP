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
     docked: 'top',
     items:[
     {
        xtype: 'selectfield',
        itemId:'searchWise',
        options: [
                 {text: 'Month',  value: 'monthRpt'},
                 {text: 'Year', value: 'yearRpt'}
                 ]
     },
     {
       xtype:'spacer'
     },
     {   
        xtype: 'datepickerfield',
        name: 'monthWise',
        itemId:'monthWise',
        value: new Date(),
        dateFormat:'F',
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
        hidden:true,
        value: new Date(),
        dateFormat:'Y',
        picker: {
          yearFrom: 2011,
          dateFormat:'d/m/Y',
          slotOrder: ['year']
        }
      },]
    },
    {
      xtype:'ExpenReport'
    }]
  }
});