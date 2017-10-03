app.controller('importVNFCtrl',['http_url','$scope','$http','$filter','$rootScope','$state',function(http_url,$scope,$http,$filter,$rootScope,$state){
	$scope.showRunML = true;
	$scope.showLoading = false;  
	$scope.showImportVNF = false;
	$scope.tabledata = []
	  ,$scope.currentPage = 1
	  ,$scope.numPerPage = 10
	  ,$scope.maxSize = 5;
	 
	$scope.RunML=function (){ 
		$http.put(http_url+'demo/onap/TriggerPredictionVnf')
	       .then(function(res){
	   		$state.go('persistedData');
	    });
	}
	$scope.importVNFdata = function(){
		$scope.showLoading = true;
		$http.put(http_url+'demo/onap/AdditionalListRawData')
	       .then(function(res){
	    	   $scope.showLoading = false;
	    	   $scope.tabledata = res.data;
	    	   $scope.showRunML = false;
	    	   $scope.showImportVNF = true;
	    });
	}
}]);
