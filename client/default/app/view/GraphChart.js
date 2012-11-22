/*
 * The Graph TabPanel represents the Dashboard. Contains the graphs.
 * Contained by the section Panel.
 * 
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
  ],
  config:{
    title:'Graph',
    tabBarPosition: 'top',
    width:'100%',

    items:[
    {
      title:'Emerging Balance',
      xtype:'chart',
      itemId:'feeAreaChart',
      width:'100%',
      //      theme:'Energy',
      flex:1,
      animate:true,
      //      theme:'Category1',
      store:{
        fields:['id','balance','currency'],
        data: [
        {
          id:'1',
          balance:'10',
          currency:'OMR'
        },
        {
          id:'2',
          balance:'3',
          currency:'CNY'
        },

        {
          id:'3',
          balance:'2',
          currency:'SAR'
        },

        {
          id:'4',
          balance:'2.09',
          currency:'KZT'
        },

        {
          id:'5',
          balance:'1.63',
          currency:'MYR'
        },  
        {
          id:'6',
          balance:'1.14',
          currency:'SGD'
        }, 
        {
          id:'7',
          balance:'0.92',
          currency:'TRL'
        }, 
        {
          id:'8',
          balance:'0.81',
          currency:'TRL'
        },
        {
          id:'9',
          balance:'0.80',
          currency:'ZAR'
        },
        {
          id:'10',
          balance:'0.68',
          currency:'TTD'
        },
        ]
      },
      gradients: [
      {
        'id': 'v-0',
        'angle': 0,
        stops: {
          0: {
            color: 'rgb(148, 148, 225)'
          },
          100: {
            color: 'rgb(148, 148, 225)'
          }
        }
      },
      {
        'id': 'v-1',
        'angle': 0,
        stops: {
          0: {
            color: 'rgb(171, 241, 219)'
          },
          100: {
            color: 'rgb(171, 241, 219)'
          }
        }
      },

      ],
      axes: [{
        type: 'Category',
        position: 'bottom',
        fields: ['currency'],
        title: 'Currency',
        minimum: 0
      }, {
        type: 'Numeric',
        position: 'left',
        label: {
          renderer: function (v) {
            return v.toFixed(0);
          }
        },
        maximum:12,
        minimum:0,
        fields: ['balance'],
        title: 'Balance in (MM)'
      }],
 
      series: [{
        type: 'column',
        axis: 'left',
        highlight: true,
        renderer: function (sprite, storeItem, barAttr, i, store) {
          if(i%2==0){
            barAttr.fill = "url(#v-0)";
          }else{
            barAttr.fill = "url(#v-1)";
          }
         
          return barAttr;
        },  
        xField: 'currency',
        yField: ['balance']

      }, 
      
      ]
    },
    {
      title:'Area Chart',
      xtype:'chart',
      itemId:'feeAreaChart',
      width:'100%',
      //      theme:'Energy',
      flex:1,
      animate:true,
      //      theme:'Category1',
      store:{
        fields:['id','balance','currency'],
        data: [
        {
          id:'1',
          balance:'10',
          currency:'OMR'
        },
        {
          id:'2',
          balance:'3',
          currency:'CNY'
        },

        {
          id:'3',
          balance:'2',
          currency:'SAR'
        },

        {
          id:'4',
          balance:'2.09',
          currency:'KZT'
        },

        {
          id:'5',
          balance:'1.63',
          currency:'MYR'
        },  
        {
          id:'6',
          balance:'1.14',
          currency:'SGD'
        }, 
        {
          id:'7',
          balance:'0.92',
          currency:'TRL'
        }, 
        {
          id:'8',
          balance:'0.81',
          currency:'TRL'
        },
        {
          id:'9',
          balance:'0.80',
          currency:'ZAR'
        },
        {
          id:'10',
          balance:'0.68',
          currency:'TTD'
        },
        ]
      },
      
      axes: [{
        type: 'Category',
        position: 'bottom',
        fields: ['currency'],
        title: 'Currency',
        minimum: 0
      }, {
        type: 'Numeric',
        position: 'left',
        
        maximum:12,
        minimum:0,
        fields: ['balance'],
        title: 'Balance in (MM)'
      }],
 
      series: [{
        type: 'line',
        axis: 'left',
        fill:true,
        highlight: true,
        xField: 'currency',
        yField: ['balance']

      }, 
      
      ]
    },
    
    ]
  }
})