/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.Licence", {
  extend: 'Ext.Panel',
  requires: ['Ext.field.Radio'],

  xtype: 'FrameLicence',
  config: {
    fullscreen: true,
    layout: {
      type:"vbox",
      align:'middle'
    },
     title: 'Email',
    activeItem: 0,
    items:[
    {
      xtype:'toolbar',
      docked:'bottom',
      items:[
      {
          xtype:'spacer'
      },
      {
        text:"Next",
        itemId:'btn_licence_next'
      },
      ]
    },
    {               
      xtype:'panel',
      html:'Software license terms and conditions(a) Single-User License Grant.This Section 2.2(a) \n\
applies only to a Customer whose License and Authorization Key document issued by StataCorp specifies \n\
the “License Type” as “Single User”. A Single-User License is for a named individual who is identified as the only Authorized User\n\
2.7 Restrictions.\n\ '
     
    },
    {
         xtype: 'panel',
         items:[
             {
                xtype: 'radiofield',
                name : 'color',
                label:'I Agree for terms and conditions'
             },
             {
                 xtype: 'radiofield',
                 name : 'color',
                 label:'I donot Agree for terms and conditions'
             }
         ]
    },
    
   
]
}
});