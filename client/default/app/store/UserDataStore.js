/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.store.UserDataStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.LocalStorage'],   
    config:{
    model:'FRIENDAPP.model.UserDataModel',
    autoload:true,
    storeId:'UserDataStore',
    proxy:{
            type: 'localstorage',
            id  : 'UserData'
         }
    }   
})