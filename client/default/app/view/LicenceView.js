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
      items:[  
      {
        xtype:'spacer'
      },    
      {
       text:'Pocket Finder App',
        iconMask: true, 
        ui: 'plain'   
      },
      {
        xtype:'spacer'
      }
      ]
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