import { LightningElement, api, track } from 'lwc';
import { createRecord, updateRecord } from 'lightning/uiRecordApi';
import updateEmployerAccountWithContact from '@salesforce/apex/IntakeFormWebsiteSearchController.updateEmployerAccountWithContact';
import updateContactAccount from '@salesforce/apex/IntakeFormWebsiteSearchController.updateContactAccount';
import createOpp from '@salesforce/apex/IntakeFormWebsiteSearchController.createOpp';
import createObj from '@salesforce/apex/IntakeFormWebsiteSearchController.createObj';
import updateAccount from '@salesforce/apex/IntakeFormWebsiteSearchController.updateAccount';
import updateContact from '@salesforce/apex/IntakeFormWebsiteSearchController.updateContact';
import saveContactRecord from '@salesforce/apex/IntakeFormWebsiteSearchController.saveContactRecord';
import createFiles from '@salesforce/apex/IntakeFormWebsiteSearchController.createFiles';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_ID from '@salesforce/schema/Account.Id';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import ID_FIELD from '@salesforce/schema/Contact.Id';
import CONTACT_ACCOUNT from '@salesforce/schema/Contact.AccountId';

import EFFECTIVE_DATE from '@salesforce/schema/Opportunity.Effective_Date__c';
import DUE_DATE_TO_BROKER from '@salesforce/schema/Opportunity.Date_Due_to_Broker_Initial_Request__c';
import CURRENT_AGENT_OF_RECORD from '@salesforce/schema/Opportunity.Current_Agent_of_Record__c';
import MINIMUM_DEDUCTIBLE_ISL from '@salesforce/schema/Opportunity.Deductible_ISL__c';
import SL_COVERAGE_INCLUDED from '@salesforce/schema/Opportunity.Stop_Loss_Coverages_Included__c';
import REQUEST_FUNDING_TYPE from '@salesforce/schema/Opportunity.Funding_Type__c';
import REQUESTED_COMMISION from '@salesforce/schema/Opportunity.Requested_Commissions_PEPM__c';
import REQUESTED_COMMISION_PERCENT from '@salesforce/schema/Opportunity.Requested_Commissions_of_Net_Premium__c';
import MATCH_CURRENT_MEDICAL_PLAN from '@salesforce/schema/Opportunity.Match_Current_Medical_Plan_Design__c';
import BENEFITS_COVERED_ISL from '@salesforce/schema/Opportunity.Benefits_Covered_ISL__c';
import CONTRACT_BASIS_ISL from '@salesforce/schema/Opportunity.Contract_Basis_ISL__c';
import DEDUCTIBLE_ACCUMULATION_ISL from '@salesforce/schema/Opportunity.Deductible_Accumulation_ISL__c';
import MAXIMUM_COVERAGE_LIMIT_ISL from '@salesforce/schema/Opportunity.Maximum_Coverage_Limit_ISL__c';
import ADVANCE_REIMBURSEMENT_PROVISION_ISL from '@salesforce/schema/Opportunity.Advance_Reimbursement_Provision_ISL__c';
import RETIREES_COVERED_ISL from '@salesforce/schema/Opportunity.Retirees_Covered_ISL__c';
import BENEFITS_COVERED_ASL from '@salesforce/schema/Opportunity.Benefits_Covered_ASL__c';
import CONTRACT_BASIS_ASL from '@salesforce/schema/Opportunity.Contract_Basis_ASL__c';
import MAXIMUM_ANNUAL_REIMBURSEMENT from '@salesforce/schema/Opportunity.Maximum_Annual_Reimbursement_ASL__c';
import AGGREGATE_ACCOMMODATION_ASL from '@salesforce/schema/Opportunity.Aggregate_Accommodation_ASL__c';
import RETIREES_COVERED_ASL from '@salesforce/schema/Opportunity.Retirees_Covered_ASL__c';
import CURRENT_HEALTH_PLAN_FUNDING from '@salesforce/schema/Opportunity.Current_Health_Plan_Funding_Arrangement__c';
import OPPORTUNITY_RECORD_TYPE from '@salesforce/schema/Opportunity.RecordTypeId';
import ELIGIBLE_EMPLOYEES from '@salesforce/schema/Opportunity.Number_of_Eligible_Employees__c';
import ENROLLED_EMPLOYEES from '@salesforce/schema/Opportunity.Enrolled_Employees__c';
import ESTIMATED_ANNUAL_PREMIUM from '@salesforce/schema/Opportunity.Estimated_Annual_Premium__c';
import OPP_ACCOUNT_NAME from '@salesforce/schema/Opportunity.AccountId';
import OPPORTUNITY_SOURCE from '@salesforce/schema/Opportunity.OpportunitySource__c';

//import NEW_TPA from '@salesforce/schema/Opportunity.Current_Agent_of_Record__c';
import CURRENT_MEDICAL_PROVIDER_NETWORK from '@salesforce/schema/Opportunity.Current_Medical_Provider_Network__c';
import CURRENT_TPA from '@salesforce/schema/Opportunity.Current_Third_Party_Administrator__c';
import CURRENT_PHARMACY_BENEFIT_MANAGER from '@salesforce/schema/Opportunity.Current_Pharmacy_Benefit_Manager__c';
import CURRENT_SPECIALITY_RX_VENDOR from '@salesforce/schema/Opportunity.Current_Specialty_Rx_Vendor__c';
import SEPARATE_AGGREGATE_DEDUCTIBLE_ISL from '@salesforce/schema/Opportunity.Separate_Aggregating_Deductible_ISL__c';
import BROKER_PRIMARY_CONTACT from '@salesforce/schema/Opportunity.Broker_Primary_Contact_V2__c';
import BROKER_SECONDARY_CONTACT	from '@salesforce/schema/Opportunity.Broker_Secondary_Contact__c';
import BROKER_TERTIARY_CONTACT from '@salesforce/schema/Opportunity.Broker_Tertiary_Contact__c';
import BROKER_PRODUCER from '@salesforce/schema/Opportunity.BrokerProducer__c';
import BROKER_FIRM from '@salesforce/schema/Opportunity.Broker_Firm__c';
import RECEIVED_DATE_INITIAL_REQUEST from '@salesforce/schema/Opportunity.Received_Date_Initial_Request__c';
import NEW_TPA from '@salesforce/schema/Opportunity.CurrentThirdPartyAdministrator_Text__c';
import NEW_PBM from '@salesforce/schema/Opportunity.CurrentPharmacyBenefitManager_Text__c';
import NEW_SPECIALITY from '@salesforce/schema/Opportunity.CurrentSpecialtyRxVendor_Text__c';

import REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_1 from '@salesforce/schema/Opportunity.Requested_SBR_Advantage_Program_Stack_1__c';
import REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_2 from '@salesforce/schema/Opportunity.Requested_SBR_Advantage_Program_Stack_2__c';
import REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_3 from '@salesforce/schema/Opportunity.Requested_SBR_Advantage_Program_Stack_3__c';


//Hidden Fields Mapping
import OPPORTUNITY_TYPE	from '@salesforce/schema/Opportunity.Opportunity_Type__c';
import OPPORTUNITY_NAME	from '@salesforce/schema/Opportunity.Name';
import STAGE from '@salesforce/schema/Opportunity.StageName';
import CLOSE_DATE from '@salesforce/schema/Opportunity.CloseDate';
import SBR_PRODUCER_FIRM from '@salesforce/schema/Opportunity.SBRProducerFirm__c';
import SBR_PRODUCER	from '@salesforce/schema/Opportunity.SBR_Producer__c';
import SBR_CONSULTANT from '@salesforce/schema/Opportunity.SBR_Consultant__c';


import REQUESTED_THIRD_PARTY_ADMINISTRATOR_1 from '@salesforce/schema/Opportunity.Requested_Third_Party_Administrator_1__c';
import REQUESTED_MEDICAL_PROVIDER_NETWORK_1	from '@salesforce/schema/Opportunity.Requested_Medical_Provider_Network_1__c';
import REQUESTED_PHARMACY_BENEFIT_MANAGER_1	from '@salesforce/schema/Opportunity.Requested_Pharmacy_Benefit_Manager_1__c';
import REQUESTED_THIRD_PARTY_ADMINISTRATOR_2 from '@salesforce/schema/Opportunity.Requested_Third_Party_Administrator_2__c';
import REQUESTED_MEDICAL_PROVIDER_NETWORK_2	from '@salesforce/schema/Opportunity.Requested_Medical_Provider_Network_2__c';
import REQUESTED_PHARMACY_BENEFIT_MANAGER_2	from '@salesforce/schema/Opportunity.Requested_Pharmacy_Benefit_Manager_2__c';
import REQUESTED_THIRD_PARTY_ADMINISTRATOR_3 from '@salesforce/schema/Opportunity.Requested_Third_Party_Administrator_3__c';
import REQUESTED_MEDICAL_PROVIDER_NETWORK_3	from '@salesforce/schema/Opportunity.Requested_Medical_Provider_Network_3__c';
import REQUESTED_PHARMACY_BENEFIT_MANAGER_3	from '@salesforce/schema/Opportunity.Requested_Pharmacy_Benefit_Manager_3__c';
import REQUESTED_THIRD_PARTY_ADMINISTRATOR_4 from '@salesforce/schema/Opportunity.Requested_Third_Party_Administrator_4__c';
import REQUESTED_MEDICAL_PROVIDER_NETWORK_4	from '@salesforce/schema/Opportunity.Requested_Medical_Provider_Network_4__c';
import REQUESTED_PHARMACY_BENEFIT_MANAGER_4	from '@salesforce/schema/Opportunity.Requested_Pharmacy_Benefit_Manager_4__c';
import PLAN_MIRRORING_PROVISION from '@salesforce/schema/Opportunity.Plan_Mirroring_Provision__c';
import ACTIVELY_AT_WORK_WAIVED from '@salesforce/schema/Opportunity.Actively_At_Work_Waived__c';
import COST_CONTAINMENT_STRATEGIES_UTILIZED	from '@salesforce/schema/Opportunity.Cost_Containment_Strategies_Utilized__c';
import DOMESTIC_REIMBURSEMENT_LEVEL	from '@salesforce/schema/Opportunity.Domestic_Reimbursement_Level__c';
import ORGAN_TRANSPLANTS_EXCLUDED from '@salesforce/schema/Opportunity.Organ_Transplants_Excluded__c';
import NO_NEW_LASER_AT_RENEWAL_PROVISION_ISL from '@salesforce/schema/Opportunity.No_New_Laser_at_Renewal_Provision_ISL__c';
import PREMIUM_RATE_CAP_AT_RENEWAL_ISL from '@salesforce/schema/Opportunity.Premium_Rate_Cap_At_Renewal_P_ISL__c';
import EXPERIENCE_REFUND_PROVISION_ISL from '@salesforce/schema/Opportunity.Experience_Refund_Provision_ISL__c';
import TERMINAL_LIABILITY_OPTION_ISL from '@salesforce/schema/Opportunity.Terminal_Liability_Option_ISL__c';
import REQUESTED_PREMIUM_RATE_TIER_ISL from '@salesforce/schema/Opportunity.Requested_Premium_Rate_Tier_ISL__c';
import DEDUCTIBLE_CORRIDOR_ASL from '@salesforce/schema/Opportunity.DeductibleCorridorASL__c';
import MINIMUM_AGGREGATE_ATTACHMENT_ASL	from '@salesforce/schema/Opportunity.Minimum_Aggregate_Attachment_ASL_P__c';
import TERMINAL_LIABILITY_OPTION_ASL from '@salesforce/schema/Opportunity.Terminal_Liability_Option_ASL__c';
import REQUESTED_PREMIUM_RATE_TIER_ASL from '@salesforce/schema/Opportunity.Requested_Premium_Rate_Tier_ASL__c';
import REQUESTED_AGG_FACTOR_RATE_TIER_ASL from '@salesforce/schema/Opportunity.Requested_Agg_Factor_Tier_ASL__c';

import DRQ_Current_Fully_IPR__c from '@salesforce/schema/Opportunity.DRQ_Current_Fully_IPR__c';
import DRQ_Current_Medical_Plan_Summary_Copies from '@salesforce/schema/Opportunity.DRQ_Current_Medical_Plan_Summary_Copies__c';
import DRQ_Memeber_Level_Census from '@salesforce/schema/Opportunity.DRQ_Memeber_Level_Census__c';
import DRQ_PD_Claims from '@salesforce/schema/Opportunity.DRQ_PD_Claims__c';
import DRQ_Renewal_Fully_IPR from '@salesforce/schema/Opportunity.DRQ_Renewal_Fully_IPR__c';

import INTAKE_FORM_USERNAME from '@salesforce/schema/Opportunity.IntakeFormUser_Name__c';
import INTAKE_FORM_TITLE from '@salesforce/schema/Opportunity.IntakeFormUser_Title__c';
import INTAKE_FORM_EMAIL from '@salesforce/schema/Opportunity.IntakeFormUser_Email__c';

export default class DataRequiredToQuoteLwc extends LightningElement{
    initializePage = false;

