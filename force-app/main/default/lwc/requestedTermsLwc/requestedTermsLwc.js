import { LightningElement, api, wire, track } from 'lwc';
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
import ESTIMATED_ANNUAL_PREMIUM from '@salesforce/schema/Opportunity.Estimated_Annual_Premium__c';
//import NEW_TPA from '@salesforce/schema/Opportunity.Current_Agent_of_Record__c';
import CURRENT_MEDICAL_PROVIDER_NETWORK from '@salesforce/schema/Opportunity.Current_Medical_Provider_Network__c';
import CURRENT_TPA from '@salesforce/schema/Opportunity.Current_Third_Party_Administrator__c';
import CURRENT_PHARMACY_BENEFIT_MANAGER from '@salesforce/schema/Opportunity.Current_Pharmacy_Benefit_Manager__c';
import CURRENT_SPECIALITY_RX_VENDOR from '@salesforce/schema/Opportunity.Current_Specialty_Rx_Vendor__c';
import SEPARATE_AGGREGATE_DEDUCTIBLE_ISL from '@salesforce/schema/Opportunity.Separate_Aggregating_Deductible_ISL__c';
import OPPORTUNITY_NAME from '@salesforce/schema/Opportunity.Name';
import NEW_TPA from '@salesforce/schema/Opportunity.CurrentThirdPartyAdministrator_Text__c';
import NEW_PBM from '@salesforce/schema/Opportunity.CurrentPharmacyBenefitManager_Text__c';
import NEW_SPECIALITY from '@salesforce/schema/Opportunity.CurrentSpecialtyRxVendor_Text__c';

//Hidden Fields Mapping
import ELIGIBLE_EMPLOYEES from '@salesforce/schema/Opportunity.Number_of_Eligible_Employees__c';
import ENROLLED_EMPLOYEES from '@salesforce/schema/Opportunity.Enrolled_Employees__c';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import OPPORTUNITY_TYPE from '@salesforce/schema/Opportunity.Opportunity_Type__c';
import STAGE from '@salesforce/schema/Opportunity.StageName';
import CLOSE_DATE from '@salesforce/schema/Opportunity.CloseDate';
import SBR_PRODUCER_FIRM from '@salesforce/schema/Opportunity.SBRProducerFirm__c';
import SBR_PRODUCER from '@salesforce/schema/Opportunity.SBR_Producer__c';
import RECEIVED_DATE_INITIAL_REQUEST from '@salesforce/schema/Opportunity.Received_Date_Initial_Request__c';
import BROKER_FIRM from '@salesforce/schema/Opportunity.Broker_Firm__c';
import BROKER_PRIMARY_CONTACT from '@salesforce/schema/Opportunity.Broker_Primary_Contact_V2__c';
import BROKER_SECONDARY_CONTACT from '@salesforce/schema/Opportunity.Broker_Secondary_Contact__c';
import BROKER_TERTIARY_CONTACT from '@salesforce/schema/Opportunity.Broker_Tertiary_Contact__c';
import BROKER_PRODUCER from '@salesforce/schema/Opportunity.BrokerProducer__c';
import REQUESTED_THIRD_PARTY_ADMINISTRATOR_1 from '@salesforce/schema/Opportunity.Requested_Third_Party_Administrator_1__c';
import REQUESTED_MEDICAL_PROVIDER_NETWORK_1 from '@salesforce/schema/Opportunity.Requested_Medical_Provider_Network_1__c';
import REQUESTED_PHARMACY_BENEFIT_MANAGER_1 from '@salesforce/schema/Opportunity.Requested_Pharmacy_Benefit_Manager_1__c';
import REQUESTED_THIRD_PARTY_ADMINISTRATOR_2 from '@salesforce/schema/Opportunity.Requested_Third_Party_Administrator_2__c';
import REQUESTED_MEDICAL_PROVIDER_NETWORK_2 from '@salesforce/schema/Opportunity.Requested_Medical_Provider_Network_2__c';
import REQUESTED_PHARMACY_BENEFIT_MANAGER_2 from '@salesforce/schema/Opportunity.Requested_Pharmacy_Benefit_Manager_2__c';
import REQUESTED_THIRD_PARTY_ADMINISTRATOR_3 from '@salesforce/schema/Opportunity.Requested_Third_Party_Administrator_3__c';
import REQUESTED_MEDICAL_PROVIDER_NETWORK_3 from '@salesforce/schema/Opportunity.Requested_Medical_Provider_Network_3__c';
import REQUESTED_PHARMACY_BENEFIT_MANAGER_3 from '@salesforce/schema/Opportunity.Requested_Pharmacy_Benefit_Manager_3__c';
import REQUESTED_THIRD_PARTY_ADMINISTRATOR_4 from '@salesforce/schema/Opportunity.Requested_Third_Party_Administrator_4__c';
import REQUESTED_MEDICAL_PROVIDER_NETWORK_4 from '@salesforce/schema/Opportunity.Requested_Medical_Provider_Network_4__c';
import REQUESTED_PHARMACY_BENEFIT_MANAGER_4 from '@salesforce/schema/Opportunity.Requested_Pharmacy_Benefit_Manager_4__c';
import PLAN_MIRRORING_PROVISION from '@salesforce/schema/Opportunity.Plan_Mirroring_Provision__c';
import ACTIVELY_AT_WORK_WAIVED from '@salesforce/schema/Opportunity.Actively_At_Work_Waived__c';
import COST_CONTAINMENT_STRATEGIES_UTILIZED from '@salesforce/schema/Opportunity.Cost_Containment_Strategies_Utilized__c';
import DOMESTIC_REIMBURSEMENT_LEVEL from '@salesforce/schema/Opportunity.Domestic_Reimbursement_Level__c';
import ORGAN_TRANSPLANTS_EXCLUDED from '@salesforce/schema/Opportunity.Organ_Transplants_Excluded__c';
import NO_NEW_LASER_AT_RENEWAL_PROVISION_ISL from '@salesforce/schema/Opportunity.No_New_Laser_at_Renewal_Provision_ISL__c';
import PREMIUM_RATE_CAP_AT_RENEWAL_ISL from '@salesforce/schema/Opportunity.Premium_Rate_Cap_At_Renewal_P_ISL__c';
import EXPERIENCE_REFUND_PROVISION_ISL from '@salesforce/schema/Opportunity.Experience_Refund_Provision_ISL__c';
import TERMINAL_LIABILITY_OPTION_ISL from '@salesforce/schema/Opportunity.Terminal_Liability_Option_ISL__c';
import REQUESTED_PREMIUM_RATE_TIER_ISL from '@salesforce/schema/Opportunity.Requested_Premium_Rate_Tier_ISL__c';
import DEDUCTIBLE_CORRIDOR_ASL from '@salesforce/schema/Opportunity.DeductibleCorridorASL__c';
import MINIMUM_AGGREGATE_ATTACHMENT_ASL from '@salesforce/schema/Opportunity.Minimum_Aggregate_Attachment_ASL_P__c';
import TERMINAL_LIABILITY_OPTION_ASL from '@salesforce/schema/Opportunity.Terminal_Liability_Option_ASL__c';
import REQUESTED_PREMIUM_RATE_TIER_ASL from '@salesforce/schema/Opportunity.Requested_Premium_Rate_Tier_ASL__c';
import REQUESTED_AGG_FACTOR_RATE_TIER_ASL from '@salesforce/schema/Opportunity.Requested_Agg_Factor_Tier_ASL__c';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import findSBRProducerFirm from '@salesforce/apex/IntakeFormWebsiteSearchController.findSBRProducerFirm';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import getPickListValues from '@salesforce/apex/IntakeFormWebsiteSearchController.getPickListValues';
import getListOfProgramStacks from '@salesforce/apex/IntakeFormWebsiteSearchController.getListOfProgramStacks';
//import NEW_PBM from '@salesforce/schema/Opportunity.Current_Agent_of_Record__c';

