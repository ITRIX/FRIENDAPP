/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.model.YearModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'amount', type: 'int'},
            { name: 'year', type: 'string'},
            
//            {name: 'username',type :'string'}
        ]
    }
});
