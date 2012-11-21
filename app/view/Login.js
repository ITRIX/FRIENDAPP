/* 
 * @author Prakash
 * company Itrix Inc.
 * Login for User
 * 
 */

Ext.define("FRIENDAPP.view.Login",{
  extend: 'Ext.form.Panel',
  xtype: 'loginview',
    
  requires: ['Ext.form.FieldSet','Ext.field.Text','Ext.field.Password'],
    
  config:{
    
    layout:{
      type:'vbox',
      align:'middle'
    },
    cls: 'loginview',
//    styleHtmlContent: true,
    scrollable:false,
    items:[{
      xtype: 'spacer'
    },                
    {
      xtype: "fieldset",
      name: "loginForm",
      title: '<div class="headerUser" align="center">Friend App Login</div>',
      width :'90%',
      
      items: [
      {
        xtype: "textfield",
        name: "username",
        id :'usernameid',
        placeHolder: "Username or Email Address",
        required: true
      },
      {
        xtype: "passwordfield",
        name: "password",
        id :'passwordid',
        placeHolder: "Password",
        required: true
      }]          
    },
    {
      xtype: "button",
      id: "loginButton",
      width : '30%',
      text: "LOGIN",
      ui: "login"
      
    },
    {
      xtype: "spacer",
      height:'10px'
    },
    {
      xtype:'panel',
      itemId:'validateMessage',
      height:'50px',
      width:'90%'
    },
    {
      xtype: "spacer"
    }]
  }
    
});