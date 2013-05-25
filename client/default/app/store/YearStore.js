/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.store.YearStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.Memory'],   
    config:{
    model:'FRIENDAPP.model.YearModel',
    autoload:true
//    storeId:'YearStore',
//    proxy:{
//            type: 'memory',
//            id  : 'YearData'
//         }
    }   
})