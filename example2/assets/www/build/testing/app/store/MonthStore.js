/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.store.MonthStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.Memory'],   
    config:{
    model:'FRIENDAPP.model.GraphModel',
    autoload:true
//    storeId:'MonthStore',
//    proxy:{
//            type: 'memory',
//            id  : 'MonthData'
//         }
    }   
})