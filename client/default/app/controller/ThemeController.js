/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.controller.ThemeController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs:{
            defaultThemeButton:'themePanel #defaultThemeButton',
            blackThemeButton:'themePanel #blackThemeButton',
            pinkThemeButton:'themePanel #pinkThemeButton'
        },
        
        control:{
            defaultThemeButton:{
                tap:'onThemeSelect'
            },
            blackThemeButton:{
                tap:'onThemeSelect'
            },
            pinkThemeButton:{
                tap:'onThemeSelect'
            }
        }
    },
    
    onThemeSelect:function(button,e,eOpts){
        var i, a, url, btn;
        for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
            if(a.getAttribute("rel").indexOf("style") != -1) {
                url = a.href;
                if(url.lastIndexOf('main.css') === -1  && url.lastIndexOf('Ext.ux.TouchCalendarView.css')===-1 ) {
                break;
                }
            } 
        }
        switch(button.getText())
        {
            case 'Default':
                    a.href = 'resources/css/app.css';
                    break;
                            
            case 'Pink':
                    a.href = 'resources/css/themePink.css';
                    break;

            case 'Black':
                    a.href = 'resources/css/default.css';
                    break
        }
    }
})
