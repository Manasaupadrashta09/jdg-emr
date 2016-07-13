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
	<input type="radio" id="navCreateRoom" name="radio" onclick="location.href='<c:url value='./create.jsp'/>'"/>
		<label id="navCreateRoomLbl" for="navCreateRoom" title="Create Room">Create Room</label>
		
	<input type="radio" id="navViewRooms" name="radio" onclick="location.href='<c:url value='./view.jsp'/>'"/>
		<label id="navViewRoomsLbl" for="navViewRooms" title="View Rooms">View Rooms</label>
</div>
</body>
</html>