/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('FRIENDAPP.store.UserExpenseStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.LocalStorage'],   
 config:{
     model:'FRIENDAPP.model.userExpenModel',
     autoload:true,
     storeId:'UserExpenseStore',
     sorters:{
         property:'amount',
         direction: 'ASC'
     },
     grouper: {
       groupFn: function(record) {
           return record.get('date');
       }
     },
     proxy: {
            type: 'localstorage',
            id  : 'Expen'
     }
 }   
})

