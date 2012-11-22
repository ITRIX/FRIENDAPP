/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.MainFrameCalender", {
  extend: 'Ext.Panel',
  requires:["FRIENDAPP.view.userExpenListView",
    "FRIENDAPP.view.AddExpenForm",
    
  ],
  xtype: 'MainFrameCalender',
  //id : 'MainPanel',
  config: {
    fullscreen: true,
    layout: 'card',
     title: 'Email',
    activeItem: 0,
    items:[
    {
      xtype: 'toolbar',
      cls: 'mainToolbar',
      docked: 'top',
      itemId:'dateLabel',
      name:'dateLabel',
      items:[  
      {
        xtype:'button',
        iconMask: true, 
        ui: 'back',
        iconCls: 'reply',
        action:'back',
        itemId:'backButton'
      },
      {
        xtype:'spacer'
      }
      ]
    },
    {               
      xtype:'touchcalendar',
      title:'Calendar',
      iconCls:'Calendar'
    },
]
  }
});