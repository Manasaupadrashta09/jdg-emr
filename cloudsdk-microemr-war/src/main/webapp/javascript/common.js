
var contextPath='http://localhost:9080/';  
var basepath_patient='http://patient-microemr.ose-sandbox-ctc-core.optum.com/api/sample/patient/v1.0/';
var basepath_provider='http://physician-microemr.ose-sandbox-ctc-core.optum.com/api/sample/provider/v1.0/';
var basepath_room='http://room-microemr.ose-sandbox-ctc-core.optum.com/api/sample/room/v1.0/';
var basepath_visit='http://appointment-microemr.ose-sandbox-ctc-core.optum.com/api/sample/patientVisit/v1.0/';
/**
 * Document ready function for binding events
 */

$(function(){
$("#searchProvider").click(function(){
	$("#providerSearch_dialog").dialog('open');
	var serviceURL=basepath_provider+'list';
	commonAjax(serviceURL, '', 'json', false,
			  'POST', 'application/json; charset=utf-8','searchProvider');
 });


$("#searchPatient").click(function(){
	$("#patientSearch_dialog").dialog('open');
	var serviceURL=basepath_patient+'list';
	commonAjax(serviceURL, '', 'json', false,
			  'POST', 'application/json; charset=utf-8','searchPatient');
	 });
});
   
   function commonAjax(serviceURL,userData,dataType,asyncMode,
		             httpMedhod,contentType,operation){
		$.ajax({
		   url:serviceURL,
		   data:userData,
		   dataType:dataType,
		   async:asyncMode,
		   type:httpMedhod,
		   method:httpMedhod,
		   contentType:contentType,
		   success:function(result){
			   commonSuccessFun(result,operation)
		           },
		   error:function(jqXHR,textStatus,errorThrown){
			   failedFun(jqXHR,textStatus,errorThrown,operation)
		   }
		})
   	}
   
   function commonSuccessFun(result,operation){
	   if(operation==='searchProvider'){
		   $('#dialogTable tbody ').html('');
		   for(var i=0;i<result.length;i++){
			   var evenOdd=((i+1)%2==0)?'even':'odd';
                addDialogRow(result[i],evenOdd);
               } 
	   }else if(operation==='searchPatient'){
		   $('#dialogTablePatient tbody ').html('');
		   for(var i=0;i<result.length;i++){
			   var evenOdd=((i+1)%2==0)?'even':'odd';
                addDialogRowPatient(result[i],evenOdd);
               } 
	   }
   }
   
   function failedFun(jqXHR,textStatus,errorThrown,operation ){
	   if(operation='searchProvider'){
		   $('#msgDiv').html('<span>Failed to  get scheduled patients</span>');
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
  
	     function  addDialogRow(json,evenOddClass){
	    	 var newTr='<tr class='+evenOddClass+'></tr>';
		       var trObj= $('#dialogTable tbody ').append(newTr);
		       $('#dialogTable tbody tr:last-child')
		       .append('<td><a href="#" onclick="setProvider('+json.identifier+');return false;">'+json.identifier+'</a></td>')
		       .append('<td>'+json.providerName+'</td>')
		       .append('</tr>')
	     }
	     function  addDialogRowPatient(json,evenOddClass){
	         var  patientName=json.firstName+" "+json.middleName+" "+json.lastName;
	    	 var newTr='<tr class='+evenOddClass+'></tr>';
		       var trObj= $('#dialogTablePatient tbody ').append(newTr);
		       $('#dialogTablePatient tbody tr:last-child')
		       .append('<td><a href="#" onclick="setPatient('+json.identifier+');return false;">'+json.identifier+'</a></td>')
		       .append('<td>'+patientName+'</td>')
		       .append('</tr>')
	     }
	     
	     function setProvider(id){
	    	 
	    	 var reqData={};
	    	 reqData["identifier"]=id;
	    	 $.ajax({
	  		   url:basepath_provider+'read',
	  		   data: userData=JSON.stringify(reqData),
	  		   dataType:'json',
	  		   async:false,
	  		   type:'POST',
	  		   method:'POST',
	  		   contentType:'application/json; charset=utf-8',
	  		   success:function(result){
	  			   $("#providerId").val(id);
	  			   $("#providerName").val(result.providerName);
	  		   }
	    	 })
	    	 $("#providerSearch_dialog").dialog('close');
	     }
        function setPatient(id){
	    	 
	    	 var reqData={};
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
	  			 $("#patientId").val(id);
	  			 var  patientName=result.firstName+" "+result.middleName+" "+result.lastName;
	  			 $("#patientName").val(patientName);
	  		   }
	    	 })
	    	 $("#patientSearch_dialog").dialog('close');
	     }
        
        /*function isEmpty(inputVal){
        	if(inputVal==null || typeof(inputVal)==undefined || inputVal.toString().trim().lenght==0){
        		return true;
        	}
        	return false;
        }*/
        function showMessage(message){
        	$("#msgDiv").html('<span style="color:red;">'+message+'</span>').show();
        	
        }
        function hideMessage(){
        	$("#msgDiv").html('').hide();
        }