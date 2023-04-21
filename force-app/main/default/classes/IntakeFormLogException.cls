public class IntakeFormLogException extends Exception{

        //Log Error Information while submitting IntakeForm in the object
        public static void LogIntakeFormException(String source, Exception e, String className, String methodName){
            IntakeFormLog__c exc = new IntakeFormLog__c();
            exc.Message__c = e.getMessage();
            exc.MethodName__c = methodName;
            exc.ClassName__c = className;
            exc.Error__c = true;
            exc.Source__c = source;
            exc.Stack_Trace__c =  String.valueOf(e);
            exc.Exception_Type__c = e.getTypeName();
            exc.Line_Number__c = String.valueOf(e.getLineNumber());
            Database.insert(exc); 
        }

    }