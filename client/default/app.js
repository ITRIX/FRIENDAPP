Ext.application({

    controllers: ["Main",
        "LoginController",
        "ExpenListController",
        "ExpenFormController",
        "DashboardController",
        "ExpenReportController",
        "LicenceController",
        "PasswordChangeController",
        "GraphController","ThemeController"
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
//        'Ext.mixin.Mixin',
//        'Ext.module.FileSystem',
//        'Ext.module.Application',
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
       // Initialize the main view
        var userInfoData=Ext.getStore('UserDataStore');
        userInfoData.load();
        if(null!=userInfoData.getById(1)){
            //var id=userInfoData.getById(1);
            //var a=FRIENDAPP.util.util.themeSelector();
            //a.href=id.get('theme');
            Ext.Viewport.add(Ext.create('FRIENDAPP.view.Main'));
        }
        else{
            Ext.Viewport.add(Ext.create('FRIENDAPP.view.LicenceView'));
       }     
       
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
