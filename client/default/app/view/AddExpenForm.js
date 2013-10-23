/* 
 * @author Prakash
 * company Itrix Inc.
 * Login for User
 */

Ext.define("FRIENDAPP.view.AddExpenForm",{
  extend: 'Ext.form.FormPanel',
  xtype: 'AddExpenForm',
  requires: ['Ext.form.FieldSet','Ext.field.Text','Ext.field.DatePicker','Ext.field.Number'],
    
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
        // text:"Save",
        cls:'saveButton',
        iconCls:'saveIconCls',
        ui:'plain',
        iconMask: true,
        itemId:'expenseFormSave',
        hidden:true
      },
      {
        // text:"Update",
        cls:'editButton',
        ui:'plain',
        iconCls:'editIconCls',
        iconMask: true,
        itemId:'expenseFormUpdate',
        hidden:true                  
      },
      {
        xtype:'spacer'
      },
      {
        text:"Reset",
        iconMask: true,
        itemId:'expenseFormReset',
        hidden:true
      },
      {
        // text:"Delete",
        iconMask: true,
        ui:'plain',
        cls:'cancelButton',
        iconCls:'cancelIconCls',
        itemId:'expenseFormDelete',
        hidden:true
      },
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
       xtype: 'datepickerfield',
        name: 'date',
        itemId:'date',
        label: 'Date',
        hidden:true,
        value: new Date(),
        dateFormat:'d/m/Y',
        picker: {
         yearFrom: 2011,
          dateFormat:'d/m/Y'
          //slotOrder: ['day', 'month', 'year']
        }
      },
      {
        xtype: 'numberfield',
        name: 'amount',
        itemId:'amount',
        label: 'Amount'
      },
      {
        xtype: "textareafield",
        name:'expen',
        itemId:"expen",
        label: 'Expen Text',
        height:'80%',
        useclearicon:true,
        placeholder:"Mail Content"
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
