<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
 <!-- Common Include -->
 <jsp:include page="common_provider.jsp"/>   
  <html>
   <head>
     <script type="text/javascript">
     $(document).ready(function(){
    	 $("#submit").button();
 		 $("#navCreateProviderLbl").toggleClass("ui-state-active");
 		 $( "#providerName").focus(function() {
			$('#msgDiv').html('');
		});
         var providerId=<%=request.getParameter("identifier")%>
         provider={"identifier":providerId};
     	   var serviceURL=basepath_provider+'read'
     	    callAjax(serviceURL, provider, 'json', false, 'POST',
     		'application/json; charset=utf-8', 'read');
       });
       function updateProvider(){

    	  /*  if(!validateProvider()){
               return false;
                } */
       	 var serviceURL=basepath_provider+'update';
            $('#updateForm :input[type="text"]').each(function(){
    			   storeProvider($(this).attr('name'), $(this).val());  
    	   });
        	 callAjax(serviceURL, provider, 'json', false,
    		  'POST', 'application/json; charset=utf-8', 'update');
       }
  </script>
   
   </head>
   <body>
     <!-- Common content start -->
    <div class="container">
  <jsp:include page="provider_header_nav.jsp"/>
  <div class="content">
   <!-- Common content end -->
   <div id="msgDiv"></div>
  <form id="updateForm">
  <fieldset>
  <legend>Update Provider</legend>
  <table style="witdh:300px;">
   <tr><td><label>ID</label></td><td><input type="text" name="identifier" readonly></td></tr>
  <tr><td><label class="required">Provider Name</label></td><td><input type="text" name="providerName" id="providerName"></td></tr>
   <tr><td><label class="required">Contact</label></td><td> <input type="text" name="contact"></td></tr>
      <tr><td colspan="2" align="center"><input type="button" name="submit" id="submit" onclick="constraintValidate('update')" value="update"></td></tr>
 </table> 
 </fieldset>  
  </form>
   </div> <!-- content div end -->
   </body>
  </html>  
    
  
