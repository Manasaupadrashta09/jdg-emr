<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="../WEB-INF/views/taglibs.jsp"%>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<style type="text/css">
 .headerTable{
    height:100px;
 }
  /*h2{font-size:14px;font:arial;text-align:center}*/
  td img{height:30px;width:100%; }
  
  img{width:100%;height:100%;}
  .headertext{height:20px;margin:auto auto;text-align:center;font-size:20px;font-family: arial;}
  .headerImg{width:100%;height:40px;}
</style>
</head>
<body>
 <%-- <table class="headerTable">
  <tr><td><img src="<c:url value="images/banner_top.PNG" />" /></td></tr>
  <tr><td class="bannerText"><h2>Patient Service</h2></td></tr>
  <tr><td><img src="<c:url value="images/banner_bottom.PNG" />" /></td></tr>
 </table> --%>
  <div class="headerImg"><img src="<c:url value="../images/banner_top.PNG" />" /></div>
  <div class="headertext">Patient Service</div>
  <div class="headerImg"><img src="<c:url value="../images/banner_bottom.PNG" />" /></div>
 
 
</body>
</html>