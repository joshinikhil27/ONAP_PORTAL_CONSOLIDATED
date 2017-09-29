var app = angular.module('routerConfigCtrl', []);
app.controller('myCtrl',['$scope','$http', function($scope,$http) {
      
      
      /*$scope.getContextPath = function() {
            return window.location.pathname.substring(0,
                        window.location.pathname.lastIndexOf("/"));
      };
      var basePath = $scope.getContextPath();
      */
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
            url :  '/addRouterConfigDetails',
            contentType : "application/json"
      }).success(function(data, status, headers, config) {
            console.log("Entered")
      }).error(function(data, status, headers, config) {
      });
}
}]);

