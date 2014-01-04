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
            updateButton:'FormPasswordChange #btn_pass_update',
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
            },
            updateButton:{
                tap:'itemUpdate'
            }
          
        }
    },
    
    itemReset:function(){
        this.getPasswordChangeForm().reset();
        this.getFormValidateMsg().setHtml('');
    },
    
    itemSave:function(){
        if(this.dataValidate()){
            var store=Ext.getStore('UserDataStore');
            store.add({
                username: this.getUsernameField().getValue(),
                password: this.getPasswordField().getValue(),
                status: 'no',
                theme:'./resources/css/app.css'
            });
            store.sync();
            store.load();
            Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
            Ext.Viewport.add(Ext.create('FRIENDAPP.view.Main'));
        }
    },
    
    itemUpdate:function(){
        if(this.dataValidate()){
            var store=Ext.getStore('UserDataStore');             
            if(this.getUsernameField().getValue()!==store.getById(1).get('username')){
                this.getFormValidateMsg().setHtml('Username with existing username not match!...');
                return;
            }else{
                var id=store.getById(1);
                    id.set('username',this.getUsernameField().getValue());
                    id.set('password', this.getPasswordField().getValue());
                store.sync();
                store.load();
                this.getFormValidateMsg().setHtml('Password change successfully!...');
                this.itemReset();
            }
        }
    },
    
    dataValidate:function(){
        if (!this.getUsernameField().getValue() || FRIENDAPP.util.util.isBlank(this.getUsernameField().getValue())) {
            this.getFormValidateMsg().setHtml('Please enter username !...');
            return false;
        } 
        
        if (!this.getPasswordField().getValue() || FRIENDAPP.util.util.isBlank(this.getPasswordField().getValue())) {
            this.getFormValidateMsg().setHtml('Please enter password !...');
            return false;
        }
        if (!this.getCpasswordField().getValue() || FRIENDAPP.util.util.isBlank(this.getCpasswordField().getValue())) {
            this.getFormValidateMsg().setHtml('Please enter confirm password !...');
            return;
        }
        
        if(this.getPasswordField().getValue()!==this.getCpasswordField().getValue()){
            this.getFormValidateMsg().setHtml('Password confirm password not match !...');
            return false;
        }
        return true;
    }
});