export default class RequestedTermsLwc extends LightningElement {

  @track selectedAgentOfRecordValue='';
  @track retireesCoveredISLValue='No';  
  @track retireesCoveredASLValue='No';   
  @track selectedMedicalPlanValue='Yes';
  @track selectedbenefitsValue = ['Medical','Prescription Drugs'];  
  @track selectedbenefitsASLValue = ['Medical','Prescription Drugs'];    
  @track selectedContractBasisIslValue='12/18';
  @track selectedContractBasisAslValue='12/18';  
  @track selectedHealthPlanFundingValue='';
  @track selectedSLCoverageValue = ['Individual Stop-Loss (ISL)','Aggregate Stop-Loss (ASL)'];  
  @track selectedRequestedFundingTypeValue = '';
  @track disableBenefitsCoveredISL=false;   
  @track disableBenefitsCoveredASL=false;
  specificStopLossOptionsFromSF;
  @track programStackOptions = [];
  @track minimumISLDeductibleFromSubStacks;
  
  selectedValuesBackend = "";

  // isRequestedTermsInitialized = false;

  showHelpText;

  renderedCallback() {

    if(this.isValueString) {

      // if(this.isRequestedTermsInitialized) {
      //   return;
      // }
  
      // this.isRequestedTermsInitialized = true;
  
      const qs = this.template.querySelectorAll('.clshelptexthide');
  
      console.log(qs);
  
      const style = document.createElement('style');
  
      style.innerText = ".clshelptexthide div.slds-form-element__icon { display: none; }";
  
      for (let i = 0; i < qs.length; i++) {

        const element = qs[i];

        element.appendChild(style);
      }

      // if(this.template.querySelector('.my-icon')){
      //   let self = this;

      //   this.initializePage = true;

      //   this.template.querySelector('.my-icon').addEventListener('mouseenter', function(event){
      //       if(self.showHelpText){
      //         self.showHelpText = false;
      //       }else {
      //         self.showHelpText = true;
      //       }
      //   });

      //   this.template.querySelector('.my-icon').addEventListener('mouseleave', function(event){
      //     if(self.showHelpText){
      //       self.showHelpText = false;
      //     }else {
      //       self.showHelpText = true;
      //     }
      //   });
      // }
    }
  }

  get retireesCoveredISLRecordOptions() {
          return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' }
          ];
  }

  get retireesCoveredASLRecordOptions() {
    return [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' }
    ];
}

  get currentAgentOfRecordOptions() {
      return [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
      ];
  }

  get currentMedicalPlanOptions() {
    return [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' }
    ];
  }

  get benefitCoveredOptions() {
    return [
        { label: 'Medical', value: 'Medical' },
        { label: 'Prescription Drugs', value: 'Prescription Drugs' },
    ];
  }

  get benefitCoveredASLOptions() {
    return [
        { label: 'Medical', value: 'Medical' },
        { label: 'Prescription Drugs', value: 'Prescription Drugs' },
    ];
  }

  get contractIslOptions() {
    if(this.selectedRequestedFundingTypeValue.includes('Level Funded')){return [
      { label: '12/15', value: '12/15' },
      { label: '12/18', value: '12/18' },
      { label: '12/24', value: '12/24' }
    ];}
    else
    {return [
      { label: '12/12', value: '12/12' },
      { label: '12/15', value: '12/15' },
      { label: '12/18', value: '12/18' },
      { label: '12/24', value: '12/24' }
    ];
    }
  }

  get contractAslOptions() {
    if(this.selectedRequestedFundingTypeValue.includes('Level Funded')){return [
      { label: '12/15', value: '12/15' },
      { label: '12/18', value: '12/18' },
      { label: '12/24', value: '12/24' }
    ];}
    else
    {return [
      { label: '12/12', value: '12/12' },
      { label: '12/15', value: '12/15' },
      { label: '12/18', value: '12/18' },
      { label: '12/24', value: '12/24' }
    ];
    }
  }

  get healthPlanFundingOptions() {
    return [
      { label: 'Self-Funded', value: 'Self-Funded' },
      { label: 'Insured', value: 'Insured' },
      { label: 'Level Funded', value: 'Level Funded' }
    ];
  }

  get sLCoverageOptions() {
    return [
        { label: 'Individual Stop-Loss (ISL)', value: 'Individual Stop-Loss (ISL)' },
        { label: 'Aggregate Stop-Loss (ASL)', value: 'Aggregate Stop-Loss (ASL)' },
    ];
  }

  get requestedFundingTypeOptions() {
    return [
        { label: 'Self-Funded', value: 'Self-Funded' },
        { label: 'Level Funded', value: 'Level Funded' },
    ];
  }

