/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.MainFrameChart", {
  extend: 'Ext.Panel',
  requires:["FRIENDAPP.view.GraphChart"],
  xtype: 'MainFrameChart',
  //id : 'MainPanel',
  config: {
        
    fullscreen: true,
    layout: 'card',
    activeItem: 0,
        
    items:[
    {
      xtype:'graphChart'
    }
    ]
  }
        
    
});