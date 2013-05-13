/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('FRIENDAPP.services.LoginServices', {
  singleton: true,
  
  
  loginAuthentication:function(parms,successCb,failureCb){
        var userName = parms.username;
        var password = parms.password;
        var userInfoData=Ext.getStore('UserDataStore');
        userInfoData.load();
       
        if(userName===userInfoData.getById(1).get('username') && password===userInfoData.getById(1).get('password'))
            {
                var response={
                "code":"200",
                "message":"Right Credentials.."
                }
                return successCb(response);
            }
         else
            {
                var response={
                "code":"400",
                "message":"Wrong Credentials.Please input correct Credentials and try again!........"
                }
                return failureCb(response)
            } 
        }
    })
