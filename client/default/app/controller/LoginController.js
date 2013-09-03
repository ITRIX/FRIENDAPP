/* 
 * @author Prakash
 * company Itrix Inc.
 * User can successfully log in from here if pass word and 
 * username is correct..
 */
Ext.define('FRIENDAPP.controller.LoginController', {
    extend: 'Ext.app.Controller',
     requires:['FRIENDAPP.services.LoginServices'],
    config: {
        
              refs: {
                  loginFormPanel: 'loginview',
                  loginButton: 'loginview #loginButton',
                  rememberPassword: 'loginview #rememberPassword',
                  usernameField:'loginview textfield[name=username]',
                  passwordField:'loginview textfield[name=password]',
                  errorMsg: 'loginview #validateMessage'
            
              },
        
              control: {
                  loginButton: {
                  tap: "onLoginTap"
                  },
                  loginFormPanel:{
                      activate:"onSignedIn"
                  }
                  }
    },
    
    /**
     * When login button is hit.
     */
    onLoginTap: function() {         
        var loginForm = this.getLoginFormPanel();
        var errorString = this.getErrorMsg();
        errorString.setHtml("");
        var values = loginForm.getValues();
        FRIENDAPP.services.LoginServices.loginAuthentication(values,
                function success(Response){
                    setIndicator(Response.message);
                    FRIENDAPP.app.getController('LoginController').onSignedChange();
                    setTimeout(function(){
                    evaluateMap();
                    setHomeScreen();
                    }, 2000); 
                },
                function failure(Response){
                    errorString.setHtml('<font color="white" size="2"><center>'+Response.message+'</center></font>');
                    clearPasswordField()
                }   
      );  
          this.calculateStore();
          /*
           * Todo code to calculate monthly and yearly expenses and add them to respective stores
           */
  },
  
  onSignedIn:function(){
       var userInfoData=Ext.getStore('UserDataStore');
        userInfoData.load();
        if(userInfoData.getById(1).get('status')==='yes'){
            setIndicator('Loading...');
            this.getUsernameField().setValue(userInfoData.getById(1).get('username'));
            this.getPasswordField().setValue(userInfoData.getById(1).get('password'));
            setTimeout(function(){
            evaluateMap();
            setHomeScreen();
            }, 3000);
            this.calculateStore();
            this.getRememberPassword().setChecked(true);
        }else if(userInfoData.getById(1).get('status')==='no'){
             this.getRememberPassword().setChecked(false);
        }
  },
  
  onSignedChange:function(){
        if(this.getRememberPassword().getChecked()){
            var store=Ext.getStore('UserDataStore');
            var id=store.getById(1);
            id.set('status', 'yes');
            store.sync();
            store.load();
        }
  },
  
  calculateStore:function(){
    
      var store=Ext.getStore('DailyExpenseStore');
      store.clearFilter();
      store.load();
      var yearsArray = [];
      var monthsArray= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var yearResult;
      for (var i =0; i < store.getCount(); i++){ // loop through store records
        yearResult = store.getAt(i).data.date; //grab the value for the series field
        var year=new Date(yearResult).getFullYear();
        Ext.Array.include(yearsArray,year); // populate aWindows with unique values
      }
      /*
       *Year store calculation
       */
      var yearstore=Ext.getStore('YearStore');
      var monthstore=Ext.getStore('MonthStore');
      monthstore.removeAll(true);
      yearstore.removeAll(true);
      var i,yeartot,yearcnt,monthtot,monthcnt;
      yearcnt=0,monthcnt=0;
      for(yearcnt=0;yearcnt<yearsArray.length;yearcnt++){
        store.clearFilter();
        i=0,yeartot=0,monthtot=0;
        store.filter(function(item){
                var year=new Date(item.get('date')).getFullYear();
                if(year===yearsArray[yearcnt]){
                    return true;
                }
            });            
            
        while(store.getCount()>i){
            yeartot=yeartot + store.getAt(i).get('amount');
            i++;
        }
        yearstore.add({
                amount:yeartot,
                year:yearsArray[yearcnt]
        });
      /*
       *Month store calculation
       */
        for(monthcnt=0;monthcnt<monthsArray.length;monthcnt++){
            monthtot=0,i=0;
            store.clearFilter();
            store.filter(function(item){
                var year=new Date(item.get('date')).getFullYear();
                var month=monthsArray[new Date(item.get('date')).getMonth()];
                if(year===yearsArray[yearcnt] && month==monthsArray[monthcnt]){
                    return true;
                }
            });
         
            while(store.getCount()>i){
                monthtot=monthtot + store.getAt(i).get('amount');
                i++;
            }
            if(monthtot>0){
                 monthstore.add({
                    amount:monthtot,
                    month:monthsArray[monthcnt],
                    year:yearsArray[yearcnt]
            });   
          }
        }
      }
  }
});

function evaluateMap(){
    Ext.Viewport.setMasked(false);
}

function setIndicator(Response){
      Ext.Viewport.setMasked({
      xtype: 'loadmask',
      cls:'maskCls',
      message: Response,
      indicator: true
    });
    
}
/**
 * Set login screen as home screen.
 */
function setHomeScreen(){
    var main = Ext.getCmp('MainPanel');
    var calendarButton = FRIENDAPP.app.getController('DashboardController').getCalendarButton();
    calendarButton.addCls('activeCls');
    FRIENDAPP.app.getController('DashboardController').activeButton = calendarButton;
    main.setActiveItem(1);
    return;
 }
    
/**
 *  Clear the password field if wrong input
 */
function clearPasswordField(){
    var passwdField = Ext.getCmp('passwordid');
    if(passwdField){
        passwdField.reset();
    } 
}