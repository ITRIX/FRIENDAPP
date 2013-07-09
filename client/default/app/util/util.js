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
 },
 
 themeSelector:function(){
     var i, a, url, btn;
        for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
            if(a.getAttribute("rel").indexOf("style") != -1) {
                url = a.href;
                if(url.lastIndexOf('main.css') === -1  && url.lastIndexOf('Ext.ux.TouchCalendarView.css')===-1 ) {
                return a;
                }
            } 
        }
 }
 
});
