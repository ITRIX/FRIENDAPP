

Ext.define('FRIENDAPP.view.Dashboard',{
    xtype:'dashboard',
    extend:'Ext.Sheet',
    requires:[],
  
    config:{
        layout:{
            type:'vbox',
            align:'middle'
        },
        cls:'dashboardPanelCls',
        centered:false,
        //stretchY:true,
//        fullscreen:false,
//        enter:'bottom',
//        exit:'bottom',
//        bottom:0,
        modal:false,
        width:'100%',
        height:135,
//        zIndex:90,
        expand:false,
        title:'Dashboard',
        items:[
            
        {
            xtype:'panel',
            width:'100%',
            height:'50%',
            layout:{
                type:'hbox'
            },
            items:[
            
            {      
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'calendarCls',
                action:'calendar'
            }, 
            {
                xtype :'button',
                height: '100%',
                flex:1,
                id: "logoutButtonHit",
                cls:'toolbarButton',
                iconCls:'logoutCls',
                action:'logout'
            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'graphCls',
                action:'graph'
            },
            ]
        },
        {
            xtype:'panel',
            width:'100%',
            height:'50%',
            layout:{
                type:'hbox'
            },
            items:[
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'reportCls',
                action:'report'
            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'settingsCls',
                action:'settings'
            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                cls:'toolbarButton',
                iconCls:'themeCls',
                action:'theme'
            },
            ]
        },
        ]
    }
})