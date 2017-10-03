app.controller('dashboardCtrl',['http_url','$scope','$http','$filter','$rootScope','$state',function(http_url,$scope,$http,$filter,$rootScope,$state){
	$scope.showLoading = true;    
	$scope.tabledata = []
	  ,$scope.currentPage = 1
	  ,$scope.numPerPage = 10
	  ,$scope.maxSize = 5;
	function getJson(){
		$http.put(http_url+'demo/onap/ListRawData')
	       .then(function(res){
	    	   $scope.showLoading = false;
	    	   $scope.tabledata = res.data;
	    });
	};
	getJson();
	 
	$scope.RunML=function (){ 
		$http.put(http_url+'demo/onap/TriggerPrediction')
	       .then(function(res){
	   		$state.go('persistedData');
	    });
	}
}]);
