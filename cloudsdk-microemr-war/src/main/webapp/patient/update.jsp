<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!-- Common Include -->
 <jsp:include page="common_patient.jsp"/>   
  <html>
   <head>
     <script type="text/javascript">
     $(document).ready(function(){
    	 $("#submit").button();
 		 $("#dob").datepicker({changeYear:true, yearRange : 'c-90:c'});
 		 $("#navCreatePatientLbl").toggleClass("ui-state-active");
 		 $( "#firstName").focus(function() {
			$('#msgDiv').html('');
		});
         var patientId=<%=request.getParameter("identifier")%>
         patient={"identifier":patientId};
     	   var serviceURL=basepath_patient+'read'
     	    callAjax(serviceURL, patient, 'json', false, 'POST',
     		'application/json; charset=utf-8', 'read');
       });
       function updatePatient(){
    	  /*  if(!validatePatient()){
               return;
             }  */
             patient={};
       	 var serviceURL=basepath_patient+'update';
            $('#updateForm :input[type="text"]').each(function(){
    			   storePatient($(this).attr('name'), $(this).val());  
    	   });
        	 callAjax(serviceURL, patient, 'json', false,
    		  'POST', 'application/json; charset=utf-8', 'update');
       }
  </script>
   
   </head>
   <body>
     <!-- Common content start -->
    <div class="container">
  <jsp:include page="patient_header_nav.jsp"/>
  <div class="content">
   <!-- Common content end -->
   <div id="msgDiv"></div>
  <form id="updateForm">
  <fieldset>
  <legend>Update Patient</legend>
  <table style="witdh:300px;">
   <tr><td><label>ID</label></td><td><input type="text" name="identifier" readonly></td></tr>
  <tr><td><label class="required">First Name</label></td><td><input type="text" name="firstName" id="firstName"></td></tr>
   <tr><td><label>Middle Name</label></td><td> <input type="text" name="middleName"></td></tr>
    <tr><td><label class="required">Last Name</label></td><td> <input type="text" name="lastName"></td></tr>
     <tr><td><label class="required">Date Of Birth</label></td><td><input type="text" name="dob" id="dob" readonly></td></tr>
          <tr><td><label class="required">State</label></td><td><input type="text" name="state" id="state" ></td></tr>
          <tr><td><label class="required">City</label></td><td><input type="text" name="city" id="city" ></td></tr>
          <tr><td><label class="required">Zip</label></td><td><input type="text" name="zip" id="zip" ></td></tr>
     
      <tr><td colspan="2" align="center"><input type="button" name="submit" id="submit" onclick="constraintValidate('update')" value="update"></td></tr>
 </table> 
 </fieldset>  
  </form>
   </div> <!-- content div end -->
   </body>
  </html>  
    
  