    empIdValue = "";
    empAccountNameValue = "";
    empRecordTypeId = "";
    empPrimaryTelephoneValue = "";
    empWebsiteValue = "";
    empSicValue = "";
    empAdditionalLocationValue = "";
    empFederalEmployeeValue = "";
    empBillingStreetValue = "";
    empBillingCityValue = "";
    empBillingStateValue = "";
    empBillingZipCodeValue = "";
    empBillingCountryValue = "";
    employerInfoRecordDetails = "";
    employerAccountId = "";
    brokerAccountId = "";
    primaryContactId = "";
    secondaryContactId = "";
    tertiaryContactId = "";
    producerContactId = "";
    brokerFirmRecordDetails = "";
    brokerPrimaryContactRecordDetails = "";
    brokerSecondaryContactRecordDetails = "";
    brokerTertiaryContactRecordDetails = "";
    brokerProducerContactRecordDetails = "";
    updateEmployerRecordWithBrokerFirmAccountAndContacts = {};
    updatePrimaryContactAccount = {};
    updateSecondaryContactAccount = {};
    updateTertiaryContactAccount = {};
    updateProducerContactAccount = {};
    oppDetails = "";
    userDetails = "";
    stackProgramDetails = "";
    opportunityId="";
    opportunityCreate="";
    opportunityName="";
    recordTypeNameValue = "SBR Advantage Program";
    accountNameForCreatingOpp = "";
    showSpinner = false;
    @track historicMedicalCheckBoxVal = false;
    helpText = "Loading...";
    @track fileData = [];
    @track helpText = false;

    @track
    options = [
        { id: 1, label: 'Member Level Census', value: '1', required: true, selected: true, fieldApiName: DRQ_Memeber_Level_Census.fieldApiName, tooltip: {icon: true, helpText: false}},
        { id: 2, label: 'Copies Fully Insured Premium Rates or Level Funded Rates', value: '2', required: true, selected: true, fieldApiName: DRQ_Current_Medical_Plan_Summary_Copies.fieldApiName, tooltip: {icon: false, helpText: false}},
        { id: 3, label: 'Current Fully Insured Premium Rates or Level Funded Rates', value: '3', required: true, selected: true, fieldApiName: DRQ_Current_Fully_IPR__c.fieldApiName, tooltip: {icon: false, helpText: false}},
        { id: 4, label: 'Renewal Fully Instead Premium Rates or Level-Funded Rates', value: '4', required: false, selected: true, fieldApiName: DRQ_Renewal_Fully_IPR.fieldApiName, tooltip: {icon: false, helpText: false}},
        { id: 5, label: 'Historical Medical or Prescription Drug Claims Data', value: '5', required: true, selected: false, fieldApiName: DRQ_PD_Claims.fieldApiName, tooltip: {icon: false, helpText: false}},
    ];

    @api isMovingBacktoStack = false;
    @api selectedval;
    // isValueString = true;
	get isValueString(){
	  return this.selectedval === 'Data Required to Quote';
	}
	
    renderedCallback() {
        if(this.initializePage) {
            return;
        }

        if(this.template.querySelector('.my-icon')){
            let self = this;

            this.initializePage = true;

            this.template.querySelector('.my-icon').addEventListener('click', function(event){
                if(self.options[(event.target.dataset.value) - 1].tooltip.helpText){
                    self.options[(event.target.dataset.value) - 1].tooltip.helpText = false;
                }else {
                    self.options[(event.target.dataset.value) - 1].tooltip.helpText = true;
                }
            });
        }
        
    }

	get acceptedFormats(){
        return ['.xlsx', '.xls', '.csv', '.png', '.doc', '.docx', '.pdf'];
    }

