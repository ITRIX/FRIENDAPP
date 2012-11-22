/* 
 * @author Prakash
 * company Itrix Inc.
 * User can logout from here 
 */
Ext.define('FRIENDAPP.controller.LogoutController', {
    extend: 'Ext.app.Controller',
    
    config: {
              refs: {
                  logoutButton: 'MainFrameview button[action=logout]',
                  mainPanel:'mainPanel',
                  mainFrame:'MainFrameview'
              },
              control: {
                  logoutButton: {
                  tap: "onLogoutTap"
                  }
              }      
    },
    
    /**
     * When logout  button is hit.
     */
    onLogoutTap: function() {
                var mainview = this.getMainFrame();
                mainview.setActiveItem(0);
                var main = this.getMainPanel();
                main.setActiveItem(0);
                clearPasswordField();
              }
});
   
function clearPasswordField(){
    var passwdField = Ext.getCmp('passwordid');
    if(passwdField){
        passwdField.reset();
        return; 
    }
}