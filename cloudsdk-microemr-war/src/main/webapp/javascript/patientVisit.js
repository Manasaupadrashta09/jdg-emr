/**
 * Store Patient funciton stores the patient as a json
 * 
 */

var appointment={};
function storeAppointment(pattr,pvalue){
	appointment[pattr]=pvalue;
}

/**
 * Document ready function for binding events
 */
   
   function callAjax(serviceURL,userData,dataType,asyncMode,
		             httpMedhod,contentType,operation){
		if(dataType==='json'){
		   userData=JSON.stringify(appointment);
		}
		$.ajax({
		   url:serviceURL,
		   data:userData,
		   dataType:dataType,
		   async:asyncMode,
		   type:httpMedhod,
		   method:httpMedhod,
		   contentType:contentType,
		   success:function(result){
			  /* alert("in success function");*/
			   successFun(result,operation)
		           },
		   error:function(jqXHR,textStatus,errorThrown){
			   failedFun(jqXHR,textStatus,errorThrown,operation)
		   }
		})
		
		/*$('a.update').click(function(){
		    	var $atag=$(this);
		    	var identifier=$(this).closest('tr').find('td > input').val();
		    	$('#msgDiv').html('');
		    	$('#customDiv').load('update.jsp');
		    	patient={"identifier":identifier};
		    	var serviceURL=basepath_visit+'read'
		    	callAjax(serviceURL, patient, 'json', false, 'POST',
		    			'application/json; charset=utf-8', 'read');
		    	//bindEvents();
		    })*/
		    $('a.delete').click(function(){
		    	var $atag=$(this);
		    	var identifier=$(this).closest('tr').find('td > input').val();
		    		
		    	appointment={"identifier":identifier};
		        var serviceURL=basepath_visit+'delete';
		    	callAjax(serviceURL, appointment, 'json', false, 'POST',
		    			'application/json; charset=utf-8', 'delete');
		    })
		    
		    $('a.checkout').click(function(){
		    	var $atag=$(this);
		    	var identifier=$(this).closest('tr').find('td > input').val();
		    	appointment={"identifier":identifier};
		        var serviceURL=basepath_visit+'update/checkout';
		    	callAjax(serviceURL, appointment, 'json', false, 'POST',
		    			'application/json; charset=utf-8', 'checkout');
		    });
   	}
   
   function successFun(result,operation){
	   if(operation==='create'){
		   $('#msgDiv').html('<span>Scheduled Successfully</span>');
		   $('#createForm :input[type="text"],#createForm :input[type="hidden"]').each(function(){
			   $(this).val("");
		   });
		   appointment={};
		  // fetchList();
	   }else if(operation==='update'){
		   $('#msgDiv').html('<span>Updated Successfull</span>');
		   appointment={};
		   fetchList();
	   }else if(operation==='delete'){
		   $('#msgDiv').html('<span>Deleted Successfull</span>');
		   appointment={};
		   fetchList();
	   }else if(operation==='read'){
			  $('#updateForm :input[type="text"],#updateForm :input[type="hidden"]').each(function(){
				  var $input=$(this)
				   //storePatient($(this).attr('name'), $(this).val());
				  $input.val(result[$input.attr('name')]);
		        });
		   $('#patientName').val(getPatientName(result.patientId));
		   $('#providerName').val(getProviderName(result.providerId));
	   }else if(operation==='fetch'){
		   $('#displayTable tbody tr').remove();
		   if(result!=null && result.length>0){
			   for(var i=0;i<result.length;i++){
				   var evenOdd=((i+1)%2==0)?'even':'odd';
				   addRow(result[i],evenOdd);
			   } 
		   }
	   }else if(operation==='scheduledToday'){
		   $('#displayTable tbody tr').remove();
		   if(result!=null && result.length>0){
			   for(var i=0;i<result.length;i++){
				   var evenOdd=((i+1)%2==0)?'even':'odd';
				   addCheckinRow(result[i],evenOdd);
			   } 
		   }
	   }else if(operation=='patientCheckin'){
		   $('#msgDiv').html('<span>Patient Checkin Successful</span>');
	   }else if(operation==='checkedInPatients'){
		   $('#displayTable tbody tr').remove();
		   if(result!=null && result.length>0){
			   for(var i=0;i<result.length;i++){
				   var evenOdd=((i+1)%2==0)?'even':'odd';
				   addRecordRow(result[i],evenOdd);
			   } 
		   }
	   }else if(operation==='recordpatient'){
		   if(result!=null){
			   var patientName=getPatientName(result.patientId);
			   $('#patientName').val(patientName);
		   }
	   }else if(operation==='updateRecord'){
		   $('#msgDiv').html('<span>Recorded Successfully</span>');
		   
	   }else if(operation==='patientsForCheckout'){
		   $('#displayTable tbody tr').remove();
		   if(result!=null && result.length>0){
			   for(var i=0;i<result.length;i++){
				   var evenOdd=((i+1)%2==0)?'even':'odd';
				   addCheckoutRow(result[i],evenOdd);
			   } 
		   }
	   }else if(operation==='checkout'){
		   
		   $('#msgDiv').html('<span>Patient Checkedout Successfully</span>');
		   getPatientsForCheckout();
	   }
   }
   
   function failedFun(jqXHR,textStatus,errorThrown,operation ){
	   if(operation='create'){
		   $('#msgDiv').html('<span>Creation Failed</span>');
		   /*$('#patientDiv form[input:type="text"]').each(function(){
			   var $input=$(this);
			   $input='';
		   });*/
		 //  fetchList();
	   }else if(operation='update'){
		   $('#msgDiv').html('<span>Updation Failed</span>');
		 //  fetchList();
	   }
   }
  
   function getPatientName(id){
   	var reqData={};
   	 var patientName="";
   	 reqData["identifier"]=id;
   	 $.ajax({
 		   url:basepath_patient+'read',
 		   data: userData=JSON.stringify(reqData),
 		   dataType:'json',
 		   async:false,
 		   type:'POST',
 		   method:'POST',
 		   contentType:'application/json; charset=utf-8',
 		   success:function(result){
 			   patientName=result.firstName+" "+result.middleName+" "+result.lastName;
 		   }
   	 
   	 });
   	 
   	return patientName;
   } 
   
   function getProviderName(id){
   	var reqData={};
   	 reqData["identifier"]=id;
   	 var providerName="";
   	 $.ajax({
 		   url:basepath_provider+'read',
 		   data: userData=JSON.stringify(reqData),
 		   dataType:'json',
 		   async:false,
 		   type:'POST',
 		   method:'POST',
 		   contentType:'application/json; charset=utf-8',
 		   success:function(result){
 			 providerName=result.providerName;
 		   }
   	 });
   	 
   	 return providerName;
   }
    
   
   
	     function addRow(json,evenOddClass){
		     var newTr='<tr class='+evenOddClass+'></tr>';
		     var providerName=getProviderName(json.providerId);
		     var patientName=getPatientName(json.patientId);
		       var trObj= $('#displayTable tbody ').append(newTr);
		       $('#displayTable tbody tr:last-child')
		       .append('<td>'+json.identifier+'<input type="hidden" value='+json.identifier+'></td>')
		       .append('<td>'+patientName+'</td>')
		       .append('<td>'+providerName+'</td>')
		       .append('<td>'+json.dateOfVisit+'</td>')
		       .append('<td align="center"><a href="./updatePatientVisit.jsp?identifier='+json.identifier+'" class="update">UPDATE</a>&nbsp; &nbsp;<a href="#" class="delete">DELETE</a></td>')
		       .append('</tr>');
		}	
	     function addCheckinRow(json,evenOddClass){
	    	 var newTr='<tr class='+evenOddClass+'></tr>';
		     var providerName=getProviderName(json.providerId);
		     var patientName=getPatientName(json.patientId);
		       var trObj= $('#displayTable tbody ').append(newTr);
		       $('#displayTable tbody tr:last-child')
		       .append('<td>'+json.identifier+'<input type="hidden" value='+json.identifier+'></td>')
		       .append('<td>'+patientName+'</td>')
		       .append('<td>'+providerName+'</td>')
		       .append('<td>'+json.dateOfVisit+'</td>')
		       .append('<td align="center"><a href="./checkInPatient.jsp?identifier='+json.identifier+'">Assign Room</a></td>')
		       .append('</tr>');
	     }
	     
	     
	     function addRecordRow(json,evenOddClass){
	    	 var newTr='<tr class='+evenOddClass+'></tr>';
		     var providerName=getProviderName(json.providerId);
		     var patientName=getPatientName(json.patientId);
		       var trObj= $('#displayTable tbody ').append(newTr);
		       $('#displayTable tbody tr:last-child')
		       .append('<td>'+json.identifier+'<input type="hidden" value='+json.identifier+'></td>')
		       .append('<td>'+patientName+'</td>')
		       .append('<td>'+providerName+'</td>')
		       .append('<td align="center"><a href="./recordPatient.jsp?identifier='+json.identifier+'">Record</a></td>')
		       .append('</tr>');
	     }
	     
	     
	     function addCheckoutRow(json,evenOddClass){
	    	 var newTr='<tr class='+evenOddClass+'></tr>';
		     var providerName=getProviderName(json.providerId);
		     var patientName=getPatientName(json.patientId);
		       var trObj= $('#displayTable tbody ').append(newTr);
		       $('#displayTable tbody tr:last-child')
		       .append('<td>'+json.identifier+'<input type="hidden" value='+json.identifier+'></td>')
		       .append('<td>'+patientName+'</td>')
		       .append('<td>'+providerName+'</td>')
		       .append('<td align="center"><a href="#" class="checkout">Checkout</a></td>')
		       .append('</tr>');
	     }
	     function fetchList(){
	     	  var serviceURL=basepath_visit+'list';
	           callAjax(serviceURL, '', 'json', false, 'POST','application/json; charset=utf-8','fetch')
	    }
	     
	     function scheduledToday(){
	    	 var serviceURL=basepath_visit+'read/scheduled/today';
	         callAjax(serviceURL, '', 'json', false, 'POST','application/json; charset=utf-8','scheduledToday')
	     }
	  
	     function getCheckedInPatients(){
	    	 var serviceURL=basepath_visit+'read/checkedin';
	         callAjax(serviceURL, '', 'json', false, 'POST','application/json; charset=utf-8','checkedInPatients');
	    }
	     
	     function getPatientsForCheckout(){
	    	 var serviceURL=basepath_visit+'read/checkedin';
	         callAjax(serviceURL, '', 'json', false, 'POST','application/json; charset=utf-8','patientsForCheckout');
	    }
	     
	     function validateVisit(){
	        if($('input[name="patientName"]').val().trim()==0){
	        	$('input[name="patientName"]').val('');
	        	$('input[name="patientName"]').addClass('glowing-border');
	            showMessage("Please Select Patient");
	            return false;
	         }else if($('input[name="providerName"]').val().trim()==0){
	             $('input[name="providerName"]').val('');
	             $('input[name="patientName"]').removeClass('glowing-border');
	             $('input[name="providerName"]').addClass('glowing-border');
	       	     showMessage("Please Select Provider");
	   	       return false;
	          }else if($('input[name="dateOfVisit"]').val().trim()==0){
		             $('input[name="dateOfVisit"]').val('');
		             $('input[name="providerName"]').removeClass('glowing-border');
		             $('input[name="dateOfVisit"]').addClass('glowing-border');
		       	     showMessage("Please Select Date of Visit");
		   	       return false;
		   	       
	          }
	        $('input[name="patientName"]').removeClass('glowing-border');
            $('input[name="providerName"]').removeClass('glowing-border');
            $('input[name="dateOfVisit"]').removeClass('glowing-border');
	        return true;
	     }  
