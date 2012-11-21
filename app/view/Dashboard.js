

Ext.define('FRIENDAPP.view.Dashboard',{
  xtype:'dashboard',
  extend:'Ext.Sheet',
  requires:[],
  
  config:{
    layout:{
      type:'vbox',
      align:'middle'
    },
    enter:'top',
    exit:'top',
    width:'100%',
    height:'100%',
    title:'Dashboard',
    items:[
    
    {
      xtype: 'panel',
      width:'90%',
      height:'160px',
      layout:{
        type:'hbox',
        align:'bottom'
      },
      items:[
      {      
        xtype: 'button',
        height: '110px',
        width:'110px',
        cls:'toolbarButton calendarButton',
        iconCls:'calendarCls',
        action:'calendar'
      }, 
      {
        xtype:'spacer'
      },
      {
        xtype :'button',
        ui :'decline',
        height: '110px',
        width:'110px',
        id: "logoutButtonHit",
        text :'Logout',
        cls: 'logoutButton',
        action:'logout'
      }]
    },
    {
      xtype:'spacer'
    },
    {
      xtype: 'panel',
      width:'90%',
      height:'160px',
      layout:{
        type:'hbox',
        align:'top'
      },
      items:[
      {
        xtype: 'button',
        height: '110px',
        width:'110px',
        cls:'toolbarButton',
        iconCls:'graphCls',
        action:'graph'
      },
      {
        xtype:'spacer'
      },
      {
        xtype: 'button',
        height: '110px',
        width:'110px',
        cls:'toolbarButton',
        iconCls:'reportCls',
        action:'report'
      }]
    }]
  }
})