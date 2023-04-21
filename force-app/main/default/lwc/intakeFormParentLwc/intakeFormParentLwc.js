import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import IMAGES from "@salesforce/resourceUrl/intake_resources";
 export default class parentComponent extends LightningElement {
    sbrLogo = IMAGES + '/intakeResource/images/sbr-logo.png';
    checkIcon = IMAGES + '/intakeResource/images/checkicon.png';
    currentvalue = '0';
    selectedvalue = 'Personal Information';
    showSpinner = true;
    helpText = "Loading....";
    @api empCompletionStatus;
    @api brokerCompletionStatus;
    @api requestedCompletionStatus;
    @api moveBackToEmployeeRequestedVal = false;
    @api moveNextToRequestedSectionVal = false;
    @api moveBackToBrokerSectionVal = false;
    @api moveNextToStackSectionVal = false;
    @api moveBackToRequestedSectionVal = false;
    @api formCompletionStatus = false;
    @api moveNextToDataRequiredToQuoteVal = false;
    @api moveNextToEmpVal = false;
    @api moveBackToPersonalInfoSectionVal = false;
    @api moveBackToStackSectionVal = false;

    
    connectedCallback() {
        this.showSpinner = false;
    }
    pathHandler(event) {
        let targetValue = event.currentTarget.value;
        let selectedvalue = event.currentTarget.label;
        this.currentvalue = targetValue;
        console.log('this.currentvalue>>' + this.currentvalue);
        this.selectedvalue = selectedvalue;
        console.log('this.selectedvalue>>' + this.selectedvalue);
        console.log('data stored in parent is' + this.empCompletionStatus);
        /*The below line displays toast message, uncomment it to check*/
        //this.template.querySelector('c-custom-toast').showToast('success', 'This is a Success Message.');
    }

    personalInfoPathHandler(event) {
        let targetValue = event.currentTarget.value;
        let selectedvalue = event.currentTarget.label;
        this.currentvalue = "0";
        this.selectedvalue = "Personal Information";
    }

    empPathHandler(event) {
        let targetValue = event.currentTarget.value;
        let selectedvalue = event.currentTarget.label;
        this.currentvalue = "1";
        this.selectedvalue = "Employer Information";
    }

    brokerPathHandler(event) {
        let targetValue = event.currentTarget.value;
        let selectedvalue = event.currentTarget.label;
        console.log('Target value on 2nd step click is ' + targetValue);
        console.log('Current value of emp completion status is ' + this.empCompletionStatus);
        if(this.empCompletionStatus)
        {
            this.currentvalue = "2";
            this.selectedvalue = "Broker Information";
        }
    }

    requestedPathHandler(event) {
        let targetValue = event.currentTarget.value;
        let selectedvalue = event.currentTarget.label;
        this.currentvalue = "3";
        this.selectedvalue = "Requested Terms";
        console.log('Current value of emp completion status is ' + this.empCompletionStatus);
        console.log('Current value of brokerCompletionStatus is ' + this.brokerCompletionStatus);
        
    }

    stackPathHandler(event) {
        let targetValue = event.currentTarget.value;
        let selectedvalue = event.currentTarget.label;
        this.currentvalue = "4";
        this.selectedvalue = "Stack Programs";
    }

    getEmpCompletionStatus(event) {
        console.log('the value received from child in getEmpCompletionStatus' +event.detail );
        this.empCompletionStatus=event.detail;
        console.log('data received from empInfo Lwc child is' + this.empCompletionStatus);
        this.brokerPathHandler(event);
    }

    getBrokerCompletionStatus(event) {
        console.log('the value received from child in getBrokerCompletionStatus' +event.detail );
        this.brokerCompletionStatus=event.detail;
        console.log('data received from child is' + this.brokerCompletionStatus);
    }

    getRequestedCompletionStatus(event) {
        console.log('the value received from child in getRequestedCompletionStatus' +event.detail );
        this.requestedCompletionStatus=event.detail;
        console.log('data received from child is' + this.requestedCompletionStatus);
    }
    showspinnerAndPassEmployerDetailsToBrokerSection(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-broker-info-lwc").handleBrokerFormSubmit(event);
    }

    showspinnerAndPassNewDetailsToBrokerSection(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-broker-info-lwc").handleNewEmployerFormSubmit(event);
    }
    
    moveBackToEmpSection(event) {
        console.log('the value received from child broker section is' +event.detail );
        this.moveBackToEmployeeRequestedVal=event.detail;
        if(this.moveBackToEmployeeRequestedVal==true)
        {
            this.empPathHandler(event);
        }
    }

    moveNextToRequestedSection(event) {
        console.log('the value received from child broker section is' +event.detail );
        this.moveNextToRequestedSectionVal=event.detail;
        if(this.moveNextToRequestedSectionVal==true)
        {
            this.requestedPathHandler(event);
        }
    }

    moveBackToBrokerSection(event) {
        console.log('the value received from child requested section is' +event.detail );
        this.moveBackToBrokerSectionVal=event.detail;
        if(this.moveBackToBrokerSectionVal==true)
        {
            this.brokerPathHandler(event);
        }
    }

    moveNextToStackSection(event) {
        console.log('the value received from child requested section is' +event.detail );
        this.moveNextToStackSectionVal=event.detail;
        if(this.moveNextToStackSectionVal==true)
        {
            this.stackPathHandler(event);
        }
    }

    moveBackToRequestedSection(event) {
        console.log('the value received from child requested section is' +event.detail );
        this.moveBackToRequestedSectionVal=event.detail;
        if(this.moveBackToRequestedSectionVal==true)
        {
            this.requestedPathHandler(event);
        }
    }

    moveNextToDataRequiredToQuote(event) {
        console.log('the value received from child stack section is' +event.detail );
        this.moveNextToDataRequiredToQuoteVal=event.detail;
        if(this.moveNextToDataRequiredToQuoteVal==true)
        {
            this.dataRequiredPathHandler(event);
        }
    }

    openSuccessLWC(event)
    {
        console.log('the value received from child program stack section is' +event.detail );
        this.formCompletionStatus=event.detail;
        if(this.formCompletionStatus==true)
        {
            console.log('data matched');
        }
    }

    refreshPage(){
        window.location.reload();
    }

    passEmpBrokerDetailsToDataRequiredToQuote(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-data-required-to-quote-lwc").getDataFromEmpAndBroker(event);
    }

    passOppDetailsToRequested(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-requested-terms-lwc").getOppDataFromEmp(event);
    }

    passOppDetailsToStack(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-data-required-to-quote-lwc").getOppDataFromReq(event);
    }

    dataRequiredPathHandler(event) {
        let targetValue = event.currentTarget.value;
        let selectedvalue = event.currentTarget.label;
        this.currentvalue = "5";
        this.selectedvalue = "Data Required to Quote";
    }

    
    userInfoPathHandler(event) {
        console.log('the value received from child personal info section is' +event.detail );
        this.moveNextToEmpVal=event.detail;
        if(this.moveNextToEmpVal==true)
        {
            this.empPathHandler(event);
        }
    }

    moveBackToPersonalInfoSection(event) {
        console.log('the value received from child employer section is' +event.detail );
        this.moveBackToPersonalInfoSectionVal=event.detail;
        if(this.moveBackToPersonalInfoSectionVal==true)
        {
            this.personalInfoPathHandler(event);
        }
    }

    showSpinnerAndPassPersonalinfoToEmpsection(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-employer-information-lwc").handlePersonalInformationSubmit(event);
    }

    passRequestDetailsToStack(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-stack-program-selection-lwc").getDataFromReq(event);
    }

    passDetailsToDataRequiredToQuote(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-data-required-to-quote-lwc").storeUserInfo(event);
    }

    moveSelectedStackToDataRequiredToQuote(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-data-required-to-quote-lwc").storeStackInfo(event);
    }

    moveBackToStackSection(event) {
        console.log('the value received from data required to quote section is' +event.detail );
        this.moveBackToStackSectionVal=event.detail;
        if(this.moveBackToStackSectionVal==true)
        {
            this.stackPathHandler(event);
        }
    }

    passEmployerDetailsToBrokersection(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-broker-info-lwc").handleEmployerDetails(event);
    }

    passBrokerFirmDetailsToBroker(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-broker-info-lwc").handleBrokerFirmDetails(event);
    }

    passBrokerPrimaryDetailsToBroker(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-broker-info-lwc").handleBrokerPrimaryDetails(event);
    }

    passBrokerSecondaryDetailsToBroker(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-broker-info-lwc").handleBrokerSecondaryDetails(event);
    }

    passBrokerTertiaryDetailsToBroker(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-broker-info-lwc").handleBrokerTertiaryDetails(event);
    }

    passBrokerProducerDetailsToBroker(event){
        this.showSpinner = true;
        this.helpText = "Checking Website....";
        this.template.querySelector("c-broker-info-lwc").handleBrokerProducerDetails(event);
    }

    
 }