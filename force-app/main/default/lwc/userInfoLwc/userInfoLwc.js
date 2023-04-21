import { LightningElement, api, track } from 'lwc';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import INTAKE_FORM_USER_NAME from '@salesforce/schema/Opportunity.IntakeFormUser_Name__c';
import INTAKE_FORM_USER_TITLE from '@salesforce/schema/Opportunity.IntakeFormUser_Title__c';
import INTAKE_FORM_USER_EMAIL from '@salesforce/schema/Opportunity.IntakeFormUser_Email__c';
export default class UserInfoLwc extends LightningElement {
    @api selectedval;
    intakeFormUserNameField = INTAKE_FORM_USER_NAME;
    intakeFormUserTitleField = INTAKE_FORM_USER_TITLE;
    intakeFormUserEmailField = INTAKE_FORM_USER_EMAIL;
    intakeFormUserNameValue = '';
    intakeFormUserTitleValue = '';
    intakeFormUserEmailValue = '';
    //Creating a flag for showing completion of step 1
    @api isPersonalInfoCompleted = false;
    get isValueString() {
        return this.selectedval === 'Personal Information';
      }

      handleInputChange(event) {
        if (event.target.fieldName == "IntakeFormUser_Name__c") {
          this.intakeFormUserNameValue = event.target.value;
        }
        if (event.target.fieldName == "IntakeFormUser_Title__c") {
          this.intakeFormUserTitleValue = event.target.value;
        }
        if (event.target.fieldName == "IntakeFormUser_Email__c") {
          this.intakeFormUserEmailValue = event.target.value;
        }
    }

    /*******
     Pass the data to next component i.e. 
     employerInformationLwc component,
     All the three fields are mandatory*/
    dispatchNewCustomEvent(showSpinner, helpText) {
        const fields = {};
        fields[INTAKE_FORM_USER_NAME.fieldApiName] = this.intakeFormUserNameValue;
        fields[INTAKE_FORM_USER_TITLE.fieldApiName] = this.intakeFormUserTitleValue;
        fields[INTAKE_FORM_USER_EMAIL.fieldApiName] = this.intakeFormUserEmailValue;
        const oppRecordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, fields };
        const ss = new CustomEvent("showspinnerandpasspersonalinfotoempsection", {
          detail: {
            showspinner: showSpinner,
            helpText: helpText,
            oppRecordInput: oppRecordInput
          }
        });
        // Dispatches the event.
        this.dispatchEvent(ss);
    }

    validateInputFields() {
        return [...this.template.querySelectorAll("lightning-input-field")].reduce((validSoFar, field) => {
            // Return whether all fields up to this point are valid and whether current field is valid
            // reportValidity returns validity and also displays/clear message on element based on validity
            return (validSoFar && field.reportValidity());
        }, true);
      }
    
      handleNext(event) {
        if (!this.validateInputFields()) {
            this.isPersonalInfoCompleted = false;
            this.template.querySelector('c-custom-toast').showToast('error', 'Complete all the fields in this section.');
          }
          else if(this.intakeFormUserNameValue == '')
            {
            this.isPersonalInfoCompleted = false;
            this.template.querySelector('c-custom-toast').showToast('error', 'User Name cannot be blank.');
            }
            else if(this.intakeFormUserTitleValue == '')
            {
            this.isPersonalInfoCompleted = false;
            this.template.querySelector('c-custom-toast').showToast('error', 'Title cannot be blank.');
            }
            else if(this.intakeFormUserEmailValue == ''){
            this.isPersonalInfoCompleted = false;
            this.template.querySelector('c-custom-toast').showToast('error', 'Email cannot be blank.');
            }
            else
            {
            this.isPersonalInfoCompleted = true;
            this.dispatchNewCustomEvent(false, 'Passing data to Emp....');
            }
            const personalinfocompleteevent = new CustomEvent('personalinfocompleteevent', {
                detail: this.isPersonalInfoCompleted
            });
            this.dispatchEvent(personalinfocompleteevent);
      }

}