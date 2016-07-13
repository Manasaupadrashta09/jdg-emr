<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script type="text/javascript">
$(function(){
$("#providerSearch_dialog").dialog({
    autoOpen:false,
    hide:'puff',
    show:'slide',
    height:200
    });
});


</script>
</head>
<body>
  <div id="providerSearch_dialog" title="Select Provider">
     <table border="1px" id="dialogTable" class="tablesorter">
       <thead>
      <tr> <th style="width:10%;">ID</th> <th style="width:15%;" >Provider Name</th></tr>
      </thead>
      <tbody>
      </tbody>
     </table>
  
  </div>
</body>
</html>