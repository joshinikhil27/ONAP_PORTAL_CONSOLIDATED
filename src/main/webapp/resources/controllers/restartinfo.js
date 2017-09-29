app.controller('restartinfoCtrl',function($scope,$http,$rootScope){
	$scope.datainfo = $rootScope.nodedata;

	console.log('ROOT ' + JSON.stringify($scope.datainfo));
});