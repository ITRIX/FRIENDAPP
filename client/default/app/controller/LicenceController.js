/* 
 * @author Prakash
 * company Itrix Inc.
 * User can logout from here 
 */
Ext.define('FRIENDAPP.controller.LicenceController', {
    extend: 'Ext.app.Controller',
    
    config: {
              refs: {
                  radioButtnobj: 'FrameLicence radiofield[name=allow]',
                  nextButton:'FrameLicence #btn_licence_next',
                  mainFrameLicenceView:'MainFrameLicenceView'
                 
              },
              control: {
                  
                  nextButton:{
                    tap:"onNextButtonTap"  
                  },
                  radioButtnobj: {
                    uncheck: "onRadioChecked"
                  }
              }      
    },
    
    /**
     * When User Agree or not hit.
     */
    onRadioChecked: function(obj,e,eopts) {
        if(obj.getValue()=='true'){
            this.getNextButton().setHidden(false);
            return;
        }else{
            this.getNextButton().setHidden(true);
            return;
        }
    },
    /**
     * When next button is hit.
     */
    onNextButtonTap: function() {
        this.getMainFrameLicenceView().setActiveItem(1);
    }
});   
