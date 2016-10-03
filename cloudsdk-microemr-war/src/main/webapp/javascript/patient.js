/**
 * Store Patient funciton stores the patient as a json
 * 
 */

var patient = {};
function storePatient(pattr, pvalue) {
	patient[pattr] = pvalue;
}

function isValidChar(char){

    var txt = char;
    var found = false;
    var validChars = "0123456789"; //List of valid characters

    for(j=0;j<txt.length;j++){ //Will look through the value of text
        var c = txt.charAt(j);
        found = false;
        for(x=0;x<validChars.length;x++){
            if(c==validChars.charAt(x)){
                found=true;
                break;
            }
        }
        if(!found){
            //If invalid character is found remove it and return the valid character(s).
            document.getElementById('zip').value = char.substring(0, char.length -1);
            break;
        }
    }
}

//same as $.ajax but settings can have a maskUI property
//if settings.maskUI==true, the UI will be blocked while ajax in progress
//if settings.maskUI is other than true, it's value will be used as the color value while blocking (i.e settings.maskUI='rgba(176,176,176,0.7)'
//in addition an hourglass is displayed while ajax in progress
function ajaxMaskUI(settings) {
	function maskPageOn(color) { // color can be ie. 'rgba(176,176,176,0.7)' or 'transparent'
		var div = $('#maskPageDiv');
		if (div.length === 0) {
			$(document.body)
					.append(
							'<div id="maskPageDiv" style="position:fixed;width:100%;height:100%;left:0;top:0;display:none"></div>'); // create it
			div = $('#maskPageDiv');
		}
		if (div.length !== 0) {
			div[0].style.zIndex = 2147483647;
			div[0].style.backgroundColor = color;
			div[0].style.display = 'inline';
		}
	}
	function maskPageOff() {
		var div = $('#maskPageDiv');
		if (div.length !== 0) {
			div[0].style.display = 'none';
			div[0].style.zIndex = 'auto';
		}
	}
	function hourglassOn() {
		if ($('style:contains("html.hourGlass")').length < 1)
			$('<style>')
					.text(
							'html.hourGlass, html.hourGlass * { cursor: wait !important; }')
					.appendTo('head');
		$('html').addClass('hourGlass');
	}
	function hourglassOff() {
		$('html').removeClass('hourGlass');
	}

	if (settings.maskUI === true)
		settings.maskUI = 'transparent';

	if (!!settings.maskUI) {
		maskPageOn(settings.maskUI);
		hourglassOn();
	}

	var dfd = new $.Deferred();
	$.ajax(settings).fail(function(jqXHR, textStatus, errorThrown) {
		if (!!settings.maskUI) {
			maskPageOff();
			hourglassOff();
		}
		dfd.reject(jqXHR, textStatus, errorThrown);
	}).done(function(data, textStatus, jqXHR) {
		if (!!settings.maskUI) {
			maskPageOff();
			hourglassOff();
		}
		dfd.resolve(data, textStatus, jqXHR);
	});

	return dfd.promise();
}

/**
 * Document ready function for binding events
 */

