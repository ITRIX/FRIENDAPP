/*
 * The Graph TabPanel represents the Dashboard. Contains the graphs.
 * Contained by the section Panel.
 * @author Neha
 */
Ext.define("FRIENDAPP.view.GraphChart", {
    extend:'Ext.Panel',
    xtype:'graphChart',
    requires: ['Ext.chart.Panel',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Bar',
    'Ext.draw.engine.ImageExporter',
    'FRIENDAPP.store.DailyExpenseStore',
    'FRIENDAPP.store.MonthStore',
    'Ext.chart.interactions.ItemHighlight',
    'Ext.chart.interactions.Manager',
    'Ext.chart.interactions.ItemInfo',
    'Ext.chart.interactions.ItemCompare'
    
    ],
    config:{
        width:'100%',
        layout:'card',
        activeItem:1,
        items:[
        {
            xtype:'toolbar',
            title:'Balance Graph',
            width:'100%',
            docked:'top'
        },
        {
            xtype:'panel',
            width:'100%',
            height:'20%',
            docked:'bottom',
            layout:{
                type:'vbox',
                align:'middle'
            },
            items:[
            {
                xtype:'fieldset',
                width:'80%',
                items:[
                {   
                    xtype: 'datepickerfield',
                    name: 'graphdate',
                    label:'Select Year',
                    labelWidth:'60%',
                    itemId:'date',
            
                    width:'100%',
                    value: new Date(),
                    dateFormat:'Y',
                    picker: {
                        yearFrom: 2011,
                        dateFormat:'Y',
                        yearTo:2015,
                        slotOrder: ['year']
                    }
                }
                ]
            }
            
            ]
        },
        {
            title:'Emerging Balance',
            cls:'graphPanelCls',
            xtype:'chart',
            action:'chart',
            name:'monthChart',
            width:'100%',
            flex:1,
            animate:true,
            store:'MonthStore',
            
            gradients: [
            {
                'id': 'v-0',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(227, 148, 39)'
                    },
                    100: {
                        color: 'rgb(227, 148, 39)'
                    }
                }
            },
            {
                'id': 'v-1',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(243, 72, 109)'
                    },
                    100: {
                        color: 'rgb(243, 72, 109)'
                    }
                }
            },

            ],
            axes: [{
                type: 'Category',
                position: 'left',
                fields: ['month'],
                title: 'Date',
                minimum: 0
            }, {
                type: 'Numeric',
                position: 'bottom',
                label: {
                    renderer: function (v) {
                        return v.toFixed(0);
                    }
                },
                minimum:0,
                fields: ['amount'],
                title: 'Amount'
            }],
 
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                renderer: function (sprite, storeItem, barAttr, i, store) {
                    if(i%2==0){
                        barAttr.fill = "url(#v-0)";
                    }else{
                        barAttr.fill = "url(#v-1)";
                    }
         
                    return barAttr;
                },  
                xField: 'date',
                yField: ['amount']

            }],
            
            interactions: [{
                type: 'iteminfo',
                gesture: 'tap',
                listeners: {
                    show: function(interaction, item, panel) {
                        panel.setTop(0);
                        panel.setCentered(true);
                        panel.setZIndex(90);
                        panel.setWidth('70%');
                        panel.setHeight('40%');
                        var record = item.storeItem;
                        panel.update(
                            '<ul>' +
                            '<li><b>Month:</b> ' + record.data.month + '</li>' +
                            '<li><b>Year: </b>' + record.data.year + '</li>' +
                            '<li><b>Amount: </b>' + record.data.amount + '</li>' +
                            '</ul>'
                            );
            
                    }
                }
            }]

        },{
            xtype:'panel',
            height:5,
            cls:'ribbonCls',
            width:'100%',
            docked:'top'
        },
        ]
    }
})