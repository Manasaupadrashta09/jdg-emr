<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="../WEB-INF/views/taglibs.jsp"%>
<html>   	  
<head>
<style type="text/css">
 #navigation{font-size:60%; 
 }
 
</style>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
 <script type="text/javascript">

$(document).ready(function(){
  $("#navigation").buttonset();
 });

</script>
</head>
<body>    
 <div id="navigation" class="ui-widget-header ui-widget-content" style="margin-right: 3px;">
	<input type="radio" id="navScheduleAppointment" name="radio" onclick="location.href='<c:url value='./scheduleAppointment.jsp'/>'"/>
		<label id="navScheduleAppointmentLbl" for="navScheduleAppointment" title="Schedule Appointment">Schedule Appointment</label>
		
	<input type="radio" id="navViewAppointments" name="radio" onclick="location.href='<c:url value='./viewAppointments.jsp'/>'"/>
	<label id="navViewAppointmentsLbl" for="navViewAppointments" title="View Appointments">View Appointments</label>
	
	<input type="radio" id="navPatientCheckin" name="radio" onclick="location.href='<c:url value='./patientCheckin.jsp'/>'"/>
	<label id="navPatientCheckinLbl" for="navPatientCheckin" title="Patient Checkin">Patient Checkin</label>
	
	<input type="radio" id="navViewCheckedInPatients" name="radio" onclick="location.href='<c:url value='./viewCheckedInPatients.jsp'/>'"/>
	<label id="navViewCheckedInPatientsLbl" for="navViewCheckedInPatients" title="Record Vitals">Record Vitals</label>
	
	<input type="radio" id="navPatientCheckout" name="radio" onclick="location.href='<c:url value='./patientCheckout.jsp'/>'"/>
	<label id="navPatientCheckoutLbl" for="navPatientCheckout" title="Patient Checkout">Patient Checkout</label>
	
</div>
</body>
</html>