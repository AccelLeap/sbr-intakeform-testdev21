import { LightningElement, api, track, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import PRIMARY_TELEPHONE from '@salesforce/schema/Account.Primary_Telephone__c';
import WEBSITE from '@salesforce/schema/Account.Website';
import SEARCH_KEY from '@salesforce/schema/Account.SearchKey__c';
import SIC from '@salesforce/schema/Account.SIC_Code_and_Description__c';
import ADDITIONAL_LOCATION from '@salesforce/schema/Account.Additional_Locations__c';
import FEDERAL_EMPLOYEE_ID from '@salesforce/schema/Account.FEIN__c';
import BILLING_STREET from '@salesforce/schema/Account.BillingStreet';
import BILLING_CITY from '@salesforce/schema/Account.BillingCity';
import BILLING_STATE from '@salesforce/schema/Account.BillingState';
import BROKER_PRODUCER from '@salesforce/schema/Account.Broker_Producer__c';
import BILLING_ZIPCODE from '@salesforce/schema/Account.BillingPostalCode';
import BILLING_COUNTRY from '@salesforce/schema/Account.BillingCountry';
import STATE_CATEGORY from '@salesforce/schema/Account.State_Category__c';
import ACCOUNT_RECORD_TYPE from '@salesforce/schema/Account.RecordTypeId';
import ELIGIBLE_EMPLOYEES from '@salesforce/schema/Opportunity.Number_of_Eligible_Employees__c';
import ENROLLED_EMPLOYEES from '@salesforce/schema/Opportunity.Enrolled_Employees__c';
import INTAKE_FORM_USER_NAME from '@salesforce/schema/Opportunity.IntakeFormUser_Name__c';
import INTAKE_FORM_USER_TITLE from '@salesforce/schema/Opportunity.IntakeFormUser_Title__c';
import INTAKE_FORM_USER_EMAIL from '@salesforce/schema/Opportunity.IntakeFormUser_Email__c';
import OPPORTUNITY_TYPE from '@salesforce/schema/Opportunity.Opportunity_Type__c';
import findEmployerDetails from '@salesforce/apex/IntakeFormWebsiteSearchController.findEmployerDetails';
import fetchStates from '@salesforce/apex/IntakeFormWebsiteSearchController.fetchStateRecs';
/** Below fields will be used in Broker Section */
import ID_FIELD from '@salesforce/schema/Account.Id';
import CONTACT_ID_FIELD from '@salesforce/schema/Contact.Id';

import BROKERFIRM_ID_FIELD from '@salesforce/schema/Account.Id';
import BROKERFIRM_ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import BROKERFIRM_WEBSITE from '@salesforce/schema/Account.Website';
import BROKERFIRM_BILLING_STREET from '@salesforce/schema/Account.BillingStreet';
import BROKERFIRM_BILLING_CITY from '@salesforce/schema/Account.BillingCity';
import BROKERFIRM_BILLING_STATE from '@salesforce/schema/Account.BillingState';
import BROKERFIRM_BILLING_ZIPCODE from '@salesforce/schema/Account.BillingPostalCode';
import BROKERFIRM_BILLING_COUNTRY from '@salesforce/schema/Account.BillingCountry';
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
import ContactMobile from '@salesforce/schema/Case.ContactMobile';
/** END fields which will be used in Broker Section */
const COLUMNS = [
  { label: 'Label', fieldName: 'State__c' },
  { label: 'Value', fieldName: 'State_Value__c' },
  { label: 'Category', fieldName: 'State_Category__c' }
];
/** END fields which will be used in Broker Section */
export default class EmpInformationLwc extends LightningElement {
  accountNameField = ACCOUNT_NAME;
  primaryTelephoneField = PRIMARY_TELEPHONE;
  websiteField = WEBSITE;
  sicField = SIC;
  additionalLocationField = ADDITIONAL_LOCATION;
  federalEmployeeField = FEDERAL_EMPLOYEE_ID;
  billingStreetField = BILLING_STREET;
  billingCityField = BILLING_CITY;
  billingStateField = BILLING_STATE;
  billingZipCodeField = BILLING_ZIPCODE;
  billingCountryField = BILLING_COUNTRY;
  recordTypeIdField = ACCOUNT_RECORD_TYPE;
  brokerProducerField = BROKER_PRODUCER;

  /*************/
  eligibleEmployeesField = ELIGIBLE_EMPLOYEES;
  enrolledEmployeesField = ENROLLED_EMPLOYEES;

  accountNameValue = "";
  accountName = "";
  primaryTelephoneValue = "";
  websiteValue = "";
  sicValue = "";
  additionalLocationValue = "None Reported";
  federalEmployeeValue = "";
  billingStreetValue = "";
  billingCityValue = "";
  billingStateValue = "None";
  stateCategory = "";
  billingZipCodeValue = "";
  billingCountryValue = "United States";
  recordTypeIdValue = "0121I000000JPf0QAG";

  opportunityTypeVal="New";
  @api employerRecordId = "";
  employerDetails;
  opportunityId;empSectionWebsiteSearchResult={};
  //Creating a flag for showing completion of step 1
  @api isEmpSectionCompleted = false;
  @api selectedval;
  @api isMovingBacktoPersonalInfo = false;
  show = false;
  primaryContactValue = "";
  secondaryContactValue = "";
  tertiaryContactValue = "";
  brokerProducerValue="";
  brokerFirmValue = "";
  searchKey="";
  validationMsg="";
  @track stateValue = 'None';
  @track countryValue = 'United States';

  //To be used in storing values of broker firm details fetched from sf
  brokerFirmAccountIdValue = "";
  brokerFirmAccountNameValue = "";
  brokerFirmAccountWebsiteValue = "";
  brokerFirmAccountStreetValue = "";
  brokerFirmAccountCityValue = "";
  brokerFirmAccountStateValue = "";
  brokerFirmAccountPostalCodeValue = "";
  brokerFirmAccountCountryValue = "";

  //To be used in storing values of broker primary contact fetched from sf
  primaryContactId = "";
  primaryFirstNameValue = "";
  primaryLastNameValue = "";
  primaryTitleValue = "";
  primaryPhoneValue = "";
  primaryEmailValue = "";
  primaryAccountId = "";
  primaryAccountName = "";
  primaryAccountWebsite = "";
  primaryAccountBillingStreet = "";
  primaryAccountBillingCity = "";
  primaryAccountBillingState = "";
  primaryAccountBillingCity = "";
  primaryAccountBillingPostalCode = "";
  primaryAccountBillingCountry = "";

  //To be used in storing values of broker secondary contact fetched from sf
  secondaryContactId = "";
  secondaryFirstNameValue = "";
  secondaryLastNameValue = "";
  secondaryTitleValue = "";
  secondaryPhoneValue = "";
  secondaryEmailValue = "";
  secondaryAccountId = "";
  secondaryAccountName = "";
  secondaryAccountWebsite = "";
  secondaryAccountBillingStreet = "";
  secondaryAccountBillingCity = "";
  secondaryAccountBillingState = "";
  secondaryAccountBillingCity = "";
  secondaryAccountBillingPostalCode = "";
  secondaryAccountBillingCountry = "";

  //To be used in storing values of broker tertiary contact fetched from sf
  tertiaryContactId = "";
  tertiaryFirstNameValue = "";
  tertiaryLastNameValue = "";
  tertiaryTitleValue = "";
  tertiaryPhoneValue = "";
  tertiaryEmailValue = "";
  tertiaryAccountId = "";
  tertiaryAccountName = "";
  tertiaryAccountWebsite = "";
  tertiaryAccountBillingStreet = "";
  tertiaryAccountBillingCity = "";
  tertiaryAccountBillingState = "";
  tertiaryAccountBillingCity = "";
  tertiaryAccountBillingPostalCode = "";
  tertiaryAccountBillingCountry = "";

  //To be used in storing values of broker producer contact fetched from sf
  producerContactId = "";
  producerFirstNameValue = "";
  producerLastNameValue = "";
  producerTitleValue = "";
  producerPhoneValue = "";
  producerEmailValue = "";

  //To be used in storeing the user information who is filling the form
  intakeFormUserName = "";
  intakeFormUserTitle = "";
  intakeFormUserEmail = "";

  //To be used in calculating stack filters and specific deductible value in requested terms
  numberOfEligibleEmployeesValue = "";
  enrolledEmployeesValue = "";

  value = ['option1'];
  @track l_All_Types;
  @track TypeOptions;
  @track staterecords;
  wiredStateRecords;
  error;
  columns = COLUMNS;

  get isValueString() {
    return this.selectedval === 'Employer Information';
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

  /**Below Fields will be part of Employer Account Createor update op 
   */
  handleInputChange(event) {
    
    if (event.target.fieldName == "Name") {
      this.accountNameValue = event.target.value;
    }
    if (event.target.fieldName == "Primary_Telephone__c") {
      var s = (""+event.target.value).replace(/\D/g, '');
      var m = s.match(/^(\d{3})(\d{3})(\d{4})$/);
      var formattedPhone = (!m) ? event.target.value : "(" + m[1] + ") " + m[2] + "-" + m[3];
     this.primaryTelephoneValue = formattedPhone;
    }
    if (event.target.fieldName == "Website") {
      this.websiteValue = event.target.value;
    }
    if (event.target.fieldName == "SIC_Code_and_Description__c") {
      this.sicValue = event.target.value;
    }
    if (event.target.fieldName == "Additional_Locations__c") {
      this.additionalLocationValue = event.target.value;
    }
    if (event.target.fieldName == "FEIN__c") {
      this.federalEmployeeValue = event.target.value;
    }
    if (event.target.fieldName == "BillingStreet") {
      this.billingStreetValue = event.target.value;
    }
    if (event.target.fieldName == "BillingCity") {
      this.billingCityValue = event.target.value;
    }
    if (event.target.fieldName == "BillingState") {
      this.billingStateValue = event.target.value;
    }
    if (event.target.fieldName == "BillingPostalCode") {
      this.billingZipCodeValue = event.target.value;
    }
    if (event.target.fieldName == "BillingCountry") {
      this.billingCountryValue = event.target.value;
    }
    if (event.target.fieldName == "Number_of_Eligible_Employees__c"){
      this.numberOfEligibleEmployeesValue = event.target.value;
    }
    if (event.target.fieldName == "Enrolled_Employees__c"){
      this.enrolledEmployeesValue = event.target.value;
    }
  }
  

  handleInputFocus(event) {
    // modify parent to properly highlight visually
    const classList = event.target.parentNode.classList;
    classList.add('lgc-highlight');
  }

  /**Method to populate the employer account
   * and Broker Firm, Broker firm contacts
   * when user searches with website.
   */
  async onAccountSelection(event) {
    this.accountName = event.detail.selectedValue;  
    this.accountRecordId = event.detail.selectedRecordId;
    if(this.accountRecordId != null)
    {
      findEmployerDetails({ searchedId: this.accountRecordId })
        .then(result => {
          if (result.length > 0) {
            console.log("result>>>>>>>>>" + JSON.stringify(result));
            this.employerRecordId = result[0].Id;
            //oppLookupForEmployer();
            //this.employerDetails = result[0];
            this.isFieldDisabled = false;
            this.populateValues(result[0]);

          } else {
            //this.employerDetails = "";
            this.employerRecordId = "";
            this.empSectionWebsiteSearchResult = {};
            this.populateValuesToNull();
            this.websiteValue = this.searchKey;
          }
          //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
        })
        .catch(error => {
          //this.employerDetails = "";
          this.employerRecordId = "";
          this.empSectionWebsiteSearchResult = {};
          this.populateValuesToNull();
          //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
          this.error = error;
          console.log("error emp>>>>>>>" + JSON.stringify(error));
        });
    } else {
      this.empSectionWebsiteSearchResult = {};
      this.populateValuesToNull();
      //this.employerDetails = "";
      this.employerRecordId = "";
      //this.dispatchNewCustomEvent(false, 'Checking if any website exists....');
      this.isFieldDisabled = false;
    }
  }
  
  /**Method to capture search key to
   * populate as Account website if user doesn't selects any value
   */
  onLeaveLookup(event){ 
    this.searchKey = event.detail.searchKey;
    console.log('this.searchkey' +this.searchKey);
  }

  /**Method to populate search results to
   * Broker Firm data and Employer Account data
   */
  populateValues(result) {
    if (typeof result.Broker_Primary_Contact__c != "undefined") {
      this.primaryContactId = result.Broker_Primary_Contact__r.Id;
      this.primaryFirstNameValue = result.Broker_Primary_Contact__r.FirstName;
      this.primaryLastNameValue = result.Broker_Primary_Contact__r.LastName;
      this.primaryTitleValue = result.Broker_Primary_Contact__r.Title;
      this.primaryPhoneValue = result.Broker_Primary_Contact__r.Phone;
      this.primaryEmailValue = result.Broker_Primary_Contact__r.Email;
    }

    if (typeof result.Broker_Secondary_Contact__c != "undefined") {
      this.secondaryContactId = result.Broker_Secondary_Contact__r.Id;
      this.secondaryFirstNameValue = result.Broker_Secondary_Contact__r.FirstName;
      this.secondaryLastNameValue = result.Broker_Secondary_Contact__r.LastName;
      this.secondaryTitleValue = result.Broker_Secondary_Contact__r.Title;
      this.secondaryPhoneValue = result.Broker_Secondary_Contact__r.Phone;
      this.secondaryEmailValue = result.Broker_Secondary_Contact__r.Email;
    }

    if (typeof result.Broker_Tertiary_Contact__c != "undefined") {
      this.tertiaryContactId = result.Broker_Tertiary_Contact__r.Id;
      this.tertiaryFirstNameValue = result.Broker_Tertiary_Contact__r.FirstName;
      this.tertiaryLastNameValue = result.Broker_Tertiary_Contact__r.LastName;
      this.tertiaryTitleValue = result.Broker_Tertiary_Contact__r.Title;
      this.tertiaryPhoneValue = result.Broker_Tertiary_Contact__r.Phone;
      this.tertiaryEmailValue = result.Broker_Tertiary_Contact__r.Email;
    }

    if (typeof result.Broker_Producer__c != "undefined") {
      this.producerContactId = result.Broker_Producer__r.Id;
      this.producerFirstNameValue = result.Broker_Producer__r.FirstName;
      this.producerLastNameValue = result.Broker_Producer__r.LastName;
      this.producerTitleValue = result.Broker_Producer__r.Title;
      this.producerPhoneValue = result.Broker_Producer__r.Phone;
      this.producerEmailValue = result.Broker_Producer__r.Email;
    }
    if (this.brokerFirmAccountIdValue == "" && typeof result.Broker_Primary_Contact__c != "undefined"
    && typeof result.Broker_Primary_Contact__r.AccountId != 'undefined') {
      this.brokerFirmAccountIdValue = result.Broker_Primary_Contact__r.AccountId;
      this.brokerFirmAccountNameValue = result.Broker_Primary_Contact__r.Account.Name;
      this.brokerFirmAccountWebsiteValue = result.Broker_Primary_Contact__r.Account.Website;
      this.brokerFirmAccountStreetValue = result.Broker_Primary_Contact__r.Account.BillingStreet;
      this.brokerFirmAccountCityValue = result.Broker_Primary_Contact__r.Account.BillingCity;
      this.brokerFirmAccountStateValue = result.Broker_Primary_Contact__r.Account.BillingState;
      this.brokerFirmAccountPostalCodeValue = result.Broker_Primary_Contact__r.Account.BillingPostalCode;
      this.brokerFirmAccountCountryValue = result.Broker_Primary_Contact__r.Account.BillingCountry;
    }
    else if(this.brokerFirmAccountIdValue == "" && typeof result.Broker_Secondary_Contact__c != "undefined"
    && typeof result.Broker_Secondary_Contact__c.AccountId != 'undefined')
    {
      this.brokerFirmAccountIdValue = result.Broker_Secondary_Contact__r.AccountId;
      this.brokerFirmAccountNameValue = result.Broker_Secondary_Contact__r.Account.Name;
      this.brokerFirmAccountWebsiteValue = result.Broker_Secondary_Contact__r.Account.Website;
      this.brokerFirmAccountStreetValue = result.Broker_Secondary_Contact__r.Account.BillingStreet;
      this.brokerFirmAccountCityValue = result.Broker_Secondary_Contact__r.Account.BillingCity;
      this.brokerFirmAccountStateValue = result.Broker_Secondary_Contact__r.Account.BillingState;
      this.brokerFirmAccountPostalCodeValue = result.Broker_Secondary_Contact__r.Account.BillingPostalCode;
      this.brokerFirmAccountCountryValue = result.Broker_Secondary_Contact__r.Account.BillingCountry;
    }
    else if(this.brokerFirmAccountIdValue == "" && typeof result.Broker_Tertiary_Contact__c != "undefined"
    && typeof result.Broker_Tertiary_Contact__c.AccountId != 'undefined')
    {
      this.brokerFirmAccountIdValue = result.Broker_Tertiary_Contact__r.AccountId;
      this.brokerFirmAccountNameValue = result.Broker_Tertiary_Contact__r.Account.Name;
      this.brokerFirmAccountWebsiteValue = result.Broker_Tertiary_Contact__r.Account.Website;
      this.brokerFirmAccountStreetValue = result.Broker_Tertiary_Contact__r.Account.BillingStreet;
      this.brokerFirmAccountCityValue = result.Broker_Tertiary_Contact__r.Account.BillingCity;
      this.brokerFirmAccountStateValue = result.Broker_Tertiary_Contact__r.Account.BillingState;
      this.brokerFirmAccountPostalCodeValue = result.Broker_Tertiary_Contact__r.Account.BillingPostalCode;
      this.brokerFirmAccountCountryValue = result.Broker_Tertiary_Contact__r.Account.BillingCountry;
    }
    else if(this.brokerFirmAccountIdValue == "" && typeof result.Broker_Producer__c != "undefined"
    && typeof result.Broker_Producer__c.AccountId != 'undefined')
    {
      this.brokerFirmAccountIdValue = result.Broker_Producer__r.AccountId;
      this.brokerFirmAccountNameValue = result.Broker_Producer__r.Account.Name;
      this.brokerFirmAccountWebsiteValue = result.Broker_Producer__r.Account.Website;
      this.brokerFirmAccountStreetValue = result.Broker_Producer__r.Account.BillingStreet;
      this.brokerFirmAccountCityValue = result.Broker_Producer__r.Account.BillingCity;
      this.brokerFirmAccountStateValue = result.Broker_Producer__r.Account.BillingState;
      this.brokerFirmAccountPostalCodeValue = result.Broker_Producer__r.Account.BillingPostalCode;
      this.brokerFirmAccountCountryValue = result.Broker_Producer__r.Account.BillingCountry;
    }
    else{
      this.brokerFirmAccountIdValue = "";
      this.brokerFirmAccountNameValue = "";
      this.brokerFirmAccountWebsiteValue = "";
      this.brokerFirmAccountStreetValue = "";
      this.brokerFirmAccountCityValue = "";
      this.brokerFirmAccountStateValue = "";
      this.brokerFirmAccountPostalCodeValue = "";
      this.brokerFirmAccountCountryValue = "";
    }
    if (result.Name != "") {
      this.accountNameValue = result.Name;
    }

    if (result.Primary_Telephone__c != "" && typeof result.Primary_Telephone__c != 'undefined') {
      this.primaryTelephoneValue = result.Primary_Telephone__c;
    }

    if (result.Website != "" && typeof result.Website != 'undefined') {
      this.searchKey = result.Website;
      this.websiteValue = result.Website;
    }
    if (result.SIC_Code_and_Description__c != "" && typeof result.SIC_Code_and_Description__c != 'undefined' ) {
      this.sicValue = result.SIC_Code_and_Description__r.Id;
    }

    if (result.Additional_Locations__c != "" && typeof result.Additional_Locations__c != 'undefined' ) {
      this.additionalLocationValue = result.Additional_Locations__c;
    }

    if (result.FEIN__c != "" && typeof result.FEIN__c != 'undefined' ) {
      this.federalEmployeeValue = result.FEIN__c;
    }

    if (result.BillingStreet != "" && typeof result.BillingStreet != 'undefined') {
      this.billingStreetValue = result.BillingStreet;
    }

    if (result.BillingCity != "" && typeof result.BillingCity != 'undefined') {
      this.billingCityValue = result.BillingCity;
    }

    if (result.BillingState != "" && typeof result.BillingState != 'undefined') {
      this.billingStateValue = result.BillingState;
      this.stateValue = this.billingStateValue;
    }

    if (result.State_Category__c != "" && typeof result.State_Category__c != 'undefined') {
      this.stateCategory = result.State_Category__c;
    }
    if (result.BillingPostalCode != ""  && typeof result.BillingPostalCode != 'undefined') {
      this.billingZipCodeValue = result.BillingPostalCode;
    }

    if (result.BillingCountry != "" && typeof result.BillingCountry != 'undefined') {
      this.billingCountryValue = result.BillingCountry;
      this.countryValue = this.billingCountryValue;
    }

    if (typeof result.Policies__r != "undefined") {
      if(result.Policies__r.length > 0 ){
      this.opportunityTypeVal = 'Renewal';
      }
    }

  }

  /**Method to blank values to
   * Broker Firm data and Employer Account data
   * if no result is returned.
   */
  populateValuesToNull() {
    this.secondaryContactValue = "";
    this.tertiaryContactValue = "";
    this.primaryContactValue = "";
    this.brokerFirmValue = "";
    this.accountNameValue = "";
    this.primaryTelephoneValue = "";
    this.websiteValue = "";
    this.sicValue = "";
    this.additionalLocationValue = "None";
    this.federalEmployeeValue = "";
    this.billingStreetValue = "";
    this.billingCityValue = "";
    this.billingStateValue = "";
    this.stateCategory = "";
    this.billingZipCodeValue = "";
    this.billingCountryValue = "United States";
    this.stateValue = "None";
    this.countryValue = "United States";
    //this.recordTypeIdValue = "";
    this.brokerProducerValue = "";
    this.numberOfEligibleEmployeesValue = "";
    this.enrolledEmployeesValue = "";
    this.opportunityTypeVal = 'New';
    this.brokerFirmAccountIdValue = "";
    this.brokerFirmAccountNameValue = "";
    this.brokerFirmAccountWebsiteValue = "";
    this.brokerFirmAccountStreetValue = "";
    this.brokerFirmAccountCityValue = "";
    this.brokerFirmAccountStateValue = "";
    this.brokerFirmAccountPostalCodeValue = "";
    this.brokerFirmAccountCountryValue = "";
    this.primaryContactId = "";
    this.primaryFirstNameValue = "";
    this.primaryLastNameValue = "";
    this.primaryTitleValue = "";
    this.primaryPhoneValue = "";
    this.primaryEmailValue = "";
    this.secondaryContactId = "";
    this.secondaryFirstNameValue = "";
    this.secondaryLastNameValue = "";
    this.secondaryTitleValue = "";
    this.secondaryPhoneValue = "";
    this.secondaryEmailValue = "";
    this.tertiaryContactId = "";
    this.tertiaryFirstNameValue = "";
    this.tertiaryLastNameValue = "";
    this.tertiaryTitleValue = "";
    this.tertiaryPhoneValue = "";
    this.tertiaryEmailValue = "";
    this.producerContactId = "";
    this.producerFirstNameValue = "" ;
    this.producerLastNameValue = "";
    this.producerTitleValue = "";
    this.producerPhoneValue = "";
    this.producerEmailValue = "";
    this.brokerFirmAccountIdValue = "";
    this.brokerFirmAccountNameValue = "";
    this.brokerFirmAccountWebsiteValue = "";
    this.brokerFirmAccountStreetValue = "";
    this.brokerFirmAccountCityValue = "";
    this.brokerFirmAccountStateValue = "";
    this.brokerFirmAccountPostalCodeValue = "";
    this.brokerFirmAccountCountryValue = "";    
  }

  /**Method to pass employer details
   * to Broker firm secation to be updated or created 
   * while form submit
   */
  dispatchEmployerEvent(showSpinner, helpText) {
    const fields = {};
    fields[ACCOUNT_NAME.fieldApiName] = this.accountNameValue;
    fields[PRIMARY_TELEPHONE.fieldApiName] = this.primaryTelephoneValue;
    if (this.employerRecordId!=""){
      fields[WEBSITE.fieldApiName] = this.websiteValue;
    }else
    {
      fields[WEBSITE.fieldApiName] = this.searchKey;
      this.accountName = this.searchKey;
    }
    fields[SEARCH_KEY.fieldApiName] = this.searchKey;
    fields[SIC.fieldApiName] = this.sicValue;
    fields[ADDITIONAL_LOCATION.fieldApiName] = this.additionalLocationValue;
    fields[FEDERAL_EMPLOYEE_ID.fieldApiName] = this.federalEmployeeValue;
    fields[BILLING_STREET.fieldApiName] = this.billingStreetValue;
    fields[BILLING_CITY.fieldApiName] = this.billingCityValue;
    fields[BILLING_STATE.fieldApiName] = this.stateValue;
    fields[BILLING_ZIPCODE.fieldApiName] = this.billingZipCodeValue;
    fields[BILLING_COUNTRY.fieldApiName] = this.countryValue;
    fields[STATE_CATEGORY.fieldApiName] = this.stateCategory;
    if (this.employerRecordId=='')
      fields[ACCOUNT_RECORD_TYPE.fieldApiName] = this.recordTypeIdValue;
    if (typeof this.employerRecordId!='undefined'){
      fields[ID_FIELD.fieldApiName] = this.employerRecordId;
    }
    /**Below fields being used in Broker Section */
    fields[ELIGIBLE_EMPLOYEES.fieldApiName] = this.numberOfEligibleEmployeesValue;
    fields[ENROLLED_EMPLOYEES.fieldApiName] = this.enrolledEmployeesValue;
    fields[OPPORTUNITY_TYPE.fieldApiName] = this.opportunityTypeVal; 
    const empRecordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
    const ss = new CustomEvent("passemployerdetailstobrokersection", {
      detail: {
        showspinner: showSpinner,
        helpText: helpText,
        empRecordInput: empRecordInput,
        empSectionWebsiteSearchResult : this.empSectionWebsiteSearchResult
      }
    });
    // Dispatches the event.
    this.dispatchEvent(ss);
  }

  /**Method to pass broker firm details
   * to Broker firm secation to be updated or created 
   * while form submit
   */
  dispatchBrokerFirmDetails(showSpinner, helpText){
    const brokerfields = {};
    /**Below Fields will be part of Broker Firm Details Section */
    brokerfields[BROKERFIRM_ID_FIELD.fieldApiName] = this.brokerFirmAccountIdValue ;
    brokerfields[BROKERFIRM_ACCOUNT_NAME.fieldApiName] = this.brokerFirmAccountNameValue ;
    brokerfields[BROKERFIRM_WEBSITE.fieldApiName] = this.brokerFirmAccountWebsiteValue ;
    brokerfields[BROKERFIRM_BILLING_STREET.fieldApiName] = this.brokerFirmAccountStreetValue ;
    brokerfields[BROKERFIRM_BILLING_CITY.fieldApiName] = this.brokerFirmAccountCityValue ;
    brokerfields[BROKERFIRM_BILLING_STATE.fieldApiName] = this.brokerFirmAccountStateValue;
    brokerfields[BROKERFIRM_BILLING_ZIPCODE.fieldApiName] = this.brokerFirmAccountPostalCodeValue;
    brokerfields[BROKERFIRM_BILLING_COUNTRY.fieldApiName] = this.brokerFirmAccountCountryValue;
    console.log('brokerfields values>>' + JSON.stringify(brokerfields))
    const brokerFirmRecordInput = { apiName: ACCOUNT_OBJECT.objectApiName, brokerfields };
    const ss = new CustomEvent("passbrokerfirmdetailstobroker", {
      detail: {
        showspinner: showSpinner,
        helpText: helpText,
        brokerFirmRecordInput: brokerFirmRecordInput,
      }
    });
    // Dispatches the event.
    this.dispatchEvent(ss);
  }

  /**Method to pass broker firm primary contact details
   * to Broker firm secation to be updated or created 
   * while form submit
   */
  dispatchBrokerPrimaryDetails(showSpinner, helpText){
      const brokerprimaryfields = {};
      /**Below Fields will be part of Broker Details Section Primary Contact*/
      brokerprimaryfields[CONTACT_ID_FIELD.fieldApiName] = this.primaryContactId ;
      brokerprimaryfields[PRIMARY_FIRST_NAME.fieldApiName] = this.primaryFirstNameValue ;
      brokerprimaryfields[PRIMARY_LAST_NAME.fieldApiName] = this.primaryLastNameValue ;
      brokerprimaryfields[PRIMARY_TITLE.fieldApiName] = this.primaryTitleValue ;
      brokerprimaryfields[PRIMARY_PHONE.fieldApiName] = this.primaryPhoneValue ;
      brokerprimaryfields[PRIMARY_EMAIL.fieldApiName] = this.primaryEmailValue ;
      const brokerPrimaryRecordInput = { apiName: CONTACT_OBJECT.objectApiName, brokerprimaryfields };
      const ss = new CustomEvent("passbrokerprimarydetailstobroker", {
        detail: {
          showspinner: showSpinner,
          helpText: helpText,
          brokerPrimaryRecordInput: brokerPrimaryRecordInput,
        }
      });
      // Dispatches the event.
      this.dispatchEvent(ss);
  }  

  /**Method to pass broker firm secondary contact details
   * to Broker firm secation to be updated or created 
   * while form submit
   */  
  dispatchBrokerSecondaryDetails(showSpinner, helpText){
    const brokersecondaryfields = {};
    /**Below Fields will be part of Broker Details Section Secondary Contact*/
    brokersecondaryfields[CONTACT_ID_FIELD.fieldApiName] = this.secondaryContactId ;
    brokersecondaryfields[SECONDARY_FIRST_NAME.fieldApiName] = this.secondaryFirstNameValue ;
    brokersecondaryfields[SECONDARY_LAST_NAME.fieldApiName] = this.secondaryLastNameValue ;
    brokersecondaryfields[SECONDARY_TITLE.fieldApiName] = this.secondaryTitleValue ;
    brokersecondaryfields[SECONDARY_PHONE.fieldApiName] = this.secondaryPhoneValue ;
    brokersecondaryfields[SECONDARY_EMAIL.fieldApiName] = this.secondaryEmailValue ;
    const brokerSecondaryRecordInput = { apiName: CONTACT_OBJECT.objectApiName, brokersecondaryfields };
    const ss = new CustomEvent("passbrokersecondarydetailstobroker", {
      detail: {
        showspinner: showSpinner,
        helpText: helpText,
        brokerSecondaryRecordInput: brokerSecondaryRecordInput,
      }
    });
    // Dispatches the event.
    this.dispatchEvent(ss);
}  

  /**Method to pass broker firm tertiary contact details
   * to Broker firm secation to be updated or created 
   * while form submit
   */
dispatchBrokerTertiaryDetails(showSpinner, helpText){
  const brokertertiaryfields = {};
  /**Below Fields will be part of Broker Details Section Tertiary Contact*/
  brokertertiaryfields[CONTACT_ID_FIELD.fieldApiName] = this.tertiaryContactId ;
  brokertertiaryfields[TERTIARY_FIRST_NAME.fieldApiName] = this.tertiaryFirstNameValue ;
  brokertertiaryfields[TERTIARY_LAST_NAME.fieldApiName] = this.tertiaryLastNameValue ;
  brokertertiaryfields[TERTIARY_TITLE.fieldApiName] = this.tertiaryTitleValue ;
  brokertertiaryfields[TERTIARY_PHONE.fieldApiName] = this.tertiaryPhoneValue ;
  brokertertiaryfields[TERTIARY_EMAIL.fieldApiName] = this.tertiaryEmailValue ;
  const brokerTertiaryRecordInput = { apiName: CONTACT_OBJECT.objectApiName, brokertertiaryfields };
  const ss = new CustomEvent("passbrokertertiarydetailstobroker", {
    detail: {
      showspinner: showSpinner,
      helpText: helpText,
      brokerTertiaryRecordInput: brokerTertiaryRecordInput,
    }
  });
  // Dispatches the event.
  this.dispatchEvent(ss);
} 

  /**Method to pass broker firm producer contact details
   * to Broker firm secation to be updated or created 
   * while form submit
   */
dispatchBrokerProducerDetails(showSpinner, helpText){
  const brokerproducerfields = {};
  /**Below Fields will be part of Broker Details Section Producer Contact*/
  brokerproducerfields[CONTACT_ID_FIELD.fieldApiName] = this.producerContactId ;
  brokerproducerfields[PRODUCER_FIRST_NAME.fieldApiName] = this.producerFirstNameValue ;
  brokerproducerfields[PRODUCER_LAST_NAME.fieldApiName] = this.producerLastNameValue ;
  brokerproducerfields[PRODUCER_TITLE.fieldApiName] = this.producerTitleValue ;
  brokerproducerfields[PRODUCER_PHONE.fieldApiName] = this.producerPhoneValue ;
  brokerproducerfields[PRODUCER_EMAIL.fieldApiName] = this.producerEmailValue ;
  const brokerProducerRecordInput = { apiName: CONTACT_OBJECT.objectApiName, brokerproducerfields };
  const ss = new CustomEvent("passbrokerproducerdetailstobroker", {
    detail: {
      showspinner: showSpinner,
      helpText: helpText,
      brokerProducerRecordInput: brokerProducerRecordInput,
    }
  });
  // Dispatches the event.
  this.dispatchEvent(ss);
}

  /**Method to pass user submitting the form details
   * to Data Required to quote component, the details 
   * to be captured on opportunity
   * while form submit
   */
dispatchNewUserInfoEvent(showSpinner, helpText) {
  const userfields = {};
  /**Below fields being used in Broker Section */
  userfields[INTAKE_FORM_USER_NAME.fieldApiName] = this.intakeFormUserName;
  userfields[INTAKE_FORM_USER_TITLE.fieldApiName] = this.intakeFormUserTitle;
  userfields[INTAKE_FORM_USER_EMAIL.fieldApiName] = this.intakeFormUserEmail;
    const userRecordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, userfields };
    const ss = new CustomEvent("passuserdetailstodatarequiredtoquote", {
      detail: {
        showspinner: showSpinner,
        helpText: helpText,
        userRecordInput: userRecordInput
      }
    });
    // Dispatches the event.
    this.dispatchEvent(ss);
  } 

  /**Method to move to broker section after all the validations
   */
  handleNext(event) {
    console.log('Account name value>>>' + this.accountName);
    console.log('the state value is >' + this.stateValue);
    console.log('the staet category is >>' + this.stateCategory);
    if (!this.validateInputFields()) {
      this.isEmpSectionCompleted = false;
      this.template.querySelector('c-custom-toast').showToast('error', 'Complete all the fields in this section.');
    }
    else{
      if(!this.validateInput())
      {
        this.isEmpSectionCompleted = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Complete all the fields in this section.');
      }
      else if(this.searchKey == "" && this.employerRecordId=="")
      {
        this.isEmpSectionCompleted = false;
          this.template.querySelector('c-custom-toast').showToast('error', 'Website cannot be blank.');
      }
      else if(this.countryValue == "")
      {
        this.isEmpSectionCompleted = false;
          this.template.querySelector('c-custom-toast').showToast('error', 'Country cannot be blank.');
      }
      else if(this.stateValue == "None")
      {
        this.isEmpSectionCompleted = false;
          this.template.querySelector('c-custom-toast').showToast('error', 'State cannot be blank.');
      }
      else{
      this.isEmpSectionCompleted = true;
      this.dispatchEmployerEvent(false, 'Checking if any website exists....');
      this.dispatchBrokerFirmDetails(false, 'Checking if any website exists....');
      this.dispatchBrokerPrimaryDetails(false, 'Checking if any website exists....');
      this.dispatchBrokerSecondaryDetails(false, 'Checking if any website exists....');
      this.dispatchBrokerTertiaryDetails(false, 'Checking if any website exists....');
      this.dispatchBrokerProducerDetails(false, 'Checking if any website exists....');
      this.dispatchNewUserInfoEvent(false, 'Checking if any website exists....');
      }
    }
    const empcompleteevent = new CustomEvent('empcomplete', {
      detail: this.isEmpSectionCompleted
    });
    this.dispatchEvent(empcompleteevent);
  }

  validateInputFields() {
    return [...this.template.querySelectorAll("lightning-input-field")].reduce((validSoFar, field) => {
      console.log('validateinputfields called...');
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


handleStateChange(event){
  this.stateValue = event.detail.value;
  console.log('state changed to ' + event.detail.value);
  this.stateCategory = event.target.options.find(opt => opt.value === event.detail.value).category;
  console.log('state category to ' + this.stateCategory);
}

get countryOptions() {
  return [
           { label: this.billingCountryValue, value: this.billingCountryValue },
           { label: 'United States', value: 'United States' },
         ];
}

handleCountryChange(event){
this.countryValue = event.detail.value;
}

handleBack(event) {
  this.isMovingBacktoPersonalInfo = true;
  const backtopersonalinfoevent = new CustomEvent('backtopersonalinfoevent', {
    detail: this.isMovingBacktoPersonalInfo
  });
  this.dispatchEvent(backtopersonalinfoevent);
}

  /**Method to get data from user info secation to be passed to data 
   * required to quote.
   */
@api handlePersonalInformationSubmit(event) {
  let personalInfoFieldsWithValues = event.detail.oppRecordInput.fields;
  this.intakeFormUserName = personalInfoFieldsWithValues.IntakeFormUser_Name__c;
  this.intakeFormUserTitle = personalInfoFieldsWithValues.IntakeFormUser_Title__c;
  this.intakeFormUserEmail=personalInfoFieldsWithValues.IntakeFormUser_Email__c;
}

}