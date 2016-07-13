/**
 * Store Patient funciton stores the provider as a json
 * 
 */

var room={};
function storeRoom(pattr,pvalue){
	room[pattr]=pvalue;
}

/**
 * Document ready function for binding events
 */
   
   function callAjax(serviceURL,userData,dataType,asyncMode,
		             httpMedhod,contentType,operation){
		if(dataType==='json'){
		   userData=JSON.stringify(room);
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
		    	provider={"identifier":identifier};
		    	var serviceURL=basepath_room+'read'
		    	callAjax(serviceURL, provider, 'json', false, 'POST',
		    			'application/json; charset=utf-8', 'read');
		    	//bindEvents();
		    })*/
		    $('a.delete').click(function(){
		    	var $atag=$(this);
		    	var identifier=$(this).closest('tr').find('td > input').val();
		    		
		    	room={"identifier":identifier};
		        var serviceURL=basepath_room+'delete';
		    	callAjax(serviceURL, room, 'json', false, 'POST',
		    			'application/json; charset=utf-8', 'delete');
		    })
   	}
   
   function successFun(result,operation){
	   if(operation==='create'){
		   $('#msgDiv').html('<span>Created Successfully</span>');
		   $('#createForm :input[type="text"]').each(function(){
			   $(this).val("");
		   });
		   room={};
		  // fetchList();
	   }else if(operation==='update'){
		   $('#msgDiv').html('<span>Updated Successfull</span>');
		   room={};
		   fetchList();
	   }else if(operation==='delete'){
		   $('#msgDiv').html('<span>Deleted Successfull</span>');
		   room={};
		   fetchList();
	   }else if(operation==='read'){
		     $('#updateForm :input[type="text"],#updateForm select').each(function(){
			  var $input=$(this)
		       if($input.attr('name')==='occupied'){
		    	  $input.html('');
		    	  var options;
		    	  if(result[$input.attr('name')]===true){
		    		  options='<option value="true">Yes</option><option value="false">No</option>';
		    	  }else{
		    		  options='<option value="false">No</option><option value="true">Yes</option>';
		    	  }
		    	  $input.html(options);
		       }else{
		    	   $input.val(result[$input.attr('name')]);
		       }
			  
	         });
		     
		     var reqData={};
	    	 reqData["identifier"]=result.providerId;
	    	 $.ajax({
	  		   url:basepath_provider+'read',
	  		   data: userData=JSON.stringify(reqData),
	  		   dataType:'json',
	  		   async:false,
	  		   type:'POST',
	  		   method:'POST',
	  		   contentType:'application/json; charset=utf-8',
	  		   success:function(result){
	  			  
	  			   $("#providerName").val(result.providerName);
	  		   }
	    	 })
		     
		   
	   }else if(operation==='fetch'){
		   $('#displayTable tbody tr').remove();
		   for(var i=0;i<result.length;i++){
			   var evenOdd=((i+1)%2==0)?'even':'odd';
               addRow(result[i],evenOdd);
               } 
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
  
	     function addRow(json,evenOddClass){
		     var newTr='<tr class='+evenOddClass+'></tr>';
		       var trObj= $('#displayTable tbody ').append(newTr);
		       $('#displayTable tbody tr:last-child')
		       .append('<td>'+json.identifier+'<input type="hidden" value='+json.identifier+'></td>')
		       .append('<td>'+json.providerId+'</td>')
		       .append('<td>'+json.roomName+'</td>')
		       .append('<td>'+(json.occupied===false?'No':'Yes')+'</td>')
		       .append('<td align="center"><a href="./update.jsp?identifier='+json.identifier+'" class="update">UPDATE</a>&nbsp; &nbsp;<a href="#" class="delete">DELETE</a></td>')
		       .append('</tr>');
		}	
	     
	     function fetchList(){
	     	  var serviceURL=basepath_room+'list';
	           callAjax(serviceURL, '', 'json', false, 'POST','application/json; charset=utf-8','fetch')
	    }
	     
	     function validateRoom(){
	         var $input;
	        if($('input[name="providerId"]').val().trim()==0){
	        	$('input[name="providerId"]').val('');
	        	$('input[name="providerId"]').addClass('glowing-border');
	        	$('input[name="providerName"]').addClass('glowing-border');
	            showMessage("Please Select Provider");
	            return false;
	         }else if($('input[name="roomName"]').val().trim()==0){
	             $('input[name="roomName"]').val('');
	             $('input[name="providerId"]').removeClass('glowing-border');
	             $('input[name="providerName"]').removeClass('glowing-border');
	             $('input[name="roomName"]').addClass('glowing-border');
	       	     showMessage("Please Enter Room Name");
	   	       return false;
	          }
	        $('input[name="providerId"]').removeClass('glowing-border');
            $('input[name="providerName"]').removeClass('glowing-border');
            $('input[name="roomName"]').removeClass('glowing-border');
		    
	          
	        return true;
	     }  
