<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!-- Common Include -->
 <jsp:include page="common_provider.jsp"/>
<html>  
<head>
 <script type="text/javascript">
 $(function() {
		$("#submit").button();
		$("#navCreateProviderLbl").toggleClass("ui-state-active");
		/* $("#createForm").click(function(){
			if($('#msgDiv').has('span').length>0){
				$('#msgDiv').html('');
			}
		   }); */
			$( "#providerName").focus(function() {
				$('#msgDiv').html('');
			});
	  });

	    
    function createProvider(){
        if(!validateProvider()){
           return false;
            }
        
        var serviceURL=basepath_provider+'create';
        $('#createForm :input[type="text"]').each(function(){
			   storeProvider($(this).attr('name'), $(this).val());  
	   });

    	 callAjax(serviceURL, provider, 'json', false,
		  'POST', 'application/json; charset=utf-8','create');

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
  <form id="createForm">
  <fieldset>
  <legend>Create Provider</legend>
  <table style="witdh:300px;">
  <tr><td><label class="required">Provider Name</label></td><td><input type="text" name="providerName" id="providerName"></td></tr>
   <tr><td><label class="required">Contact</label></td><td><input type="text" name="contact"></td></tr>
      <tr><td colspan="2" align="center"><input type="button" name="submit" id="submit" onclick="createProvider()" value="Create"></td></tr>
 </table> 
 </fieldset>  
  </form>
  
  </div> <!-- content div end -->
  </body>
  </html>