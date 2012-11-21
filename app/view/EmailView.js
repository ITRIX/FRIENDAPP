/* 
 * @author Prakash
 * company Itrix Inc.
 * Login for User
 * 
 */


Ext.define("FRIENDAPP.view.EmailView",{
    extend: 'Ext.form.FormPanel',
    xtype: 'EmailView',
    id: 'Emailviewid',
    
    requires: ['Ext.form.FieldSet','Ext.field.Text'],
    
    config:{
        title: 'Email',
        iconCls: 'info',
        scrollable: true,
        cls: "home",
        styleHtmlContent: true,
        height: '100%',
        width: '100%',
        layout: "vbox",
        items:[  
                {
                    xtype:"spacer"  
                },              
                {
                    xtype: "fieldset",
                    name: "EmailForm",
                    width :'100%',
                    height :'100%',
                    style :{
                            marginLeft:'2%'
                           },
                    title: "",
                    items: [
                            {
                              xtype:"spacer"  
                            },
                            {    xtype: "textfield",
                                name: "Name",
                                id :'nameId',
                                placeHolder: "Name",
                                useclearicon:true,
                                required: true
                            },
                            {
                                xtype: "textfield",
                                name: "emailName",
                                useclearicon:true,
                                id :'emailId',
                                placeHolder: "Email ID",
                                required: true
                            },
                            {
                                xtype: "textareafield",
                                name:"messageData",
                                id:"messageId",
                                height:'80%',
                                useclearicon:true,
                                placeholder:"Mail Content"
                           
                            }
                            ]
                        
                            },
                            {
                                xtype:"panel",
                                layout:"hbox",
                                items:[
                                    {
                                      xtype: "button",
                                      id: "Submit",
                                      width : '40%',
                                      text: "SEND",
                                      ui: "confirm",
                                      style :{
                                              marginLeft:'2%'
                                             }
                                    },
                                    {
                                      xtype:"spacer"  
                                    },
                                    {
                                       xtype:'button',
                                       id:"cancelButton",
                                       width:'40%',
                                       text:"Cancel",
                                       ui:"decline"
                                    },
                                ]
                           },
                           {
                               xtype:"spacer"
                           },
                       ]
           }
    
});