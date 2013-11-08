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
        items:[
        {
           xtype:'panel',
           height:5,
           cls:'ribbonCls',
           width:'100%',
           docked:'top'
        },
        {
            xtype: 'spacer'
        },   
        {
            xtype: 'image',
            mode: 'element',
            width: '322px',
            height :'133px',
            src: "resources/images/logo.png"
        },
        {
            xtype: 'spacer',
            height:'30px'
        },                
        {
            xtype: "fieldset",
            name: "loginForm",
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
            },
            {
                xtype: 'checkboxfield',
                label: 'Stay Signed In?',
                labelWidth: '75%',
                itemId: 'rememberPassword'
            }
        ]
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
        },
        {
           xtype:'panel',
           width:'100%',
           html:'<a href="http://www.itrixit.com" target="_blank">Designed & Developed By ITRIX </a>',
           cls :'companynamecls'
        },
        {
           xtype:'panel',
           height:5,
           cls:'ribbonCls',
           width:'100%',
           docked:'bottom'
        },
       ]
    }
    
});