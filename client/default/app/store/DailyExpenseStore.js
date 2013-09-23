/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('FRIENDAPP.store.DailyExpenseStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.LocalStorage'],   
 config:{
     model:'FRIENDAPP.model.userExpenModel',
     autoload:true,
     storeId:'DailyExpenseStore',
     proxy: {
            type: 'localstorage',
            id  : 'Daily'
     }
 }   
})

