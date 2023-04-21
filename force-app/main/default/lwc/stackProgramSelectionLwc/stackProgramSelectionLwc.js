import { LightningElement, api, track } from 'lwc';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_1 from '@salesforce/schema/Opportunity.Requested_SBR_Advantage_Program_Stack_1__c';
import REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_2 from '@salesforce/schema/Opportunity.Requested_SBR_Advantage_Program_Stack_2__c';
import REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_3 from '@salesforce/schema/Opportunity.Requested_SBR_Advantage_Program_Stack_3__c';

export default class StackProgramSelectionComponent extends LightningElement {
  @api selectedval;
  @api isFormCompleted = false;
  @api isMovingBacktoRequested = false;
  @api isMovingNextToDataRequiredToQuote = false;
  @api noStackPresent = false; 
  accountNameForCreatingOpp = "";
  @track  programStackMap = [];
  showSpinner = false;
  helpText = "Loading...";
  @track programStackOneId='';  
  @track programStackTwoId='';   
  @track programStackThreeId='';
  @track  optionOneValue = [];

  // isStackProgramInitialized = false;

  renderedCallback() {

    if(this.isValueString) {

      // if(this.isStackProgramInitialized) {
      //   return;
      // }
  
      // this.isStackProgramInitialized = true;
  
      const element = this.template.querySelector('.checkboxGroup');
  
      console.log(element);
  
      const style = document.createElement('style');
  
      style.innerText = `
      .checkboxGroup .slds-checkbox {
        padding: 15px !important;
      }
      .checkboxGroup .slds-checkbox .slds-checkbox__label .slds-form-element__label {
        font-weight: bold;
        font-size: 20px;
        color: black;
      }`;
  
      element.appendChild(style);
    }
  }
  
  // isValueString = true;

  get isValueString() {
    return this.selectedval === 'Stack Programs';
  }

  get optionOne() {
      let alist = [];
      this.programStackMap.forEach(function(element) {
        alist.push({ label: element["value"], value: element["key"] });
      });
      return alist;
  }

  handleOptionFirstChange(event) {
    this.optionOneValue = event.detail.value;
  }

  handleBack(event) {
    this.isMovingBacktoRequested = true;
    const backtorequestedevent = new CustomEvent('backtorequestedevent', {
      detail: this.isMovingBacktoRequested
    });
    this.dispatchEvent(backtorequestedevent);
  }

  handleNext(event) {
   if(this.optionOneValue.length > 3){
      this.isMovingNextToDataRequiredToQuote = false;
      this.template.querySelector('c-custom-toast').showToast('error',
        'Please select up to 3 Program Stacks.');
    }
    else{
      if(this.optionOneValue.length == 1){
        this.programStackOneId = this.optionOneValue[0];
      }
      else if(this.optionOneValue.length ==2)
      {
        this.programStackOneId = this.optionOneValue[0];
        this.programStackTwoId = this.optionOneValue[1];
      }
      else if(this.optionOneValue.length == 3){
        this.programStackOneId = this.optionOneValue[0];
        this.programStackTwoId = this.optionOneValue[1];
        this.programStackThreeId = this.optionOneValue[2];
      }
      this.dispatchSelectedStacksEvent(false, 'Checking if any website exists....');
    this.isMovingNextToDataRequiredToQuote = true;
    const nexttodatarequiredtoquote = new CustomEvent('nexttodatarequiredtoquote', {
      detail: this.isMovingNextToDataRequiredToQuote
    });
    this.dispatchEvent(nexttodatarequiredtoquote);
  }
  }

  @api getDataFromReq(event)
  {
    this.programDetailsFromRequested = event.detail.oppRecordInput;
    this.programStackMap = this.programDetailsFromRequested.oppfields.programstackMap;
    if(this.programStackMap == [] || this.programStackMap.length == 0)
    {
      this.noStackPresent = true;
    }
    else
    {
      this.noStackPresent = false;
    }
  }

  dispatchSelectedStacksEvent(showSpinner, helpText) {
    const stackfields = {};
    /**Below fields being used in Broker Section */
    stackfields[REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_1.fieldApiName] = this.programStackOneId;
    stackfields[REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_2.fieldApiName] = this.programStackTwoId;
    stackfields[REQUESTED_SBR_ADVANTAGE_PROGRAM_STACK_3.fieldApiName] = this.programStackThreeId;
      const stackRecordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, stackfields };
      const ss = new CustomEvent("passselectedstacktodatarequiredtoquote", {
        detail: {
          showspinner: showSpinner,
          helpText: helpText,
          stackRecordInput: stackRecordInput
        }
      });
      // Dispatches the event.
      this.dispatchEvent(ss);
  } 
}