function callAjax(serviceURL, userData, dataType, asyncMode, httpMedhod,
		contentType, operation) {
	if (dataType === 'json') {
		userData = JSON.stringify(patient);
	}
	$.ajax({
		url : serviceURL,
		data : userData,
		dataType : dataType,
		async : asyncMode,
		type : httpMedhod,
		method : httpMedhod,
		contentType : contentType,
		success : function(result) {

			successFun(result, operation)
		},
		error : function(jqXHR, textStatus, errorThrown) {
			failedFun(jqXHR, textStatus, errorThrown, operation)
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
	$('a.delete')
			.click(
					function() {
						var $atag = $(this);
						var identifier = $(this).closest('tr').find(
								'td > input').val();

						patient = {
							"identifier" : identifier
						};
						var serviceURL = basepath_patient + 'delete';
						callAjax(serviceURL, patient, 'json', false, 'POST',
								'application/json; charset=utf-8', 'delete');
					})
}

function successFun(result, operation) {
	if (operation === 'create') {
		$('#msgDiv').html('<span>Created Successfully</span>').show();
		$('#createForm :input[type="text"]').each(function() {
			$(this).val("");
		});
		patient = {};
	} else if (operation === 'update') {
		$('#msgDiv').html('<span>Updated Successfully</span>').show();
		patient = {};
	} else if (operation === 'delete') {
		$('#msgDiv').html('<span>Deleted Successfully</span>').show();
		patient = {};
		fetchList();
	} else if (operation === 'read') {
		$('#updateForm :input[type="text"]').each(function() {
			var $input = $(this)
			$input.val(result[$input.attr('name')]);
		});

	} else if (operation === 'fetch') {
		$('#displayTable tbody tr').remove();
		for (var i = 0; i < result.length; i++) {
			var evenOdd = ((i + 1) % 2 == 0) ? 'even' : 'odd';
			addRow(result[i], evenOdd);
		}
	}
}

function failedFun(jqXHR, textStatus, errorThrown, operation) {
	if (operation === 'create') {
		showMessage("Creation Failed")
		/*$('#patientDiv form[input:type="text"]').each(function(){
		   var $input=$(this);
		   $input='';
		});*/
		//  fetchList();
	} else if (operation === 'update') {
		showMessage("Updation Failed");
		//  fetchList();
	} else if (operation === 'read') {
		showMessage("Patient Not Found");
		$('#updateForm').html('');
	}

}

function addRow(json, evenOddClass) {
	var newTr = '<tr class=' + evenOddClass + '></tr>';
	var trObj = $('#displayTable tbody ').append(newTr);
	$('#displayTable tbody tr:last-child')
			.append(
					'<td>' + json.identifier + '<input type="hidden" value='
							+ json.identifier + '></td>')
			.append('<td>' + json.firstName + '</td>')
			.append('<td>' + json.middleName + '</td>')
			.append('<td>' + json.lastName + '</td>')
			.append('<td>' + json.dob + '</td>')
			.append('<td>' + json.state + '</td>')
			.append('<td>' + json.city + '</td>')
			.append('<td>' + json.zip + '</td>')
			.append(
					'<td align="center"><a href="./update.jsp?identifier='
							+ json.identifier
							+ '" class="update">UPDATE</a>&nbsp; &nbsp;<a href="#" class="delete">DELETE</a></td>')
			.append('</tr>');
}

function fetchList() {
	var serviceURL = basepath_patient + 'list';
	callAjax(serviceURL, '', 'json', false, 'POST',
			'application/json; charset=utf-8', 'fetch')
}
function clearCityandState()
{
	$('input[name="city"]').val('');
	$('input[name="state"]').val('');
}
function validatePatient() {
	var $input;
	if ($('input[name="firstName"]').val().trim() == 0) {
		$('input[name="firstName"]').val('');
		$('input[name="firstName"]').addClass('glowing-border');
		showMessage("Please Enter First Name");
		return false;
	} else if ($('input[name="lastName"]').val().trim() == 0) {
		$('input[name="lastName"]').val('');
		$('input[name="firstName"]').removeClass('glowing-border');
		$('input[name="lastName"]').addClass('glowing-border');
		showMessage("Please Enter Last Name");
		return false;
	} else if ($('input[name="dob"]').val().trim() == 0) {
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

function checkZip()
{
	var zip = document.getElementById('zip').value; 
	var zipServiceURL = basepath_zip + zip;

	
	// callAjax(zipServiceURL, zip, 'xml', true, 'GET',
	//		'text/xml', 'getzip');	   

	 ajaxMaskUI({
		    url: zipServiceURL,
		    maskUI: true // or try for example 'rgba(176,176,176,0.7)'
		}).fail(function (jqXHR, textStatus, errorThrown) {
		    console.log('error ' + textStatus);
		}).done(function (data, textStatus, jqXHR) {
		    console.log('success ' + data);

		    stateNodes = data.getElementsByTagName("state")[0];
		    stateNode = stateNodes.childNodes[0];
		    state = stateNode.nodeValue;
		    document.getElementById("state").value = state;

		    cityNodes = data.getElementsByTagName("city")[0];
		    cityNode = cityNodes.childNodes[0];
		    city = cityNode.nodeValue;
		    document.getElementById("city").value = city;
		    
		});

		
		  

}

function constraintValidate(operation) {
	$('input[name="firstName"]').removeClass('glowing-border');
	$('input[name="lastName"]').removeClass('glowing-border');
	$('input[name="dob"]').removeClass('glowing-border');
	$('input[name="identifier"]').removeClass('glowing-border');
	$('input[name="state"]').removeClass('glowing-border');
	$('input[name="city"]').removeClass('glowing-border');
	$('input[name="zip"]').removeClass('glowing-border');

	var isValid = false;
	if (operation === 'create') {
		$('#createForm :input[type="text"]').each(function() {
			storePatient($(this).attr('name'), $(this).val());
		});


	} else if (operation === 'update') {
		$('#updateForm :input[type="text"]').each(function() {
			storePatient($(this).attr('name'), $(this).val());
		});

	}
	$.ajax({
		url : basepath_patient + 'validate/' + operation + '',
		data : userData = JSON.stringify(patient),
		dataType : 'json',
		async : false,
		type : 'POST',
		method : 'POST',
		contentType : 'application/json; charset=utf-8',
		success : function(result) {
			var errorMsg = '';
			for ( var key in result) {
				if (result.hasOwnProperty(key)) {
					errorMsg += '<span style="color:red">' + result[key]
							+ '</span><br/>'
					$('input[name="' + key + '"]').addClass('glowing-border');
				}
			}
			if (errorMsg.length > 0) {
				$('#msgDiv').html(errorMsg);
				return false;
			} else {
				hideMessage();
				if (operation == 'create') {
					createPatient();
				} else if (operation === 'update') {
					updatePatient();
				}
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			showMessage("Patient Service not available:" + textStatus);
		}

	});
}