//   get selectedValues() {
//     return this.benefitsValue.join(',');
// }

  // handle the selected value
  handleCurrentAgentSelected(event) {
    this.selectedAgentOfRecordValue = event.target.value;
  }

  // handle the selected value
  handleRetireesCoveredISLSelected(event) {
    this.retireesCoveredISLValue = event.target.value;
  }  

    // handle the selected value
  handleRetireesCoveredASLSelected(event) {
      this.retireesCoveredASLValue = event.target.value;
  }
  // handle the selected medical plan value
  handleCurrentMedicalPlanSelected(event) {
    this.selectedMedicalPlanValue = event.target.value;
  }

  handlebenefitCoveredChange(event) {
    this.selectedbenefitsValue = event.detail.value;
    //this.selectedValuesBackend = this.selectedValues;
  }

  handlebenefitCoveredASLChange(event) {
    this.selectedbenefitsASLValue = event.detail.value;
    //this.selectedValuesBackend = this.selectedValues;
  }

  handleContractIslRadioChange(event) {
    this.selectedContractBasisIslValue = event.target.value;
    if(this.selectedContractBasisIslValue == '12/12')
    {
      this.displayTerminalLiabilityOptionISL = true;
    }
    else{
      this.displayTerminalLiabilityOptionISL = false;
    }
  }

  handleContractAslRadioChange(event) {
    this.selectedContractBasisAslValue = event.target.value;
    if(this.selectedContractBasisAslValue == '12/12')
    {
      this.displayTerminalLiabilityOptionASL = true;
    }
    else{
      this.displayTerminalLiabilityOptionASL = false;
    }
  }

  healthPlanFundingChange(event)
  {
    this.selectedHealthPlanFundingValue = event.target.value;
  }

  handleSLCoverageChange(event)
  {
    this.selectedSLCoverageValue = event.target.value;
  }

  handleRequestedFundingTypeChange(event)
  {
    this.selectedRequestedFundingTypeValue = event.target.value;
    if(this.selectedRequestedFundingTypeValue.includes('Level Funded'))
    {
      this.disableBenefitsCoveredISL = true;
      this.disableBenefitsCoveredASL = true;
      this.aggregateAccommodationAslVal = 'Weekly';
      this.selectedContractBasisIslValue = '12/18';
      this.selectedContractBasisAslValue = '12/18';
    }
    else
    {
      this.disableBenefitsCoveredISL = false;
      this.disableBenefitsCoveredASL = false;
      this.aggregateAccommodationAslVal = 'Monthly';
    }
  }


  // handle the selected value
  handleCurrentHealthPlanSelected(event) {
    this.selectedHealthPlanValue = event.target.value;
  }


  @api selectedval;
  show = false;
  //Creating a flag for showing completion of step 3
  @api isRequestedSectionCompleted = false;
  @api isMovingBacktoBroker = false;
  @api isMovingNextToStack = false;


  effectiveDateField = EFFECTIVE_DATE;
  dueDateToBrokerField = DUE_DATE_TO_BROKER;
  currentAgentOfRecordField = CURRENT_AGENT_OF_RECORD;
  minimumDeductibleIslField = MINIMUM_DEDUCTIBLE_ISL;
  slCoverageIncludedField = SL_COVERAGE_INCLUDED;
  requestFundingTypeField = REQUEST_FUNDING_TYPE;
  requestedCommisionField = REQUESTED_COMMISION;
  requestedCommisionPercentField = REQUESTED_COMMISION_PERCENT;
  matchCurrentMedicalPlanField = MATCH_CURRENT_MEDICAL_PLAN;
  benefitsCoveredIslField = BENEFITS_COVERED_ISL;
  contractBasisIslField = CONTRACT_BASIS_ISL;
  deductibleAccumulationIslField = DEDUCTIBLE_ACCUMULATION_ISL;
  separateAggregatingDeductibleField = SEPARATE_AGGREGATE_DEDUCTIBLE_ISL;
  maximumCoverageLimitIslField = MAXIMUM_COVERAGE_LIMIT_ISL;
  advanceReimbursementProvisionIslField = ADVANCE_REIMBURSEMENT_PROVISION_ISL;
  retireesCoveredIslField = RETIREES_COVERED_ISL;
  benefitsCoveredAslField = BENEFITS_COVERED_ASL;
  contractBasisASLField = CONTRACT_BASIS_ASL;
  maximumAnnualReimbursementField = MAXIMUM_ANNUAL_REIMBURSEMENT;
  aggregateAccommodationAslField = AGGREGATE_ACCOMMODATION_ASL;
  retireesCoveredAslField = RETIREES_COVERED_ASL;
  currentHealthPlanFundingField = CURRENT_HEALTH_PLAN_FUNDING;
  currentTPAField = CURRENT_TPA;
  //newTPAField = NEW_TPA;
  currentMedicalProviderNetworkField = CURRENT_MEDICAL_PROVIDER_NETWORK;
  currentPharmacyBenefitManagerField = CURRENT_PHARMACY_BENEFIT_MANAGER;
  //newPBMField = NEW_PBM;
  currentSpecialtyRxVendorField = CURRENT_SPECIALITY_RX_VENDOR;
  primaryLastNameField = "";
  //currentAgentOfRecordValue = "";


  /*Hidden Fields Mapping */
  opportunityTypeField = OPPORTUNITY_TYPE;
  stageNameField = STAGE;
  closeDateField = CLOSE_DATE;
  sBRProducerFirmField = SBR_PRODUCER_FIRM;
  sBRProducerField = SBR_PRODUCER;
  receivedDateInitialRequestField = RECEIVED_DATE_INITIAL_REQUEST;
  brokerFirmField = BROKER_FIRM;
  brokerPrimaryContactV2Field = BROKER_PRIMARY_CONTACT;
  brokerSecondaryContactField = BROKER_SECONDARY_CONTACT;
  brokerTertiaryContactField = BROKER_TERTIARY_CONTACT;
  brokerProducerField = BROKER_PRODUCER;
  requestedThirdPartyAdministrator1Field = REQUESTED_THIRD_PARTY_ADMINISTRATOR_1;
  requestedMedicalProviderNetwork1Field = REQUESTED_MEDICAL_PROVIDER_NETWORK_1;
  requestedPharmacyBenefitManager1Field = REQUESTED_PHARMACY_BENEFIT_MANAGER_1;
  requestedThirdPartyAdministrator2Field = REQUESTED_THIRD_PARTY_ADMINISTRATOR_2;
  requestedMedicalProviderNetwork2Field = REQUESTED_MEDICAL_PROVIDER_NETWORK_2;
  requestedPharmacyBenefitManager2Field = REQUESTED_PHARMACY_BENEFIT_MANAGER_2;
  requestedThirdPartyAdministrator3Field = REQUESTED_THIRD_PARTY_ADMINISTRATOR_3;
  requestedMedicalProviderNetwork3Field = REQUESTED_MEDICAL_PROVIDER_NETWORK_3;
  requestedPharmacyBenefitManager3Field = REQUESTED_PHARMACY_BENEFIT_MANAGER_3;
  requestedThirdPartyAdministrator4Field = REQUESTED_THIRD_PARTY_ADMINISTRATOR_4;
  requestedMedicalProviderNetwork4Field = REQUESTED_MEDICAL_PROVIDER_NETWORK_4;
  requestedPharmacyBenefitManager4Field = REQUESTED_PHARMACY_BENEFIT_MANAGER_4;
  planMirroringProvisionField = PLAN_MIRRORING_PROVISION;
  activelyAtWorkWaivedField = ACTIVELY_AT_WORK_WAIVED;
  costContainmentStrategiesUtilizedField = COST_CONTAINMENT_STRATEGIES_UTILIZED;
  domesticReimbursementLevelField = DOMESTIC_REIMBURSEMENT_LEVEL;
  organTransplantsExcludedField = ORGAN_TRANSPLANTS_EXCLUDED;
  noNewLaseratRenewalProvisionISLField = NO_NEW_LASER_AT_RENEWAL_PROVISION_ISL;
  premiumRateCapAtRenewalPISLField = PREMIUM_RATE_CAP_AT_RENEWAL_ISL;
  experienceRefundProvisionISLField = EXPERIENCE_REFUND_PROVISION_ISL;
  terminalLiabilityOptionISLField = TERMINAL_LIABILITY_OPTION_ISL;
  requestedPremiumRateTierISLField = REQUESTED_PREMIUM_RATE_TIER_ISL;
  deductibleCorridorASLField = DEDUCTIBLE_CORRIDOR_ASL;
  minimumAggregateAttachmentASLPField = MINIMUM_AGGREGATE_ATTACHMENT_ASL;
  terminalLiabilityOptionASLField = TERMINAL_LIABILITY_OPTION_ASL;
  requestedPremiumRateTierASLField = REQUESTED_PREMIUM_RATE_TIER_ASL;
  requestedAggFactorTierASLField = REQUESTED_AGG_FACTOR_RATE_TIER_ASL;

  empDetailsFromEmp = "";

  eligibleEmployees = "";
  enrolledEmployees = "";
  enrolledEmployeesVar = "";
  stateCategory = "";
  recordTypeIdValue = "0128W000000iWE9QAM";
  oppType = "";
  oppStage = "Qualification"
  dateToday = "";
  @track date1;
  @track date2;
  @track dateDiff;

  /**Values from requested section */
  effectiveDateVal = "";
  dueDateVal = "";
  currentAgentOfRecordVal = "No";
  deductibleISLVal = "";
  stopLossCoverageIncludeVal = "";
  requestFundingTypeVal = "Self-Funded";
  requestCommissionPEPMVal = "25";
  requestCommissionPercentOfNetPreVal = "0";
  matchCurrentMedicalPlanVal = "Yes";
  benefitsCoveredISLVal = "Medical";
  contractBasisISLVal = "";
  deductibleAccumulationISLVal = "Per Individual";
  separateAggregatingDeductibleISLVal = "";
  maxCoverageLimitISLVal = "Unlimited";
  advReimbursmentProvisionISLVal = "Include";
  retireesCoveredISL = "No";
  benefitsCoveredASLVal = "Medical";
  contractBasisASLVal = "";
  aggregateAccommodationAslVal = "";
  retireesCoveredAslVal = "No";
  currentHealthPlanFundingVal = "";
  currentTPAVal = "";
  newTPAVal = "";
  currentMedicalProviderNetworkVal = "";
  currentPharmacyBenefitManagerVal = "";
  newPBMVal = "";
  currentSpecialityRXVendorVal = "";
  newSpecialityRXVendorVal = "";
  countSelectedISL = 0;
  countSelectedASL = 0;
  countDeductibleISL = 0;
  SBRProducerFirmId = '';
  searchProducerFirmName = 'SBR Services, LLC';
  planMirroringProvisionVal = 'Include; Subject to plan document approval';
  activelyAtWorkWaivedVal = 'Include';
  costContainmentStrategiesUtilizedVal = 'Utilization Management;Case Management;Maternity Management;Nurse Advice Line;Telemedicine;Dialysis Management';
  domesticReimbursementLevelVal = 1;
  organTransplantsExcludedVal = 'No';
  separateAggregatingDeductibleVal = 0;
  @track specificStopLossValue = '';
  specificStopLossLowValue = '';
  specificStopLossHighValue = '';
  @track deductibleValue = '';
  @track displayTerminalLiabilityOptionISL = false; 
  @track displayTerminalLiabilityOptionASL = false;   
  requestedPremiumRateTierVal = '4 Tier';
  maximumAnnualReimbursementVal = 1000000;
  minimumAggregateAttachmentASLVal = '0.9';
  requestedPremiumRateTierASLVal = 'Composite';
  requestedAggFactorRateTierASLVal = '4 Tier';
  searchTPAKey = "";
  searchPBMKey = "";

  @api lookupLabel;
  @api recordId;
  @track newselectedAccount = false;
  iscurrentTPANotFound = false;
  @track accountnamevalue = null;
  accountid = null;
  newTPAValue = "";
  @track disableCurrentTPA = true;

  @track newselectedPBMAccount = false;
  iscurrentPBMNotFound = false;
  @track pbmaccountnamevalue = null;
  pbmaccountid = null;
  newPBMValue = "";
  @track disableCurrentPBM = true;

  @track newselectedSpecialityAccount = false;
  iscurrentSpecialityNotFound = false;
  @track specialityaccountnamevalue = null;
  specialityaccountid = null;
  newSPECIALITYValue = "";
  @track disableCurrentSpeciality = false;
  terminalLiabilityOptionISLVal = 'Do Not Include'; 
  deductibleCorridorASLVal = 1.25; 


  get isValueString() {
    return this.selectedval === 'Requested Terms';
  }

  handleInputChange(event) {
    if (event.target.fieldName == "Effective_Date__c") {
      this.effectiveDateVal = event.target.value;
    }
    if (event.target.fieldName == "Date_Due_to_Broker_Initial_Request__c") {
      this.dueDateVal = event.target.value;
    }
    if (event.target.fieldName == "Current_Agent_of_Record__c") {
      this.currentAgentOfRecordVal = event.target.value;
    }
    if (event.target.fieldName == "Deductible_ISL__c") {
      this.deductibleISLVal = event.target.value;
      this.countDeductibleISL = this.deductibleISLVal.split(';').length;
    }
    if (event.target.fieldName == "Stop_Loss_Coverages_Included__c") {
      this.stopLossCoverageIncludeVal = event.target.value;
    }
    if (event.target.fieldName == "Funding_Type__c") {
      this.requestFundingTypeVal = event.target.value;
    }
    if (event.target.fieldName == "Requested_Commissions_PEPM__c") {
      this.requestCommissionPEPMVal = event.target.value;
    }
    if (event.target.fieldName == "Requested_Commissions_of_Net_Premium__c") {
      this.requestCommissionPercentOfNetPreVal = event.target.value;
    }
    if (event.target.fieldName == "Match_Current_Medical_Plan_Design__c") {
      this.matchCurrentMedicalPlanVal = event.target.value;
    }
    if (event.target.fieldName == "Benefits_Covered_ISL__c") {
      this.benefitsCoveredISLVal = event.target.value;
    }
    if (event.target.fieldName == "Contract_Basis_ISL__c") {
      this.contractBasisISLVal = event.target.value;
      this.countSelectedISL = this.contractBasisISLVal.split(';').length;
    }
    if (event.target.fieldName == "Deductible_Accumulation_ISL__c") {
      this.deductibleAccumulationISLVal = event.target.value;
    }
    if (event.target.fieldName == "Separate_Aggregating_Deductible_ISL__c") {
      this.separateAggregatingDeductibleISLVal = event.target.value;
    }
    if (event.target.fieldName == "Maximum_Coverage_Limit_ISL__c") {
      this.maxCoverageLimitISLVal = event.target.value;
    }
    if (event.target.fieldName == "Advance_Reimbursement_Provision_ISL__c") {
      this.advReimbursmentProvisionISLVal = event.target.value;
    }
    if (event.target.fieldName == "Retirees_Covered_ISL__c") {
      this.retireesCoveredISL = event.target.value;
    }
    if (event.target.fieldName == "Benefits_Covered_ASL__c") {
      this.benefitsCoveredASLVal = event.target.value;
    }
    if (event.target.fieldName == "Contract_Basis_ASL__c") {
      this.contractBasisASLVal = event.target.value;
      this.countSelectedASL = this.contractBasisASLVal.split(';').length;
    }
    if (event.target.fieldName == "Maximum_Annual_Reimbursement_ASL__c") {
      this.maximumAnnualReimbursementVal = event.target.value;
    }
    if (event.target.fieldName == "Aggregate_Accommodation_ASL__c") {
      this.aggregateAccommodationAslVal = event.target.value;
    }
    if (event.target.fieldName == "Retirees_Covered_ASL__c") {
      this.retireesCoveredAslVal = event.target.value;
    }
    if (event.target.fieldName == "Current_Health_Plan_Funding_Arrangement__c") {
      this.currentHealthPlanFundingVal = event.target.value;
    }
    if (event.target.fieldName == "Current_Third_Party_Administrator__c") {
      this.currentTPAVal = event.target.value;
    }
    // if (event.target.fieldName == "Effective_Date__c") {
    //   this.newTPAVal = event.target.value;
    // }
    if (event.target.fieldName == "Current_Medical_Provider_Network__c") {
      this.currentMedicalProviderNetworkVal = event.target.value;
    }
    if (event.target.fieldName == "Current_Pharmacy_Benefit_Manager__c") {
      this.currentPharmacyBenefitManagerVal = event.target.value;
    }
    // if (event.target.fieldName == "Effective_Date__c") {
    //   this.newPBMVal = event.target.value;
    // }
    if (event.target.fieldName == "Current_Specialty_Rx_Vendor__c") {
      this.currentSpecialityRXVendorVal = event.target.value;
    }
    if (event.target.fieldName == "Terminal_Liability_Option_ISL__c") {
      this.terminalLiabilityOptionISLVal = event.target.value;
    }
  }


  handleBack(event) {
    this.isMovingBacktoBroker = true;
    const backtobrokerevent = new CustomEvent('backtobrokerevent', {
      detail: this.isMovingBacktoBroker
    });
    this.dispatchEvent(backtobrokerevent);
  }

  onLeaveTPALookup(event){
    this.searchTPAKey = event.detail.searchKey;
    console.log('value of search tpa key'+ this.searchTPAKey);
  }

  onLeavePBMLookup(event){
    this.searchPBMKey = event.detail.searchKey;
  }

  handleNext(event) {
    console.log('benefits covered isl values>>'+ this.selectedbenefitsValue);
    console.log('benefits covered asl values>>'+ this.selectedbenefitsASLValue);
    var changedValue = Number(this.deductibleValue.replace(/[^0-9\.-]+/g,""));
    var valueFromSubStack = this.minimumISLDeductibleFromSubStacks;
    if (!this.validateInputFields()) {
      this.isMovingNextToStack = false;
      this.template.querySelector('c-custom-toast').showToast('error', 'Complete all the fields in this section.');
    }
    else {
      if (!this.validateInput()) {
        this.isMovingNextToStack = false;
        this.template.querySelector('c-custom-toast').showToast('error', 'Complete all the fields in this section.');
      }
      else {
        this.date1 = new Date(this.dueDateVal);
        this.date2 = new Date(this.dateToday);
        this.dateDiff = this.date1 - this.date2;
        // this.dateDiff is in millisceonds you might need to convert it to days using below formula
        this.dateDiff = parseInt(this.dateDiff / (1000 * 60 * 60 * 24));
        if (this.dateDiff <= 7) {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Please select Requested Due Date of Quote greater than 7 days from today.');
        }
        else if (this.countSelectedISL > 3) {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Please select up to 3 Contract Basis - ISL Values.');
        }
        else if (this.selectedbenefitsValue == "") {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Please select Benefits Covered - ISL.');
        }
        else if (this.selectedbenefitsASLValue == "") {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Please select Benefits Covered - ASL.');
        }
        else if (this.countSelectedASL > 3) {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Please select up to 3 Contract Basis - ASL Values.');
        }
        else if (this.countDeductibleISL > 4) {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Please select up to 4 Deductible ISL Values.');
        }
        else if (this.accountnamevalue == null && this.searchTPAKey == "") {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Select an existing TPA or give a new Name.');
        }
        else if (this.pbmaccountnamevalue == null && this.searchPBMKey == "") {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Select an existing PBM or give a new Name.');
        }
        else if (this.selectedAgentOfRecordValue == "") {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Select Current Agent Of Record');
        }
        else if(this.selectedRequestedFundingTypeValue == ""){
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Select Requested Funding Type.');
        }
        else if(changedValue < valueFromSubStack)
        {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
                  'Please update Specific Stop-Loss Deductible. It cannot be less than State minimum requirement.');
        }
        else if (this.selectedHealthPlanFundingValue == "") {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Select Current Health Plan Funding Arrangement');
        }
        else if (typeof this.selectedMedicalPlanValue == "undefined") {
          this.isMovingNextToStack = false;
          this.template.querySelector('c-custom-toast').showToast('error',
            'Select Match Current Medical Plan Design');
        }
        else {
          this.isMovingNextToStack = true;
          this.dispatchEventFromRequestedToStackProgram(false, 'Checking if any website exists....');
          this.dispatchEventToStackProgram(false, 'Checking if any website exists....');
        }
      }
    }
    //this.isMovingNextToStack = true;
    const nexttostackevent = new CustomEvent('nexttostackevent', {
      detail: this.isMovingNextToStack
    });
    this.dispatchEvent(nexttostackevent);
  }

  @api getOppDataFromEmp(event) {
    this.empDetailsFromEmp = event.detail.oppRecordInput;
    this.eligibleEmployees = this.empDetailsFromEmp.oppfields.Number_of_Eligible_Employees__c;
    this.enrolledEmployees = this.empDetailsFromEmp.oppfields.Enrolled_Employees__c;
    this.oppType = this.empDetailsFromEmp.oppfields.Opportunity_Type__c;
    this.stateCategory =  this.empDetailsFromEmp.oppfields.State_Category__c;
    this.setTodaysDate();
    this.getSBRProducer();
    if((this.enrolledEmployees * 500 <= 20000) || (this.enrolledEmployees <= 40))
    {
      this.specificStopLossValue = 20000;
      this.specificStopLossLowValue = this.specificStopLossValue - 5000;
      this.specificStopLossHighValue = this.specificStopLossValue + 5000;
    }else
    {
     this.roundUpValue();
    }
    this.getDeductiblePickListValues();
    this.getSBRAdvantageProgramStacks();
  }

  /**This method is to pass data from broker section to stack program so that when 
 * a user clicks on the submit button of the form, the contacts and accounts are created
 * or updated and then the opportunity is created.
 */
  dispatchEventFromRequestedToStackProgram(showSpinner, helpText) {
    const oppfields = {};
    oppfields[OPPORTUNITY_NAME.fieldApiName] = 'testName';
    oppfields[ESTIMATED_ANNUAL_PREMIUM.fieldApiName] = '100000';
    oppfields[ELIGIBLE_EMPLOYEES.fieldApiName] = this.eligibleEmployees;
    oppfields[ENROLLED_EMPLOYEES.fieldApiName] = this.enrolledEmployees;
    oppfields[OPPORTUNITY_RECORD_TYPE.fieldApiName] = this.recordTypeIdValue;
    oppfields[OPPORTUNITY_TYPE.fieldApiName] = this.oppType;
    oppfields[STAGE.fieldApiName] = this.oppStage;
    oppfields[EFFECTIVE_DATE.fieldApiName] = this.effectiveDateVal;
    oppfields[DUE_DATE_TO_BROKER.fieldApiName] = this.dueDateVal;
    oppfields[CURRENT_AGENT_OF_RECORD.fieldApiName] = this.selectedAgentOfRecordValue;
    oppfields[MINIMUM_DEDUCTIBLE_ISL.fieldApiName] = this.deductibleValue;
    oppfields[SL_COVERAGE_INCLUDED.fieldApiName] = this.selectedSLCoverageValue;
    oppfields[REQUEST_FUNDING_TYPE.fieldApiName] = this.selectedRequestedFundingTypeValue;
    oppfields[REQUESTED_COMMISION.fieldApiName] = this.requestCommissionPEPMVal;
    oppfields[REQUESTED_COMMISION_PERCENT.fieldApiName] = this.requestCommissionPercentOfNetPreVal;
    oppfields[MATCH_CURRENT_MEDICAL_PLAN.fieldApiName] = this.selectedMedicalPlanValue;
    oppfields[BENEFITS_COVERED_ISL.fieldApiName] = this.selectedbenefitsValue;
    oppfields[CONTRACT_BASIS_ISL.fieldApiName] = this.selectedContractBasisIslValue;
    oppfields[DEDUCTIBLE_ACCUMULATION_ISL.fieldApiName] = this.deductibleAccumulationISLVal;
    oppfields[SEPARATE_AGGREGATE_DEDUCTIBLE_ISL.fieldApiName] = this.separateAggregatingDeductibleISLVal;
    oppfields[MAXIMUM_COVERAGE_LIMIT_ISL.fieldApiName] = this.maxCoverageLimitISLVal;
    oppfields[ADVANCE_REIMBURSEMENT_PROVISION_ISL.fieldApiName] = this.advReimbursmentProvisionISLVal;
    oppfields[RETIREES_COVERED_ISL.fieldApiName] = this.retireesCoveredISLValue;
    oppfields[BENEFITS_COVERED_ASL.fieldApiName] = this.selectedbenefitsASLValue;
    oppfields[CONTRACT_BASIS_ASL.fieldApiName] = this.selectedContractBasisAslValue;
    oppfields[AGGREGATE_ACCOMMODATION_ASL.fieldApiName] = this.aggregateAccommodationAslVal;
    oppfields[RETIREES_COVERED_ASL.fieldApiName] = this.retireesCoveredAslVal;
    oppfields[CURRENT_HEALTH_PLAN_FUNDING.fieldApiName] = this.selectedHealthPlanFundingValue;
    oppfields[SBR_PRODUCER_FIRM.fieldApiName] = this.SBRProducerFirmId;    
    //oppfields[CURRENT_TPA.fieldApiName] =	this.currentTPAVal;
    oppfields[RECEIVED_DATE_INITIAL_REQUEST.fieldApiName] = this.dateToday;
    //Change the close date later Opportunity Close date will be same as effective date............************...........*****
    oppfields[CLOSE_DATE.fieldApiName] = this.effectiveDateVal;
    //oppfields[ELIGIBLE_EMPLOYEES.fieldApiName] =	this.newTPAVal;
    oppfields[CURRENT_MEDICAL_PROVIDER_NETWORK.fieldApiName] = this.currentMedicalProviderNetworkVal;
    //oppfields[CURRENT_PHARMACY_BENEFIT_MANAGER.fieldApiName] =	this.currentPharmacyBenefitManagerVal;
    //oppfields[ELIGIBLE_EMPLOYEES.fieldApiName] =	this.newPBMVal;
    //oppfields[CURRENT_SPECIALITY_RX_VENDOR.fieldApiName] =	this.currentSpecialityRXVendorVal;
    //oppfields[ELIGIBLE_EMPLOYEES.fieldApiName] =	this.newSpecialityRXVendorVal;
    oppfields[PLAN_MIRRORING_PROVISION.fieldApiName] =	this.planMirroringProvisionVal;
    oppfields[ACTIVELY_AT_WORK_WAIVED.fieldApiName] = this.activelyAtWorkWaivedVal;
    oppfields[COST_CONTAINMENT_STRATEGIES_UTILIZED.fieldApiName] =  this.costContainmentStrategiesUtilizedVal;
    oppfields[DOMESTIC_REIMBURSEMENT_LEVEL.fieldApiName] =  this.domesticReimbursementLevelVal;
    oppfields[ORGAN_TRANSPLANTS_EXCLUDED.fieldApiName] =  this.organTransplantsExcludedVal;
    oppfields[SEPARATE_AGGREGATE_DEDUCTIBLE_ISL.fieldApiName] =   this.separateAggregatingDeductibleVal;
    oppfields[NO_NEW_LASER_AT_RENEWAL_PROVISION_ISL.fieldApiName] = 'Do Not Include';    
    oppfields[PREMIUM_RATE_CAP_AT_RENEWAL_ISL.fieldApiName] = null;
    oppfields[EXPERIENCE_REFUND_PROVISION_ISL.fieldApiName] = 'Do Not Include';     
    oppfields[ADVANCE_REIMBURSEMENT_PROVISION_ISL.fieldApiName] = 'Do Not Include';   
    oppfields[TERMINAL_LIABILITY_OPTION_ISL.fieldApiName] = this.terminalLiabilityOptionISLVal;
    oppfields[REQUESTED_PREMIUM_RATE_TIER_ISL.fieldApiName] = this.requestedPremiumRateTierVal;  
    oppfields[DEDUCTIBLE_CORRIDOR_ASL.fieldApiName] = this.deductibleCorridorASLVal;  
    oppfields[MAXIMUM_ANNUAL_REIMBURSEMENT.fieldApiName] =  this.maximumAnnualReimbursementVal; 
    oppfields[MINIMUM_AGGREGATE_ATTACHMENT_ASL.fieldApiName] =  this.minimumAggregateAttachmentASLVal;
    oppfields[REQUESTED_PREMIUM_RATE_TIER_ASL.fieldApiName] = this.requestedPremiumRateTierASLVal;
    oppfields[REQUESTED_AGG_FACTOR_RATE_TIER_ASL.fieldApiName] = this.requestedAggFactorRateTierASLVal;    
    if (this.accountid != null) {
      oppfields[CURRENT_TPA.fieldApiName] = this.accountid;
    }
    if (this.pbmaccountid != null) {
      oppfields[CURRENT_PHARMACY_BENEFIT_MANAGER.fieldApiName] = this.pbmaccountid;
    }
    if (this.specialityaccountid != null) {
      oppfields[CURRENT_SPECIALITY_RX_VENDOR.fieldApiName] = this.specialityaccountid;
    }

    if (this.searchTPAKey != "") {
      if (this.accountid != null) {
        oppfields[NEW_TPA.fieldApiName] = "";
      }else
      {
        oppfields[NEW_TPA.fieldApiName] = this.searchTPAKey;
        this.accountnamevalue = this.searchTPAKey;
      }
    }
    if (this.searchPBMKey != "") {
      if (this.pbmaccountid != null) {
        oppfields[NEW_PBM.fieldApiName] = "";
      }
      else
      {
        oppfields[NEW_PBM.fieldApiName] = this.searchPBMKey;
        this.pbmaccountnamevalue = this.searchPBMKey;
      }
    }

    const oppRecordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, oppfields };
    const ss = new CustomEvent("passoppdetailstostack", {
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

  setTodaysDate() {
    let rightNow = new Date();
    // Adjust for the user's time zone
    rightNow.setMinutes(
      new Date().getMinutes() - new Date().getTimezoneOffset()
    );
    // Return the date in "YYYY-MM-DD" format
    this.dateToday = rightNow.toISOString().slice(0, 10);
  }

  onAccountSelection(event) {
    this.accountnamevalue = event.detail.selectedValue;
    this.accountid = event.detail.selectedRecordId;
    console.log('value of searched tpa id is>>'+ this.accountid);
    console.log('value of searchkey changed to >>'+ event.detail.searchKey);
    if(event.detail.searchKey == "")
    {
      this.searchTPAKey = "";
    }
  }

  handleNewTPAChange(event) {
    this.newTPAValue = event.target.value;
  }

  onPBMSelection(event) {
    this.pbmaccountnamevalue = event.detail.selectedValue;
    this.pbmaccountid = event.detail.selectedRecordId;
    console.log('value of searched pbmaccountid id is>>'+ this.pbmaccountid);
    if(event.detail.searchKey == "")
    {
      this.searchPBMKey = "";
    }
  }

  handleNewPBMChange(event) {
    this.newPBMValue = event.target.value;
  }

  onSpecialitySelection(event) {
    this.specialityaccountnamevalue = event.detail.selectedValue;
    if (this.specialityaccountnamevalue != null) {
      this.newselectedSpecialityAccount = true;
      this.iscurrentSpecialityNotFound = false;
    }
    else {
      this.newselectedSpecialityAccount = false;
      this.iscurrentSpecialityNotFound = true;
      this.newSPECIALITYValue = "";
    }
    this.specialityaccountid = event.detail.selectedRecordId;
  }

  handleNewSpecialityChange(event) {
    this.newSPECIALITYValue = event.target.value;
  }

  handleNewSpecialityInputBlur(event) {
    if (this.newSPECIALITYValue == "") {
      this.disableCurrentSpeciality = false;
      this.iscurrentSpecialityNotFound = false;
    }
    else {
      this.disableCurrentSpeciality = true;
      this.specialityaccountid = null;
    }
  }

  async getSBRProducer() {
      if (this.searchProducerFirmName != "") {
        findSBRProducerFirm({ searchKey: this.searchProducerFirmName })
          .then(result => {
            if (result.length > 0) {
              this.SBRProducerFirmId = result[0].Id;
              }
            else {
                console.log('no result returned');
              }
            })
            .catch(error => {
              this.error = error;
            });
    }
  }

get specificStopLossOptions() {
   return this.specificStopLossOptionsFromSF;
}

handleSpecificStopLossOptions(event){
  var changedValue = Number(event.detail.value.replace(/[^0-9\.-]+/g,""));
  var valueFromSubStack = this.minimumISLDeductibleFromSubStacks;
  //To throw an errror if user selects value less than minimum Deductible ISL from stackfilter
  if(changedValue < valueFromSubStack)
  {
    this.template.querySelector('c-custom-toast').showToast('error',
            'Please update Specific Stop-Loss Deductible. It cannot be less than State minimum requirement.');
  }else{
  this.deductibleValue = event.detail.value;
  }
}

roundUpValue(){
    this.enrolledEmployeesVar = this.enrolledEmployees * 500;
    this.specificStopLossValue =  Math.ceil(this.enrolledEmployeesVar / 5000)*5000;
    console.log('value of specific stoploss>>>'+this.specificStopLossValue)
    this.specificStopLossLowValue = this.specificStopLossValue - 5000;
    this.specificStopLossHighValue = this.specificStopLossValue + 5000;
}

getDeductiblePickListValues() {
  getPickListValues({ objectName: 'Opportunity', fieldName: 'Deductible_ISL__c'})
      .then(result => {
        if (result.length > 0) {
          let options = [];
          result.forEach(r => {
            options.push({
              label: r,
              value: r,
            });
          });
          this.specificStopLossOptionsFromSF = options;
          }
        })
        .catch(error => {
          this.error = error;
        });
  }

  getSBRAdvantageProgramStacks() {
    getListOfProgramStacks({ numberOfEmployees: this.enrolledEmployees, stateCategory: this.stateCategory})
    .then(result => {
      console.log('original array'+JSON.stringify(result));
      let options = [];
      let minimumDeductibleFromSubStack;
      if (result.length > 0) {
        var uniqueResults = Object.values(
          result.reduce( (c, e) => {
            if (!c[e.SBR_Advantage_Program_Stack__c]) c[e.SBR_Advantage_Program_Stack__c] = e;
            return c;
          }, {})
        );
        console.log('dup removed array'+JSON.stringify(uniqueResults));
        uniqueResults.forEach(r => {
          if(typeof r.Minimum_ISL_Deductible__c != "undefined" ){
          minimumDeductibleFromSubStack = r.Minimum_ISL_Deductible__c;
          }
          options.push({
            key: r.SBR_Advantage_Program_Stack__c,
            value: r.SBR_Advantage_Program_Stack__r.Name,
          });
        });
        }
        this.programStackOptions=options;
        console.log('the state category is>>'+ this.stateCategory);
        console.log('Stack programs are>>>'+ JSON.stringify(this.programStackOptions));
        this.minimumISLDeductibleFromSubStacks=minimumDeductibleFromSubStack;
        if(typeof this.minimumISLDeductibleFromSubStacks != "undefined"){
        if(this.minimumISLDeductibleFromSubStacks>this.specificStopLossValue)
        {
          this.deductibleValue = this.minimumISLDeductibleFromSubStacks;
        }
        else if(this.minimumISLDeductibleFromSubStacks<this.specificStopLossValue)
        {
          this.deductibleValue = this.specificStopLossValue;
        }
        else{
          this.deductibleValue = this.specificStopLossValue;
        }
      }
      else{
        this.deductibleValue = this.specificStopLossValue;
      }
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
          // These options are needed to round to whole numbers if that's what you want.
          //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
          //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
        //Converting number to currency value
        this.deductibleValue = formatter.format(this.deductibleValue);
      })
      .catch(error => {
        this.error = error;
      });
  }

  dispatchEventToStackProgram(showSpinner, helpText) {
    const oppfields = {};
    oppfields['programstackMap'] = this.programStackOptions;
    const oppRecordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, oppfields };
    const ss = new CustomEvent("passoppdetailstostackprogram", {
      detail: {
        showspinner: showSpinner,
        helpText: helpText,
        oppRecordInput: oppRecordInput
      }
    });
    this.dispatchEvent(ss);
  }
}