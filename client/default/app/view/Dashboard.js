

Ext.define('FRIENDAPP.view.Dashboard',{
  xtype:'dashboard',
  extend:'Ext.Sheet',
  requires:[],
  
  config:{
    layout:{
      type:'vbox',
      align:'middle',
      pack:'center'
    },
    enter:'bottom',
    exit:'bottom',
    width:'100%',
    height:'100%',
    zIndex:90,
    title:'Dashboard',
    items:[
    
//    {
//      xtype: 'panel',
//      width:'100%',
//      height:'50%',
//      layout:{
//        type:'hbox',
//        align:'middle',
//        pack:'bottom'
//      },
//      items:[
      {      
        xtype: 'button',
        height: '100%',
        width:'50%',
        cls:'toolbarButton',
        iconCls:'calendarCls',
        action:'calendar'
      }, 
//      {
//        xtype:'spacer',
//        width:'10%'
//      },
      {
        xtype :'button',
//        ui :'decline',
        height: '100%',
        width:'50%',
        id: "logoutButtonHit",
//        text :'Logout',
//        cls: 'logoutButton',
        cls:'toolbarButton',
        iconCls:'logoutCls',
        action:'logout'
//      }]
    },
//    {
//      xtype:'spacer',
//      height:'10%'
//    },
//    {
//      xtype: 'panel',
//      width:'100%',
//      height:'49%',
//      layout:{
//        type:'hbox',
//        align:'middle',
//        pack:'top'
//      },
//      items:[
      {
        xtype: 'button',
       height: '100%',
        width:'50%',
        cls:'toolbarButton',
        iconCls:'graphCls',
        action:'graph'
      },
//      {
//        xtype:'spacer',
//        width:'10%'
//      },
      {
        xtype: 'button',
        height: '100%',
        width:'50%',
        cls:'toolbarButton',
        iconCls:'reportCls',
        action:'report'
//      }]
    }]
  }
})