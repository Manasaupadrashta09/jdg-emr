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
	<input type="radio" id="navCreateProvider" name="radio" onclick="location.href='<c:url value='./create.jsp'/>'"/>
		<label id="navCreateProviderLbl" for="navCreateProvider" title="Create Provider">Create Provider</label>
		
	<input type="radio" id="navViewProviders" name="radio" onclick="location.href='<c:url value='./view.jsp'/>'"/>
		<label id="navViewProvidersLbl" for="navViewProviders" title="View Providers">View Providers</label>
</div>
</body>
</html>