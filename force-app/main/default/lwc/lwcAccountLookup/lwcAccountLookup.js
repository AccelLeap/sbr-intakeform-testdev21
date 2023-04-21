import { LightningElement, track, wire, api } from "lwc";  
  import findRecords from "@salesforce/apex/IntakeFormWebsiteSearchController.findAccRecords";  
  export default class LwcAccountLookup extends LightningElement {  
   @track recordsList;  
   @track searchKey = "";  
   @api selectedValue;  
   @api selectedRecordId;  
   @api objectApiName;  
   @api iconName;  
   @api lookupLabel;  
   @track message;  
     
   onLeave(event) {  
    setTimeout(() => {  
     //this.searchKey = "";  
     this.recordsList = null;  
     const passEventr = new CustomEvent('leavelookup', {  
         detail: {searchKey: this.searchKey,selectedValue: this.selectedValue }  
        });  
        this.dispatchEvent(passEventr);
    }, 300);  
   }  
     
   onRecordSelection(event) {  
    console.log('record selected'+event.target.dataset.website);
    this.selectedRecordId = event.target.dataset.key;  
    this.selectedValue = event.target.dataset.website;  
    //this.searchKey = "";  
    this.onSeletedRecordUpdate();  
   }  
    
   handleKeyChange(event) {  
    const searchKey = event.target.value;  
    this.searchKey = searchKey;  
    this.getLookupResult();  
   }  
    
   removeRecordOnLookup(event) { 
    console.log('Item removed'); 
    this.searchKey = "";  
    this.selectedValue = null;  
    this.selectedRecordId = null;  
    this.recordsList = null;  
    this.onSeletedRecordUpdate();  
  }  
 
   getLookupResult() {  
    findRecords({ searchKey: this.searchKey, objectName : this.objectApiName })  
     .then((result) => {  
      if (result.length===0) {  
        this.recordsList = null;  
        this.message = "";  
       } else {  
        this.recordsList = result;  
        this.message = "";  
       }  
       this.error = undefined;  
     })  
     .catch((error) => {  
      this.error = error;  
      this.recordsList = undefined;  
     });  
   }  
    
   onSeletedRecordUpdate(){  
    const passEventr = new CustomEvent('recordselection', {  
      detail: { selectedRecordId: this.selectedRecordId, selectedValue: this.selectedValue, searchKey: this.searchKey }  
     });  
     this.dispatchEvent(passEventr);  
   }  
  }