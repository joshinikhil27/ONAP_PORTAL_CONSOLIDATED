var app = angular.module('App',['nvd3ChartDirectives','ui.router','angularUtils.directives.dirPagination','ui.bootstrap']);
app.constant('http_url', 'http://104.130.165.61:8087/');
//app.constant('http_url', 'http://localhost:8087/');
app.run(function ($rootScope,$state, $stateParams) {
    /***** Code for change browser title  *****/
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    //Idle.watch();
});
app.directive('gridTable',function(){
    return {
        restrict : 'AE',
        scope : {
            griddata : '=',
            callfun : '&',
        },
        templateUrl : 'resources/directives/editable-grid.html',
        controller : function($scope,$http,http_url){
        	$scope.currentPage = 1;
        	$scope.pageSize = 10;
        	$scope.getTemplate = function (contact) {
    			$scope.counterid = [];
    			$scope.counterid.push($scope.model.selected._id);
        		if($scope.counterid[0] != undefined){	 
                    if (contact._id.counter === $scope.counterid[0].counter) return 'edit';
                        else return 'display';
        		}else{
        			return 'display';
        		}
            };
            $scope.model = {selected : {}};
            $scope.editContact = function (contact) {
                $scope.model.selected = angular.copy(contact);
            };
            
            $scope.saveContact = function (idx) {
            	$scope.editableRow;
                $scope.editableRow= angular.copy($scope.model.selected);
                console.log('editableRow '+ JSON.stringify($scope.editableRow));
                $scope.griddata[idx] = angular.copy($scope.model.selected);
                $http({
					url : http_url+'demo/onap/updateDataSet',
					contentType : "application/json",
					method : 'POST',
					 data: $scope.editableRow 
					//data : angular.toJson(objTemp)
				}).then(function(success) {
					console.log(success)
				}, function(err) {
					console.log(err)
				});
                
                $scope.reset();
            };

            $scope.reset = function () {
                $scope.model.selected = {};
            };
        }
    };
});
app.directive('nonEditableGrid',function(){
    return {
        restrict : 'AE',
        scope : {
            griddata : '=',
            callfun : '&',
        },
        templateUrl : 'resources/directives/non-editable-grid.html',
        controller : function($scope,$http,http_url){
        	$scope.currentPage = 1;
        	$scope.pageSize = 10;
        	$scope.getTemplate = function (contact) {
    			$scope.counterid = [];
    			$scope.counterid.push($scope.model.selected._id);
        		if($scope.counterid[0] != undefined){	 
                    if (contact._id.counter === $scope.counterid[0].counter) return 'edit';
                        else return 'display';
        		}else{
        			return 'display';
        		}
            };
            $scope.model = {selected : {}};
            $scope.editContact = function (contact) {
                $scope.model.selected = angular.copy(contact);
            };
            
            $scope.saveContact = function (idx) {
            	$scope.editableRow;
                $scope.editableRow= angular.copy($scope.model.selected);
                console.log('editableRow '+ JSON.stringify($scope.editableRow));
                $scope.griddata[idx] = angular.copy($scope.model.selected);
                $http({
					url : http_url+'demo/onap/updateDataSet',
					contentType : "application/json",
					method : 'POST',
					 data: $scope.editableRow 
					//data : angular.toJson(objTemp)
				}).then(function(success) {
					console.log(success)
				}, function(err) {
					console.log(err)
				});
                
                $scope.reset();
            };

            $scope.reset = function () {
                $scope.model.selected = {};
            };
        }
    };
});
app.directive('graphTable',function(){
    return {
        restrict : 'AE',
        scope : {
            tabledata : '=',
            header : '=',
            callfun : '&',
            styleclass : '=',
        },
        templateUrl : 'resources/directives/graph-data.html',
        link: function($scope, element, attrs) {
           
        }
    };
});
