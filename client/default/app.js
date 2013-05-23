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
        "ExpenReportController",
        "LicenceController",
        "PasswordChangeController"
    ],
    stores: ["UserExpenseStore",'DailyExpenseStore','UserDataStore','MonthStore','YearStore'],
     models: ["userExpenModel","UserDataModel",'GraphModel','YearModel'],
    name: 'FRIENDAPP',

    /*
     * external libraries
     **/
    requires: [
        'Ext.MessageBox',
        'Ext.ux.TouchCalendar',
        'Ext.ux.TouchCalendarView'
    ],

    views: ['Main','Login','MainFrame','LicenceView','Licence','PasswordChange'],

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
        var userInfoData=Ext.getStore('UserDataStore');
        userInfoData.load();
        if(null!=userInfoData.getById(1)){
            Ext.Viewport.add(Ext.create('FRIENDAPP.view.Main'));
        }
        else{
            Ext.Viewport.add(Ext.create('FRIENDAPP.view.LicenceView'));
       }
        
        Ext.Viewport.add(Ext.create('FRIENDAPP.view.LicenceView'));
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
