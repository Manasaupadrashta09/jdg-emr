<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <!-- Common Include -->
 <jsp:include page="common_patientVisit.jsp"/>
 <html>
 <head>
	 <script type="text/javascript">
	 $(function() {
		 scheduledToday();
		 $("#navPatientCheckinLbl").toggleClass("ui-state-active");
	 });     
	 </script>
	 
	 <style type="text/css">
	   .td{
	     width:auto;
	   }
	 </style>
 </head>
 </html>
 <body>
<!-- Common content start -->
  <div class="container">
  <jsp:include page="patientVisit_header_nav.jsp"/>
  <div class="content">
<!-- Common content end -->
<div id="dispalyList">
  <fieldset>
  <legend>Scheduled for Today</legend>
     <table border="1px" id="displayTable" class="tablesorter">
       <thead>
      <tr> <th style="width:5%;">ID</th> <th style="width:25%;" >Patient Name</th><th style="width:15%;">Provider Name</th><th style="width:15%;">Date of Visit</th><th style="width:10%;">Action</th></tr>
      </thead>
      <tbody>
      </tbody>
     </table>
     </fieldset>
  </div>
</div> <!-- content div end --> 
 </body>
