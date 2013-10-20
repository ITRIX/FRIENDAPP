/* 
 * @author Neha
 * company Itrix Inc.
 * Theme View Page
 * 
 */

Ext.define("FRIENDAPP.view.Theme", {
    extend: 'Ext.Panel',
    requires:[''],
    xtype: 'themePanel',
    config: {
        fullscreen: true,
        itemId:'themePanel',
        layout:{
            type:'vbox',
            align:'middle',
            pack:'center'
        },      
        items:[
            {
                xtype:'toolbar',
                title:'Theme',
                width:'100%',
                docked:'top'
            },
            {
                xtype:'spacer'
            },
            {
               xtype:'button',
               text:'Default',
               itemId:'defaultThemeButton',
               width:'80%',
               height:50
            },
            {
                xtype:'spacer'
            },
            {
               xtype:'button',
               text:'Black',
               itemId:'blackThemeButton',
               width:'80%',
               height:50
            },
            {
                xtype:'spacer'
            },
            {
               xtype:'button',
               text:'Pink',
               itemId:'pinkThemeButton',
               width:'80%',
               height:50
            },
            {
                xtype:'spacer'
            },
        ]
    }
});