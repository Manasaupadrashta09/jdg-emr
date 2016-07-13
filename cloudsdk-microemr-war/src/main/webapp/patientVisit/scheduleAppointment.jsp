<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!-- Common Include -->
 <jsp:include page="common_patientVisit.jsp"/>
<html>  
<head>
 <script type="text/javascript">
  $(function() {
		$("#submit").button();
	    var dateToday=new Date();
		$("#dateOfVisit").datepicker({changeYear:true, yearRange : 'c:c',minDate:dateToday});
		$("#navScheduleAppointmentLbl").toggleClass("ui-state-active");
			$( "#firstName").focus(function() {
				$('#msgDiv').html('');
			});
	  }); 

	    
    function createAppointment(){
        if(!validateVisit()){
            return;  
        }
        var serviceURL=basepath_visit+'create';
        $('#createForm input').each(function(){
			   storeAppointment($(this).attr('name'), $(this).val());  
	   });
         delete appointment['patientName'];
         delete appointment['providerName'];
         delete appointment['roomName']
         delete appointment['submit'];
    	 callAjax(serviceURL,appointment, 'json', false,
		  'POST', 'application/json; charset=utf-8','create');
        }
    
  </script>

</head>
<body>
<!-- Common content start -->
  <div class="container">
  <jsp:include page="patientVisit_header_nav.jsp"/>
  <div class="content">
<!-- Common content end -->
<div id="msgDiv"></div>
  <form id="createForm">
  <fieldset>
  <legend>Schedule Patient</legend>
  <table style="witdh:300px;">
  <tr><td><label class="required">Patient</label></td>
      <td>
       <input type="hidden" name="patientId" id="patientId" style="width=0%;">
       <input type="text" name="patientName" id="patientName" readonly="readonly">
       <img id="searchPatient" src="../images/search_icon.png" align="bottom"/>
      </td>
  </tr>
  <tr><td><label class="required">Provider</label></td>
      <td>
       <input type="hidden" name="providerId" id="providerId" style="width=0%;">
       <input type="text" name="providerName" id="providerName" readonly="readonly">
       <img id="searchProvider" src="../images/search_icon.png" align="bottom"/>
      </td>
  </tr>
   <tr><td><label class="required">Date of Visit</label></td><td> <input type="text" name="dateOfVisit" id="dateOfVisit"></td></tr>
      <tr><td colspan="2" align="center"><input type="button" name="submit" id="submit" onclick="createAppointment()" value="Schedule"></td></tr>
 </table> 
 </fieldset>  
  </form>
  <jsp:include page="../common/patientSearch.jsp"/>
  <jsp:include page="../common/providerSearch.jsp"/>
  </div> <!-- content div end -->
  </body>
  </html>