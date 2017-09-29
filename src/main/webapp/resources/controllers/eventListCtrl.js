app.controller('eventListCtrl',function($scope,$http,$rootScope, $modal){
	$scope.getContextPath = function() {
		return window.location.pathname.substring(0,
                window.location.pathname.lastIndexOf("/"));
	};
	var contextPath = $scope.getContextPath();
	$scope.path=$scope.getContextPath();
	$scope.tableData=true;
	$scope.noData=true;
	$scope.srcEventList=false;
	
	$scope.clickVNF = function(topic,id)
	{
		var modalInstance = $modal.open({
		      templateUrl: 'myModalContent.html',
		      controller: ModalInstanceCtrl,
		      size: 'lg',
		      resolve: {
		        topic: function () {
		          return topic;
		        },
				id: function () {
			          return id;
			    },
				path: function () {
			          return $scope.path;
			    }
		      }
		    });
	}
	$scope.onTopicChange = function () {
		var basePath=$scope.getContextPath();
		var id=$scope.topicList.split('.')[1];
		console.log(id);
	   
	   $http({
			method : 'POST',
			url : basePath +"/event/getVendorEventsForTopic/"+ id
		}).success(function(data, status, headers, config) {
			console.log(JSON.stringify(data));
			  $scope.srcevents  = data.response_body.events;
			  
			  angular.forEach( $scope.srcevents , function(value, key) {
				  console.log(key + ': ' + value);
				});
			  if($scope.srcevents !=null)
			  {
				  $scope.srcEventList=true;
				  for(i=0;i<$scope.srcevents.length;i++)
				  {
					  var tim=$scope.srcevents[i].timeStamp;
					  var d=new Date(tim);
					  $scope.srcevents[i].timeStamp=d;
				  }
			  }
			  else
				  $scope.srcEventList=false;

		}).error(function(data, status, headers, config) {
			console.log('Error occurred '+data);
		});
	
	};
	
	$scope.onBodyLoad = function () {
		var basePath=$scope.getContextPath();
		//var id=$scope.topicList.split('.')[1];
		  $scope.topicList = 'unauthenticated.SEC_MEASUREMENT_OUTPUT';
		console.log();
	   $http({
			method : 'POST',
			url : basePath +"/event/getVendorEventsForTopic/SEC_MEASUREMENT_OUTPUT"
		}).success(function(data, status, headers, config) {
			console.log(JSON.stringify(data));
			  $scope.srcevents  = data.response_body.events;
			  angular.forEach( $scope.srcevents , function(value, key) {
				  console.log(key + ': ' + value);
				});
			  if($scope.srcevents !=null)
				  $scope.srcEventList=true;
			  else
				  $scope.srcEventList=false;	

		}).error(function(data, status, headers, config) {
			console.log('Error occurred '+data);
		});
	
	};
	
	$scope.onBodyLoad();
	
	var ModalInstanceCtrl = function ($scope, $modalInstance, topic, id, path) 
	{
		var basePath=path;
		$http({
			method : 'POST',
			url : basePath +"/event/getVendorAndVesEventForTopic/"+ topic+"/"+id
		}).success(function(data, status, headers, config) {
			$scope.popupDialog=true;
			console.log(JSON.stringify(data));						  
			$scope.imgModel  = data.response_body.image;
			$scope.rawJson  = data.response_body.rawJson;
			$scope.vesJson  = data.response_body.vesJson;

		}).error(function(data, status, headers, config) {
			console.log('Error occurred '+data);
		});		  
		  $scope.cancel = function () 
		  {
		    $modalInstance.dismiss('cancel');
		  };
	};
});

