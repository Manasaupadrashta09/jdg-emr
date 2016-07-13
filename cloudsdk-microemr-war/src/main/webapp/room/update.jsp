<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
 <!-- Common Include -->
 <jsp:include page="common_room.jsp"/>   
  <html>
   <head>
     <script type="text/javascript">
     $(document).ready(function(){
    	 $("#submit").button();
 		// $("#navCreateRoomLbl").toggleClass("ui-state-active");
 		 $( "#roomName").focus(function() {
			$('#msgDiv').html('');
		});
         var roomId=<%=request.getParameter("identifier")%>
         room={"identifier":roomId};
     	   var serviceURL=basepath_room+'read'
     	    callAjax(serviceURL, room, 'json', false, 'POST',
     		'application/json; charset=utf-8', 'read');
     });
       function updateProvider(){
    	   if(!validateRoom()){
               return;
              }
       	 var serviceURL=basepath_room+'update';
            $('#updateForm :input[type="text"],#updateForm select').each(function(){
            	 if($(this).attr('name')!='providerName'){
      			   storeRoom($(this).attr('name'), $(this).val());  
      			       }
    	   });
        	 callAjax(serviceURL, room, 'json', false,
    		  'POST', 'application/json; charset=utf-8', 'update');
       }
  </script>
   
   </head>
   <body>
     <!-- Common content start -->
    <div class="container">
  <jsp:include page="room_header_nav.jsp"/>
  <div class="content">
   <!-- Common content end -->
   <div id="msgDiv"></div>
  <form id="updateForm">
  <fieldset>
  <legend>Update Room</legend>
  <table style="witdh:300px;">
   <tr><td><label>Provider Id</label></td><td><input type="text" name="providerId" id="providerId">
    <img id="searchProvider" src="../images/search_icon.png"/>
    </td></tr>
  <tr><td><label class="required">Provider Name</label></td><td><input type="text" name="providerName" id="providerName" readonly></td></tr>
  <tr><td><label class="required">Room Name</label></td><td><input type="text" name="roomName" id="roomName"></td></tr>
   <tr><td><label class="required">occupied</label></td><td>
           <select name="occupied" id="occupied">
               <option value="false" >No</option>
               <option value="true">Yes</option>
           </select>
           </td></tr>
      <tr><td colspan="2" align="center"><input type="button" name="submit" id="submit" onclick="updateProvider()" value="update"></td></tr>
 </table> 
 </fieldset>  
  </form>
   <!-- Including provider search div using jsp -->
   <jsp:include page="../common/providerSearch.jsp"></jsp:include>
   </div> <!-- content div end -->
   </body>
  </html>  
    
  
