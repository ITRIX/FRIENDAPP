/* 
 * @author Prakash
 * company Itrix Inc.
 * Main Switch View Page
 * 
 */

Ext.define("FRIENDAPP.view.Main", {
    extend: 'Ext.Panel',
    requires:['FRIENDAPP.view.Dashboard'],
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
        },
        {
            xtype:'dashboard',
            docked:'bottom',
            hidden:true
        },
        ]
    }
        
    
});