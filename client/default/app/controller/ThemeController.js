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
        var store=Ext.getStore('UserDataStore');
        store.load();
        var id=store.getById(1);
        var a=FRIENDAPP.util.util.themeSelector();
        switch(button.getText())
        {
            case 'Default':
                    a.href = './resources/css/app.css';
                    id.set('theme','./resources/css/app.css');
                    break;
                            
            case 'Pink':
                    a.href = './resources/css/themePink.css';
                    id.set('theme','./resources/css/themePink.css');
                    break;

            case 'Black':
                    a.href = './resources/css/default.css';
                    id.set('theme','resources/css/default.css');
                    break
        }
        store.sync();
        store.load();
    }
})
