public with sharing class IntakeFormLogTriggerHandler {
    public static void onAfterInsert(List<IntakeFormLog__c> execLogs){
        List<Messaging.SingleEmailMessage> messages = new List<Messaging.SingleEmailMessage>();
          // Org-wide email address used for other notifications:
        OrgWideEmailAddress[] orgWideEmailAddress = [SELECT Id FROM OrgWideEmailAddress WHERE Address = 'sbr@accelerize360.com'];
        for(IntakeFormLog__c intakeFormLogObj: (List<IntakeFormLog__c>)Trigger.new){    
            //Send Email Notification
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            if(orgWideEmailAddress.size()>0){
                mail.setOrgWideEmailAddressId(orgWideEmailAddress.get(0).Id);
            }
            mail.setToAddresses(new List<String>{'sbr@accelerize360.com'});
            mail.setSubject('Error Occured while submitting the Intake Form on '+system.today().format());
            mail.setPlainTextBody('Error! A new Intake Form Log object has been created in Salesforce. Please see the error log '+URL.getOrgDomainUrl().toExternalForm()+'/'+intakeFormLogObj.Id+' for more details.');
            messages.add(mail);
        }
        Messaging.sendEmail(messages);
    }
}