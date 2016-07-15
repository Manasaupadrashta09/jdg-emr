<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <!-- Common Include -->
 <jsp:include page="common_patientVisit.jsp"/>
 <html>
 <head>
  <%
   response.setHeader( "Pragma", "no-cache" );
   response.setHeader( "Cache-Control", "no-cache" );
   response.setDateHeader( "Expires", 0 );
%>
	 <script type="text/javascript">
	 $(function() {
		$("#assign").button();
		 var appointmentId=<%=request.getParameter("identifier")%>
			var reqData={};
		   	 var patientName="";
		   	 reqData["identifier"]=appointmentId;
		   	 $.ajax({
		 		   url:basepath_visit+'read',
		 		   data: userData=JSON.stringify(reqData),
		 		   dataType:'json',
		 		   async:false,
		 		   type:'POST',
		 		   method:'POST',
		 		   contentType:'application/json; charset=utf-8',
		 		   success:function(result){
			 		   $("#identifier").val(result.identifier);
			 		   $("#dateOfVisit").val(result.dateOfVisit);
                     addCheckInRow(result);
                     prepareRooms(result.providerId);
		 		   }
	              });
	 });
	              
	      function checkInPatient(){
		   		appointment={};
                $('#checkInFoam input').each(function(){
     			   storeAppointment($(this).attr('name'), $(this).val());  
     	       });
                appointment['roomId']=document.getElementById("roomId").value;
                delete appointment['assign'];
                delete appointment['undefined'];

                var isValid=false;
               //validate checking start
                 $.ajax({
	     		   url:basepath_visit+'validate/patientCheckin',
	     		   data: userData=JSON.stringify(appointment),
	     		   dataType:'json',
	     		   async:false,
	     		   type:'POST',    
	     		   method:'POST',
	     		   contentType:'application/json; charset=utf-8',
	     		   success:function(result){
	     				   var errorMsg='';
	     				   for(var key in result){
	     					   if(result.hasOwnProperty(key)){
	     						  errorMsg+='<span style="color:red">'+result[key]+'</span><br/>'
	     						  $('input[name="'+key+'"]').addClass('glowing-border');
	     					   }
	     			       }
	     				    if(errorMsg.length>0){
	     				    	$('#msgDiv').html(errorMsg);
	     				    	isValid=false;
	     				    }else{
		     				    isValid=true;
	     				    	hideMessage();
	     				    }
	     			  },
	     			 error:function(jqXHR,textStatus,errorThrown){
	     				 showMessage("Appointment Service not available:"+textStatus);
	     			 } 
	       	      
	       	 });
             //validate checkin end
	         if(!isValid){//if validations fails returing function
	                return;
	             }
                 var serviceURL=basepath_visit+'patientCheckin';
                callAjax(serviceURL,appointment, 'json', false,
              		  'POST', 'application/json; charset=utf-8','patientCheckin');
         		   var roomId=document.getElementById('roomId').value;
			      updateRoom(roomId);      
		   	 }

		   	 
    function updateRoom(roomId){
    	url_path=basepath_room+'update/patientCheckin/'+roomId+'';
		$.ajax({
	 		   url:url_path,
	 		 //  data: userData=JSON.stringify(reqData),
	 		   dataType:'json',
	 		   async:false,
	 		   type:'GET',
	 		   method:'GET',
	 		   contentType:'application/json; charset=utf-8',
	 		   success:function(result){
                 // location.href='./patientVisitService.jsp';
		            $('fieldset').remove(); 
	 		   }
		   });
        }
	 
	 function prepareRooms(providerId){
		url_path=basepath_room+'list/provider/'+providerId+'';
		$.ajax({
	 		   url:url_path,
	 		 //  data: userData=JSON.stringify(reqData),
	 		   dataType:'json',
	 		   async:false,
	 		   type:'GET',
	 		   method:'GET',
	 		   contentType:'application/json; charset=utf-8',
	 		   success:function(result){
                  addSelectBox(result);
	 		   }
		 }); 
	 }
     function addSelectBox(result){
         var selectBox='<select id="roomId"><option value="">--select--</option>';
         for(var i=0;i<result.length;i++){
			   selectBox=selectBox+'<option value='+result[i].identifier+'>'+result[i].roomName+'</option>';
		   }
		   selectBox=selectBox+'</select>'; 
    	 $('#displayTable tbody tr td:last-child').html(selectBox);
       
     }

     
	 function addCheckInRow(json){
	  var newTr='<tr class="odd"></tr>';
     var providerName=getProviderName(json.providerId);
     var patientName=getPatientName(json.patientId);
       var trObj= $('#displayTable tbody ').append(newTr);
       $('#displayTable tbody tr:last-child')
       .append('<td>'+json.identifier+'<input type="hidden" value='+json.identifier+'></td>')
       .append('<td>'+patientName+'</td>')
       .append('<td>'+providerName+'</td>')
       .append('<td>'+json.dateOfVisit+'</td>')
       .append('<td align="center"></td>')
       .append('</tr>');
       
	 }
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
  <jsp:include page="patientVisit_header_nav.jsp"/>
  <div class="content">
<!-- Common content end -->
<div id="msgDiv"></div>
  <fieldset>
  <legend>Assign Room</legend>
    <form id="checkInFoam" style="width:100%;">
     <table border="1px" id="displayTable" class="tablesorter">
       <thead>
      <tr> <th style="width:5%;">ID</th> <th style="width:25%;" >Patient Name</th><th style="width:15%;">Provider Name</th><th style="width:15%;">Date of Visit</th><th style="width:25%;">Select Room</th></tr>
      </thead>
      <tbody>
      </tbody>
     </table>
     <input type="hidden" name="checkIn"    value="true">
     <input type="hidden" name="identifier" id="identifier">
     <input type="hidden" name="dateOfVisit" id="dateOfVisit">
     <table style="width:100%;">
       <tr><td align="center"><input type="button" align="middle" style="font-size:75%;margin:0px 0px;" id="assign" name="assign" value="Assign" onclick="checkInPatient()"></td></tr>
     </table>
     </form>
     </fieldset>
</div> <!-- content div end --> 
 </body>
