/* 
 * @author Prakash
 * company Itrix Inc.
 * Main Switch View Page
 * 
 */

Ext.define("FRIENDAPP.view.Main", {
  extend: 'Ext.Panel',
  xtype: 'mainPanel',
  id : 'MainPanel',
  config: {
        
    fullscreen: true,
    layout: 'card',
    activeItem: 0,
        
    items:[
    {
      xtype: 'loginview'
    },
    {
      xtype: 'MainFrameview'  
    }
    ]
  }
        
    
});