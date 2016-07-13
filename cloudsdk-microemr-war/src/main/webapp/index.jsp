<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="WEB-INF/views/taglibs.jsp"%>
<jsp:include page="common_script_js.jsp"/>
<head>
</head>
<body>
  <!-- Common content start -->
  <div class="container">
 <div class="header"><jsp:include page="header.jsp"></jsp:include></div>
 <div class="nav"></div>
  <div class="content">
   
   <ul>
    <li><a href="./patient/patientService.jsp">Patient Service</a></li>
    <li><a href="./provider/providerService.jsp">Provider Service</a></li>
    <li><a href="./room/roomService.jsp">Room Service</a></li>
     <li><a href="./patientVisit/patientVisitService.jsp">Appointment Service</a></li>
   </ul>
   
  </div>
<!-- Common content end -->
  </div>
</div>
</body>   
</html>