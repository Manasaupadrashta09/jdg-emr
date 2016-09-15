/**
 * Store Patient funciton stores the patient as a json
 * 
 */

var patient={};
function storePatient(pattr,pvalue){
    patient[pattr]=pvalue;
}

/**
 * Document ready function for binding events
 */
   
   function callAjax(serviceURL,userData,dataType,asyncMode,
		             httpMedhod,contentType,operation){
		if(dataType==='json'){
		   userData=JSON.stringify(patient);
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
		    	var serviceURL=basepath_patient+'read'
		    	callAjax(serviceURL, patient, 'json', false, 'POST',
		    			'application/json; charset=utf-8', 'read');
		    	//bindEvents();
		    })*/
		    $('a.delete').click(function(){
		    	var $atag=$(this);
		    	var identifier=$(this).closest('tr').find('td > input').val();
		    		
		    	patient={"identifier":identifier};
		        var serviceURL=basepath_patient+'delete';
		    	callAjax(serviceURL, patient, 'json', false, 'POST',
		    			'application/json; charset=utf-8', 'delete');
		    })
   	}
   
   function successFun(result,operation){
	   if(operation==='create'){
		   $('#msgDiv').html('<span>Created Successfully</span>').show();
		   $('#createForm :input[type="text"]').each(function(){
			   $(this).val("");
		   });
		   patient={};
	   }else if(operation==='update'){
		   $('#msgDiv').html('<span>Updated Successfully</span>').show();
		   patient={};
	   }else if(operation==='delete'){
		   $('#msgDiv').html('<span>Deleted Successfully</span>').show();
		   patient={};
		   fetchList();
	   }else if(operation==='read'){
		  $('#updateForm :input[type="text"]').each(function(){
			  var $input=$(this)
			  $input.val(result[$input.attr('name')]);
	   });
		   
	   }else if(operation==='fetch'){
		   $('#displayTable tbody tr').remove();
		   for(var i=0;i<result.length;i++){
			   var evenOdd=((i+1)%2==0)?'even':'odd';
               addRow(result[i],evenOdd);
               } 
	   }
   }
   
   function failedFun(jqXHR,textStatus,errorThrown,operation ){
	   if(operation==='create'){
		   showMessage("Creation Failed")
		   /*$('#patientDiv form[input:type="text"]').each(function(){
			   var $input=$(this);
			   $input='';
		   });*/
		 //  fetchList();
	   }else if(operation==='update'){
		   showMessage("Updation Failed");
		 //  fetchList();
	   }else if(operation==='read'){
		   showMessage("Patient Not Found");
		   $('#updateForm').html('');
	   }
   }
  
	     function addRow(json,evenOddClass){
		     var newTr='<tr class='+evenOddClass+'></tr>';
		       var trObj= $('#displayTable tbody ').append(newTr);
		       $('#displayTable tbody tr:last-child')
		       .append('<td>'+json.identifier+'<input type="hidden" value='+json.identifier+'></td>')
		       .append('<td>'+json.firstName+'</td>')
		       .append('<td>'+json.middleName+'</td>')
		       .append('<td>'+json.lastName+'</td>')
		       .append('<td>'+json.dob+'</td>')
		       .append('<td>'+json.state+'</td>')
		       .append('<td>'+json.city+'</td>')
		       .append('<td>'+json.zip+'</td>')
		       .append('<td align="center"><a href="./update.jsp?identifier='+json.identifier+'" class="update">UPDATE</a>&nbsp; &nbsp;<a href="#" class="delete">DELETE</a></td>')
		       .append('</tr>');
		}	
	     
	     function fetchList(){
	     	  var serviceURL=basepath_patient+'list';
	           callAjax(serviceURL, '', 'json', false, 'POST','application/json; charset=utf-8','fetch')
	    }
	     
	     function validatePatient(){
	         var $input;
	        if($('input[name="firstName"]').val().trim()==0){
	        	$('input[name="firstName"]').val('');
	        	$('input[name="firstName"]').addClass('glowing-border');
	            showMessage("Please Enter First Name");
	            return false;
	         }else if($('input[name="lastName"]').val().trim()==0){
	             $('input[name="lastName"]').val('');
	             $('input[name="firstName"]').removeClass('glowing-border');
	             $('input[name="lastName"]').addClass('glowing-border');
	       	     showMessage("Please Enter Last Name");
	   	       return false;
	          }else if($('input[name="dob"]').val().trim()==0){
	        	  $('input[name="dob"]').val('');
	        	  $('input[name="lastName"]').removeClass('glowing-border');
		          $('input[name="dob"]').addClass('glowing-border');
	       	   showMessage("Please Select Date of Birth");
	       	   return false;
	          }
	        $('input[name="firstName"]').removeClass('glowing-border');
	        $('input[name="lastName"]').removeClass('glowing-border');
	        $('input[name="dob"]').removeClass('glowing-border');
	        
	        return true;
	     } 
	     
     function constraintValidate(operation){
    	    $('input[name="firstName"]').removeClass('glowing-border');
	        $('input[name="lastName"]').removeClass('glowing-border');
	        $('input[name="dob"]').removeClass('glowing-border');
	        $('input[name="identifier"]').removeClass('glowing-border');
	        $('input[name="state"]').removeClass('glowing-border');
	        $('input[name="city"]').removeClass('glowing-border');
	        $('input[name="zip"]').removeClass('glowing-border');
	        
	       var isValid=false;
	       if(operation==='create'){
	    	   $('#createForm :input[type="text"]').each(function() {
					storePatient($(this).attr('name'), $(this).val());
				});
	       }else if(operation==='update'){
	    	   $('#updateForm :input[type="text"]').each(function(){
    			   storePatient($(this).attr('name'), $(this).val());  
    	      });
	       }
       	 $.ajax({
     		   url:basepath_patient+'validate/'+operation+'',
     		   data: userData=JSON.stringify(patient),
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
     				    	return false;
     				    }else{
     				    	hideMessage();
     				    	if(operation=='create'){
     				    		createPatient();
     				    	}else if(operation==='update'){
     				    		updatePatient();
     				    	}
     				    }
     			  },
     			 error:function(jqXHR,textStatus,errorThrown){
     				 showMessage("Patient Service not available:"+textStatus);
     			 } 
       	      
       	 });
     }