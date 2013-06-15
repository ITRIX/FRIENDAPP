/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.LicenceView", {
  extend: 'Ext.Panel',
    xtype: 'MainFrameLicenceView',
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
      title:'Pocket Finder App',
      items:[  
      {
        xtype:'spacer'
      },    
//      {
//       text:'Pocket Finder App',
//        iconMask: true, 
//        ui: 'plain'   
//      },
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
      xtype:'FrameLicence'
    },
    {               
      xtype:'FormPasswordChange'
    }
]
  }
});