/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.model.UserDataModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            {name: 'username',type :'string'},
            {name: 'password',type :'string'},
            {name:'status',type:'string'},
            {name:'theme',type:'string'},
        ]
    }
});
