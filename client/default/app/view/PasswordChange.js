/* 
 * @author Prakash
 * company Itrix Inc.
 * Login for User
 * 
 */

Ext.define("FRIENDAPP.view.PasswordChange",{
  extend: 'Ext.form.FormPanel',
  xtype: 'FormPasswordChange',
  requires: ['Ext.form.FieldSet','Ext.field.Text','Ext.field.Password'],
    
  config:{
    iconMask: true,
    ui: 'confirm-round',
    iconCls: 'compose',
    title:'Add Expen',
    styleHtmlContent: true,
    scrollable:false,
    cls: 'loginview',
    height: '100%',
    width: '100%',
    layout: {
      type:"vbox",
      align:'middle'
    },
    items:[ 
    {
      xtype:'toolbar',
      docked:'bottom',
      items:[
      {
        text:"Save",
        itemId:'btn_pass_save'
       
      },
      {
        text:"Update",
        itemId:'btn_pass_update',
        hidden:true
      },
      {
          xtype:'spacer'
      },
      {
        text:"Reset",
        itemId:'btn_pass_reset'
      }
      ]
    },
    {
      xtype:'spacer'
    },
                             
    {
      xtype: "fieldset",
      width :'100%',
      cls: 'expenfieldcls',
      height :'100%',
                    
      items: [
      {   
        xtype: 'textfield',
        name: 'text_username',
        itemId:'text_username',
        label: 'User Name'
        
      },
      {
        xtype: 'passwordfield',
        name: 'text_password',
        itemId:'text_password',
        label: 'Password'
      },
      {
        xtype: "passwordfield",
        name:'text_cpassword',
        itemId:"text_cpassword",
        label: 'Confirm Password'
      },
      ]
    },
    {
      xtype:'panel',
      itemId:'formValidateMsg',
      height:'50px',
      cls:'validatemsg',
      width:'90%'
    },
    {
      xtype:'spacer'
    },
    ]
  }
});
