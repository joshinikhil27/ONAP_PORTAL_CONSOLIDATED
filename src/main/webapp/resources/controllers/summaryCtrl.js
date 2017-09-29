app.controller('summaryCtrl',['http_url','$scope','$http','$filter','$rootScope','$state',function(http_url,$scope,$http,$filter,$rootScope,$state){
	function getSummary(){
		$http.put(http_url+'demo/onap/ListAuditInfo')
	       .then(function(res){
	    	   $scope.summary = res.data;
	    	   console.log('Summary '+JSON.stringify(res));
	    });
	};
	getSummary();
}]);
