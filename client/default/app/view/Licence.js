/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.view.Licence", {
    extend: 'Ext.Panel',
    requires: ['Ext.field.Radio'],

    xtype: 'FrameLicence',
    config: {
        scrollable:true,  
        fullscreen: true,
        cls:'graphPanelCls',
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
                itemId:'btn_licence_next',
                hidden:true
            },
            ]
        },
        {               
            xtype:'panel',
            html:'<body style=\'text-align: justify;\'><div> \n\
    <strong>Software license terms and conditions</strong> \n\
</div>\n\
<div>\n\
    <br/>\n\
</div>\n\
<div>\n\
    (a) Single-User License Grant.\n\
</div>\n\
<div>\n\
    This Section 2.2(a) applies only to a Customer whose License and Authorization Key document issued by\n\
</div>\n\
<div>\n\
    ITRIX specifies the “License Type” as “Single User”. A Single-User License is for a named individual\n\
</div>\n\
<div>\n\
    who is identified as the only Authorized User.\n\
</div>\n\
<div>\n\
    <br/>\n\
</div>\n\
<div>\n\
    <strong>2.7 Restrictions.</strong>\n\
</div>\n\
<div>\n\
    Customer shall not, nor permit any person (including any Authorized User) to:\n\
</div>\n\
<div>\n\
    (i) reverse engineer, reverse\n\
</div>\n\
<div>\n\
    compile, decry pt, disassemble, or otherwise attempt to derive the source code of the Licensed Software\n\
</div>\n\
<div>\n\
    (except to the extent that this restriction is expressly prohibited by law);\n\
</div>\n\
<div>\n\
    (ii) modify, translate, or create derivative works of the Licensed Software; (iii) sublicense, resell, rent, lease, distribute, market, commercialize, or\n\
    otherwise transfer rights or usage to the Licensed Software (except as expressly permitted under this Agreement);\n\
</div>\n\
<div>\n\
    <br/>\n\
</div>\n\
<div>\n\
    <strong>3.1 Technical Support.</strong>\n\
</div>\n\
<div>\n\
    ITRIX agrees to provide Customer with technical support services which include periodic distribution of bug fixes and minor enhancements as Updates\n\
    scheduled by ITRIX. All registered users of the then-current release\n\
</div>\n\
<div>\n\
    of App and the previous release of App are eligible for free limited technical support.\n\
</div>\n\
<div>\n\
    <br/>\n\
</div>\n\
<div>\n\
    <strong>CONFIDENTIALITY.</strong>\n\
</div>\n\
<div>\n\
    Customer and ITRIX agree to maintain the confidentiality of any confidential or proprietary information of\n\
</div>\n\
<div>\n\
    one party (the “disclosing party”) received by the other party (the “receiving party”) during, or prior to\n\
</div>\n\
<div>\n\
    entering into, this Agreement that the receiving party should know is considered confidential or proprietary\n\
</div>\n\
<div>\n\
    by the disclosing party based on the circumstances surrounding the disclosure, including, without limitation,\n\
</div>\n\
<div>\n\
    non-public technical and business information (“Confidential Information”).\n\
</div><body>\n\ '
     
        },
        {
            xtype: 'panel',
            width:'100%',
            layout:{
                type:'vbox',
                align:'middle'
            },
            docked:'bottom',
            items:[
            {
                xtype:'fieldset',
                width:'80%',
                items:[
                {
                    xtype: 'radiofield',
                    name : 'allow',
                    value:'true',
                    label:'I Accept'
                },
                {
                    xtype: 'radiofield',
                    name : 'allow',
                    value:'false',
                    label:'I Decline'
                }
                ]
            }
             
            ]
        },
        ]
    }
});