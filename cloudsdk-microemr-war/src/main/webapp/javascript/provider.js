/**
 * Store Patient funciton stores the provider as a json
 * 
 */

var provider={};
function storeProvider(pattr,pvalue){
	provider[pattr]=pvalue;
}

/**
 * Document ready function for binding events
 */
   
   function callAjax(serviceURL,userData,dataType,asyncMode,
		             httpMedhod,contentType,operation){
		if(dataType==='json'){
		   userData=JSON.stringify(provider);
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
		
		    $('a.delete').click(function(){
		    	var $atag=$(this);
		    	var identifier=$(this).closest('tr').find('td > input').val();
		    		
		    	provider={"identifier":identifier};
		        var serviceURL=basepath_provider+'delete';
		    	callAjax(serviceURL, provider, 'json', false, 'POST',
		    			'application/json; charset=utf-8', 'delete');
		    })
   	}
   
   function successFun(result,operation){
	   if(operation==='create'){
		   $('#msgDiv').html('<span>Created Successfully</span>').show();
		   $('#createForm :input[type="text"]').each(function(){
			   $(this).val("");
		   });
		   provider={};
	   }else if(operation==='update'){
		   $('#msgDiv').html('<span>Updated Successfull</span>').show();
		   provider={};
	   }else if(operation==='delete'){
		   $('#msgDiv').html('<span>Deleted Successfull</span>').show();
		   provider={};
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
	   }else if(operation==='update'){
		   showMessage("Updation Failed");
	   }else if(operation==='read'){
		   showMessage("Provider Not Found");
		   $('#updateForm').html('');
	   }
   }
  
	     function addRow(json,evenOddClass){
		     var newTr='<tr class='+evenOddClass+'></tr>';
		       var trObj= $('#displayTable tbody ').append(newTr);
		       $('#displayTable tbody tr:last-child')
		       .append('<td>'+json.identifier+'<input type="hidden" value='+json.identifier+'></td>')
		       .append('<td>'+json.providerName+'</td>')
		       .append('<td>'+json.contact+'</td>')
		       .append('<td align="center"><a href="./update.jsp?identifier='+json.identifier+'" class="update">UPDATE</a>&nbsp; &nbsp;<a href="#" class="delete">DELETE</a></td>')
		       .append('</tr>');
		}	
	     
	     function fetchList(){
	     	  var serviceURL=basepath_provider+'list';
	           callAjax(serviceURL, '', 'json', false, 'POST','application/json; charset=utf-8','fetch')
	    }
	     
	     function validateProvider(){
	         var $input;
	        if($('input[name="providerName"]').val().trim()==0){
	        	$('input[name="providerName"]').val('');
	        	$('input[name="providerName"]').addClass('glowing-border');
	            showMessage("Please Enter Provider Name");
	            return false;
	         }else if($('input[name="contact"]').val().trim()==0){
	             $('input[name="contact"]').val('');
	             $('input[name="providerName"]').removeClass('glowing-border');
	             $('input[name="contact"]').addClass('glowing-border');
	       	     showMessage("Please Enter Contact");
	   	       return false;
	          }
	        $('input[name="contact"]').removeClass('glowing-border');
		      
	        var re =/^(\+91-|\+91|0)?\d{10}$/;
		         var $contact=$('input[name="contact"]').val()
		          if(!re.test($contact)){
		        	  $('input[name="contact"]').addClass('glowing-border');
		        	  showMessage("Please a valid contact number");
		        	  return false;
		          }
		         $('input[name="providerName"]').removeClass('glowing-border');
		         $('input[name="contact"]').removeClass('glowing-border');
	          
	        return true;
	     }  
	     function constraintValidate(operation){
	    	    $('input[name="providerName"]').removeClass('glowing-border');
		        $('input[name="contact"]').removeClass('glowing-border');
		        $('input[name="identifier"]').removeClass('glowing-border');
		       var isValid=false;
		       provider={};
		       if(operation==='create'){
		    	   $('#createForm :input[type="text"]').each(function() {
						storeProvider($(this).attr('name'), $(this).val());
					});
		       }else if(operation==='update'){
		    	   $('#updateForm :input[type="text"]').each(function(){
		    		   storeProvider($(this).attr('name'), $(this).val());  
	    	      });
		       }
	       	 $.ajax({
	     		   url:basepath_provider+'validate',
	     		   data: userData=JSON.stringify(provider),
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
	     				    		createProvider();
	     				    	}else if(operation==='update'){
	     				    		updateProvider();
	     				    	}
	     				    }
	     			  },
	     			 error:function(jqXHR,textStatus,errorThrown){
	     				 showMessage("Provider Service not available:"+textStatus);
	     			 } 
	       	      
	       	 });
	     }
