/*
 * The Graph TabPanel represents the Dashboard. Contains the graphs.
 * Contained by the section Panel.
 * @author Neha
 */
Ext.define("FRIENDAPP.view.GraphChart", {
    extend:'Ext.tab.Panel',
    xtype:'graphChart',
    requires: ['Ext.chart.Panel',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Line',
    'Ext.chart.series.Area',
    'Ext.draw.engine.ImageExporter',
    'FRIENDAPP.store.DailyExpenseStore',
    'FRIENDAPP.store.MonthStore'
    ],
    config:{
        title:'Graph',
        tabBarPosition: 'top',
        width:'100%',
        activeItem:1,
        items:[
        {
            xtype:'panel',
            width:'100%',
            height:'20%',
            docked:'bottom',
            layout:{
                type:'vbox',
                align:'middle',
//                pack:'center'
            },
            items:[
            {
                xtype:'fieldset',
                width:'80%',
                items:[
                {   
                    xtype: 'datepickerfield',
                    name: 'date',
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
        //                height:''
                
        },
        
        //        {
        //            title:'Emerging Balance',
        //            xtype:'chart',
        //            hidden:true,
        //            action:'chart',
        //            itemId:'monthChart',
        //            width:'100%',
        //            //      theme:'Energy',
        //            flex:1,
        //            animate:true,
        //            //      theme:'Category1',
        //            store:'MonthStore',
        //            gradients: [
        //            {
        //                'id': 'v-0',
        //                'angle': 0,
        //                stops: {
        //                    0: {
        //                        color: 'rgb(148, 148, 225)'
        //                    },
        //                    100: {
        //                        color: 'rgb(148, 148, 225)'
        //                    }
        //                }
        //            },
        //            {
        //                'id': 'v-1',
        //                'angle': 0,
        //                stops: {
        //                    0: {
        //                        color: 'rgb(171, 241, 219)'
        //                    },
        //                    100: {
        //                        color: 'rgb(171, 241, 219)'
        //                    }
        //                }
        //            },
        //
        //            ],
        //            axes: [{
        //                type: 'Category',
        //                position: 'left',
        //                fields: ['month'],
        //                title: 'Date',
        //                minimum: 0
        //            }, {
        //                type: 'Numeric',
        //                position: 'bottom',
        //                label: {
        //                    renderer: function (v) {
        //                        return v.toFixed(0);
        //                    }
        //                },
        //                maximum:1200,
        //                minimum:0,
        //                fields: ['amount'],
        //                title: 'Amount'
        //            }],
        // 
        //            series: [{
        //                type: 'bar',
        //                axis: 'bottom',
        //                highlight: true,
        //                renderer: function (sprite, storeItem, barAttr, i, store) {
        //                    if(i%2==0){
        //                        barAttr.fill = "url(#v-0)";
        //                    }else{
        //                        barAttr.fill = "url(#v-1)";
        //                    }
        //         
        //                    return barAttr;
        //                },  
        //                xField: 'date',
        //                yField: ['amount']
        //
        //            }, 
        //      
        //            ]
        //        },
        //        {
        //            title:'Area Chart',
        //            xtype:'chart',
        //            name:'dailyChart',
        //            renderTo: Ext.getBody(),
        //      
        //            width: '100%',
        //            height: '90%',
        //            animate: true,
        //            store: 'DailyExpenseStore',
        //            axes: [{
        //                type: 'Category',
        //                position: 'bottom',
        //                fields: ['date'],
        //                label: {
        //                //            renderer: Ext.util.Format.numberRenderer('0,0')
        //                },
        //                title: 'Date',
        //                grid: true,
        //                minimum: 0
        //            }, {
        //                type: 'Numeric',
        //                position: 'left',
        //                fields: ['amount'],
        //                title: 'Amount'
        //            }],
        //            series: [
        //            {
        //                type: 'line',
        //                highlight: {
        //                    size: 7,
        //                    radius: 7
        //                },
        //                axis: 'left',
        //                smooth: true,
        //                fill: true,
        //                xField: 'date',
        //                yField: 'amount',
        //                markerConfig: {
        //                    type: 'circle',
        //                    size: 4,
        //                    radius: 4,
        //                    'stroke-width': 0
        //                }
        //            }]
        //        },
        {
            title:'Emerging Balance',
            cls:'graphPanelCls',
            xtype:'chart',
            action:'chart',
            name:'monthChart',
            width:'100%',
            //      theme:'Energy',
            flex:1,
            animate:true,
            //      theme:'Category1',
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

            }, 
      
            ]
        },{
            xtype:'panel',
            height:5,
            cls:'ribbonCls',
            width:'100%',
            docked:'top'
        },
        //        {
        //            title:'Emerging Balance',
        //            xtype:'chart',
        //            action:'chart',
        //            name:'yearChart',
        //            width:'100%',
        //            //      theme:'Energy',
        //            flex:1,
        //            animate:true,
        //            //      theme:'Category1',
        //            store:'YearStore',
        //            gradients: [
        //            {
        //                'id': 'v-0',
        //                'angle': 0,
        //                stops: {
        //                    0: {
        //                        color: 'rgb(148, 148, 225)'
        //                    },
        //                    100: {
        //                        color: 'rgb(148, 148, 225)'
        //                    }
        //                }
        //            },
        //            {
        //                'id': 'v-1',
        //                'angle': 0,
        //                stops: {
        //                    0: {
        //                        color: 'rgb(171, 241, 219)'
        //                    },
        //                    100: {
        //                        color: 'rgb(171, 241, 219)'
        //                    }
        //                }
        //            },
        //
        //            ],
        //            axes: [{
        //                type: 'Category',
        //                position: 'bottom',
        //                fields: ['year'],
        //                title: 'Date',
        //                minimum: 0
        //            }, {
        //                type: 'Numeric',
        //                position: 'left',
        //                label: {
        //                    renderer: function (v) {
        //                        return v.toFixed(0);
        //                    }
        //                },
        //                maximum:1200,
        //                minimum:0,
        //                fields: ['amount'],
        //                title: 'Amount'
        //            }],
        // 
        //            series: [{
        //                type: 'column',
        //                axis: 'left',
        //                highlight: true,
        //                renderer: function (sprite, storeItem, barAttr, i, store) {
        //                    if(i%2==0){
        //                        barAttr.fill = "url(#v-0)";
        //                    }else{
        //                        barAttr.fill = "url(#v-1)";
        //                    }
        //         
        //                    return barAttr;
        //                },  
        //                xField: 'date',
        //                yField: ['amount']
        //
        //            }, 
        //      
        //            ]
        //        },
    
        ]
    }
})