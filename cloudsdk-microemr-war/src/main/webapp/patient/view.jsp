<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <!-- Common Include -->
 <jsp:include page="common_patient.jsp"/>
 <html>
 <head>
	 <script type="text/javascript">
	 $(function() {
		 fetchList();
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
  <jsp:include page="patient_header_nav.jsp"/>
  <div class="content">
<!-- Common content end -->
<div id="dispalyList">
  <fieldset>
  <legend>Patients</legend>
     <table border="1px" id="displayTable" class="tablesorter">
       <thead>
      <tr> <th style="width:5%;">ID</th> <th style="width:15%;" >First Name</th><th style="width:15%;">Middle Name</th><th style="width:15%;">Last Name</th><th style="width:10%;">DOB</th>
     <th style="width:10%;">State</th><th style="width:10%;">City</th><th style="width:10%;">Zip</th>
      <th style="width:40%;">Actions</th></tr>
      </thead>
      <tbody>
      </tbody>
     </table>
     </fieldset>
  </div>
</div> <!-- content div end --> 
 </body>
