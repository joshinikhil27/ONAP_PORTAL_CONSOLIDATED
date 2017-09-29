app.controller('preTestCtrl',function($scope,$http,$filter,$rootScope,$state){
	 $scope.runPreTest=function()
     {
           //$(".pageoverlay").show();
           $scope.showLoader = true;
           console.log("RUN PRETEST")
	     $http({
	           method : 'GET',
	           url : 'http://104.130.165.61:8282/runPreTest',
	           contentType : "application/json",
	     }).then(function(success) {
	           // $(".pageoverlay").hide();
	           $scope.showLoader = false;
	           $scope.pretestresponse = 'Pre-test has been '+ success.data.response_body;
	           console.log("PRE TEST Response"+JSON.stringify(success.data.response_body));
	           
	     }, function(err) {
	           $scope.showLoader = false;
	           console.log("error");
	     });
	}
});