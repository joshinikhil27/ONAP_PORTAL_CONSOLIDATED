app.controller('summaryCtrl',['http_url','$scope','$http','$filter','$rootScope','$state',function(http_url,$scope,$http,$filter,$rootScope,$state){
	$scope.showLoading = false;  
	function getSummary(){
		$scope.showLoading = true;
		$http.put(http_url+'demo/onap/ListAuditInfo')
	       .then(function(res){
	    	   $scope.showLoading = false;
	    	   $scope.summary = res.data;
	    });
	};
	getSummary();
}]);
