/* 
 * @author Prakash
 * company Itrix Inc.
 * MainFrame for the User they can access utiity from here.
 * 
 */
Ext.define("FRIENDAPP.view.MainFrame",{
    extend: 'Ext.Panel',
    requires: ['Ext.TitleBar',
    
    "FRIENDAPP.view.MainFrameCalender",
    "FRIENDAPP.view.MainFrameChart",
    "FRIENDAPP.view.MainFrameReport",
    "FRIENDAPP.view.Theme"
    ],
    xtype: 'MainFrameview',
    //id:'MainFrameview',
    config:{
        fullscreen: true,
        layout: 'card',
        activeItem : 0,
        items:[
        {
            xtype:'button',
            iconMask: true, 
            iconCls:'dashboardIconCls',
            //      text:'DASHBOARD',
            ui:'dashboard',
            action:'dashboard',
            width:'100%',
            itemId:'dashboardButton',
            docked:'bottom'
        },
        
        {               
            xtype:'MainFrameCalender',
            action:'calendar'
        },
        {
            xtype:'MainFrameChart',
            action:'graph'
        },
        {
            xtype:'MainFrameReport',
            action:'report'
        },
        {
            xtype:'MainFrameLicenceView',
            action:'settings'
        },
        {
           xtype:'themePanel',
           action:'theme'
        }
        ]
    }
});