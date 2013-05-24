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
  'FRIENDAPP.store.DailyExpenseStore'
  ],
  config:{
    title:'Graph',
    tabBarPosition: 'top',
    width:'100%',

    items:[
    {
      title:'Emerging Balance',
      xtype:'chart',
      action:'chart',
      itemId:'feeAreaChart',
      width:'100%',
      //      theme:'Energy',
      flex:1,
      animate:true,
      //      theme:'Category1',
      store:'DailyExpenseStore',
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
        fields: ['date'],
        title: 'Date',
        minimum: 0
      }, {
        type: 'Numeric',
        position: 'left',
        label: {
          renderer: function (v) {
            return v.toFixed(0);
          }
        },
        maximum:1200,
        minimum:0,
        fields: ['amount'],
        title: 'Amount'
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
        xField: 'date',
        yField: ['amount']

      }, 
      
      ]
    },
    {
      title:'Area Chart',
      xtype:'chart',
      itemId:'feeAreaChart',
      renderTo: Ext.getBody(),
      
        width: '100%',
        height: '90%',
        animate: true,
        store: 'DailyExpenseStore',
        axes: [{
        type: 'Category',
        position: 'bottom',
        fields: ['date'],
        label: {
//            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Date',
        grid: true,
        minimum: 0
    }, {
        type: 'Numeric',
        position: 'left',
        fields: ['amount'],
        title: 'Amount'
    }],
    series: [{
        type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        xField: 'date',
        yField: 'amount',
        markerConfig: {
            type: 'cross',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }, {
        type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        fill: true,
        xField: 'date',
        yField: 'amount',
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }]
      //      theme:'Category1',
//      store:{
//        fields:['id','balance','currency'],
//        data: [
//        {
//          id:'1',
//          balance:'10',
//          currency:'OMR'
//        },
//        {
//          id:'2',
//          balance:'3',
//          currency:'CNY'
//        },
//
//        {
//          id:'3',
//          balance:'2',
//          currency:'SAR'
//        },
//
//        {
//          id:'4',
//          balance:'2.09',
//          currency:'KZT'
//        },
//
//        {
//          id:'5',
//          balance:'1.63',
//          currency:'MYR'
//        },  
//        {
//          id:'6',
//          balance:'1.14',
//          currency:'SGD'
//        }, 
//        {
//          id:'7',
//          balance:'0.92',
//          currency:'TRL'
//        }, 
//        {
//          id:'8',
//          balance:'0.81',
//          currency:'TRL'
//        },
//        {
//          id:'9',
//          balance:'0.80',
//          currency:'ZAR'
//        },
//        {
//          id:'10',
//          balance:'0.68',
//          currency:'TTD'
//        },
//        ]
//      },
      
//      axes: [{
//        type: 'Category',
//        position: 'bottom',
//        fields: ['date'],
//        title: 'Date',
//        minimum: 0
//      }, {
//        type: 'Numeric',
//        position: 'left',
//        
//        maximum:1200,
//        minimum:0,
//        fields: ['amount'],
//        title: 'Amount in (MM)'
//      }],
// 
//      series: [{
//        type: 'line',
//        axis: 'left',
//        fill:true,
//        highlight: true,
//        xField: 'amount',
//        yField: ['date']
//
//      }, 
//      
//      ]
    },
    
    ]
  }
})