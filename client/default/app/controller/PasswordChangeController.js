/* 
 * @author Prakash
 * company Itrix Inc.
 * User can logout from here 
 */
Ext.define('FRIENDAPP.controller.PasswordChangeController', {
    extend: 'Ext.app.Controller',
    
   config: {
        refs:{
              mainFrame:'MainFrameview',
              passwordChangeForm:'FormPasswordChange',
              saveButton:'FormPasswordChange #btn_pass_save',
              resetButton:'FormPasswordChange #btn_pass_reset',
              mainPanel:'MainPanel',              
              usernameField:'FormPasswordChange #text_username',
              passwordField:'FormPasswordChange #text_password',
              cpasswordField:'FormPasswordChange #text_cpassword',
              formValidateMsg:'FormPasswordChange #formValidateMsg'
        },
        
        control:{
          resetButton:{
              tap:'itemReset'
          },
          saveButton:{
              tap:'itemSave'
          }
        }
    },
    
    itemReset:function(){
    this.getPasswordChangeForm().reset();
    },
    
    itemSave:function(){
          
        if (!this.getUsernameField().getValue() || FRIENDAPP.util.util.isBlank(this.getUsernameField().getValue())) {
            this.getFormValidateMsg().setHtml('Please Enter Username!...');
            return;
        } 
        
        if (!this.getPasswordField().getValue() || FRIENDAPP.util.util.isBlank(this.getPasswordField().getValue())) {
            this.getFormValidateMsg().setHtml('Please Enter Password!...');
            return;
        }
        if (!this.getCpasswordField().getValue() || FRIENDAPP.util.util.isBlank(this.getCpasswordField().getValue())) {
            this.getFormValidateMsg().setHtml('Please Enter Confirm Password!...');
            return;
        }
        
        if(this.getPasswordField().getValue()!==this.getCpasswordField().getValue()){
            this.getFormValidateMsg().setHtml('Password Confirm Paasword not match!...');
            return;
        }
    
    var store=Ext.getStore('UserDataStore');
    store.add({username: this.getUsernameField().getValue(),
               password: this.getPasswordField().getValue()
             });
    store.sync();
    store.load();
    debugger;
    window.location.reload();
    
//    if (!this.getMainPanel()){
//        var mainPanel=Ext.create("FRIENDAPP.view.Main");
//        mainPanel.setActiveItem(0);
//    }else{
//        this.getMainPanel().setActiveItem(0);
//    }
//    
    }    
   
});


