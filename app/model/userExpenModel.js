/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.model.userExpenModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'date'},
            { name: 'amount', type: 'int' },
            { name: 'expen', type: 'string'},
            
//            {name: 'username',type :'string'}
        ]
    }
});
