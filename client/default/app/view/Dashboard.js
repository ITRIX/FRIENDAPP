

Ext.define('FRIENDAPP.view.Dashboard',{
    xtype:'dashboard',
    extend:'Ext.Panel',
    requires:[],
  
    config:{
        layout:{
            type:'vbox',
            align:'middle'
//            pack:''
        },
        cls:'dashboardPanelCls',
        //        enter:'bottom',
        //        exit:'bottom',
        width:'100%',
        height:135,
        zIndex:90,
        title:'Dashboard',
        items:[
        {
            xtype:'panel',
            width:'100%',
            height:'50%',
            //            docked:'bottom',
            layout:{
                type:'hbox'
            //                align:'right',
            //                pack:'center'
            },
            items:[
            
            {      
                xtype: 'button',
                height: '100%',
                flex:1,
                //                width:'70%',
                cls:'toolbarButton',
                iconCls:'calendarCls',
                action:'calendar'
            }, 
            //            {
            //                xtype:'spacer',
            //                height:'10px'
            //            },
            {
                xtype :'button',
                height: '100%',
                flex:1,
                //                width:'70%',
                id: "logoutButtonHit",
                cls:'toolbarButton',
                iconCls:'logoutCls',
                action:'logout'
            },
            //            {
            //                xtype:'spacer',
            //                height:'10px'
            //            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                //                width:'70%',
                cls:'toolbarButton',
                iconCls:'graphCls',
                action:'graph'
            },
            //            {
            //                xtype:'spacer',
            //                height:'10px'
            //            },
            ]
        },
        {
            xtype:'panel',
            width:'100%',
            height:'50%',
            //            docked:'right',
            layout:{
                type:'hbox'
            //                align:'left',
            //                pack:'center'
            },
            items:[
            //            {
            //                xtype:'spacer',
            //                height:'10px'
            //            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                //                width:'70%',
                cls:'toolbarButton',
                iconCls:'reportCls',
                action:'report'
            },
            //            {
            //                xtype:'spacer',
            //                height:'10px'
            //            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                //                width:'70%',
                cls:'toolbarButton',
                iconCls:'settingsCls',
                action:'settings'
            },
            //            {
            //                xtype:'spacer',
            //                height:'10px'
            //            },
            {
                xtype: 'button',
                height: '100%',
                flex:1,
                //                width:'70%',
                cls:'toolbarButton',
                iconCls:'aboutusCls',
                action:'aboutus'
            },
            //            {
            //                xtype:'spacer',
            //                height:'10px'
            //            },
            ]
        },
        
    
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