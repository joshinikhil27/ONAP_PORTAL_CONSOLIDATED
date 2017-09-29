app.controller('restartinfoCtrl',function($scope,$http,$rootScope){
	$scope.datainfo = $rootScope.nodedata;

	console.log('ROOT ' + JSON.stringify($scope.datainfo));
	
	$scope.onSubmit = function() {
  	  
 	   /*var input = 
 			   {
 				   "cos_entry_number" : "4123654",
 				    "destination_address" : "12.12.12.12",
 				    "source_address" : "10.10.1.1",
 				    "customer_name" : "OIOPOI Inc"
 				}*/
    
         
         debugger
   $http({
         method : 'POST',
         url :  '/restartInfo',
         contentType : "application/json"
   }).success(function(data, status, headers, config) {
         console.log("Entered")
   }).error(function(data, status, headers, config) {
   });
}
});