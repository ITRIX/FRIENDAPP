/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('FRIENDAPP.store.userExpenStore', {
    extend:'Ext.data.JsonStore',
   
    requires: [ 'Ext.data.proxy.LocalStorage'],   
 config:{
     model:'FRIENDAPP.model.userExpenModel',
     autoload:true,
     storeId:'userExpenStore',
     //groupField:"date",
     proxy: {
            type: 'localstorage',
            id  : 'Expen'
     }
 }   
})

