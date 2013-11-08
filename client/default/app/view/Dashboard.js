

Ext.define('FRIENDAPP.view.Dashboard',{
    xtype:'dashboard',
    extend:'Ext.ActionSheet',
    requires:[],
  
    config:{
        layout:{
            type:'vbox',
            align:'middle'
        },
        cls:'dashboardPanelCls',
         enter:'bottom',
         exit:'bottom',
         hideOnMaskTap :true,
        width:'100%',
        height:162,
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
            {
                xtype :'button',
                height: '100%',
                flex:1,
                id: "logoutButtonHit",
                cls:'toolbarButton',
                iconCls:'logoutCls',
                action:'logout'
            },
            ]
        },
        ]
    }
})