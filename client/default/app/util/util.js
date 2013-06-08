/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("FRIENDAPP.util.util",{
singleton: true,

isBlank: function(field) {
        if (field == null || field == undefined)
            return true;
        
        if (typeof field !== "string")
            return false;

        if (field.trim().length === 0)
            return true;

        return false;
 }
 
});
