public without sharing class IntakeFormWebsiteSearchController {
    @AuraEnabled(cacheable=false)
    public static List<Account> findEmployerWebsite(String searchKey) {
        String key = '%' + searchKey + '%';
        Id recordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Employer').getRecordTypeId();
        
        List<Account> accountList = new List<Account>([
            SELECT Id, Name, Broker_Assignment_Firm__c,Broker_Assignment_Firm__r.Name,
            Broker_Primary_Contact__c,Broker_Secondary_Contact__c,Broker_Tertiary_Contact__c,
            Broker_Primary_Contact__r.FirstName,
            Broker_Primary_Contact__r.LastName,
            Broker_Primary_Contact__r.Title,
            Broker_Primary_Contact__r.Phone,
            Broker_Primary_Contact__r.Email,
            Broker_Primary_Contact__r.Account.Id,
            Broker_Primary_Contact__r.Account.Name,
            Broker_Primary_Contact__r.Account.Website,
            Broker_Primary_Contact__r.Account.BillingStreet,
            Broker_Primary_Contact__r.Account.BillingCity,
            Broker_Primary_Contact__r.Account.BillingState,
            Broker_Primary_Contact__r.Account.BillingPostalCode,
            Broker_Primary_Contact__r.Account.BillingCountry,
            Broker_Secondary_Contact__r.FirstName,
            Broker_Secondary_Contact__r.LastName,
            Broker_Secondary_Contact__r.Title,
            Broker_Secondary_Contact__r.Phone,
            Broker_Secondary_Contact__r.Email,
            Broker_Secondary_Contact__r.Account.Id,
            Broker_Secondary_Contact__r.Account.Name,
            Broker_Secondary_Contact__r.Account.Website,
            Broker_Secondary_Contact__r.Account.BillingStreet,
            Broker_Secondary_Contact__r.Account.BillingCity,
            Broker_Secondary_Contact__r.Account.BillingState,
            Broker_Secondary_Contact__r.Account.BillingPostalCode,
            Broker_Secondary_Contact__r.Account.BillingCountry,
            Broker_Tertiary_Contact__r.FirstName,
            Broker_Tertiary_Contact__r.LastName,
            Broker_Tertiary_Contact__r.Title,
            Broker_Tertiary_Contact__r.Phone,
            Broker_Tertiary_Contact__r.Email,
            Broker_Tertiary_Contact__r.Account.Id,
            Broker_Tertiary_Contact__r.Account.Name,
            Broker_Tertiary_Contact__r.Account.Website,
            Broker_Tertiary_Contact__r.Account.BillingStreet,
            Broker_Tertiary_Contact__r.Account.BillingCity,
            Broker_Tertiary_Contact__r.Account.BillingState,
            Broker_Tertiary_Contact__r.Account.BillingPostalCode,
            Broker_Tertiary_Contact__r.Account.BillingCountry,
            Broker_Producer__r.FirstName,
            Broker_Producer__r.LastName,
            Broker_Producer__r.Title,
            Broker_Producer__r.Phone,
            Broker_Producer__r.Email,
            Broker_Producer__r.Account.Id,
            Broker_Producer__r.Account.Name,
            Broker_Producer__r.Account.Website,
            Broker_Producer__r.Account.BillingStreet,
            Broker_Producer__r.Account.BillingCity,
            Broker_Producer__r.Account.BillingState,
            Broker_Producer__r.Account.BillingPostalCode,
            Broker_Producer__r.Account.BillingCountry,
            Primary_Telephone__c,
            Website,Broker_Producer__c,
            SIC_Code_and_Description__c,
            SIC_Code_and_Description__r.Name,
            Additional_Locations__c,
            FEIN__c,
            BillingStreet,
            BillingCity,
            BillingState,
            BillingPostalCode,
            State_Category__c,
            BillingCountry,
            RecordTypeId,
            (SELECT Id,Status__c FROM Policies__r where Status__c='Pending' OR Status__c='In Force')
            FROM Account
            WHERE Website LIKE :key and recordtypeid=:recordTypeId
            ORDER BY lastmodifieddate desc
            LIMIT 1
        ]);
        system.debug('accountList>>>>>>>>'+accountList);
        return accountList;
    }

    @AuraEnabled(Cacheable=false)
    public static List<Fields> getListOfFields(String sObjectName, String searchTerm) {
        system.debug('sObjectName>>>>>>'+sObjectName);
        List<Fields> listOfFields = new List<Fields>();
        
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Map<String, Schema.SObjectField> fieldMap = schemaMap.get(sObjectName).getDescribe().fields.getMap();
        
        for(String fieldName : fieldMap.keySet()) {
            //We don't want to search for fields with these data-types: ADDRESS, REFERENCE, ID & URL
            if(String.valueOf(fieldMap.get(fieldName).getDescribe().getType()) != 'ADDRESS'
               && String.valueOf(fieldMap.get(fieldName).getDescribe().getType()) != 'REFERENCE'
               && String.valueOf(fieldMap.get(fieldName).getDescribe().getType()) != 'ID'
               && String.valueOf(fieldMap.get(fieldName).getDescribe().getType()) != 'URL') {
                   if(String.valueOf(fieldMap.get(fieldName).getDescribe().getLabel().toLowerCase()).contains(searchTerm.toLowerCase())) {
                       Fields newFieldProperties = new Fields();
                       newFieldProperties.fieldLabel = fieldMap.get(fieldName).getDescribe().getLabel();
                       newFieldProperties.fieldName = fieldMap.get(fieldName).getDescribe().getName();
                       newFieldProperties.fieldType = String.valueOf(fieldMap.get(fieldName).getDescribe().getType());
                       listOfFields.add(newFieldProperties);
                   }
               }
            
        }
        
        return listOfFields;
    }

    @AuraEnabled
    public static String updateEmployerAccountWithContact(Account accountToUpdate) {
        String updateStatusString = '';
        Account[] accts = new List<Account>();
        accts.add(accountToUpdate);
        /*Account acc = new Account();
        acc.Id = accountId;
        acc.Broker_Secondary_Contact__c = contactId;
        acc.Broker_Assignment_Firm__c = brokerAccountId;
        accts.add(acc);*/
        Database.SaveResult[] srList = Database.update(accts, false);
        
        // Iterate through each returned result
        for (Database.SaveResult sr : srList) {
            if (!sr.isSuccess()) {
                // Operation failed, so get all errors                
                for(Database.Error err : sr.getErrors()) {
                    updateStatusString = err.getStatusCode() + ': ' + err.getMessage() + ' : '+err.getFields();
                    System.debug('The following error has occurred.');                    
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Fields that affected this error: ' + err.getFields());
                }
            }else{
                updateStatusString = 'Success';
            }
        }
        return updateStatusString;
    }

    @AuraEnabled
    public static String updateContactAccount(Contact updateContactAccount) {
        String updateStatusString = '';
        Contact[] cnts = new List<Contact>();
        cnts.add(updateContactAccount);
        Database.SaveResult[] srList = Database.update(cnts, false);
        // Iterate through each returned result
        for (Database.SaveResult sr : srList) {
            if (!sr.isSuccess()) {
                // Operation failed, so get all errors                
                for(Database.Error err : sr.getErrors()) {
                    updateStatusString = err.getStatusCode() + ': ' + err.getMessage() + ' : '+err.getFields();
                    System.debug('The following error has occurred.');                    
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Fields that affected this error: ' + err.getFields());
                }
            }else{
                updateStatusString = 'Success';
            }
        }
        return updateStatusString;
    }    

    @AuraEnabled
    public static string saveContactRecord(Contact objCon){
        String updateStatusString = '';
        try{
            Contact[] contactList = new List<Contact>();
            contactList.add(objCon);
            Database.SaveResult[] srList = Database.insert(contactList, false);
            // Iterate through each returned result
            for (Database.SaveResult sr : srList) {
                if (!sr.isSuccess()) {
                    // Operation failed, so get all errors                
                    for(Database.Error err : sr.getErrors()) {
                        updateStatusString = err.getStatusCode() + ': ' + err.getMessage() + ' : '+err.getFields();
                        System.debug('The following error has occurred.');                    
                        System.debug(err.getStatusCode() + ': ' + err.getMessage());
                        System.debug('Fields that affected this error: ' + err.getFields());
                    }
                }else{
                    updateStatusString = sr.getId();
                }
            }
            return updateStatusString;
        }
        catch(Exception ex) {
            IntakeFormLogException.LogIntakeFormException('Intake Form', ex, 'IntakeFormWebsiteSearchController', 'saveContactRecord');
            throw new AuraHandledException(ex.getMessage());
        }
    }

    public class Fields {
        @AuraEnabled
        public String fieldLabel { get; set; }
        @AuraEnabled
        public String fieldName { get; set; }
        @AuraEnabled
        public String fieldType { get; set; }
    }

    @AuraEnabled
    public static Opportunity createOpp(Opportunity objCon) {
        try {
            insert objCon;
            } catch (Exception exp) {
            IntakeFormLogException.LogIntakeFormException('Intake Form', exp, String.valueOf(IntakeFormWebsiteSearchController.class), 'createOpp');
            }
        return objCon;
    }

    /**
    *@Description This method creates record in the salesforce 
    *based on the data recieved from SBR Intake Form
    *@param1 Generic object with all the fields
    *@return The Id of the created record
    */
    @AuraEnabled
    public static String createObj(sobject objCon) {
        try {
            Insert objCon ;
            } catch (Exception exp) {
            IntakeFormLogException.LogIntakeFormException('Intake Form', exp, String.valueOf(IntakeFormWebsiteSearchController.class), 'createObj');
            }
        return objCon.Id;
    }

    @AuraEnabled
    public static string updateAccount(Account objCon){
        String updateStatusString = '';
        try{
            Account[] accountList = new List<Account>();
            accountList.add(objCon);
            Database.SaveResult[] srList = Database.update(accountList, false);
            // Iterate through each returned result
            for (Database.SaveResult sr : srList) {
                if (!sr.isSuccess()) {
                    // Operation failed, so get all errors                
                    for(Database.Error err : sr.getErrors()) {
                        updateStatusString = err.getStatusCode() + ': ' + err.getMessage() + ' : '+err.getFields();
                        System.debug('The following error has occurred.');                    
                        System.debug(err.getStatusCode() + ': ' + err.getMessage());
                        System.debug('Fields that affected this error: ' + err.getFields());
                    }
                }else{
                    updateStatusString = sr.getId();
                }
            }
            return updateStatusString;
        }
        catch(Exception ex) {
            IntakeFormLogException.LogIntakeFormException('Intake Form', ex, 'IntakeFormWebsiteSearchController', 'updateAccount');
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static string updateContact(Contact objCon){
        String updateStatusString = '';
        try{
            Contact[] contactList = new List<Contact>();
            contactList.add(objCon);
            Database.SaveResult[] srList = Database.update(contactList, false);
            // Iterate through each returned result
            for (Database.SaveResult sr : srList) {
                if (!sr.isSuccess()) {
                    // Operation failed, so get all errors                
                    for(Database.Error err : sr.getErrors()) {
                        updateStatusString = err.getStatusCode() + ': ' + err.getMessage() + ' : '+err.getFields();
                        System.debug('The following error has occurred.');                    
                        System.debug(err.getStatusCode() + ': ' + err.getMessage());
                        System.debug('Fields that affected this error: ' + err.getFields());
                    }
                }else{
                    updateStatusString = sr.getId();
                }
            }
            return updateStatusString;
        }
        catch(Exception ex) {
            IntakeFormLogException.LogIntakeFormException('Intake Form', ex, 'IntakeFormWebsiteSearchController', 'updateContact');
            throw new AuraHandledException(ex.getMessage());
        }
    }

    //Adding for test component remove/modify later.
    @AuraEnabled(cacheable=true)
    public static List<sobject> findRecords(String searchKey,String objectName,String fieldAPI,String filterCond){
        String key = '%' + searchKey + '%';
        List<Account> accountList = new List<Account>([
            SELECT Id, Name
            FROM Account
            WHERE Name LIKE :key
            AND Vendor_Type__c includes ('Third Party Administrator')
            ORDER BY lastmodifieddate desc
            LIMIT 6
        ]);
        system.debug('accountList>>>>>>>>'+accountList);
        return accountList;
    }

        //Adding for test component remove/modify later.
        @AuraEnabled(cacheable=true)
        public static List<sobject> findPBMTypeRecords(String searchKey,String objectName,String fieldAPI,String filterCond){
            String key = '%' + searchKey + '%';
            List<Account> accountList = new List<Account>([
                SELECT Id, Name
                FROM Account
                WHERE Name LIKE :key
                AND Vendor_Type__c includes ('Pharmacy Benefits Manager')
                ORDER BY lastmodifieddate desc
                LIMIT 6
            ]);
            system.debug('accountList>>>>>>>>'+accountList);
            return accountList;
        }

    //Adding for test component remove/modify later.
    @AuraEnabled(cacheable=false)
    public static List<Contact> findBrokerAccount(String searchKey){
        String key = '%' + searchKey + '%';
        List<Contact> contactList = new List<Contact>([
            SELECT Id,FirstName,LastName,Title,Phone,Email,
            Account.Name,Account.SBR_Producer__c,
            Account.Website, Account.BillingStreet,
            Account.BillingCity,Account.BillingState,
            Account.BillingPostalCode,Account.BillingCountry
            FROM Contact 
            WHERE Email LIKE :key
            ORDER BY lastmodifieddate desc
            LIMIT 1
        ]);
        system.debug('contactList>>>>>>>>'+contactList);
        return contactList;
    }

    //Adding for test component remove/modify later.
    @AuraEnabled(cacheable=false)
    public static List<Account> findSBRProducerFirm(String searchKey){
        String key = '%' + searchKey + '%';
        List<Account> accountList = new List<Account>([
            SELECT Id, Name
            FROM Account
            WHERE Name LIKE :key
            LIMIT 1
        ]);
        system.debug('accountList>>>>>>>>'+accountList);
        return accountList;
    }

    //Adding to get the picklist values in the form of list
    @AuraEnabled(cacheable=false)
    public static List<String> getPickListValues(String objectName, String fieldName){
        List<String> values = new List<String>();
        List<Schema.DescribeSobjectResult> results = Schema.describeSObjects(new List<String>{objectName});
        for(Schema.DescribeSobjectResult res : results) {
            for (Schema.PicklistEntry entry : res.fields.getMap().get(fieldName).getDescribe().getPicklistValues()) {
                if (entry.isActive()) {
                    values.add(entry.getValue());
                }
            }
        }
        return values;
    }

    @AuraEnabled(Cacheable=false)
    public static List<SBR_Advantage_Program_SubStack__c> getListOfProgramStacks(String numberOfEmployees, String stateCategory) {
        String stateValue = '\'' + stateCategory + '\'';
        Integer intVal = Integer.ValueOf(numberOfEmployees);
        String queryString = 'SELECT Id,Minimum_ISL_Deductible__c, SBR_Advantage_Program_Stack__c, SBR_Advantage_Program_Stack__r.Name FROM SBR_Advantage_Program_SubStack__c ';
        queryString += 'WHERE Minimum_Number_of_Covered_Employee_Lives__c <= ';
        queryString += intVal;
        queryString += ' AND Maximum_Number_of_Covered_Employee_Lives__c >= ';
        queryString += intVal;
        queryString += ' AND Available_States__c INCLUDES (';
        queryString += stateValue;
        queryString += ')';
        system.debug('queryString>>>>>>>>'+queryString);
        List<SBR_Advantage_Program_SubStack__c> programSubStackList = DataBase.query(queryString);
        system.debug('programSubStackList>>>>>>>>'+programSubStackList);
        return programSubStackList;
    }

    @AuraEnabled(cacheable=true)  
    public static List<sobject> findAccRecords(String searchKey, String objectName) {  
        Id recordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Employer').getRecordTypeId();
        string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';  
        string query = 'SELECT Id, Name, Website FROM ' +objectName+ ' WHERE Website LIKE '+searchText+'and recordtypeid=:'+recordTypeId+' LIMIT 6';  
        return Database.query('SELECT Id, Name, Website FROM ' +objectName+ ' WHERE Website LIKE '+searchText+' LIMIT 6');  
    }

    //Creating and linking files to the created opportunity
    @AuraEnabled(cacheable=false)
    public static String createFiles(String oppId, String fileListJSON){
        List<Map<String,String>> fileList = (List<Map<String,String>>) JSON.deserialize(fileListJSON, List<Map<String,String>>.class);
        List<ContentVersion> insertCVs = new List<ContentVersion>();

        for(Map<String,String> file:fileList){
            ContentVersion cv = new ContentVersion();
            cv.Title = file.get('fileName');
            cv.VersionData = EncodingUtil.base64Decode(file.get('base64'));
            //cv.VersionData = Blob.valueOf((String) file.get('base64'));
            cv.PathOnClient = file.get('fileName');
            cv.isMajorVersion = true;
            insertCVs.add(cv);
        }

        if(!insertCVs.isEmpty()){
            Database.insert(insertCVs);

            List<ContentVersion> insertCVList = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id IN :insertCVs];
            List<ContentDocumentLink> insertCDList = new List<ContentDocumentLink>();

            for(ContentVersion cv: insertCVList){
                ContentDocumentLink cdl = new ContentDocumentLink();
                cdl.ContentDocumentId = cv.ContentDocumentId;
                cdl.LinkedEntityId = oppId;
                cdl.ShareType = 'V';
                insertCDList.add(cdl);
            }

            if(!insertCDList.isEmpty()){
                Database.insert(insertCDList);
            }
        }

        return JSON.serialize(insertCVs);
    }

    @AuraEnabled(cacheable=false)
    public static List<Account> findEmployerDetails(Id searchedId) {
        
        List<Account> accountList = new List<Account>([
            SELECT Id, Name, Broker_Assignment_Firm__c,Broker_Assignment_Firm__r.Name,
            Broker_Primary_Contact__c,Broker_Secondary_Contact__c,Broker_Tertiary_Contact__c,
            Broker_Primary_Contact__r.FirstName,
            Broker_Primary_Contact__r.LastName,
            Broker_Primary_Contact__r.Title,
            Broker_Primary_Contact__r.Phone,
            Broker_Primary_Contact__r.Email,
            Broker_Primary_Contact__r.Account.Id,
            Broker_Primary_Contact__r.Account.Name,
            Broker_Primary_Contact__r.Account.Website,
            Broker_Primary_Contact__r.Account.BillingStreet,
            Broker_Primary_Contact__r.Account.BillingCity,
            Broker_Primary_Contact__r.Account.BillingState,
            Broker_Primary_Contact__r.Account.BillingPostalCode,
            Broker_Primary_Contact__r.Account.BillingCountry,
            Broker_Secondary_Contact__r.FirstName,
            Broker_Secondary_Contact__r.LastName,
            Broker_Secondary_Contact__r.Title,
            Broker_Secondary_Contact__r.Phone,
            Broker_Secondary_Contact__r.Email,
            Broker_Secondary_Contact__r.Account.Id,
            Broker_Secondary_Contact__r.Account.Name,
            Broker_Secondary_Contact__r.Account.Website,
            Broker_Secondary_Contact__r.Account.BillingStreet,
            Broker_Secondary_Contact__r.Account.BillingCity,
            Broker_Secondary_Contact__r.Account.BillingState,
            Broker_Secondary_Contact__r.Account.BillingPostalCode,
            Broker_Secondary_Contact__r.Account.BillingCountry,
            Broker_Tertiary_Contact__r.FirstName,
            Broker_Tertiary_Contact__r.LastName,
            Broker_Tertiary_Contact__r.Title,
            Broker_Tertiary_Contact__r.Phone,
            Broker_Tertiary_Contact__r.Email,
            Broker_Tertiary_Contact__r.Account.Id,
            Broker_Tertiary_Contact__r.Account.Name,
            Broker_Tertiary_Contact__r.Account.Website,
            Broker_Tertiary_Contact__r.Account.BillingStreet,
            Broker_Tertiary_Contact__r.Account.BillingCity,
            Broker_Tertiary_Contact__r.Account.BillingState,
            Broker_Tertiary_Contact__r.Account.BillingPostalCode,
            Broker_Tertiary_Contact__r.Account.BillingCountry,
            Broker_Producer__r.FirstName,
            Broker_Producer__r.LastName,
            Broker_Producer__r.Title,
            Broker_Producer__r.Phone,
            Broker_Producer__r.Email,
            Broker_Producer__r.Account.Id,
            Broker_Producer__r.Account.Name,
            Broker_Producer__r.Account.Website,
            Broker_Producer__r.Account.BillingStreet,
            Broker_Producer__r.Account.BillingCity,
            Broker_Producer__r.Account.BillingState,
            Broker_Producer__r.Account.BillingPostalCode,
            Broker_Producer__r.Account.BillingCountry,
            Primary_Telephone__c,
            Website,Broker_Producer__c,
            SIC_Code_and_Description__c,
            SIC_Code_and_Description__r.Name,
            Additional_Locations__c,
            FEIN__c,
            BillingStreet,
            BillingCity,
            BillingState,
            BillingPostalCode,
            State_Category__c,
            BillingCountry,
            RecordTypeId,
            (SELECT Id,Status__c FROM Policies__r where Status__c='Pending' OR Status__c='In Force')
            FROM Account
            WHERE Id=: searchedId
            ORDER BY lastmodifieddate desc
            LIMIT 1
        ]);
        system.debug('accountList>>>>>>>>'+accountList);
        return accountList;
    }


    @AuraEnabled( cacheable=true )  
    public static List < Available_State__mdt > fetchStateRecs() {
        return [ SELECT Id, MasterLabel, State__c, State_Category__c, State_Value__c FROM Available_State__mdt ];
    }

}