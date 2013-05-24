/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.store.GraphStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.Memory'],   
    config:{
    model:'FRIENDAPP.model.GraphModel',
    autoload:true,
    storeId:'GraphStore',
    proxy:{
            type: 'memory',
            id  : 'GraphData'
         }
    }   
})