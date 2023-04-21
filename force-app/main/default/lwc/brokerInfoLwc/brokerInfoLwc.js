import { LightningElement, api,track, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ID_FIELD from '@salesforce/schema/Account.Id';
import AC_ID_FIELD from '@salesforce/schema/Account.Id';
import CON_ID_FIELD from '@salesforce/schema/Contact.Id';
import EMPLOYER_ACCOUNT_RECORD_TYPE from '@salesforce/schema/Account.RecordTypeId';
import EMPLOYER_ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import PRIMARY_TELEPHONE from '@salesforce/schema/Account.Primary_Telephone__c';
import WEBSITE from '@salesforce/schema/Account.Website';
import SIC from '@salesforce/schema/Account.SIC_Code_and_Description__c';
import ADDITIONAL_LOCATION from '@salesforce/schema/Account.Additional_Locations__c';
import FEDERAL_EMPLOYEE_ID from '@salesforce/schema/Account.FEIN__c';
import BILLING_STREET from '@salesforce/schema/Account.BillingStreet';
import BILLING_CITY from '@salesforce/schema/Account.BillingCity';
import BILLING_STATE from '@salesforce/schema/Account.BillingState';
import BILLING_ZIPCODE from '@salesforce/schema/Account.BillingPostalCode';
import BILLING_COUNTRY from '@salesforce/schema/Account.BillingCountry';
import STATE_CATEGORY from '@salesforce/schema/Account.State_Category__c';
import Broker_Assignment_Firm from '@salesforce/schema/Account.Broker_Assignment_Firm__c';
import BROKER_ASSIGNMENT_FIRM_NAME from '@salesforce/schema/Account.Name';
import BROKER_PRIMARY_CONTACT from '@salesforce/schema/Account.Broker_Primary_Contact__c';
import BROKER_SECONDARY_CONTACT from '@salesforce/schema/Account.Broker_Secondary_Contact__c';
import BROKER_TERTIARY_CONTACT from '@salesforce/schema/Account.Broker_Tertiary_Contact__c';
import BROKER_PRODUCER_CONTACT from '@salesforce/schema/Account.Broker_Producer__c';
import ACCOUNT_SOURCE from '@salesforce/schema/Account.AccountSource__c';
import CONTACT_SOURCE from '@salesforce/schema/Contact.ContactSource__c';
import PRIMARY_FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import PRIMARY_LAST_NAME from '@salesforce/schema/Contact.LastName';
import PRIMARY_TITLE from '@salesforce/schema/Contact.Title';
import PRIMARY_PHONE from '@salesforce/schema/Contact.Phone';
import PRIMARY_EMAIL from '@salesforce/schema/Contact.Email';
import SECONDARY_FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import SECONDARY_LAST_NAME from '@salesforce/schema/Contact.LastName';
import SECONDARY_TITLE from '@salesforce/schema/Contact.Title';
import SECONDARY_PHONE from '@salesforce/schema/Contact.Phone';
import SECONDARY_EMAIL from '@salesforce/schema/Contact.Email';
import SECONDARY_CONTACT_ACCOUNT from '@salesforce/schema/Contact.AccountId';
import PRIMARY_CONTACT_OBJECT from '@salesforce/schema/Contact';
import SECONDARY_CONTACT_OBJECT from '@salesforce/schema/Contact';
import TERTIARY_CONTACT_OBJECT from '@salesforce/schema/Contact';
import PRODUCER_CONTACT_OBJECT from '@salesforce/schema/Contact';
import TERTIARY_FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import TERTIARY_LAST_NAME from '@salesforce/schema/Contact.LastName';
import TERTIARY_TITLE from '@salesforce/schema/Contact.Title';
import TERTIARY_PHONE from '@salesforce/schema/Contact.Phone';
import TERTIARY_EMAIL from '@salesforce/schema/Contact.Email';
import PRODUCER_FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import PRODUCER_LAST_NAME from '@salesforce/schema/Contact.LastName';
import PRODUCER_TITLE from '@salesforce/schema/Contact.Title';
import PRODUCER_PHONE from '@salesforce/schema/Contact.Phone';
import PRODUCER_EMAIL from '@salesforce/schema/Contact.Email';
import ACCOUNT_RECORD_TYPE from '@salesforce/schema/Account.RecordTypeId';

import ELIGIBLE_EMPLOYEES from '@salesforce/schema/Opportunity.Number_of_Eligible_Employees__c';
import ENROLLED_EMPLOYEES from '@salesforce/schema/Opportunity.Enrolled_Employees__c';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import OPPORTUNITY_TYPE from '@salesforce/schema/Opportunity.Opportunity_Type__c';

import updateEmployerAccountWithContact from '@salesforce/apex/IntakeFormWebsiteSearchController.updateEmployerAccountWithContact';
import saveContactRecord from '@salesforce/apex/IntakeFormWebsiteSearchController.saveContactRecord';
import { createRecord, updateRecord } from 'lightning/uiRecordApi';
import findBrokerAccount from '@salesforce/apex/IntakeFormWebsiteSearchController.findBrokerAccount';
import fetchStates from '@salesforce/apex/IntakeFormWebsiteSearchController.fetchStateRecs';

const COLUMNS = [
  { label: 'Label', fieldName: 'State__c' },
  { label: 'Value', fieldName: 'State_Value__c' },
  { label: 'Category', fieldName: 'State_Category__c' }
];

export default class BrokerInfoLwc extends LightningElement {
  showSpinner = false;
  helpText = "Loading...";
  @api selectedval;
  @api employerDetails;
  @api isMovingBacktoEmp = false;
  isBrokerTertiaryContactAlreadyExisting = false;
  @api isMovingNexttoRequested = false;
  employerRecordId = ""; brokersFirmEmployerId = ""; 
  employerInfoRecordCreate = "";
  employerInfoRecordUpdate = "";

  accountId = "";
  brokerAccountId = "";
  brokerPrimaryContactCreate = "";
  brokerSecondaryContactCreate = "";
  brokerTertiaryContactCreate = "";
  brokerProducerContactCreate = "";
  /*Account Fields */
  accountNameField = ACCOUNT_NAME;
  brokerPrimaryContactField = BROKER_PRIMARY_CONTACT;
  brokerSecondaryContactField = BROKER_SECONDARY_CONTACT;
  brokerTertiaryContactField = BROKER_TERTIARY_CONTACT;
  brokerProducerContactField = BROKER_PRODUCER_CONTACT;
  brokerAssignmentFirmField = Broker_Assignment_Firm;
  websiteField=WEBSITE;
  /*Contact Fields */
  primaryFirstNameField = PRIMARY_FIRST_NAME;
  primaryLastNameField = PRIMARY_LAST_NAME;
  primaryTitleField = PRIMARY_TITLE;
  primaryPhoneField = PRIMARY_PHONE;
  primaryEmailField = PRIMARY_EMAIL;
  secondaryFirstNameField = SECONDARY_FIRST_NAME;
  secondaryLastNameField = SECONDARY_LAST_NAME;
  secondaryTitleField = SECONDARY_TITLE;
  secondaryPhoneField = SECONDARY_PHONE;
  secondaryEmailField = SECONDARY_EMAIL;
  secondaryAccountId = SECONDARY_CONTACT_ACCOUNT;
  tertiaryFirstNameField = TERTIARY_FIRST_NAME;
  tertiaryLastNameField = TERTIARY_LAST_NAME;
  tertiaryTitleField = TERTIARY_TITLE;
  tertiaryPhoneField = TERTIARY_PHONE;
  tertiaryEmailField = TERTIARY_EMAIL;
  producerFirstNameField = PRODUCER_FIRST_NAME;
  producerLastNameField = PRODUCER_LAST_NAME;
  producerTitleField = PRODUCER_TITLE;
  producerPhoneField = PRODUCER_PHONE;
  producerEmailField = PRODUCER_EMAIL;

  secondaryContactRecord = {};

  accountNameValue = "";
  brokerPrimaryContactValue = "";
  brokerSecondaryContactValue = "";
  brokerTertiaryContactValue = "";
  brokerProducerContactValue = "";

  primaryIdValue = "";
  primaryFirstNameValue = "";
  primaryLastNameValue = "";
  primaryTitleValue = "";
  primaryPhoneValue = "";
  primaryEmailValue = "";
  secondaryIdValue = "";
  secondaryFirstNameValue = "";
  secondaryLastNameValue = "";
  secondaryTitleValue = "";
  secondaryPhoneValue = "";
  secondaryEmailValue = "";
  tertiaryIdValue = "";
  tertiaryFirstNameValue = "";
  tertiaryLastNameValue = "";
  tertiaryTitleValue = "";
  tertiaryPhoneValue = "";
  tertiaryEmailValue = "";
  producerIdValue = "";
  producerFirstNameValue = "";
  producerLastNameValue = "";
  producerTitleValue = "";
  producerPhoneValue = "";
  producerEmailValue = "";
  brokerProducerId = "";
  @track firmstateValue = 'None';
  billingStreetField = BILLING_STREET;
  billingCityField = BILLING_CITY;
  billingStateField = BILLING_STATE;
  billingZipCodeField = BILLING_ZIPCODE;
  billingCountryField = BILLING_COUNTRY;
  brokerFirmBillingStreetValue = "";
  brokerFirmBillingCityValue = "";
  brokerFirmBillingZipCodeValue = "";
  billingCountryValue = "";
  brokerFirmWebsiteValue = "";
  newBrokerFirmDetails;
  searchKey="";
  /** */
  /**Opp fields from emp section */
  numberOfEligibleEmployees = "";
  stateCategory = "";
  enrolledEmployees = "";
  intakeFormUserName = "";
  intakeFormUserTitle = "";
  intakeFormUserEmail = "";
  oppType="";
  brokerFirmId = "";
  employerRecordId = "";
  updateEmployerRecordWithBrokerFirmAccountAndContacts = {};
  secondaryContactExists = false;
  tertiaryContactExists = false;
  producerContactExists = false;
  @track isBrokerupdated = false;
  @track isBrokerPrimaryUpdated = false;
  @track isBrokerSecondaryUpdated = false;
  @track isBrokerTertiaryUpdated = false;  
  @track isBrokerProducerUpdated = false;

  value = ['option1'];
  @track l_All_Types;
  @track TypeOptions;
  @track staterecords;
  wiredStateRecords;
  error;
  columns = COLUMNS;

  get isValueString() {
    return this.selectedval === 'Broker Information';
  }
  handleBrokerNameInputChange(event) {
    this.accountNameValue = event.target.value;
  }

    /**Method to populate billing state in a dynamic dropdown format
   */
    @wire( fetchStates )  
    wiredRecs( value ) {
        this.wiredStateRecords = value;
        const { data, error } = value;
        if ( data ) {             
            this.staterecords = data;
            this.error = undefined;
            try {
              this.l_All_Types = data; 
              let options = [];
              for (var key in data) {
                  // Here key will have index of list of records starting from 0,1,2,....
                  options.push({ label: data[key].State__c, value: data[key].State_Value__c, category: data[key].State_Category__c  });
                  // Here Name and Id are fields from sObject list.
              }
              this.TypeOptions = options;
              //console.log('TypeOptions>>'+JSON.stringify(this.TypeOptions));
          } catch (error) {
              console.error('check error here', error);
          }
        } else if ( error ) {
            this.error = error;
            this.staterecords = undefined;
        }
    } 


  handlePrimaryContactInputChange(event) {
    if (event.target.fieldName == "FirstName") {
      this.primaryFirstNameValue = event.target.value;
    }
    if (event.target.fieldName == "LastName") {
      this.primaryLastNameValue = event.target.value;
    }
    if (event.target.fieldName == "Title") {
      this.primaryTitleValue = event.target.value;
    }
    if (event.target.fieldName == "Phone") {
      console.log('changed phone value>>>' + event.target.value);
      var s = (""+event.target.value).replace(/\D/g, '');
      var m = s.match(/^(\d{3})(\d{3})(\d{4})$/);
      var formattedPhone = (!m) ? event.target.value : "(" + m[1] + ") " + m[2] + "-" + m[3];
      this.primaryPhoneValue = formattedPhone;
      console.log('formatted phone value>>>' + this.primaryPhoneValue);
    }
    if (event.target.fieldName == "Email") {
      this.primaryEmailValue = event.target.value;
    }
  }

  handleSecondaryContactInputChange(event) {
    if (event.target.fieldName == "FirstName") {
      this.secondaryFirstNameValue = event.target.value;
    }
    if (event.target.fieldName == "LastName") {
      this.secondaryLastNameValue = event.target.value;
    }
    if (event.target.fieldName == "Title") {
      this.secondaryTitleValue = event.target.value;
    }
    if (event.target.fieldName == "Phone") {
      var s = (""+event.target.value).replace(/\D/g, '');
      var m = s.match(/^(\d{3})(\d{3})(\d{4})$/);
      var formattedPhone = (!m) ? event.target.value : "(" + m[1] + ") " + m[2] + "-" + m[3];
      this.secondaryPhoneValue = formattedPhone;
    }
    if (event.target.fieldName == "Email") {
      this.secondaryEmailValue = event.target.value;
    }
  }

  handleTertiaryContactInputChange(event) {

    if (event.target.fieldName == "FirstName") {
      this.tertiaryFirstNameValue = event.target.value;
    }
    if (event.target.fieldName == "LastName") {
      this.tertiaryLastNameValue = event.target.value;
    }
    if (event.target.fieldName == "Title") {
      this.tertiaryTitleValue = event.target.value;
    }
    if (event.target.fieldName == "Phone") {
      var s = (""+event.target.value).replace(/\D/g, '');
      var m = s.match(/^(\d{3})(\d{3})(\d{4})$/);
      var formattedPhone = (!m) ? event.target.value : "(" + m[1] + ") " + m[2] + "-" + m[3];
      this.tertiaryPhoneValue = formattedPhone;
    }
    if (event.target.fieldName == "Email") {
      this.tertiaryEmailValue = event.target.value;
    }
  }

  handleProducerContactInputChange(event) {
    console.log('event.target.fieldName'+event.target.fieldName)
    
    if (event.target.fieldName == "FirstName") {
      this.producerFirstNameValue = event.target.value;
    }
    if (event.target.fieldName == "LastName") {
      this.producerLastNameValue = event.target.value;
    }
    if (event.target.fieldName == "Title") {
      this.producerTitleValue = event.target.value;
      console.log('this.producerTitleValue'+this.producerTitleValue)
    }
    if (event.target.fieldName == "Phone") {
      var s = (""+event.target.value).replace(/\D/g, '');
      var m = s.match(/^(\d{3})(\d{3})(\d{4})$/);
      var formattedPhone = (!m) ? event.target.value : "(" + m[1] + ") " + m[2] + "-" + m[3];
      this.producerPhoneValue = formattedPhone;
    }
    if (event.target.fieldName == "Email") {
      this.producerEmailValue = event.target.value;
    }
  }

  handleSecondaryLastNameChange(event){
    this.secondaryLastNameValue = event.target.value;
  }

  handleTertiaryLastNameChange(event){
    this.tertiaryLastNameValue = event.target.value;
  }

  handleProducerLastNameChange(event){
    this.producerLastNameValue = event.target.value;
  }

  async handlePrimaryEmailInputChange(event) {
    console.log('primary email changed value is >'+ event.target.value);
      this.searchKey = event.target.value;
      if (this.searchKey != "") {
        findBrokerAccount({ searchKey: this.searchKey })
          .then(result => {
            if (result.length > 0) {
              this.newBrokerFirmDetails = result[0];
              this.populateValuesBrokerFirm(this.newBrokerFirmDetails);
              this.populateValuesToBrokerPrimaryContact(this.newBrokerFirmDetails);
            }
              else {
                this.isBrokerupdated = false;
                this.isBrokerPrimaryUpdated = false;
                this.primaryEmailValue = this.searchKey;
              }
              //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
            })
            .catch(error => {
              //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
              this.error = error;
            });
    }
}

async handleSecondaryEmailInputChange(event) {
    this.searchKey = event.target.value;
    console.log('value of search key is' + this.searchKey);
    if (this.searchKey != "") {
      findBrokerAccount({ searchKey: this.searchKey })
        .then(result => {
          if (result.length > 0) {
            this.newBrokerFirmDetails = result[0];
            if(this.isBrokerupdated == false){
            this.populateValuesBrokerFirm(this.newBrokerFirmDetails);
            this.populateValuesToBrokerSecondaryContact(this.newBrokerFirmDetails);
            }
          }
            else {
              console.log('in else block>>>')
              this.isBrokerupdated = false;
              this.isBrokerSecondaryUpdated = false;
              this.secondaryEmailValue = this.searchKey;
              console.log('secondary email value is>>>'+this.secondaryEmailValue);
            }
            //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
          })
          .catch(error => {
            //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
            this.error = error;
          });
  }
}

handleTertiaryEmailInputChange(event) {
    this.searchKey = event.target.value;
    if (this.searchKey != "") {
      findBrokerAccount({ searchKey: this.searchKey })
        .then(result => {
          if (result.length > 0) {
            this.newBrokerFirmDetails = result[0];
            if(this.isBrokerupdated == false){
            this.populateValuesBrokerFirm(this.newBrokerFirmDetails);
            this.populateValuesToBrokerTertiaryContact(this.newBrokerFirmDetails);
            }
          }
            else {
              this.isBrokerupdated = false;
              this.isBrokerTertiaryUpdated = false;
              this.tertiaryEmailValue = this.searchKey;
            }
            //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
          })
          .catch(error => {
            //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
            this.error = error;
          });
  }
}

async handleProducerEmailInputChange(event) {
    this.searchKey = event.target.value;
    if (this.searchKey != "") {
      findBrokerAccount({ searchKey: this.searchKey })
        .then(result => {
          if (result.length > 0) {
            this.newBrokerFirmDetails = result[0];
            if(this.isBrokerupdated == false){
            this.populateValuesBrokerFirm(this.newBrokerFirmDetails);
            this.populateValuesToBrokerProducerContact(this.newBrokerFirmDetails);
            }
          }
            else {
              this.isBrokerupdated = false;
              this.isBrokerProducerUpdated = false;
              this.producerEmailValue = this.searchKey;
            }
            //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
          })
          .catch(error => {
            //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
            this.error = error;
          });
  }
}

populateValuesBrokerFirm(result) {
  this.isBrokerupdated = true;
  this.accountNameValue = result.Account.Name;
  this.brokerFirmBillingStreetValue = result.Account.BillingStreet;
  this.brokerFirmBillingCityValue = result.Account.BillingCity;
  this.brokerFirmBillingZipCodeValue = result.Account.BillingPostalCode;
  this.billingCountryValue = result.Account.BillingCountry;
  this.brokerFirmWebsiteValue = result.Account.Website;
  this.firmstateValue = result.Account.BillingState;
}

populateValuesToBrokerPrimaryContact(result) {
  this.isBrokerupdated = true;
  this.primaryIdValue = result.Id;
  this.primaryFirstNameValue = result.FirstName;
  this.primaryLastNameValue = result.LastName;
  this.primaryTitleValue = result.Title;
  this.primaryEmailValue = result.Email;
  this.primaryPhoneValue = result.Phone;
}

populateValuesToBrokerSecondaryContact(result) {
  this.isBrokerupdated = true;
  this.secondaryIdValue = result.Id;
  this.secondaryFirstNameValue = result.FirstName;
  this.secondaryLastNameValue = result.LastName;
  this.secondaryTitleValue = result.Title;
  this.secondaryEmailValue = result.Email;
  this.secondaryPhoneValue = result.Phone;
}

populateValuesToBrokerTertiaryContact(result) {
  this.isBrokerupdated = true;
  this.tertiaryIdValue = result.Id;
  this.tertiaryFirstNameValue = result.FirstName;
  this.tertiaryLastNameValue = result.LastName;
  this.tertiaryTitleValue = result.Title;
  this.tertiaryEmailValue = result.Email;
  this.tertiaryPhoneValue = result.Phone;
}

populateValuesToBrokerProducerContact(result) {
  this.isBrokerupdated = true;
  this.producerIdValue = result.Id;
  this.producerFirstNameValue = result.FirstName;
  this.producerLastNameValue = result.LastName;
  this.producerTitleValue = result.Title;
  this.producerEmailValue = result.Email;
  this.producerPhoneValue = result.Phone;
}


  handleInputChange(event) {
    if (event.target.fieldName == "BillingStreet") {
      this.brokerFirmBillingStreetValue = event.target.value;
    }
    if (event.target.fieldName == "BillingCity") {
      this.brokerFirmBillingCityValue = event.target.value;
    }
    if (event.target.fieldName == "BillingPostalCode") {
      this.brokerFirmBillingZipCodeValue = event.target.value;
    }
    if (event.target.fieldName == "BillingCountry") {
      this.billingCountryValue = event.target.value;
    }
  }

  handleBrokerWebsiteValue(event)
  {
    this.brokerFirmWebsiteValue = event.target.value;
  }
 

  /**
   * method called from employerInformationLwc component using dispatch event 
   * @param {*} event : {"showspinner":false,"helpText":"Checking if any website exists....","empRecordInput":{"apiName":"Account","fields":{"Name":"Test cust creation","Primary_Telephone__c":"(999) 999-9999","Website":"Testcustcreation.com","SIC_Code_and_Description__c":"a1j4C0000023ZnLQAU","Additional_Locations__c":"None Reported","BillingStreet":"Test Street","BillingCity":"Beaumont","BillingState":"Texas","BillingPostalCode":"77705","BillingCountry":"United States","RecordTypeId":"0121I000000JPf0QAG","Id":"0014C00000ov8UhQAI"}}} 
   */
    @api handleEmployerDetails(event) {
      let employerRecordFieldsWithValues = event.detail.empRecordInput.fields;
      console.log('emp details are as follows>>>' + JSON.stringify(employerRecordFieldsWithValues));
      if (employerRecordFieldsWithValues.Id != "") {
        this.employerInfoRecordUpdate = employerRecordFieldsWithValues;
      }
      else
      {
        this.employerInfoRecordCreate = employerRecordFieldsWithValues;
      }
      this.numberOfEligibleEmployees = employerRecordFieldsWithValues.Number_of_Eligible_Employees__c;
      this.enrolledEmployees = employerRecordFieldsWithValues.Enrolled_Employees__c;
      this.oppType=employerRecordFieldsWithValues.Opportunity_Type__c;
      this.stateCategory=employerRecordFieldsWithValues.State_Category__c;
    }

    /**
   * method called from employerInformationLwc component using dispatch event 
   * @param {*} event : {"showspinner":false,"helpText":"Checking if any website exists....","empRecordInput":{"apiName":"Account","fields":{"Name":"Test cust creation","Primary_Telephone__c":"(999) 999-9999","Website":"Testcustcreation.com","SIC_Code_and_Description__c":"a1j4C0000023ZnLQAU","Additional_Locations__c":"None Reported","BillingStreet":"Test Street","BillingCity":"Beaumont","BillingState":"Texas","BillingPostalCode":"77705","BillingCountry":"United States","RecordTypeId":"0121I000000JPf0QAG","Id":"0014C00000ov8UhQAI"}}} 
   */
    @api handleBrokerFirmDetails(event) {
      let brokerFirmFieldsWithValues = event.detail.brokerFirmRecordInput.brokerfields;
      console.log('brokerFirmFieldsWithValues>>>' + JSON.stringify(brokerFirmFieldsWithValues))
      if(brokerFirmFieldsWithValues.Id == "") {
          this.brokerFirmId = "";
          if(this.accountNameValue == "")
          {
            this.accountNameValue = brokerFirmFieldsWithValues.Name;
          }
          if(this.brokerFirmWebsiteValue == "")
          {
            this.brokerFirmWebsiteValue = brokerFirmFieldsWithValues.Website;
          }
          if(this.brokerFirmBillingStreetValue == "")
          {
            this.brokerFirmBillingStreetValue = brokerFirmFieldsWithValues.BillingStreet;
          }
          if(this.brokerFirmBillingCityValue == "")
          {
            this.brokerFirmBillingCityValue = brokerFirmFieldsWithValues.BillingCity;
          }
          if(this.brokerFirmBillingZipCodeValue == "")
          {
            this.brokerFirmBillingZipCodeValue = brokerFirmFieldsWithValues.BillingPostalCode;
          }
          if(this.billingCountryValue == "")
          {
            this.billingCountryValue = brokerFirmFieldsWithValues.BillingCountry;
          }
          if(this.firmstateValue == "None")
          {
            this.firmstateValue = brokerFirmFieldsWithValues.BillingState;
          }
        }
      else if(this.brokerFirmId != brokerFirmFieldsWithValues.Id)
      {
        this.brokerFirmId = brokerFirmFieldsWithValues.Id;
        this.accountNameValue = brokerFirmFieldsWithValues.Name;
        this.brokerFirmWebsiteValue = brokerFirmFieldsWithValues.Website;
        this.brokerFirmBillingStreetValue = brokerFirmFieldsWithValues.BillingStreet;
        this.brokerFirmBillingCityValue = brokerFirmFieldsWithValues.BillingCity;
        this.brokerFirmBillingZipCodeValue = brokerFirmFieldsWithValues.BillingPostalCode;
        this.billingCountryValue = brokerFirmFieldsWithValues.BillingCountry;
        this.firmstateValue = brokerFirmFieldsWithValues.BillingState;
      }
  }
    
    /**
   * method called from employerInformationLwc component using dispatch event 
   * @param {*} event : {"showspinner":false,"helpText":"Checking if any website exists....","empRecordInput":{"apiName":"Account","fields":{"Name":"Test cust creation","Primary_Telephone__c":"(999) 999-9999","Website":"Testcustcreation.com","SIC_Code_and_Description__c":"a1j4C0000023ZnLQAU","Additional_Locations__c":"None Reported","BillingStreet":"Test Street","BillingCity":"Beaumont","BillingState":"Texas","BillingPostalCode":"77705","BillingCountry":"United States","RecordTypeId":"0121I000000JPf0QAG","Id":"0014C00000ov8UhQAI"}}} 
   */
    @api handleBrokerPrimaryDetails(event) {
      let brokerPrimaryFieldsWithValues = event.detail.brokerPrimaryRecordInput.brokerprimaryfields;
      console.log('brokerPrimaryFiledsvalues>>>' + JSON.stringify(brokerPrimaryFieldsWithValues))
      if(brokerPrimaryFieldsWithValues.Id == "") {
        this.primaryIdValue = "";
        if(this.primaryFirstNameValue == ""){
          this.primaryFirstNameValue = brokerPrimaryFieldsWithValues.FirstName;
          }
          if(this.primaryLastNameValue == ""){
            this.primaryLastNameValue = brokerPrimaryFieldsWithValues.LastName;
            }
          if(this.primaryTitleValue == ""){
              this.primaryTitleValue = brokerPrimaryFieldsWithValues.Title;
            }
          if(this.primaryEmailValue == ""){
              this.primaryEmailValue = brokerPrimaryFieldsWithValues.Email;
            }      
          if(this.primaryPhoneValue == ""){
              this.primaryPhoneValue = brokerPrimaryFieldsWithValues.Phone;
            }  
      }
      else if(this.primaryIdValue != brokerPrimaryFieldsWithValues.Id)
      {
      this.primaryIdValue = brokerPrimaryFieldsWithValues.Id;
      this.primaryFirstNameValue = brokerPrimaryFieldsWithValues.FirstName;
      this.primaryLastNameValue = brokerPrimaryFieldsWithValues.LastName;
      this.primaryTitleValue = brokerPrimaryFieldsWithValues.Title;
      this.primaryEmailValue = brokerPrimaryFieldsWithValues.Email;   
      this.primaryPhoneValue = brokerPrimaryFieldsWithValues.Phone;
    }
  }
    
    /**
   * method called from employerInformationLwc component using dispatch event 
   * @param {*} event : {"showspinner":false,"helpText":"Checking if any website exists....","empRecordInput":{"apiName":"Account","fields":{"Name":"Test cust creation","Primary_Telephone__c":"(999) 999-9999","Website":"Testcustcreation.com","SIC_Code_and_Description__c":"a1j4C0000023ZnLQAU","Additional_Locations__c":"None Reported","BillingStreet":"Test Street","BillingCity":"Beaumont","BillingState":"Texas","BillingPostalCode":"77705","BillingCountry":"United States","RecordTypeId":"0121I000000JPf0QAG","Id":"0014C00000ov8UhQAI"}}} 
   */
    @api handleBrokerSecondaryDetails(event) {
      let brokerSecondaryFieldsWithValues = event.detail.brokerSecondaryRecordInput.brokersecondaryfields;
      console.log('Secondary contact values>>>' + JSON.stringify(brokerSecondaryFieldsWithValues));
      if(brokerSecondaryFieldsWithValues.Id == "") {
        this.secondaryIdValue = "";
        if(this.secondaryFirstNameValue == ""){
          this.secondaryFirstNameValue = brokerSecondaryFieldsWithValues.FirstName;
          }
          if(this.secondaryLastNameValue == ""){
            this.secondaryLastNameValue = brokerSecondaryFieldsWithValues.LastName;
            }
          if(this.secondaryTitleValue == ""){
              this.secondaryTitleValue = brokerSecondaryFieldsWithValues.Title;
            }
          if(this.secondaryEmailValue == ""){
              this.secondaryEmailValue = brokerSecondaryFieldsWithValues.Email;
            }      
          if(this.secondaryPhoneValue == ""){
              this.secondaryPhoneValue = brokerSecondaryFieldsWithValues.Phone;
        } 
      }
      else if(this.secondaryIdValue != brokerSecondaryFieldsWithValues.Id)
      {
        this.secondaryIdValue = brokerSecondaryFieldsWithValues.Id;
        this.secondaryFirstNameValue = brokerSecondaryFieldsWithValues.FirstName;
        this.secondaryLastNameValue = brokerSecondaryFieldsWithValues.LastName;
        this.secondaryTitleValue = brokerSecondaryFieldsWithValues.Title;
        this.secondaryEmailValue = brokerSecondaryFieldsWithValues.Email;
        this.secondaryPhoneValue = brokerSecondaryFieldsWithValues.Phone;
    }
    }  

  /**
   * method called from employerInformationLwc component using dispatch event 
   * @param {*} event : {"showspinner":false,"helpText":"Checking if any website exists....","empRecordInput":{"apiName":"Account","fields":{"Name":"Test cust creation","Primary_Telephone__c":"(999) 999-9999","Website":"Testcustcreation.com","SIC_Code_and_Description__c":"a1j4C0000023ZnLQAU","Additional_Locations__c":"None Reported","BillingStreet":"Test Street","BillingCity":"Beaumont","BillingState":"Texas","BillingPostalCode":"77705","BillingCountry":"United States","RecordTypeId":"0121I000000JPf0QAG","Id":"0014C00000ov8UhQAI"}}} 
   */
      @api handleBrokerTertiaryDetails(event) {
        let brokerTertiaryFieldsWithValues = event.detail.brokerTertiaryRecordInput.brokertertiaryfields;
        if(brokerTertiaryFieldsWithValues.Id == "") {
          this.tertiaryIdValue = "";
          if(this.tertiaryFirstNameValue == ""){
            this.tertiaryFirstNameValue = brokerTertiaryFieldsWithValues.FirstName;
            }
            if(this.tertiaryLastNameValue == ""){
              this.tertiaryLastNameValue = brokerTertiaryFieldsWithValues.LastName;
              }
            if(this.tertiaryTitleValue == ""){
                this.tertiaryTitleValue = brokerTertiaryFieldsWithValues.Title;
              }
            if(this.tertiaryEmailValue == ""){
                this.tertiaryEmailValue = brokerTertiaryFieldsWithValues.Email;
              }      
            if(this.tertiaryPhoneValue == ""){
                this.tertiaryPhoneValue = brokerTertiaryFieldsWithValues.Phone;
          } 
        }
        else if(this.tertiaryIdValue != brokerTertiaryFieldsWithValues.Id)
        {
          this.tertiaryIdValue = brokerTertiaryFieldsWithValues.Id;
          this.tertiaryFirstNameValue = brokerTertiaryFieldsWithValues.FirstName;
          this.tertiaryLastNameValue = brokerTertiaryFieldsWithValues.LastName;
          this.tertiaryTitleValue = brokerTertiaryFieldsWithValues.Title;
          this.tertiaryEmailValue = brokerTertiaryFieldsWithValues.Email;
          this.tertiaryPhoneValue = brokerTertiaryFieldsWithValues.Phone;
        } 
      }  
      
    /**
   * method called from employerInformationLwc component using dispatch event 
   * @param {*} event : {"showspinner":false,"helpText":"Checking if any website exists....","empRecordInput":{"apiName":"Account","fields":{"Name":"Test cust creation","Primary_Telephone__c":"(999) 999-9999","Website":"Testcustcreation.com","SIC_Code_and_Description__c":"a1j4C0000023ZnLQAU","Additional_Locations__c":"None Reported","BillingStreet":"Test Street","BillingCity":"Beaumont","BillingState":"Texas","BillingPostalCode":"77705","BillingCountry":"United States","RecordTypeId":"0121I000000JPf0QAG","Id":"0014C00000ov8UhQAI"}}} 
   */
    @api handleBrokerProducerDetails(event) {
      let brokerProducerFieldsWithValues = event.detail.brokerProducerRecordInput.brokerproducerfields;
      if(brokerProducerFieldsWithValues.Id == "") {
        this.producerIdValue = "";
        if(this.producerFirstNameValue == ""){
          this.producerFirstNameValue = brokerProducerFieldsWithValues.FirstName;
          }
          if(this.producerLastNameValue == ""){
            this.producerLastNameValue = brokerProducerFieldsWithValues.LastName;
            }
          if(this.producerTitleValue == ""){
              this.producerTitleValue = brokerProducerFieldsWithValues.Title;
            }
          if(this.producerEmailValue == ""){
              this.producerEmailValue = brokerProducerFieldsWithValues.Email;
            }      
          if(this.producerPhoneValue == ""){
              this.producerPhoneValue = brokerProducerFieldsWithValues.Phone;
        } 
      }
      else if(this.producerIdValue != brokerProducerFieldsWithValues.Id)
      {
        this.producerIdValue = brokerProducerFieldsWithValues.Id;
        this.producerFirstNameValue = brokerProducerFieldsWithValues.FirstName;
        this.producerLastNameValue = brokerProducerFieldsWithValues.LastName;
        this.producerTitleValue = brokerProducerFieldsWithValues.Title;
        this.producerEmailValue = brokerProducerFieldsWithValues.Email;    
        this.producerPhoneValue = brokerProducerFieldsWithValues.Phone;
      } 
    }     
    

  toggleSpinnerAndToast(showSpinner, spinnerText, showToast, toastType , toastText){
    this.showSpinner = showSpinner;
    this.helpText = spinnerText;
    if(showToast){
      this.template.querySelector('c-custom-toast').showToast(toastType, toastText);
    }
  }

  handleBack(event) {
    this.isMovingBacktoEmp = true;
    const backtoempevent = new CustomEvent('backtoempevent', {
      detail: this.isMovingBacktoEmp
    });
    this.dispatchEvent(backtoempevent);
  }

  handleNextToRequested(event) {
    console.log('This value of primary email is>>'+ this.primaryEmailValue);
    console.log('This value of secondary email is>>'+ this.secondaryEmailValue);
    console.log('value of brokerfirm state is >>>' + this.firmstateValue);
    if (!this.validateInputFields()) {
      this.isMovingNexttoRequested = false;
      this.template.querySelector('c-custom-toast').showToast('error', 'Complete all the fields in this section.');
    }
    else{
      if(!this.validateInput())
      {
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Complete all the fields in this section.');
      }
      else if(this.secondaryLastNameValue != "" && this.secondaryFirstNameValue != "" && (this.secondaryEmailValue == ""
      || typeof this.secondaryEmailValue == "undefined")){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Secondary Contact Email.');
      }
      else if(this.tertiaryFirstNameValue != "" && this.tertiaryLastNameValue != "" && (this.tertiaryEmailValue == ""
      || typeof this.tertiaryEmailValue == "undefined")){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Tertiary Contact Email');
      }
      else if(this.producerFirstNameValue != "" && this.producerLastNameValue != "" && (this.producerEmailValue == ""
      || typeof this.producerEmailValue == "undefined")){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Producer Contact Email');
      } 
      else if(this.firmstateValue == 'None' || 
      typeof this.firmstateValue == undefined || this.firmstateValue == ''){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Broker Firm State');
      }
      else if(this.brokerFirmBillingStreetValue == ''){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Broker Firm Billing Street');
      }
      else if(this.brokerFirmBillingCityValue == ''){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Broker Firm Billing City');
      }
      else if(this.brokerFirmBillingZipCodeValue == ''){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Broker Firm Zip Code');
      }
      else if(this.billingCountryValue == ''){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Broker Firm Country');
      }
      else if(this.brokerFirmWebsiteValue == ''){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Broker Firm Website');
      }
      else if(this.accountNameValue == ''){
        this.isMovingNexttoRequested = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Please provide Broker Firm Name');
      }
      else{
      this.isMovingNexttoRequested = true;
      this.dispatchEventToDataRequiredToQuote(false, 'Checking if any website exists....');
      this.dispatchEventToRequestedTerms(false, 'Checking if any website exists....');
      }
    }

    //this.isMovingNexttoRequested = true;
    const nexttorequestedevent = new CustomEvent('nexttorequestedevent', {
      detail: this.isMovingNexttoRequested
    });
    this.dispatchEvent(nexttorequestedevent);
  }

  /**This method is to pass data from broker section to stack program so that when 
   * a user clicks on the submit button of the form, the contacts and accounts are created
   * or updated and then the opportunity is created.
   */
  dispatchEventToDataRequiredToQuote(showSpinner, helpText) {
    const employerfields = {};
    const brokerFields = {};
    const primaryContactFields = {};
    const secondaryContactFields = {};
    const tertiaryContactFields = {};
    const producerFields = {};
    console.log('values of emp are'+ JSON.stringify(this.employerInfoRecordUpdate));
    //Passing Employer Record Create Update data to last screen
    if (typeof this.employerInfoRecordUpdate.Id != "undefined") {
      //employerfields[ID_FIELD.fieldApiName] = this.employerInfoRecordCreate.fields.Id;
      employerfields[ID_FIELD.fieldApiName] = this.employerInfoRecordUpdate.Id;
      employerfields[EMPLOYER_ACCOUNT_NAME.fieldApiName] = this.employerInfoRecordUpdate.Name;
      employerfields[EMPLOYER_ACCOUNT_RECORD_TYPE.fieldApiName] = this.employerInfoRecordUpdate.RecordTypeId;
      employerfields[PRIMARY_TELEPHONE.fieldApiName] = this.employerInfoRecordUpdate.Primary_Telephone__c;
      employerfields[WEBSITE.fieldApiName] = this.employerInfoRecordUpdate.Website;
      employerfields[SIC.fieldApiName] = this.employerInfoRecordUpdate.SIC_Code_and_Description__c;
      employerfields[ADDITIONAL_LOCATION.fieldApiName] = this.employerInfoRecordUpdate.Additional_Locations__c;
      employerfields[FEDERAL_EMPLOYEE_ID.fieldApiName] = this.employerInfoRecordUpdate.FEIN__c;
      employerfields[BILLING_STREET.fieldApiName] = this.employerInfoRecordUpdate.BillingStreet;
      employerfields[BILLING_CITY.fieldApiName] = this.employerInfoRecordUpdate.BillingCity;
      employerfields[BILLING_STATE.fieldApiName] = this.employerInfoRecordUpdate.BillingState;
      employerfields[BILLING_ZIPCODE.fieldApiName] = this.employerInfoRecordUpdate.BillingPostalCode;
      employerfields[BILLING_COUNTRY.fieldApiName] = this.employerInfoRecordUpdate.BillingCountry;
      employerfields[STATE_CATEGORY.fieldApiName] = this.employerInfoRecordUpdate.State_Category__c;
    }
    else{
      employerfields[EMPLOYER_ACCOUNT_NAME.fieldApiName] = this.employerInfoRecordCreate.Name;
      employerfields[ACCOUNT_SOURCE.fieldApiName] = 'Intake Form';
      employerfields[EMPLOYER_ACCOUNT_RECORD_TYPE.fieldApiName] = this.employerInfoRecordCreate.RecordTypeId;
      employerfields[PRIMARY_TELEPHONE.fieldApiName] = this.employerInfoRecordCreate.Primary_Telephone__c;
      employerfields[WEBSITE.fieldApiName] = this.employerInfoRecordCreate.Website;
      employerfields[SIC.fieldApiName] = this.employerInfoRecordCreate.SIC_Code_and_Description__c;
      employerfields[ADDITIONAL_LOCATION.fieldApiName] = this.employerInfoRecordCreate.Additional_Locations__c;
      employerfields[FEDERAL_EMPLOYEE_ID.fieldApiName] = this.employerInfoRecordCreate.FEIN__c;
      employerfields[BILLING_STREET.fieldApiName] = this.employerInfoRecordCreate.BillingStreet;
      employerfields[BILLING_CITY.fieldApiName] = this.employerInfoRecordCreate.BillingCity;
      employerfields[BILLING_STATE.fieldApiName] = this.employerInfoRecordCreate.BillingState;
      employerfields[BILLING_ZIPCODE.fieldApiName] = this.employerInfoRecordCreate.BillingPostalCode;
      employerfields[BILLING_COUNTRY.fieldApiName] = this.employerInfoRecordCreate.BillingCountry;
    }
    const empRecordInput = { apiName: ACCOUNT_OBJECT.objectApiName, employerfields };
    //Passing Broker Firm Record Create Update data to last screen
    if (this.brokerFirmId == "") {
      brokerFields[ACCOUNT_RECORD_TYPE.fieldApiName] = '0121I000000JPeqQAG';
      brokerFields[BROKER_ASSIGNMENT_FIRM_NAME.fieldApiName] = this.accountNameValue;
      brokerFields[ACCOUNT_SOURCE.fieldApiName] = 'Intake Form';
      brokerFields[WEBSITE.fieldApiName] = this.brokerFirmWebsiteValue;
      brokerFields[BILLING_STREET.fieldApiName] = this.brokerFirmBillingStreetValue;
      brokerFields[BILLING_CITY.fieldApiName] = this.brokerFirmBillingCityValue;
      brokerFields[BILLING_STATE.fieldApiName] = this.firmstateValue;
      brokerFields[BILLING_ZIPCODE.fieldApiName] = this.brokerFirmBillingZipCodeValue;
      brokerFields[BILLING_COUNTRY.fieldApiName] = this.billingCountryValue;
    }
    else
    {
      brokerFields[AC_ID_FIELD.fieldApiName] = this.brokerFirmId;
      brokerFields[BROKER_ASSIGNMENT_FIRM_NAME.fieldApiName] = this.accountNameValue;
      brokerFields[WEBSITE.fieldApiName] = this.brokerFirmWebsiteValue;
      brokerFields[BILLING_STREET.fieldApiName] = this.brokerFirmBillingStreetValue;
      brokerFields[BILLING_CITY.fieldApiName] = this.brokerFirmBillingCityValue;
      brokerFields[BILLING_STATE.fieldApiName] = this.firmstateValue;
      brokerFields[BILLING_ZIPCODE.fieldApiName] = this.brokerFirmBillingZipCodeValue;
      brokerFields[BILLING_COUNTRY.fieldApiName] = this.billingCountryValue;
    }
    const brokerRecordInput = { apiName: ACCOUNT_OBJECT.objectApiName, brokerFields };

    //Passing Broker Primary Contact Record Create Update data to last screen
    if (this.primaryIdValue != "") {
    primaryContactFields[CON_ID_FIELD.fieldApiName] = this.primaryIdValue;
    }
    else{
      primaryContactFields[CONTACT_SOURCE.fieldApiName] = 'Intake Form';
    }
    primaryContactFields[PRIMARY_FIRST_NAME.fieldApiName] = this.primaryFirstNameValue;
    primaryContactFields[PRIMARY_LAST_NAME.fieldApiName] = this.primaryLastNameValue;
    primaryContactFields[PRIMARY_TITLE.fieldApiName] = this.primaryTitleValue;
    primaryContactFields[PRIMARY_PHONE.fieldApiName] = this.primaryPhoneValue;
    primaryContactFields[PRIMARY_EMAIL.fieldApiName] = this.primaryEmailValue;
    const primaryContactRecordInput = { apiName: PRIMARY_CONTACT_OBJECT.objectApiName, primaryContactFields };

    //Passing Broker Secondary Contact Record Create Update data to last screen
    if (this.secondaryIdValue != "") {
      secondaryContactFields[CON_ID_FIELD.fieldApiName] = this.secondaryIdValue;
      }
      else{
        secondaryContactFields[CONTACT_SOURCE.fieldApiName] = 'Intake Form';
      }
    secondaryContactFields[SECONDARY_FIRST_NAME.fieldApiName] = this.secondaryFirstNameValue;
    secondaryContactFields[SECONDARY_LAST_NAME.fieldApiName] = this.secondaryLastNameValue;
    secondaryContactFields[SECONDARY_TITLE.fieldApiName] = this.secondaryTitleValue;
    secondaryContactFields[SECONDARY_PHONE.fieldApiName] = this.secondaryPhoneValue;
    secondaryContactFields[SECONDARY_EMAIL.fieldApiName] = this.secondaryEmailValue;
    const secondaryContactRecordInput = { apiName: SECONDARY_CONTACT_OBJECT.objectApiName, secondaryContactFields };

    //Passing Broker Tertiary Contact Record Create Update data to last screen
    if (this.tertiaryIdValue != "") {
      tertiaryContactFields[CON_ID_FIELD.fieldApiName] = this.tertiaryIdValue;
      }
      else
      {
        tertiaryContactFields[CONTACT_SOURCE.fieldApiName] = 'Intake Form';
      }
    tertiaryContactFields[TERTIARY_FIRST_NAME.fieldApiName] = this.tertiaryFirstNameValue;
    tertiaryContactFields[TERTIARY_LAST_NAME.fieldApiName] = this.tertiaryLastNameValue;
    tertiaryContactFields[TERTIARY_TITLE.fieldApiName] = this.tertiaryTitleValue;
    tertiaryContactFields[TERTIARY_PHONE.fieldApiName] = this.tertiaryPhoneValue;
    tertiaryContactFields[TERTIARY_EMAIL.fieldApiName] = this.tertiaryEmailValue;
    const tertiaryContactRecordInput = { apiName: TERTIARY_CONTACT_OBJECT.objectApiName, tertiaryContactFields };

    //Passing Broker Producer Contact Record Create Update data to last screen
    if (this.producerIdValue != "") {
      producerFields[CON_ID_FIELD.fieldApiName] = this.producerIdValue;
      }
      else
      {
        producerFields[CONTACT_SOURCE.fieldApiName] = 'Intake Form';
      }
    producerFields[PRODUCER_FIRST_NAME.fieldApiName] = this.producerFirstNameValue;
    producerFields[PRODUCER_LAST_NAME.fieldApiName] = this.producerLastNameValue;
    producerFields[PRODUCER_TITLE.fieldApiName] = this.producerTitleValue;
    producerFields[PRODUCER_PHONE.fieldApiName] = this.producerPhoneValue;
    producerFields[PRODUCER_EMAIL.fieldApiName] = this.producerEmailValue;
    console.log('producer field values>>'+ JSON.stringify(producerFields));
    const producerContactRecordInput = { apiName: PRODUCER_CONTACT_OBJECT.objectApiName, producerFields };
    const ss = new CustomEvent("passempbrokerdetailstodatarequiredtoquote", {
      detail: {
        showspinner: showSpinner,
        helpText: helpText,
        empRecordInput: empRecordInput,
        brokerRecordInput: brokerRecordInput,
        primaryContactRecordInput: primaryContactRecordInput,
        secondaryContactRecordInput: secondaryContactRecordInput,
        tertiaryContactRecordInput: tertiaryContactRecordInput,
        producerContactRecordInput: producerContactRecordInput
      }
    });
    this.dispatchEvent(ss);
  }

  dispatchEventToRequestedTerms(showSpinner, helpText)
  {
    const oppfields = {};
    oppfields[ELIGIBLE_EMPLOYEES.fieldApiName] = this.numberOfEligibleEmployees;
    oppfields[ENROLLED_EMPLOYEES.fieldApiName] = this.enrolledEmployees;
    oppfields[OPPORTUNITY_TYPE.fieldApiName] = this.oppType;
    oppfields[STATE_CATEGORY.fieldApiName] = this.stateCategory;
    const oppRecordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, oppfields };
    const ss = new CustomEvent("passoppdetailstorequested", {
      detail: {
        showspinner: showSpinner,
        helpText: helpText,
        oppRecordInput: oppRecordInput
      }
    });
    this.dispatchEvent(ss);
  }

  validateInputFields() {
    return [...this.template.querySelectorAll("lightning-input-field")].reduce((validSoFar, field) => {
        // Return whether all fields up to this point are valid and whether current field is valid
        // reportValidity returns validity and also displays/clear message on element based on validity
        return (validSoFar && field.reportValidity());
    }, true);
  }

  validateInput() {
    return [...this.template.querySelectorAll("lightning-input")].reduce((validSoFar, field) => {
        // Return whether all fields up to this point are valid and whether current field is valid
        // reportValidity returns validity and also displays/clear message on element based on validity
        return (validSoFar && field.reportValidity());
    }, true);
  }

handleFirmStateChange(event){
  this.firmstateValue = event.detail.value;
}

onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
}