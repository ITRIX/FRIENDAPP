/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.GraphController',{
    extend:'Ext.app.Controller',
    config: {
        refs:{
            graphDate:'graphChart datepickerfield[name=date]'
        },
        
        control: {
            graphDate:{
                change:'onGraphFilter'
            }
        },
        
      onGraphFilter:function(datepicker, newDate, oldDate, eOpts){
          alert();
          Ext.getStore('MonthStore').clearFilter()
          Ext.getStore('MonthStore').filter('year',newDate.getFullYear());
      }
    }
})