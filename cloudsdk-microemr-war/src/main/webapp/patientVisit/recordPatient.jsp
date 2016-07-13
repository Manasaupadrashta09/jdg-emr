<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
 <!-- Common Include -->
 <jsp:include page="common_patientVisit.jsp"/>   
  <html>
   <head>
     <script type="text/javascript">
     $(document).ready(function(){
    	 $("#submit").button();
         $("textarea").click(function(){
        	  $('#msgDiv').html('');
         });
         var patientVisitId=<%=request.getParameter("identifier")%>
         $("#identifier").val(patientVisitId);
         appointment={"identifier":patientVisitId};
     	   var serviceURL=basepath_visit+'read'
     	    callAjax(serviceURL, appointment, 'json', false, 'POST',
     		'application/json; charset=utf-8', 'recordpatient');
       });
       function recordPatient(){
           $('#updateForm input').each(function(){
   			   storeAppointment($(this).attr('name'), $(this).val());  
   	   });
       	   appointment={};
           storeAppointment('identifier', $('#identifier').val());  
       	   var diagnosis={};
       	   diagnosis["cheifComplaints"]=$("#cheifComplaints").val();
       	diagnosis["bloodpressure"]=$("#bloodpressure").val();
       	diagnosis["diagnosis"]=$("#diagnosis").val();
       	diagnosis["medications"]=$("#medications").val();
       	diagnosis["hpi"]=$("#hpi").val();

       	storeAppointment("diagnosis", diagnosis)
    	   var serviceURL=basepath_visit+'update/diagnosis';
       	 callAjax(serviceURL,appointment, 'json', false,
   		  'POST', 'application/json; charset=utf-8','updateRecord');
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
  <form id="recordFoam">
  <fieldset>
  <legend>Record Details</legend>
  <table style="witdh:300px;">
  <tr><td><label>Patient</label></td>
      <td>
       <input type="hidden" name="identifier" id="identifier">
       <input type="text" name="patientName" id="patientName" readonly="readonly">
      </td>
  </tr>
  <tr><td><label>Cheif Complaints</label></td>
      <td>
       <textarea name="cheifComplaints" id="cheifComplaints"></textarea>
      </td>
  </tr>
  <tr><td><label>Blood Pressure</label></td>
      <td>
       <input type="text" name="bloodpressure" id="bloodpressure">
      </td>
  </tr>
  
  <tr><td><label>Diagnosis</label></td>
      <td>
       <textarea name="diagnosis" id="diagnosis"></textarea>
      </td>
  </tr>
  
  <tr><td><label>Medications</label></td>
      <td>
       <textarea name="medications" id="medications"></textarea> 
      </td>
  </tr>
  <tr><td><label>HPI</label></td>
      <td>
       <input type="text" name="hpi" id="hpi">
      </td>
  </tr>
      <tr><td colspan="2" align="center"><input type="button" name="submit" id="submit" onclick="recordPatient()" value="upadte"></td></tr>
 </table> 
 </fieldset>  
  </form>
  </div> <!-- content div end -->
  </body>
  </html>
    
  
