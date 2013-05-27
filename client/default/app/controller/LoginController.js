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
                  errorMsg: 'loginview #validateMessage'
            
              },
        
              control: {
                  loginButton: {
                  tap: "onLoginTap"
                  }      
                  }
    },
    
    /**
     * When login button is hit.
     */
    onLoginTap: function() {          
        //this.calculateStore();
        
        // Form Values
        var loginForm = this.getLoginFormPanel();
        var errorString = this.getErrorMsg();
        errorString.setHtml("");
        var values = loginForm.getValues();
        FRIENDAPP.services.LoginServices.loginAuthentication(values,
                function success(Response){
                    setIndicator(Response.message);                    
                    setTimeout(function(){
                    evaluateMap();
                    setHomeScreen();
                    }, 3000); 
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
  calculateStore:function(){
      var store=Ext.getStore('UserExpenseStore');
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
            monthstore.add({
                    amount:monthtot,
                    month:monthsArray[monthcnt],
                    year:yearsArray[yearcnt]
            });   
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
      html: '<img src="resources/images/loading.gif"/>',
      message: Response,
      indicator: false
    });
    
}
/**
 * Set login screen as home screen.
 */
function setHomeScreen(){
    var main = Ext.getCmp('MainPanel');
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