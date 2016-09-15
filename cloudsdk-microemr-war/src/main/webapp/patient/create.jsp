<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!-- Common Include -->
 <jsp:include page="common_patient.jsp"/>
<html>  
<head>

 <script type="text/javascript">
 $(function() {
		$("#submit").button();
		var dateToday=new Date();
		$("#dob").datepicker({changeYear:true, yearRange : 'c-90:c',maxDate:dateToday});
		$("#navCreatePatientLbl").toggleClass("ui-state-active");
		/* $("#createForm").click(function(){
			if($('#msgDiv').has('span').length>0){
				$('#msgDiv').html('');
			}
		   }); */
			$( "#firstName").focus(function() {
				$('#msgDiv').html('');
			});
	  });



	   
    function createPatient(){
        //uncomment the below for client side validations.
      /*  if(!validatePatient()){
               return;
         }   */
       patient={};
		var serviceURL = basepath_patient + 'create';
			$('#createForm :input[type="text"]').each(function() {
				storePatient($(this).attr('name'), $(this).val());
			});
		callAjax(serviceURL, patient, 'json', false, 'POST',
					'application/json; charset=utf-8', 'create');

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
  <form id="createForm">
  <fieldset>
  <legend>Create Patient</legend>
  <table style="witdh:300px;">
  <tr><td><label class="required">First Name</label></td><td><input type="text" name="firstName" id="firstName"></td></tr>
   <tr><td><label>Middle Name</label></td><td> <input type="text" name="middleName"></td></tr>
    <tr><td><label class="required">Last Name</label></td><td> <input type="text" name="lastName"></td></tr>
     <tr><td><label class="required">Date Of Birth</label></td><td><input type="text" name="dob" id="dob" readonly></td></tr>
      <tr><td><label class="required">State</label></td><td><input type="text" name="state" id="state" ></td></tr>
       <tr><td><label class="required">City</label></td><td><input type="text" name="city" id="city" ></td></tr>
        <tr><td><label class="required">Zip</label></td><td><input type="text" name="zip" id="zip" ></td></tr>
     <!--  <tr><td colspan="2" align="center"><input class="button-ui ui-corner-all ui-state-default ui-widget" type="button" name="submit" id="submit" onclick="createPatient()" value="Create"></td></tr> -->
      <tr><td colspan="2" align="center"><input type="button" name="submit" id="submit" onclick="constraintValidate('create')" value="Create"></td></tr>
      
 </table> 
 </fieldset>  
  </form>
  
  </div> <!-- content div end -->
  </body>
  </html>