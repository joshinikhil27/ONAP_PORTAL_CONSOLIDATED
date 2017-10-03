app.controller('presistDataCtrl',function($scope,$http,$filter,$rootScope,$state,$window){
/*
	$scope.currentTask=false;
	$scope.nextTask=false;
	$scope.finalTask=false;
	$scope.closeButton=false;
	$scope.nextTaskFail=false;
	$scope.finalTaskFail=false;*/
	//$(".newoverlay").hide();
	
	$scope.hideUploadMenu = false;
	$scope.uploadSuccessfull = false;
	$scope.index = 1;
	$scope.modalLine1 = '';
	$scope.imageSrc = "resources/images/successImg.png";
	$scope.modalLine2 = '';
	$scope.button1 = '';
	$scope.nextFunction = {buttons: [{label:'updateDeviceSuccess', fn: null},],};
	$scope.nextFunction.buttons[0].fn= $scope.getFirstTask;
	$scope.failedFLow = false;
	if($scope.failedFLow == true){
	var d = document.getElementById("ul");
		d.className += " widthFail";
		}
	$scope.progPercentage = 0;
	$(".cockpitWindow").hide();
	 $("#mydiv")
    .html('<object style="width:100%; height:600px;" data="http://104.130.165.61:8080/camunda/app/cockpit/default/#/processes"/>');
	$scope.loader=false;
	var json;

     function handleFileSelect(evt) {
           var files = evt.target.files; // FileList object

           // files is a FileList of File objects. List some properties.

     }

     document.getElementById('files').addEventListener('change',
                 handleFileSelect, false);

     function handleFileSelect(evt) {
           var files = evt.target.files; // FileList object

           // files is a FileList of File objects. List some properties.
           var output = [];
           for (var i = 0, f; f = files[i]; i++) {
                 var reader = new FileReader();

                 // Closure to capture the file information.
                 reader.onload = (function(theFile) {
                       return function(e) {
                             // console.log('e readAsText = ', e);
                             // console.log('e readAsText target = ', e.target);
                             try {
                                   $scope.json = JSON.parse(e.target.result);

                                   // alert('json global var has been set to parsed
                                   // json of this file here it is unevaled = \n' +
                                   // JSON.stringify(json));
                             } catch (ex) {
                                   alert('ex when trying to parse json = ' + ex);
                             }
                       }
                 })(f);
                 reader.readAsText(f);
           }

     }

     document.getElementById('files').addEventListener('change',
                 handleFileSelect, false);
     
     $scope.onClose = function(json) {
          $window.location.href = '#/dashboard';
     }
     
     $scope.closePopup = function() {
			$(".newoverlay").hide();
			$scope.errorRibbon = false;
			window.location.reload();
		}
     
		
 	$scope.runPreTest=function()
 	{
 		
 		$scope.showLoader = true;
 	$http({
 		method : 'GET',
 		url : '/runPreTest',
 		contentType : "application/json",
 	}).then(function(success) {
 		 $(".pageoverlay").hide();
 		 $scope.showLoader = false;
 		$scope.pretestresponse = 'Pre-test has been '+ success.data.response_body;
 		
 	}, function(err) {
 		 $scope.showLoader = false;
 	});
 }
 	
 	$scope.test = function(json) {
 		var d = document.getElementById($scope.index);
 		d.className = "previous visited";
 		d = document.getElementById('img_'+$scope.index).src="resources/images/start.png";
 		$scope.index = $scope.index+1;
 		var d = document.getElementById($scope.index);
 		d.className = "active";		
 		d = document.getElementById('img_'+$scope.index).src="resources/images/Prepare_config.png";
 		$scope.uploadSuccessfull = true;
 		
 		
 		/*var d = document.getElementById($scope.id);
 		d.className = "active";*/
 		//$("#updateDeviceSuccess").modal('show');
 		//$("#preTestSuccess").modal('show');
 		//$("#preTestFailure").modal('show');
 		//$("#updateDevice").modal('show');
 		//$("#preTestFinished").modal('show');
 		//$("#processSuccess").modal('show');
 		//$("#updateDevice").modal('show');
 		$scope.loader=true;
		
		document.getElementById('files')
		
		$http({
			method : 'POST',
			url : 'http://104.130.165.61:8080/engine-rest/process-definition/key/Device-Verification/submit-form',
			contentType : "application/json",
			data : angular.toJson(json)
		}).then(function(success) {
			$scope.loader=false;
			$scope.process_id=success.data.id;
			$scope.modalLine1 = 'Process Starts. Router Configuration has been created';
			$scope.modalLine2 = 'Click Next to apply the configuration on the device ';
			$scope.button1 = 'Next';
			$scope.nextFunction = {buttons: [{label:'updateDeviceSuccess', fn: null},],};
			$scope.nextFunction.buttons[0].fn= $scope.getFirstTask;
			/*$scope.msg = 'Device has been updated succesfully. Running PreTest now';
			$scope.currentTask=true;
				$scope.titlemsg = 'Success';
				 $scope.styleclass = 'success';
				$("#MsgPopup").modal('show');*/
			/*$("#startProcess").modal('show');*/
		}, function(err) {
			
		});
	}
 	
 	$scope.getFirstTask =function()
	{  
 		
 	/*	var d = document.getElementById($scope.id);
 		d.className = "active";*/
		
		$http({
			method : 'GET',
			url : 'http://104.130.165.61:8080/engine-rest/task/?processInstanceId='+$scope.process_id,
			contentType : "application/json"
		}).then(function(success) {
			$scope.task_id=(success.data[0].id)
			$scope.firstTaskCompletion();
		}, function(err) {
		});
		
	}
 	
 	
 	$scope.firstTaskCompletion=function()
	{  
 		 $scope.configString=$scope.json.variables.deviceConfigurationJson.value;
 		/* $http.get('resources/data/data.txt')
	     .success(function(data) {
	    	
	     })*/
	   
 		
 		/*var d = document.getElementById($scope.id);
 		d.className = "active";*/
		$scope.loader=true;
		// $(".newoverlay").show();
	debugger;
	var json ={
		"variables": {
			"approver": {
				"value": "Demo",
				"type": "String"
			}
		}
	}
		$http({
			method : 'POST',
			url : 'http://104.130.165.61:8080/engine-rest/task/'+$scope.task_id+'/complete',
			contentType : "application/json",
			data : angular.toJson(json)
		}).then(function(success) {
			$scope.loader=false;
			 //$(".newoverlay").hide();
				/*$("#updateDeviceSuccess").modal('show');*/
				    var d = document.getElementById($scope.index);
				    $scope.applyConfig = true;
				    $scope.hideUploadMenu = true;
				    d.className = "previous visited";
				 	$scope.index = $scope.index + 1 ;
							
					d = document.getElementById('img_'+$scope.index).src="resources/images/Apply_config.png";
			 		var d = document.getElementById($scope.index);
			 		d.className = "active";
			 		
			 		$scope.modalLine1 = 'New Configuration has been applied succesfully.';
					$scope.modalLine2 = 'Running PreTest now';
					$scope.button1 = 'Next';
					$scope.nextFunction = {buttons: [{label:'updateDeviceSuccess', fn: null},],};
					$scope.nextFunction.buttons[0].fn= $scope.getCurrentTask;
			/*$scope.msg = 'PreTest Finished.ClickNEXT to know the results of the Pre-Test';
			$scope.currentTask=false;
			$scope.nextTask=true;
				$scope.titlemsg = 'Success';
				 $scope.styleclass = 'success';
				$("#MsgPopup").modal('show');*/
			
		}, function(err) {
			
		});
	}
 	
 	
 	$scope.getCurrentTask =function()
	{   
 		

		$http({
			method : 'GET',
			url : 'http://104.130.165.61:8080/engine-rest/task/?processInstanceId='+$scope.process_id,
			contentType : "application/json"
		}).then(function(success) {
			$scope.task_id=(success.data[0].id)
			$scope.PT();
			//var url='http://104.130.165.61:8080/engine-rest/task/'+$scope.task_id+'/complete'
		}, function(err) {
		});
		
	}
 	
	$scope.getNextTask =function()
	{   
		debugger;
		var json ={
				"variables": {
					"approver": {
						"value": "Demo",
						"type": "String"
					}
				}
			}
		$http({
			method : 'POST',
			url : 'http://104.130.165.61:8080/engine-rest/task/?processInstanceId='+$scope.task_id,
			contentType : "application/json",
			data : angular.toJson(json)
		}).then(function(success) {
			var id;
			angular.forEach(success.data,function(value,key){
				angular.forEach(value,function(value1,key1){
					if(value1 ==  "UpdateDataBase"){
						id = key;
						$scope.modalLine1 = 'PreTest is Successful.';
						$scope.modalLine2 = 'Click NEXT to store the configuration on the database';
						$scope.nextFunction = {buttons: [{label:'preTestSuccess', fn: null},],};
						$scope.button1 = 'Next';
						$scope.nextFunction.buttons[0].fn= $scope.finalstep;
						$scope.failedFLow = false;
						/*$("#preTestSuccess").modal('show');*/
						
						/*$scope.msg = 'PreTest is Successful.Please NEXT to persist the details on the database';
						$scope.currentTask=false;
						$scope.nextTask=false;
						$scope.finalTask=true;
							$scope.titlemsg = 'Success';
							 $scope.styleclass = 'success';
							$("#MsgPopup").modal('show');*/
						
					}
					
					if(value1 ==  "RetriveConfiguration"){
						debugger
						id = key;
						$scope.modalLine1 = 'PreTest has failed.';
						$scope.modalLine2 = 'Click NEXT to retrieve the running configuration';
						$scope.button1 = 'Next';
						$scope.nextFunction = {buttons: [{label:'preTestFailure', fn: null},],};
						$scope.nextFunction.buttons[0].fn= $scope.finalstep1;
						$scope.failedFLow = true;
						
						/*$scope.msg = 'PreTest has failed.Please NEXT to get the latest Config Details from the database';
						$scope.currentTask=false;
						$scope.nextTask=false;
						$scope.finalTask=false;
						$scope.finalTaskfail=true;
							$scope.titlemsg = 'Success';
							 $scope.styleclass = 'success';
							$("#MsgPopup").modal('show');*/
						/*$("#preTestFailure").modal('show');*/
						
					}
					
					if(value1 ==  "Update Device Configuration"){
						id = key;
						$scope.modalLine1 = 'Latest Configuration Details have been retrived.';
						$scope.modalLine2 = 'Press Next to restore the old configuration ';
						$scope.button1 = 'Next';
						$scope.nextFunction = {buttons: [{label:'updateDevice', fn: null},],};
						$scope.nextFunction.buttons[0].fn= $scope.getNextTask1;
						$scope.failedFLow = true;
						/*$scope.msg = 'Latest Config Details have been retrived.Press Next to Update the old config Details onto the device';
						$scope.currentTask=false;
						$scope.nextTask=false;
						$scope.finalTask=false;
						$scope.nextTaskFail=true;
							$scope.titlemsg = 'Success';
							 $scope.styleclass = 'success';
							$("#MsgPopup").modal('show');*/
					/*	$("#updateDevice").modal('show');*/
						
					}
					
				})
			});
			$scope.applyConfig = false;
			var d = document.getElementById($scope.index);
			d.className = "previous visited";
			d = document.getElementById('img_'+$scope.index).src="resources/images/Apply_config.png";
			$scope.index = $scope.index + 1 ;
	 		
	 		$scope.task_id=(success.data[id].id)
			if($scope.failedFLow == true){
				var d = document.getElementById("ul");
				d.className += " widthFail";
				var d = document.getElementById($scope.index);
				d.className = "failure";
		 		d = document.getElementById('img_'+$scope.index).src="resources/images/Run_test.png";
		 		$scope.imageSrc="resources/images/failed.jpg";
				
				}else{
					var d = document.getElementById($scope.index);
			 		d.className = "active";
			 		d = document.getElementById('img_'+$scope.index).src="resources/images/Run_test.png";
				}
			
			console.log(success.data[id].name);
			//$scope.finalstep();
			//var url='http://104.130.165.61:8080/engine-rest/task/'+$scope.task_id+'/complete'
		}, function(err) {
		});
		
	}
	
	$scope.getNextTask1 =function()
	{   var d = document.getElementById("4");
		d.className = "previous failedVisited";
		var d = document.getElementById("7");
		d.className = "previous visited";
		$scope.index = 8 ;
		d = document.getElementById('img_'+$scope.index).src="resources/images/Restore_config.png";
 		var d = document.getElementById($scope.index);
 		d.className = "active";
	
		var json ={
				"variables": {
					"approver": {
						"value": "Demo",
						"type": "String"
					}
				}
			}
		$http({
			method : 'POST',
			url : 'http://104.130.165.61:8080/engine-rest/task/?processInstanceId='+$scope.task_id,
			contentType : "application/json",
			data : angular.toJson(json)
		}).then(function(success) {
			var id;
			angular.forEach(success.data,function(value,key){
				angular.forEach(value,function(value1,key1){
					if(value1 ==  "Update Device Configuration"){
						id = key;
					}
				})
			});
			$scope.modalLine1 = 'Configuration Details have been restored.';
			$scope.modalLine2 = 'Press Next to persist Data';
			$scope.nextFunction = {buttons: [{label:'updateDevice', fn: null},],};
			$scope.nextFunction.buttons[0].fn= $scope.finalstep;
			$scope.task_id=(success.data[id].id)
			console.log(success.data[id].name);
			//$scope.finalstep();
			//var url='http://104.130.165.61:8080/engine-rest/task/'+$scope.task_id+'/complete'
		}, function(err) {
		});
		
	}
	
	
	
	$scope.PT=function()
	{
		$scope.loader=true;
		// $(".newoverlay").show();
	debugger;
	var json ={
		"variables": {
			"approver": {
				"value": "Demo",
				"type": "String"
			}
		}
	}
		$http({
			method : 'POST',
			url : 'http://104.130.165.61:8080/engine-rest/task/'+$scope.task_id+'/complete',
			contentType : "application/json",
			data : angular.toJson(json)
		}).then(function(success) {
			$scope.loader=false;
			 //$(".newoverlay").hide();
				/*$("#preTestFinished").modal('show');*/
				/*var d = document.getElementById($scope.index);
				d.className = "previous visited";
				
				$scope.index = $scope.index + 1 ;
				d = document.getElementById('img_'+$scope.index).src="resources/images/Apply_config.png";
		 		var d = document.getElementById($scope.index);
		 		d.className = "active";*/
		 		$scope.modalLine1 = 'PreTest Running.';
				$scope.modalLine2 = 'Click NEXT to know the results of the Pre-Test';
				$scope.button1 = 'Next';
				$scope.modalId = 'preTestFinished';
				$scope.nextFunction = {buttons: [{label:'preTestFinished', fn: null},],};
				$scope.nextFunction.buttons[0].fn= $scope.getNextTask;
			/*$scope.msg = 'PreTest Finished.ClickNEXT to know the results of the Pre-Test';
			$scope.currentTask=false;
			$scope.nextTask=true;
				$scope.titlemsg = 'Success';
				 $scope.styleclass = 'success';
				$("#MsgPopup").modal('show');*/
			
		}, function(err) {
			
		});
	}

	
	$scope.finalstep=function()
	{  
		
	var json ={
		"variables": {
			"approver": {
				"value": "Demo",
				"type": "String"
			}
		}
	}
		console.log("in finalstep");
		$http({
			method : 'POST',
			url : 'http://104.130.165.61:8080/engine-rest/task/'+$scope.task_id+'/complete',
			contentType : "application/json",
			data : angular.toJson(json)
		}).then(function(success) {
			/*$("#processSuccess").modal('show');*/
			if($scope.failedFLow == false){
				 var d = document.getElementById($scope.index);
				 d.className = "previous visited";
				 var d = document.getElementById("5");
				 d.className = "previous visited";
				 d = document.getElementById('img_5').src="resources/images/Store_config.png";
				  $scope.index = 6;
				 d = document.getElementById($scope.index);
			 	 d.className = "active";
			 	d = document.getElementById('img_'+$scope.index).src="resources/images/Finish.png";
			}
			else{
				var d = document.getElementById($scope.index);
				d.className = "previous visited";
				$scope.index = $scope.index + 1 ;
				d = document.getElementById('img_'+$scope.index).src="resources/images/Finish.png";
		 		d = document.getElementById($scope.index);
		 		d.className = "active";
			}
			
	 		$scope.modalLine1 = 'Data has been persisted successfully.';
			$scope.modalLine2 = 'Process Ends';
			$scope.button1 = 'Close';
			$scope.nextFunction = {buttons: [{label:'processSuccess', fn: null},],};
			$scope.nextFunction.buttons[0].fn= $scope.onClose;
			/*$scope.msg = 'Data has been saved successfully.Process Ends';
			$scope.currentTask=false;
			$scope.nextTask=false;
			$scope.finalTask=false;
			$scope.closeButton=true;
			$scope.finalTaskfail=false;
				$scope.titlemsg = 'Success';
				 $scope.styleclass = 'success';
				$("#MsgPopup").modal('show');*/
		}, function(err) {
			console.log(err);
			
		});
	}
	
	
	$scope.finalstep1=function()
	{  
		
	
		$("#preTestFailure").modal('hide');
	var json ={
		"variables": {
			"approver": {
				"value": "Demo",
				"type": "String"
			}
		}
	}
		console.log("in finalstep1");
		$http({
			method : 'POST',
			url : 'http://104.130.165.61:8080/engine-rest/task/'+$scope.task_id+'/complete',
			contentType : "application/json",
			data : angular.toJson(json)
		}).then(function(success) {
				/*$("#updateDevice").modal('show');*/
				var d = document.getElementById("4");
				d.className = "previous failedVisited";
				$scope.index = 7;
				d = document.getElementById('img_'+$scope.index).src="resources/images/Retrive_running.png";
				$scope.imageSrc = "resources/images/successImg.png";
		 		var d = document.getElementById($scope.index);
		 		d.className = "active";
		 		$scope.modalLine1 = 'Latest Config Details have been retrived.';
				$scope.modalLine2 = 'Press Next to Update the old config Details onto the device';
				$scope.button1 = 'Next';
				$scope.modalId = 'updateDevice';				
				$scope.nextFunction = {buttons: [{label:'updateDevice', fn: null},],};
				$scope.nextFunction.buttons[0].fn= $scope.getNextTask1;
			/*$scope.msg = 'Latest Config Details have been retrived.Press Next to Update the old config Details onto the device';
			$scope.currentTask=false;
			$scope.nextTask=false;
			$scope.finalTask=false;
			$scope.closeButton=false;
			$scope.nextTaskFail=true;
				$scope.titlemsg = 'Success';
				 $scope.styleclass = 'success';
				$("#MsgPopup").modal('show');*/
			
		}, function(err) {
			console.log(err);
			
		});
	}
	$scope.showCockpitWindow=function()
	{   
		$(".cockpitWindow").show();
		$scope.loader=false;
		debugger;
		//$("#"+id).modal('hide');		
	}
	$scope.closeCockpitWindow=function()
	{
		debugger;
		$(".cockpitWindow").hide();
		//$("#"+id).modal('show');	
	}
     $scope.openModal1=function(){
    	 $http.get('resources/data/ConnectivityCheckReport.txt')
	     .success(function(data) {
	    	 $scope.testData=data;
    	 $("#configModal").modal('show');
	    	
	     })
     }
     
     $scope.openModal2=function(){
    	 $http.get('resources/data/HealthCheckReport.txt')
	     .success(function(data) {
	    	 $scope.testData=data;
    	 $("#configModal").modal('show');
	    	
	     })
     }
     
     $scope.openModal3=function(){
    	 $http.get('resources/data/ThroughputTestReport.txt')
	     .success(function(data) {
	    	 $scope.testData=data;
    	 $("#configModal").modal('show');
	    	
	     })
     }
     
     $scope.openModal4=function(){
    	 $http.get('resources/data/CustomerReport.txt')
	     .success(function(data) {
	    	 $scope.testData=data;
    	 $("#configModal").modal('show');
	    	
	     })
     }
     
     
     
     
});