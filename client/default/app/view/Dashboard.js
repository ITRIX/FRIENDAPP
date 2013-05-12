

Ext.define('FRIENDAPP.view.Dashboard',{
    xtype:'dashboard',
    extend:'Ext.Sheet',
    requires:[],
  
    config:{
        layout:{
            type:'hbox'
        },
        enter:'bottom',
        exit:'bottom',
        width:'100%',
        height:'100%',
        zIndex:90,
        title:'Dashboard',
        items:[
            {
            xtype:'panel',
            width:'50%',
//            height:'100%',
            docked:'left',
            layout:{
                type:'vbox',
                align:'right',
                pack:'center'
            },
            items:[
            {      
                xtype: 'button',
                height: '100%',
                width:'70%',
                cls:'toolbarButton',
                iconCls:'calendarCls',
                action:'calendar'
            }, 
            {
                xtype :'button',
                height: '100%',
                width:'70%',
                id: "logoutButtonHit",
                cls:'toolbarButton',
                iconCls:'logoutCls',
                action:'logout'
            },
            {
                xtype: 'button',
                height: '100%',
                width:'70%',
                cls:'toolbarButton',
                iconCls:'graphCls',
                action:'graph'
            },
            ]
        },
        {
            xtype:'panel',
            width:'50%',
//            height:'100%',
            docked:'right',
            layout:{
                type:'vbox',
                align:'left',
                pack:'center'
            },
            items:[
            {
                xtype: 'button',
//                height: '100%',
                width:'70%',
                cls:'toolbarButton',
                iconCls:'reportCls',
                action:'report'
            },
            {
                xtype: 'button',
//                height: '100%',
                width:'70%',
                cls:'toolbarButton',
                iconCls:'settingsCls',
                action:'settings'
            },
            {
                xtype: 'button',
//                height: '100%',
                width:'70%',
                cls:'toolbarButton',
                iconCls:'aboutusCls',
                action:'aboutus'
            }
            ]
        }
    
//        {      
//            xtype: 'button',
//            height: '100%',
//            width:'50%',
//            cls:'toolbarButton',
//            iconCls:'calendarCls',
//            action:'calendar'
//        }, 
//        {
//            xtype :'button',
//            height: '100%',
//            width:'50%',
//            id: "logoutButtonHit",
//            cls:'toolbarButton',
//            iconCls:'logoutCls',
//            action:'logout'
//        },
//        {
//            xtype: 'button',
//            height: '100%',
//            width:'50%',
//            cls:'toolbarButton',
//            iconCls:'graphCls',
//            action:'graph'
//        },
//        {
//            xtype: 'button',
//            height: '100%',
//            width:'50%',
//            cls:'toolbarButton',
//            iconCls:'reportCls',
//            action:'report'
//        }
        ]
    }
})