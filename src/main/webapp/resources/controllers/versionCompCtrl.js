app.controller('versionCompCtrl',function($scope,$http,$filter,$rootScope,$state){
	$scope.routerFlag = true;
	$scope.getAllRouters=function(){
        console.log("GET ROUTERS")
	  $http({
	        method : 'GET',
	        url : 'http://104.130.165.61:8282/listRouters',
	        contentType : "application/json",
	  }).then(function(success) {
	        $scope.data = success.data.response_body;
	        console.log("ROUTERLIST"+JSON.stringify(success.data.response_body));
	        
	  }, function(err) {
	        console.log("error");
	  });
	}
	$scope.getAllRouters();

	  
	/*  $scope.getVersionInfo=function(vid){
		  
		  $scope.temData = [];
	      
	      angular.forEach($scope.sample1,function(value,key){
	      	angular.forEach(value,function(value1,key1){
	          	if(value1 === vid){
	          		$scope.temData.push($scope.sample1[key]);
	          	}
	      	});
	      });
	      console.log("OK"+JSON.stringify($scope.temData));
	      $rootScope.param = $scope.temData;
	      $state.go('versionInfo');
	  };*/
	
	/*  $scope.getVersionHistory=function(name){
			 $scope.routerFlag = false;
		        $http({
		              method : 'GET',
		              url : 'http://104.130.165.61:8282/getVersionHistory/'+name,
		              contentType : "application/json",
		        })
		         .then(function(res){
		           $(".pageoverlay").hide();
		            $scope.sample1 = res.data.response_body;
		            console.log("FULL data"+JSON.stringify($scope.sample1));
		            
		      });
		  };  */
	  
  $scope.getVersions=function(name){
	 $scope.routerFlag = false;
        $http({
              method : 'GET',
              url : 'http://104.130.165.61:8282/routerDetails/'+name,
              contentType : "application/json",
        })
         .then(function(res){
           $(".pageoverlay").hide();
            $scope.sample1 = res.data.response_body;
            console.log("DATA"+JSON.stringify($scope.sample1));
            $scope.dispalyKeys = $scope.sample1;
            //$scope.router1 = tryJson($scope.sample1);
            
           angular.forEach($scope.sample1,function(value,key){
                $scope[key] = [];
                $scope[key] = tryJson(value[0].protocol);
                console.log(key + '-'+ JSON.stringify($scope[key]));
            }
           
           );
           angular.forEach($scope.version1,function(value1,key1){
        	   var val1 = value1[Object.keys(value1)[0]];
        	   if(val1!= null && val1 != 'Parent' && val1 != 'Child' && val1 != 'Child1' && val1 != 'Child2' && val1 != 'Child3' ){
        	    angular.forEach($scope.version2,function(value2,key2){
        	    	if(key1 == key2){
        	    	  var val2 = value2[Object.keys(value2)[0]]; 
        	    	  if(val2!= null && val2 != 'Parent' && val2 != 'Child' && val2 != 'Child1' && val2 != 'Child2' && val2 != 'Child3' ){
        		      if(val1 != val2){
        		    	$scope.version1[key1].same="true";
                 	  
                 	  }
        	    	  }
        	    	}
        	    	  
        	   });
        	   }
           });
           console.log($scope.version1);
      });
  };
  /*$scope.getSpecificVersions=function(name){
		 $scope.routerFlag = false;
	        $http({
	              method : 'GET',
	              url : 'http://104.130.165.61:8282/viewVersionDetails/'+name+'/1.0/3.0/',
	              contentType : "application/json",
	        })
	         .then(function(res){
	           $(".pageoverlay").hide();
	            $scope.sample1 = res.data.response_body;
	            console.log("DATA"+JSON.stringify($scope.sample1));
	            $scope.dispalyKeys = $scope.sample1;
	            //$scope.router1 = tryJson($scope.sample1);
	            
	           angular.forEach($scope.sample1,function(value,key){
	                $scope[key] = [];
	                $scope[key] = tryJson(value[0].protocol);
	                console.log(key + '-'+ JSON.stringify($scope[key]));
	            }
	           
	           );
	           angular.forEach($scope.version1,function(value1,key1){
	        	   var val1 = value1[Object.keys(value1)[0]];
	        	   if(val1!= null && val1 != 'Parent' && val1 != 'Child' && val1 != 'Child1' && val1 != 'Child2' && val1 != 'Child3' ){
	        	    angular.forEach($scope.version2,function(value2,key2){
	        	    	if(key1 == key2){
	        	    	  var val2 = value2[Object.keys(value2)[0]]; 
	        	    	  if(val2!= null && val2 != 'Parent' && val2 != 'Child' && val2 != 'Child1' && val2 != 'Child2' && val2 != 'Child3' ){
	        		      if(val1 != val2){
	        		    	$scope.version1[key1].same="true";
	                 	  
	                 	  }
	        	    	  }
	        	    	}
	        	    	  
	        	   });
	        	   }
	           });
	           console.log($scope.version1);
	      });
	  }; 
  */
  
  function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }
    return false;
}
 /* debugger;
  if($rootScope.param.length > 0){
	  $scope.version1= tryJson($rootScope.param);
	  console.log('$scope.version1 '+JSON.stringify($scope.version1));
	  
  }*/
  
  function tryJson(data){
	  debugger;
        var keyArray1=[];
        var valArray1 = [];
        angular.forEach(data,function(value1,key1){
              if(isNaN(key1)){
                    var obj = {};
                    if(!isJson(value1)){
                          obj[key1] = value1;
                          keyArray1.push(obj);
                    }else{
                          obj[key1] = 'Parent';
                          keyArray1.push(obj);
                          angular.forEach(value1,function(value2,key2){
                                if(isNaN(key2)){
                                      var obj = {};
                                      if(!isJson(value2)){
                                            obj[key2] = value2;
                                            keyArray1.push(obj);
                                      }else{
                                            obj[key2] = 'Child1';
                                            keyArray1.push(obj);
                                            angular.forEach(value2,function(value3,key3){
                                                  if(isNaN(key3)){
                                                        var obj = {};
                                                        if(!isJson(value3)){
                                                              obj[key3] = value3;
                                                              keyArray1.push(obj);
                                                        }else{
                                                              obj[key3] = 'Child2';
                                                              keyArray1.push(obj);
                                                              angular.forEach(value3,function(value6,key6){
                                                                    if(isNaN(key6)){
                                                                          var obj = {};
                                                                          if(!isJson(value6)){
                                                                                obj[key6] = value6;
                                                                                keyArray1.push(obj);
                                                                          }else{
                                                                                obj[key6] = 'Child3';
                                                                                keyArray1.push(obj);
                                                                                /*angular.forEach(value3,function(value6,key6){
                                                                                
                                                                                });*/
                                                                          }
                                                                    }else{
                                                                          //Zero index
                                                                          angular.forEach(value6,function(value7,key7){
                                                                                if(isNaN(key7)){
                                                                                      var obj = {};
                                                                                      if(!isJson(value7)){
                                                                                            obj[key7] = value7;
                                                                                            keyArray1.push(obj);
                                                                                      }else{
                                                                                            obj[key7] = 'Child3';
                                                                                            keyArray1.push(obj);
//                                                                                          angular.forEach(value5,function(value6,key6){
//                                                                                                
//                                                                                          });
                                                                                      }
                                                                                }
                                                                          });
                                                                    }
                                                              });
                                                        }
                                                  }else{
                                                        //Zero index
                                                        angular.forEach(value3,function(value5,key5){
                                                              if(isNaN(key5)){
                                                                    var obj = {};
                                                                    if(!isJson(value5)){
                                                                          obj[key5] = value5;
                                                                          keyArray1.push(obj);
                                                                    }else{
                                                                          obj[key5] = 'Child1';
                                                                          keyArray1.push(obj);
//                                                                        angular.forEach(value5,function(value6,key6){
//                                                                              
//                                                                        });
                                                                    }
                                                              }
                                                        });
                                                  }
                                            });
                                      }
                                }else{
                                      //Zero index
                                      angular.forEach(value2,function(value4,key4){
                                            if(isNaN(key4)){
                                                  var obj = {};
                                                  if(!isJson(value4)){
                                                        obj[key4] = value4;
                                                        keyArray1.push(obj);
                                                  }else{
                                                        obj[key4] = 'Child1';
                                                        keyArray1.push(obj);
//                                                      angular.forEach(value4,function(value7,key7){
//                                                            
//                                                      });
                                                  }
                                            }
                                      });
                                }
                          });
                    }
              }else{
                    //Zero index
                    angular.forEach(value1,function(value8,key8){
                          if(isNaN(key8)){
                                var obj = {};
                                if(!isJson(value8)){
                                      obj[key8] = value8;
                                      keyArray1.push(obj);
                                }else{
                                      obj[key8] = 'Child1';
                                      keyArray1.push(obj);
                                      angular.forEach(value8,function(value9,key9){
                                            if(isNaN(key9)){
                                                  var obj = {};
                                                  if(!isJson(value9)){
                                                        obj[key9] = value9;
                                                        keyArray1.push(obj);
                                                  }else{
                                                        obj[key9] = 'Child2';
                                                        keyArray1.push(obj);
                                                        /*angular.forEach(value9,function(value10,key10){
                                                              
                                                        });*/
                                                  }
                                            }else{
                                                  angular.forEach(value9,function(value10,key10){
                                                        if(isNaN(key10)){
                                                              var obj = {};
                                                              if(!isJson(value10)){
                                                                    obj[key10] = value10;
                                                                    keyArray1.push(obj);
                                                              }else{
                                                                    obj[key10] = 'Child1';
                                                                    keyArray1.push(obj);
                                                                    /*angular.forEach(value8,function(value9,key9){
                                                                          
                                                                    });*/
                                                              }
                                                        }
                                                  });
                                            }
                                      });
                                }
                          }
                    });
              
              
              }
        });
        $scope.dispalyKeys = angular.copy(keyArray1);
        return keyArray1;
        console.log('DATA :: '+ JSON.stringify($scope.dispalyKeys));
  }
});