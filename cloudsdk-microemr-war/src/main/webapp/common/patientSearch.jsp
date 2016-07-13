<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script type="text/javascript">
$(function(){
$("#patientSearch_dialog").dialog({
    autoOpen:false,
    hide:'puff',
    show:'slide',
    height:200
    });
});
</script>
</head>
<body>
  <div id="patientSearch_dialog" title="Select Patient">
     <table border="1px" id="dialogTablePatient" class="tablesorter">
       <thead>
      <tr> <th style="width:10%;">ID</th> <th style="width:15%;" >Patient Name</th></tr>
      </thead>
      <tbody>
      </tbody>
     </table>
  
  </div>
</body>
</html>