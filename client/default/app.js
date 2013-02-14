//<debug>
//Ext.Loader.setPath({
    //'Ext': 'sdk/src'
//});
//</debug>

Ext.application({
    controllers: ["Main",
        "LoginController",
        "LogoutController",
        "ExpenListController",
        "ExpenFormController",
        "DashboardController",
        "ExpenReportController"
    ],
    stores: ["userExpenStore"],
     models: ["userExpenModel"],
    name: 'FRIENDAPP',

    /*
     * external libraries
     **/
    requires: [
        'Ext.MessageBox',
        'Ext.ux.TouchCalendar',
        'Ext.ux.TouchCalendarView'
    ],

    views: ['Main','Login','MainFrame'],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },
    
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('FRIENDAPP.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});
