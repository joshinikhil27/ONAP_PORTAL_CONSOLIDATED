app.controller('importVNFCtrl',['http_url','$scope','$http','$filter','$rootScope','$state',function(http_url,$scope,$http,$filter,$rootScope,$state){
	$scope.showRunML = true;  
	$scope.showImportVNF = false;
	$scope.tabledata = []
	  ,$scope.currentPage = 1
	  ,$scope.numPerPage = 10
	  ,$scope.maxSize = 5;
	 
	$scope.RunML=function (){ 
		$http.put(http_url+'demo/onap/TriggerPrediction')
	       .then(function(res){
	   		$state.go('persistedData');
	    });
	}
	$scope.importVNFdata = function(){
		$http.put(http_url+'demo/onap/ListRawData')
	       .then(function(res){
	    	   $scope.tabledata = res.data;
	    	   $scope.showRunML = false;
	    	   $scope.showImportVNF = true;
	    });
	}
}]);