    readFile(fileSource){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            const fileName = fileSource.name;
            
            fileReader.onerror = () => reject(fileReader.error);
            fileReader.onload = () => resolve({
                fileName,
                base64: fileReader.result.split(',')[1]
            });

            fileReader.readAsDataURL(fileSource);
        });
    }

	async handleFiles(event){

        let processFileFlag = true;

        for(let file of event.target.files) {

            let fileSizeCheck = file.size/(1024**2);

            if(fileSizeCheck>20) {
                processFileFlag = false;
                this.toggleSpinnerAndToast(false, '', true, 'error', 'File Limit 20MB Exceeded');
            }
        }

        if(processFileFlag) {
            let fileData = await Promise.all([...event.target.files].map(file => this.readFile(file)));
            this.fileData.push(...fileData);
        }
    }

    get selectedValues(){
        return this.value.join(',');
	}

	handleChange(e){
        this.value = e.detail.value;
    }

	handleNext(){
		console/log('test');
	}

    handleDocumentCheck(event){
        this.options[(event.target.value)-1].selected = event.target.checked;
    }

    async handleSubmit(event){
    
        /**Create Employer record*/
        this.showSpinner = true;
        this.helpText = 'Submitting form...';
        console.log('accountId>>>>>>>>>>>>>>>>>>>>>>' + this.accountId);
        console.log('employerInfoRecordCreate>>>>>>>' + JSON.stringify(this.employerInfoRecordCreate));
        
        var fields = this.employerInfoRecordCreate.employerfields;
        fields['sobjectType'] = 'Account';
        console.log('data for creating emp here in last section is ' + fields.Name);
        
        if((typeof this.employerAccountId == "undefined" || this.employerAccountId == "") && fields.Name != ""){
            console.log('Creating employer account>>>>');
            
            const createEmpRecord = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
            this.toggleSpinnerAndToast(true, 'Creating Employer Account...', false, '', '');
            createObj({ objCon: fields}).then(account => {
                /**Create secondary Contact*/
                this.toggleSpinnerAndToast(true, 'Employer account create successfully...', false, '', '');
                console.log('json stringyfi'+ JSON.stringify(account));
                this.employerAccountId = account;
                console.log('employer accountId>>>>>>>>>>>>>>>>>>>>>>' + this.employerAccountId);
                /**Create broker record */
                if(typeof this.employerAccountId != "undefined" && this.employerAccountId != "")
                    this.createUpdateBrokerAccount();
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error Employer account create successfully...', true, 'error', JSON.stringify(error));
                console.log("Error creating employer record>>>" + error.body.message);
                console.log("Error creating employer record>>>" + JSON.stringify(error));
                this.createUpdateBrokerAccount();
            });
        }else{
            console.log('updating employer account>>>>' + this.employerAccountId);
            this.showSpinner = true;
            this.helpText = 'Updating employer account...';
            this.toggleSpinnerAndToast(true, 'Updating employer account...', false, '', '');
            updateAccount({ objCon: fields }).then(result => {
                //Show Success Mmessage
                this.toggleSpinnerAndToast(true, 'Account updated successfully...', false, '', '');
                console.log('Account that got updated is ' + result);
                this.createUpdateBrokerAccount();
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error updating account record...', true, 'error', JSON.stringify(error));
                console.log("Error updating account record>>>" + JSON.stringify(error));
                this.createUpdateBrokerAccount();
                //this.error = error.message;
            });
        }
    }
    
    /**Create Broker record*/
    async createUpdateBrokerAccount(){
        var fields = this.brokerFirmRecordDetails.brokerFields;
        //fields[ACCOUNT_NAME.fieldApiName] = this.accountNameValue;
        //fields[ACCOUNT_RECORD_TYPE.fieldApiName] = '0121I000000JPeqQAG';
        console.log('value kdsnfksjn is' + JSON.stringify(fields) );
        console.log('Creating Broker Accounts >>>>');
        if(this.brokerAccountId == "" || typeof this.brokerAccountId == "undefined"){
            console.log('creating broker account>>>>');
            fields['sobjectType'] = 'Account';
            delete fields['Id'];
            this.toggleSpinnerAndToast(true, 'Creating Broker account...', false, '', '');
                    
            createObj({ objCon: fields}).then(account => {
                /** create secondary contact */
                this.toggleSpinnerAndToast(true, 'Broker account create successfully...', false, '', '');
                console.log('json stringyfi brokerid'+ JSON.stringify(account));
                this.brokerAccountId = account;
                //this.brokersFirmEmployerId = account.id;
                if (typeof this.brokerAccountId != "undefined" && this.brokerAccountId != ""){
                this.createUpdatePrimaryContact();
                }
                console.log('broker accountId>>>>>>>>>>>>>>>>>>>>>>' + this.brokerAccountId);
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error Broker account creation...', true, 'error', JSON.stringify(error));
                this.createUpdatePrimaryContact();
                console.log("Error creating Broker record>>>" + error.body.message);
                console.log("Error creating Broker record>>>" + JSON.stringify(error));
            });
        }else{
            console.log('updating broker account>>>>' + this.brokerAccountId);
            this.showSpinner = true;
            this.helpText = 'Updating broker account...';
            this.toggleSpinnerAndToast(true, 'Updating broker account...', false, '', '');
            updateAccount({ objCon: fields }).then(result => {
                // Show success messsage
                this.toggleSpinnerAndToast(true, 'Broker Account updated successfully...', false, '', '');
                console.log('Account that got updated is ' + result);
                this.createUpdatePrimaryContact();
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error updating broker account record...', true, 'error', JSON.stringify(error));
                console.log("Error updating broker account record>>>" + JSON.stringify(error));
                this.createUpdatePrimaryContact();
                //this.error = error.message;
            });
        }
    }

    async createUpdatePrimaryContact(){
        var fields = this.brokerPrimaryContactRecordDetails.primaryContactFields; 
        console.log('broker account id in primary method is>>'+this.brokerAccountId);
        fields[CONTACT_ACCOUNT.fieldApiName] = this.brokerAccountId;
        console.log('here1'+JSON.stringify(fields));
        //fields.ACCOUNT_OBJECT = this.brokerAccountId;
        if((this.primaryContactId == "" || typeof this.primaryContactId == "undefined") && fields.LastName != ""){
            console.log('creating primary contact>>>>' + fields.Id);
            console.log('fields contents are>' + JSON.stringify(fields));
            delete fields['Id'];
            this.showSpinner = true;
            this.helpText = 'Creating primary contact...';
            this.toggleSpinnerAndToast(true, 'Creating primary contact...', false, '', '');
            saveContactRecord({ objCon: fields }).then(result => {
                // Show success messsage
                this.toggleSpinnerAndToast(true, 'Primary contact created successfully...', false, '', '');
                this.primaryContactId = result;
                console.log('broker Primary Contact>>>>>>>>>>>>>>>>>>>>>>' + this.primaryContactId + 'result' + result);
                if (typeof this.primaryContactId != "undefined" && this.primaryContactId != ""){
                    //this.updatePrimaryContact();
                    this.createUpdateSecondaryContact();
                }
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error creating PrimaryContact record...', true, 'error', JSON.stringify(error));
                this.createUpdateSecondaryContact();
                console.log("Error creating PrimaryContact record>>>" + JSON.stringify(error));
                //this.error = error.message;
            });
        }else{
            console.log('Updating primary contact>>>>' + this.primaryContactId);
            this.showSpinner = true;
            this.helpText = 'Updating primary contact...';
            this.toggleSpinnerAndToast(true, 'Updating primary contact...', false, '', '');
            updateContact({ objCon: fields }).then(result => {
                // Show success messsage
                this.toggleSpinnerAndToast(true, 'Primary contact updated successfully...', false, '', '');
                console.log('Primary contact that got updated is ' + result);
                this.createUpdateSecondaryContact();
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error updating Primary contact record...', true, 'error', JSON.stringify(error));
                console.log("Error updating Primary contact record>>>" + JSON.stringify(error));
                this.createUpdateSecondaryContact();
                //this.error = error.message;
            });
        }
    }

    async createUpdateSecondaryContact(){
        var fields = this.brokerSecondaryContactRecordDetails.secondaryContactFields;
        console.log('broker account id in secondary method is>>'+this.brokerAccountId);
        fields[CONTACT_ACCOUNT.fieldApiName] = this.brokerAccountId;
        console.log('here1'+JSON.stringify(fields));
        console.log('Secondary Contact fields are not blank...' + JSON.stringify(this.brokerSecondaryContactCreate));
        if((this.secondaryContactId == "" || typeof this.secondaryContactId == "undefined") && fields.LastName != ""){
            console.log('Creating Secondary contact>>>>');
            delete fields['Id'];
            this.toggleSpinnerAndToast(true, 'Creating Secondary contact...', false, '', '');
            
            saveContactRecord({ objCon: fields }).then(result => {
                // Show success messsage
                this.toggleSpinnerAndToast(true, 'Secondary contact created successfully...', false, '', '');
                //this.brokerSecondaryContactValue = result;
                this.secondaryContactId = result;
                console.log('broker Secondary Contact>>>>>>>>>>>>>>>>>>>>>>' + this.secondaryContactId + 'result' + result);
                if (typeof this.secondaryContactId != "undefined" && this.secondaryContactId != "")
                this.createUpdateTertiaryContact();
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error creating Secondary Contact record...', true, 'error', JSON.stringify(error));
                this.createUpdateTertiaryContact();
                console.log("Error creating Secondary Contact record>>>" + JSON.stringify(error));
                //this.error = error.message;
            });
        }else{
            console.log('Updating Secondary contact>>>>' + this.secondaryContactId);
            this.showSpinner = true;
            this.helpText = 'Updating secondary contact...';
            this.toggleSpinnerAndToast(true, 'Updating secondary contact...', false, '', '');
            
            updateContact({ objCon: fields }).then(result => {
                // Show success messsage
                this.toggleSpinnerAndToast(true, 'secondary contact updated successfully...', false, '', '');
                console.log('secondary contact that got updated is ' + result);
                this.createUpdateTertiaryContact();
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error updating secondary contact record...', true, 'error', JSON.stringify(error));
                console.log("Error updating secondary contact record>>>" + JSON.stringify(error));
                this.createUpdateTertiaryContact();
                //this.error = error.message;
            });
        }
    
    }
    
    async createUpdateTertiaryContact(){
        var fields = this.brokerTertiaryContactRecordDetails.tertiaryContactFields;
        console.log('broker account id in tertiary method is>>'+this.brokerAccountId);
        fields[CONTACT_ACCOUNT.fieldApiName] = this.brokerAccountId;
        console.log('here1'+JSON.stringify(fields));
        console.log('Tertiary Contact fields are not blank...' + JSON.stringify(this.brokerTertiaryContactCreate));
        if((this.tertiaryContactId == "" || typeof this.tertiaryContactId == "undefined") && fields.LastName != ""){
            console.log('Creating Tertiary contact>>>>');
            delete fields['Id'];
            this.toggleSpinnerAndToast(true, 'Creating Tertiary contact...', false, '', '');
            saveContactRecord({ objCon: fields }).then(result => {
                // Show success messsage
                this.toggleSpinnerAndToast(true, 'Created Tertiary contact successfully...', false, '', '');
                //this.brokerTertiaryContactValue = result;
                this.tertiaryContactId = result;
                console.log('broker Tertiary Contact>>>>>>>>>>>>>>>>>>>>>>' + this.tertiaryContactId + 'result' + result);
                if (typeof this.tertiaryContactId != "undefined" && this.tertiaryContactId != "")
                this.createUpdateProducerContact();
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error creating Tertiary Contact record...', true, 'error', JSON.stringify(error));
                this.createUpdateProducerContact();
                console.log("Error creating Tertiary Contact record>>>" + JSON.stringify(error));
            });
        }else{
            console.log('Updating Tertiary contact>>>>' + this.tertiaryContactId);
            this.showSpinner = true;
            this.helpText = 'Updating Tertiary contact...';
            this.toggleSpinnerAndToast(true, 'Updating Tertiary contact...', false, '', '');
            updateContact({ objCon: fields }).then(result => {
                // Show success messsage
                this.toggleSpinnerAndToast(true, 'Tertiary contact updated successfully...', false, '', '');
                console.log('Tertiary contact that got updated is ' + result);
                this.createUpdateProducerContact();
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error updating Tertiary contact record...', true, 'error', JSON.stringify(error));
                console.log("Error updating Tertiary contact record>>>" + JSON.stringify(error));
                this.createUpdateProducerContact();
                //this.error = error.message;
            });
        }
    }

    async createUpdateProducerContact(){
        var fields = this.brokerProducerContactRecordDetails.producerFields;
        fields[CONTACT_ACCOUNT.fieldApiName] = this.brokerAccountId;
        console.log('producer Contact fields are not blank...' + JSON.stringify(this.brokerProducerContactCreate));
        if((this.producerContactId == "" || typeof this.producerContactId == "undefined") && fields.LastName != ""){
            console.log('Creating Producer contact>>>>');
            delete fields['Id'];
            this.toggleSpinnerAndToast(true, 'Creating Producer contact...', false, '', '');

            saveContactRecord({ objCon: fields }).then(result => {
                // Show success messsage
                this.toggleSpinnerAndToast(true, 'Created Producer contact successfully...', false, '', '');
                //this.brokerProducerContactValue = result;
                this.producerContactId = result;
                console.log('broker Producer Contact>>>>>>>>>>>>>>>>>>>>>>' + this.producerContactId + 'result' + result);
                if (typeof this.producerContactId != "undefined" && this.producerContactId != "")
                this.createOpportunity();
                console.log("Complete process is a success producer>>>" + this.producerContactId);
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error creating Producer Contact record...', true, 'error', JSON.stringify(error));
                //this.updateEmployerRecordWithBrokerFirmAccountAndContactsMethod();
                this.createOpportunity();
                console.log("Error creating Producer Contact record>>>" + JSON.stringify(error));
                //this.error = error.message;
            });
        }else{
            console.log('Updating Producer contact>>>>' + this.producerContactId);
            this.showSpinner = true;
            this.helpText = 'Updating Producer contact...';
            this.toggleSpinnerAndToast(true, 'Updating Producer contact...', false, '', '');

            updateContact({ objCon: fields }).then(result => {
                // Show success messsage
                this.toggleSpinnerAndToast(true, 'Producer contact updated successfully...', false, '', '');
                console.log('Producer contact that got updated is ' + result);
                this.createOpportunity();
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error updating Producer contact record...', true, 'error', JSON.stringify(error));
                console.log("Error updating Producer contact record>>>" + JSON.stringify(error));
                this.createOpportunity();
                //this.error = error.message;
            });
        }
    
    }

    toggleSpinnerAndToast(showSpinner, spinnerText, showToast, toastType , toastText){
        this.showSpinner = showSpinner;
        this.helpText = spinnerText;
        if(showToast){
            this.template.querySelector('c-custom-toast').showToast(toastType, toastText);
        }
    }

    async updateEmployerRecordWithBrokerFirmAccountAndContactsMethod() {
        // Show success messsage
        this.updateEmployerRecordWithBrokerFirmAccountAndContacts.Id = this.employerAccountId;
        this.updateEmployerRecordWithBrokerFirmAccountAndContacts.Broker_Assignment_Firm__c = this.brokerAccountId;
        this.updateEmployerRecordWithBrokerFirmAccountAndContacts.Broker_Primary_Contact__c = this.primaryContactId;
        this.updateEmployerRecordWithBrokerFirmAccountAndContacts.Broker_Secondary_Contact__c = this.secondaryContactId;
        this.updateEmployerRecordWithBrokerFirmAccountAndContacts.Broker_Tertiary_Contact__c = this.tertiaryContactId;
        this.updateEmployerRecordWithBrokerFirmAccountAndContacts.Broker_Producer__c = this.producerContactId;
        updateEmployerAccountWithContact({ accountToUpdate: this.updateEmployerRecordWithBrokerFirmAccountAndContacts }).then(result => {
            this.toggleSpinnerAndToast(false, 'Updating Employer record with Contact record...', false, 'success', 'All records are created and linked');
            this.isFormCompleted = true;
            const formcompleteevent = new CustomEvent('formcompleteevent', {
                detail: this.isFormCompleted
            });
            
            this.dispatchEvent(formcompleteevent);
            console.log("result>>>>>>>>>" + JSON.stringify(result));
            // this.createOpportunity();
        }).catch(error => {
            this.error = error;
            this.toggleSpinnerAndToast(true, 'Error updating Employer record with Contact record...', true, 'error', JSON.stringify(error));
            this.isFormCompleted = true;
            const formcompleteevent = new CustomEvent('formcompleteevent', {
                detail: this.isFormCompleted
            });

            this.dispatchEvent(formcompleteevent);
            //this.createOpportunity();
            console.log("error updateEmployerAccountWithContact>>>>>>>" + JSON.stringify(error));
        });
    }

    async updatePrimaryContact() {
        // Show success messsage
        const contactfields = {};
        contactfields[ID_FIELD.fieldApiName] = this.primaryContactId;
        contactfields[CONTACT_ACCOUNT.fieldApiName] = this.brokerAccountId;
        console.log('here2'+JSON.stringify(contactfields));
        updateContactAccount({ contactToUpdate: contactfields }).then(result => {
        }).catch(error => {
            this.toggleSpinnerAndToast(true, 'Error updating Primary contact record...', true, 'error', JSON.stringify(error));
            console.log("Error updating Primary contact record>>>" + JSON.stringify(error));
        });
    }

    async updateSecondaryContact() {
        // Show success messsage
        this.updateSecondaryContactAccount.Id = this.secondaryContactId;
        this.updateSecondaryContactAccount.Account = this.brokerAccountId;
        updateContactAccount({ contactToUpdate: this.updateSecondaryContactAccount }).then(result => {
        }).catch(error => {
            this.toggleSpinnerAndToast(true, 'Error updating Secondary contact record...', true, 'error', JSON.stringify(error));
            console.log("Error updating Secondary contact record>>>" + JSON.stringify(error));
        });
    }

    async updateTertiaryContact() {
        // Show success messsage
        this.updateTertiaryContactAccount.Id = this.tertiaryContactId;
        this.updateTertiaryContactAccount.Account = this.brokerAccountId;
        updateContactAccount({ contactToUpdate: this.updateTertiaryContactAccount }).then(result => {
        }).catch(error => {
            this.toggleSpinnerAndToast(true, 'Error updating Tertiary contact record...', true, 'error', JSON.stringify(error));
            console.log("Error updating Tertiary contact record>>>" + JSON.stringify(error));
        });
    }

    async updateProducerContact() {
        // Show success messsage
        this.updateProducerContactAccount.Id = this.producerContactId;
        this.updateProducerContactAccount.Account = this.brokerAccountId;
        updateContactAccount({ contactToUpdate: this.updateProducerContactAccount }).then(result => {
        }).catch(error => {
            this.toggleSpinnerAndToast(true, 'Error updating Producer contact record...', true, 'error', JSON.stringify(error));
            console.log("Error updating Producer contact record>>>" + JSON.stringify(error));
        });
    }
 
    handleBack(event){
        this.isMovingBacktoStack = true;
        const backtostackevent = new CustomEvent('backtostackevent', {
            detail: this.isMovingBacktoStack
        });
        this.dispatchEvent(backtostackevent);
    }
    
    @api getDataFromEmpAndBroker(event){
        console.log("****************Data Required to Quote Section Starts****************");
        //Storing Employer details to variable which will be used on creation or updation 
        //Create only if employer Id is null
        this.employerInfoRecordCreate = event.detail.empRecordInput;
        console.log('****Emp data inside Data Required to Quote' + JSON.stringify(this.employerInfoRecordCreate));
        this.employerAccountId=this.employerInfoRecordCreate.employerfields.Id;
        this.accountNameForCreatingOpp = this.employerInfoRecordCreate.employerfields.Name;
        this.brokerFirmRecordDetails = event.detail.brokerRecordInput;
        console.log('****Broker Firm data inside Data Required to Quote' + JSON.stringify(this.brokerFirmRecordDetails));
        this.brokerAccountId=this.brokerFirmRecordDetails.brokerFields.Id;
        this.brokerPrimaryContactRecordDetails = event.detail.primaryContactRecordInput;
        console.log('****Primary Contact data inside Data Required to Quote' + JSON.stringify(this.brokerPrimaryContactRecordDetails));
        this.primaryContactId=this.brokerPrimaryContactRecordDetails.primaryContactFields.Id;
        this.brokerSecondaryContactRecordDetails = event.detail.secondaryContactRecordInput;
        console.log('****Secondary Contact data inside Data Required to Quote' + JSON.stringify(this.brokerSecondaryContactRecordDetails));
        this.secondaryContactId=this.brokerSecondaryContactRecordDetails.secondaryContactFields.Id;
        this.brokerTertiaryContactRecordDetails = event.detail.tertiaryContactRecordInput;
        console.log('****Tertiary Contact data inside Data Required to Quote' + JSON.stringify(this.brokerTertiaryContactRecordDetails));
        this.tertiaryContactId=this.brokerTertiaryContactRecordDetails.tertiaryContactFields.Id;
        this.brokerProducerContactRecordDetails = event.detail.producerContactRecordInput;
        console.log('****Broker Producer data inside Data Required to Quote' + JSON.stringify(this.brokerProducerContactRecordDetails));
        this.producerContactId=this.brokerProducerContactRecordDetails.producerFields.Id;
    }
    
    @api getOppDataFromReq(event){
        console.log('******Data received in data required to quote');
        this.oppDetails = event.detail.oppRecordInput;
        console.log('****data****is****' + JSON.stringify(this.oppDetails))
        if(this.oppDetails.oppfields.Enrolled_Employees__c > 150)
        {
            this.options[4].selected=true;
        }
        console.log('checkbox val>' + this.historicMedicalCheckBoxVal);
    }

    @api storeUserInfo(event){
        console.log('******Data received in data required to quote for user info');
        this.userDetails = event.detail.userRecordInput;
        console.log('****data****is****' + JSON.stringify(this.userDetails))
    }
    
    @api storeStackInfo(event){
        console.log('******Data received in data required to quote for stack program');
        this.stackProgramDetails = event.detail.stackRecordInput;
        console.log('****data**stackProgramDetails**is****' + JSON.stringify(this.stackProgramDetails))
    }
    
    async createFiles(){
        createFiles({oppId: this.opportunityId, fileListJSON: JSON.stringify(this.fileData)}).then(result => {
            console.log("Create Files result>>>>>>>>>" + result);
        }).catch(error => {
            console.log("Create Files Error creating opportunity record>>>" + JSON.stringify(error));
        });
    }

    async createOpportunity(){
        this.opportunityName = this.accountNameForCreatingOpp + " - " + this.recordTypeNameValue + " - " + this.oppDetails.oppfields.Effective_Date__c;

        const fields = {};
        fields[OPPORTUNITY_NAME.fieldApiName] = this.opportunityName;
        fields[ESTIMATED_ANNUAL_PREMIUM.fieldApiName] = this.oppDetails.oppfields.Estimated_Annual_Premium__c;
        fields[ELIGIBLE_EMPLOYEES.fieldApiName] = this.oppDetails.oppfields.Number_of_Eligible_Employees__c;
        fields[ENROLLED_EMPLOYEES.fieldApiName] = this.oppDetails.oppfields.Enrolled_Employees__c;
        fields[OPPORTUNITY_RECORD_TYPE.fieldApiName] = this.oppDetails.oppfields.RecordTypeId;
        fields[OPPORTUNITY_TYPE.fieldApiName] = this.oppDetails.oppfields.Opportunity_Type__c
        fields[STAGE.fieldApiName]=	this.oppDetails.oppfields.StageName;
        fields[EFFECTIVE_DATE.fieldApiName] = this.oppDetails.oppfields.Effective_Date__c;
        fields[DUE_DATE_TO_BROKER.fieldApiName] = this.oppDetails.oppfields.Date_Due_to_Broker_Initial_Request__c;
        fields[CLOSE_DATE.fieldApiName] = this.oppDetails.oppfields.CloseDate;
        fields[CURRENT_AGENT_OF_RECORD.fieldApiName] = this.oppDetails.oppfields.Current_Agent_of_Record__c;
        fields[MINIMUM_DEDUCTIBLE_ISL.fieldApiName] = this.oppDetails.oppfields.Deductible_ISL__c;
        fields[SL_COVERAGE_INCLUDED.fieldApiName] =	this.oppDetails.oppfields.Stop_Loss_Coverages_Included__c;
        fields[REQUEST_FUNDING_TYPE.fieldApiName] =	this.oppDetails.oppfields.Funding_Type__c;
        fields[REQUESTED_COMMISION.fieldApiName] = this.oppDetails.oppfields.Requested_Commissions_PEPM__c;
        fields[REQUESTED_COMMISION_PERCENT.fieldApiName] = this.oppDetails.oppfields.Requested_Commissions_of_Net_Premium__c;
        fields[MATCH_CURRENT_MEDICAL_PLAN.fieldApiName] = this.oppDetails.oppfields.Match_Current_Medical_Plan_Design__c;
        fields[BENEFITS_COVERED_ISL.fieldApiName] =	this.oppDetails.oppfields.Benefits_Covered_ISL__c;
        fields[CONTRACT_BASIS_ISL.fieldApiName] = this.oppDetails.oppfields.Contract_Basis_ISL__c;
        fields[DEDUCTIBLE_ACCUMULATION_ISL.fieldApiName] = this.oppDetails.oppfields.Deductible_Accumulation_ISL__c;
        fields[SEPARATE_AGGREGATE_DEDUCTIBLE_ISL.fieldApiName] = this.oppDetails.oppfields.Separate_Aggregating_Deductible_ISL__c;
        fields[MAXIMUM_COVERAGE_LIMIT_ISL.fieldApiName] = this.oppDetails.oppfields.Maximum_Coverage_Limit_ISL__c;
        fields[ADVANCE_REIMBURSEMENT_PROVISION_ISL.fieldApiName] = this.oppDetails.oppfields.Advance_Reimbursement_Provision_ISL__c;
        fields[RETIREES_COVERED_ISL.fieldApiName] =	this.oppDetails.oppfields.Retirees_Covered_ISL__c;
        fields[BENEFITS_COVERED_ASL.fieldApiName] =	this.oppDetails.oppfields.Benefits_Covered_ASL__c;
        fields[CONTRACT_BASIS_ASL.fieldApiName] = this.oppDetails.oppfields.Contract_Basis_ASL__c;
        fields[MAXIMUM_ANNUAL_REIMBURSEMENT.fieldApiName] =	this.oppDetails.oppfields.Maximum_Annual_Reimbursement_ASL__c;
        fields[AGGREGATE_ACCOMMODATION_ASL.fieldApiName] = this.oppDetails.oppfields.Aggregate_Accommodation_ASL__c;
        fields[RETIREES_COVERED_ASL.fieldApiName] =	this.oppDetails.oppfields.Retirees_Covered_ASL__c;
        fields[CURRENT_HEALTH_PLAN_FUNDING.fieldApiName] = this.oppDetails.oppfields.Current_Health_Plan_Funding_Arrangement__c;
        //fields[CURRENT_TPA.fieldApiName] = this.oppDetails.oppfields.Current_Third_Party_Administrator__c;
        //fields[ELIGIBLE_EMPLOYEES.fieldApiName] =	this.oppDetails.oppfields.
        fields[CURRENT_MEDICAL_PROVIDER_NETWORK.fieldApiName] =	this.oppDetails.oppfields.Current_Medical_Provider_Network__c;
        //fields[CURRENT_PHARMACY_BENEFIT_MANAGER.fieldApiName] = this.oppDetails.oppfields.Current_Pharmacy_Benefit_Manager__c;
        //fields[ELIGIBLE_EMPLOYEES.fieldApiName] = this.oppDetails.oppfields.
        //fields[CURRENT_SPECIALITY_RX_VENDOR.fieldApiName] = this.oppDetails.oppfields.Current_Specialty_Rx_Vendor__c;
        fields[RECEIVED_DATE_INITIAL_REQUEST.fieldApiName] = this.oppDetails.oppfields.Received_Date_Initial_Request__c;
        //fields[ELIGIBLE_EMPLOYEES.fieldApiName] =	this.oppDetails.oppfields.
        fields[OPP_ACCOUNT_NAME.fieldApiName] = this.employerAccountId;
        fields[BROKER_FIRM.fieldApiName] = this.brokerAccountId;
        fields[BROKER_PRIMARY_CONTACT.fieldApiName] = this.primaryContactId;
        fields[BROKER_SECONDARY_CONTACT.fieldApiName] = this.secondaryContactId;
        fields[BROKER_TERTIARY_CONTACT.fieldApiName] = this.tertiaryContactId;
        fields[BROKER_PRODUCER.fieldApiName] = this.producerContactId;
        fields[SBR_PRODUCER_FIRM.fieldApiName] = this.oppDetails.oppfields.SBRProducerFirm__c;
        fields[PLAN_MIRRORING_PROVISION.fieldApiName] = this.oppDetails.oppfields.Plan_Mirroring_Provision__c;
        fields[ACTIVELY_AT_WORK_WAIVED.fieldApiName] = this.oppDetails.oppfields.Actively_At_Work_Waived__c;
        fields[COST_CONTAINMENT_STRATEGIES_UTILIZED.fieldApiName] = this.oppDetails.oppfields.Cost_Containment_Strategies_Utilized__c;
        fields[DOMESTIC_REIMBURSEMENT_LEVEL.fieldApiName] = this.oppDetails.oppfields.Domestic_Reimbursement_Level__c;
        fields[ORGAN_TRANSPLANTS_EXCLUDED.fieldApiName] = this.oppDetails.oppfields.Organ_Transplants_Excluded__c;
        fields[NO_NEW_LASER_AT_RENEWAL_PROVISION_ISL.fieldApiName] = this.oppDetails.oppfields.No_New_Laser_at_Renewal_Provision_ISL__c;
        fields[PREMIUM_RATE_CAP_AT_RENEWAL_ISL.fieldApiName] = this.oppDetails.oppfields.Premium_Rate_Cap_At_Renewal_P_ISL__c;
        fields[EXPERIENCE_REFUND_PROVISION_ISL.fieldApiName] = this.oppDetails.oppfields.Experience_Refund_Provision_ISL__c;
        fields[TERMINAL_LIABILITY_OPTION_ISL.fieldApiName] = this.oppDetails.oppfields.Terminal_Liability_Option_ISL__c;  
        fields[REQUESTED_PREMIUM_RATE_TIER_ISL.fieldApiName] = this.oppDetails.oppfields.Requested_Premium_Rate_Tier_ISL__c;
        fields[DEDUCTIBLE_CORRIDOR_ASL.fieldApiName] = this.oppDetails.oppfields.DeductibleCorridorASL__c;
        fields[MINIMUM_AGGREGATE_ATTACHMENT_ASL.fieldApiName] = this.oppDetails.oppfields.Minimum_Aggregate_Attachment_ASL_P__c;    
        fields[REQUESTED_PREMIUM_RATE_TIER_ASL.fieldApiName] = this.oppDetails.oppfields.Requested_Premium_Rate_Tier_ASL__c;    
        fields[REQUESTED_AGG_FACTOR_RATE_TIER_ASL.fieldApiName] = this.oppDetails.oppfields.Requested_Agg_Factor_Tier_ASL__c;
        fields[OPPORTUNITY_SOURCE.fieldApiName] = 'Intake Form';
        fields[INTAKE_FORM_USERNAME.fieldApiName] = this.userDetails.userfields.IntakeFormUser_Name__c;    
        fields[INTAKE_FORM_TITLE.fieldApiName] = this.userDetails.userfields.IntakeFormUser_Title__c;    
        fields[INTAKE_FORM_EMAIL.fieldApiName] = this.userDetails.userfields.IntakeFormUser_Email__c;

        for(let option of this.options){
            if(option.selected){
                fields[option.fieldApiName] = option.selected;
            }
        }

        if(this.oppDetails.oppfields.Current_Third_Party_Administrator__c!=null){
            fields[CURRENT_TPA.fieldApiName] = this.oppDetails.oppfields.Current_Third_Party_Administrator__c;
        }

        if(this.oppDetails.oppfields.Current_Pharmacy_Benefit_Manager__c!=null){
            fields[CURRENT_PHARMACY_BENEFIT_MANAGER.fieldApiName] =	this.oppDetails.oppfields.Current_Pharmacy_Benefit_Manager__c;
        }

        // if(this.oppDetails.oppfields.Current_Specialty_Rx_Vendor__c!=null){
        //     fields[CURRENT_SPECIALITY_RX_VENDOR.fieldApiName] = this.oppDetails.oppfields.Current_Specialty_Rx_Vendor__c;
        // }
    
        if(this.oppDetails.oppfields.CurrentThirdPartyAdministrator_Text__c!=null){
            fields[NEW_TPA.fieldApiName] = this.oppDetails.oppfields.CurrentThirdPartyAdministrator_Text__c;
        }

        if(this.oppDetails.oppfields.CurrentPharmacyBenefitManager_Text__c!=null){
            fields[NEW_PBM.fieldApiName] = this.oppDetails.oppfields.CurrentPharmacyBenefitManager_Text__c;
        }
        
        // if(this.oppDetails.oppfields.CurrentSpecialtyRxVendor_Text__c!=null){
        //     fields[NEW_SPECIALITY.fieldApiName] = this.oppDetails.oppfields.CurrentSpecialtyRxVendor_Text__c;
        // }
        if(this.stackProgramDetails.stackfields.Requested_SBR_Advantage_Program_Stack_1__c!=''){
            fields[REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_1.fieldApiName] = this.stackProgramDetails.stackfields.Requested_SBR_Advantage_Program_Stack_1__c;
        }

        if(this.stackProgramDetails.stackfields.Requested_SBR_Advantage_Program_Stack_2__c!=''){
            fields[REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_2.fieldApiName] = this.stackProgramDetails.stackfields.Requested_SBR_Advantage_Program_Stack_2__c;
        }

        if(this.stackProgramDetails.stackfields.Requested_SBR_Advantage_Program_Stack_3__c!=''){
            fields[REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_3.fieldApiName] = this.stackProgramDetails.stackfields.Requested_SBR_Advantage_Program_Stack_3__c;
        }
        fields['sobjectType'] = 'Opportunity';
        console.log('data going to create opp'+JSON.stringify(fields));
        const createOppRecord = { apiName: OPPORTUNITY_OBJECT.objectApiName, fields };
        this.opportunityCreate = createOppRecord;
        if(this.oppDetails.oppfields.Opportunity_Type__c == "New" || 
        this.oppDetails.oppfields.Opportunity_Type__c == "Renewal"){
            //const createOppRecord = { apiName: OPPORTUNITY_OBJECT.objectApiName, fields };
            this.toggleSpinnerAndToast(true, 'Creating Opportunity...', false, '', '');

            createObj({ objCon: fields}).then(opp => {
                /**Create secondary Contact */
                this.toggleSpinnerAndToast(true, 'Opportunity created successfully...', false, '', '');
                console.log('data retrned from apex>>'+ JSON.stringify(opp));
                this.opportunityId = opp.Id;
                console.log('opportunityId>>>>>>>>>>>>>>>>>>>>>>' + JSON.stringify(this.opportunityId));

                this.updateEmployerRecordWithBrokerFirmAccountAndContactsMethod();

                if(this.fileData){
                    this.createFiles();
                }

                /**Create Broker record */
            }).catch(error => {
                this.toggleSpinnerAndToast(true, 'Error in creating opportunity...', true, 'error', JSON.stringify(error));
                console.log("Error creating opportunity record>>>" + error.body.message);

                this.updateEmployerRecordWithBrokerFirmAccountAndContactsMethod();
                console.log("Error creating opportunity record>>>" + JSON.stringify(error));
            });
        }else{
            this.updateEmployerRecordWithBrokerFirmAccountAndContactsMethod();
        }
    }

    removeReceiptImage(event) {
        var index = event.currentTarget.dataset.id;
        this.fileData.splice(index, 1);
    }
}