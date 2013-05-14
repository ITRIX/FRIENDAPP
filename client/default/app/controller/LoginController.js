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
          
          /*
           * Todo code to calculate monthly and yearly expenses and add them to respective stores
           */
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