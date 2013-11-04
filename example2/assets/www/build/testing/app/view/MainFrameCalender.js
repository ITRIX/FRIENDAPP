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
      title:'My Pocket Finder',
      name:'dateLabel',
      items:[  
      {
        xtype:'button',
        iconMask: true, 
        ui: 'back',
//        cls:'backButton',
//        iconCls: 'reply',
        action:'back',
        width:60,
//        height:30,
        text:'BACK',
        itemId:'backButton'
      },
      {
        xtype:'spacer'
      }
      ]
    },
    {
       xtype:'panel',
       height:5,
       cls:'ribbonCls',
       width:'100%',
       docked:'top'
    },
    {               
      xtype:'touchcalendar',
      title:'Calendar',
      iconCls:'Calendar'
    },
]
  }
});