app.controller('persistCtrl',['http_url','$scope','$http','$filter','$rootScope','$state','$timeout',function(http_url,$scope,$http,$filter,$rootScope,$state,$timeout){
	$scope.showLoading = true;  
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.dataNew = [];
	$scope.colorCode = {'pass':'mlpasscolor','fail':'mlfailcolor','slow':'mlslowcolor','memoryLeak':'bk-dark','diskFull':'bk-brand','systemFaliure':'bk-blue'};
	$scope.custColor = {'pass':'#006600','fail':'#ff4800','slow':'#e6ac00','memoryLeak':'#222','diskFull':'#37a6c4','systemFaliure':'#0010ce'};
	$scope.custFillColor = {'pass':'#99ff99','fail':'#ff7f4d','slow':'#ffd24d','memoryLeak':'#222','diskFull':'#37a6c4','systemFaliure':'#0010ce'};
	
    function StatusCount(){
        $http.put(http_url+'demo/onap/ListProcessedData')
        .then(function(res){
         $scope.statusCount = res.data.predictionResult;
         $scope.accuracy=res.data.predictionResult.accuracy;
         $scope.dataNew =res.data.dataSet; 
            // console.log('$scope.dataNew '+JSON.stringify($scope.dataNew));
             $scope.getdata('All');
        });
    };
    StatusCount();
    
    var margin = {top: 10, right: 80, bottom: 30, left: 35},
    width = 320 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;
    
    var x = d3.time.scale()
    .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);
    
    //var color = d3.scale.category10();
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(4)
        .tickFormat(d3.time.format("%I:%M")); //d3.time.format("%H:%M")
     
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left").ticks(5);
    
    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.temperature); }); 
    
    var area = d3.svg.area()
	    .x(function(d) { return x(d.date); })
	    .y0(height)
	    .y1(function(d) { return y(d.temperature); }); 
    
//var parseDate = d3.time.format("%Y%m%d %H:%M").parse;
var parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse;

var formatDate = d3.time.format("%H")

var color = d3.scale.category10();
var svg;
//$scope.custColor = ['#0099CC','#51A39D','#B7695C','#CDBB79','#F20075','#93228D','#FF0000','#FFC200']
$scope.legendData = [];
$scope.selectedList = [];
$scope.selectedDate = [];
$scope.opttype = {
    selected : "All"
}
$scope.charttype = {
    selected : "Line"
}
$scope.networktype = {
    selected : "All"
}

function checkboxFunctionality(type,calltype){
	type = type - 1;
    /* Below code for selected grid data highlited */
    if(calltype == 1){
        $scope.temp = [];
      var indexOfDate = $scope.selectedDate.indexOf(type); 
        if(indexOfDate === -1) {
            $scope.selectedDate.push(type);
        } else {
            $scope.selectedDate.splice(indexOfDate, 1)
        }
        $scope.max = Math.max.apply(Math,$scope.selectedDate.map(function(item){return item;}));
        for(i=0;i <= $scope.max;i++){
             indexOfDate = $scope.selectedDate.indexOf(i);
             if(indexOfDate === -1){
                $scope.temp[i] = false;
             }else{
                 $scope.temp[i] = true;
             }
        }
    }
    /******************** END CODE********************** */   
}
$scope.graphnum = [1,2,3,4,5,6,7];
var vars = {}
$scope.name = 'fail';
$scope.subTitleBlock = {"Service Faliure":"serviceFaliure","Disk Full":"diskFull","Memory Leak" : "memoryLeak"};
$scope.subBlock = true;
$scope.getCount = function(count,name){ 
    $scope.name = name;
    if($scope.name == 'fail'){
    	$scope.subBlock = true;
    	$scope.subTitleBlock = {"Service Faliure":"serviceFaliure","Disk Full":"diskFull","Memory Leak" : "memoryLeak"};
    }else if($scope.name == 'slow'){
    	$scope.subBlock = true;
    	$scope.subTitleBlock = {"High Memory":"highMemory","Cpu Memory":"cpuMemory","Slow Response" : "response","Connections":"connections"};
    }else{
    	$scope.subTitleBlock = [];
    	$scope.subBlock = false;
    }
     $scope.getdata('All');
}

$scope.getdata = function(type,calltype) {
    var ddltype = $scope.opttype.selected;
    var network = $scope.networktype.selected;
    checkboxFunctionality(type,calltype);
    
    angular.forEach($scope.graphnum,function(value,key){
         $('#graph' + key).html('');
         /* Generate d3 graph on canvas */
            vars['svg' + key] = d3.select("#graph"+key).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            /*********************** END CODE*********************** */
    });
    
    
    /** Read CSV file using d3 functionality */
    var newData = [];
    var data = [];
    d3.csv("resources/jsonapi/book2.csv", function(error, data2) {
    	var data1 = angular.copy($scope.dataNew);
  	   
        angular.forEach(data1,function(value,key){
            if($scope.name.toLowerCase() == "fail"){
            	if(value.prediction.toLowerCase() == "service faliure" || value.prediction.toLowerCase() == "disk full"
            		|| value.prediction.toLowerCase() == "memory leak"){
                    data.push(data1[key]);
                }
            }else if($scope.name.toLowerCase() == "slow"){
            	if(value.prediction.toLowerCase() == "high memory" || value.prediction.toLowerCase() == "cpu memory"
            		|| value.prediction.toLowerCase() == "response" || value.prediction.toLowerCase() == "connections"){
                    data.push(data1[key]);
                }
            }else{
            	if(value.prediction.toLowerCase() == "pass"){
                    data.push(data1[key]);
                }
            }
        });
       
        if(data.length == 0){
            //data= angular.copy(data1);
        }
        
        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
        data.forEach(function(d) {
           d.date = parseDate(d.date);
        });  
        
        /*********************** END CODE*********************** */
        $scope.selectedList = ["cpu","memory","network","diskSpace","numOfUser","noOfConn","flaps","responseTime"];
        $scope.tempList = ["cpu","memory","network","diskSpace","numOfUser","noOfConn","flaps","responseTime"];
        /** Filter data by using legend check boxes */
        angular.forEach($scope.selectedList,function(value,key){
            newData = angular.copy(data);
            angular.forEach(newData,function(value1,key1){
                angular.forEach($scope.tempList,function(value2,key2){
                    if(value2 != value){
                        delete newData[key1][value2];
                    }
                }); 
            });
            filterDate(newData,ddltype,key,data,value);
        });
    });
};

/** Init function */
//$scope.getdata('All');

/** Filter data date wise for display graph */
function filterDate(data,type,grpkey,orgdata,yAxisName){
    var newdata = [];
    $scope.tabledata = [];
    var date = $filter('date')(new Date(), 'shortDate');
        if(type == 'Today'){
            angular.forEach(data,function(value,key){
                var dt = $filter('date')(value.date, 'shortDate');
                if(dt == date){
                    newdata.push(value);
                }
            });
        }else if(type == 'LW'){
            var startDate = moment().subtract(1, 'week').startOf('week');
            var endDate = moment().subtract(1, 'week').endOf('week');
            
            var WS = $filter('date')(new Date(startDate), 'shortDate'); 
            var WStart = new Date(WS).getTime();
            var WE = $filter('date')(new Date(endDate), 'shortDate');
            var WEnd = new Date(WE).getTime();
            
            angular.forEach(data,function(value,key){
                var dt = $filter('date')(value.date, 'shortDate');
                var gdate = new Date(dt).getTime();
                if(WStart <= gdate && WEnd >= gdate){
                    newdata.push(value);
                }
            });
        }else if(type == 'LM'){
            var dateFrom = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
            var dateTo = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
            
            var WS = $filter('date')(new Date(dateFrom), 'shortDate'); 
            var WStart = new Date(WS).getTime();
            var WE = $filter('date')(new Date(dateTo), 'shortDate');
            var WEnd = new Date(WE).getTime();

            angular.forEach(data,function(value,key){
                var dt = $filter('date')(value.date, 'shortDate');
                var gdate = new Date(dt).getTime();
                if(WStart <= gdate && WEnd >= gdate){
                    newdata.push(value);
                }
            });
        }else{
            newdata = angular.copy(data);
        } 
        /* ************************* Filter table data ************************* */
        
        $scope.temTable=[];
        var i=1;
        $scope.temTable=angular.copy(orgdata);
        $scope.showLoading = false; 
//        angular.forEach(orgdata,function(value,key){
//        	angular.forEach(newdata,function(value1,key1){
//        		//console.log('DATA H '+JSON.stringify(i +' --- '+value1._id.counter +' ------------- '+value1._id.counter));
//        		i++;
//               if(value._id.counter === value1._id.counter){
//                	$scope.temTable.push(data);
//               }
//        	});
//        });

        /* ********************** END CODE*********************** */
        if(newdata.length > 0){
            $scope.tabledata = angular.copy($scope.temTable);
        }
        /** Remove ID column (ID column used only for edit grid rows) */
        angular.forEach(newdata,function(value,key){
            delete newdata[key]['id'];
        });
        $scope.header =[];
        angular.forEach(orgdata,function(value,key){
            if(key == 0){
                angular.forEach(value,function(value1,key1){
                    if(key1 != 'id')
                        $scope.header.push(key1);
                });
            }
        });
        /*********************** END CODE*********************** */
        showNetworkGraph(newdata,grpkey,yAxisName);
        $scope.$apply(); 
};

$scope.modaldata;
function showNetworkGraph(data,grpkey,yAxisName){
    var charttype = $scope.charttype.selected;
    var dataArray = [];
      var monitor  = color.domain().map(function(name) {
        return {
            name: name,
            values: data.map(function(d) {
                dataArray.push(+d[name]);
                return {date: d.date,temperature: +d[name]};
            })
        };
      });

      x.domain(d3.extent(data, function(d) { return d.date; }));

      y.domain([
        d3.min(monitor , function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
        d3.max(monitor , function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
      ]);
      // Define the div for the tooltip
var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
    
      vars['svg' + grpkey].append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("x", width)
          .attr("y", 27)
          .attr("dx", ".91em")
          .style("text-anchor", "end")
          .text("Time");

      vars['svg' + grpkey].append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -50)          
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .attr("class","textClass")
          .text(yAxisName);

      vars['city' + grpkey] = vars['svg' + grpkey].selectAll(".city")
          .data(monitor)
          .enter().append("g")
          .attr("class", "city");

   
      
      if(charttype == "Line"){    
          vars['city' + grpkey].append("path")
            .attr("class", "line")
            .attr("d", function(d,i) { 
                //console.log('Len '+d.values.length);
                //if(i < d.values.length){
                    //if(!isNaN(d.values[i].temperature)){
                        return line(d.values); 
                    //}
                //}
            })
            .style("stroke", function(d,j) { return $scope.custColor[$scope.name] });
          
          vars['city' + grpkey].append("path")
          	//.attr("class","area")
          .attr("class",function(d){
        	  if($scope.name == 'fail'){
        		  return 'area1';
        	  }else if($scope.name == 'pass'){
        		  return 'area2';
        	  }else if($scope.name == 'slow'){
        		  return 'area3';
        	  }
        	  return $scope.custFillColor[$scope.name] 
          })
           .attr("d", function(d,i) { 
                  return area(d.values); 
            })
      }
      vars['city' + grpkey].selectAll("circle")
        .data(function(d){
            return d.values;
         })   
        .enter()
        .append("circle")
        .attr("r", function(){
            if(charttype == "Line"){
                return 4;
            }else{
                return 4;
            }
        })
        .attr("cx", function(d) {
            if(!isNaN(d.temperature)){
                return x(d.date);   
                //return 15 + x(d.date);    // add extra 15 for increase the dist. btwn node and x-axis 
            }
        })
        .attr("cy", function(d) { 
            if(!isNaN(d.temperature)){
                return y(d.temperature);
            }
        })
        .style("fill", function(d,i,j) {
            if(!isNaN(d.temperature)){
                if($scope.tabledata[i].prediction === 'Fail'){
                    return '#FF0000';
                }else if($scope.tabledata[i].prediction === 'Slow'){
                    return "#FFC200";
                }else{
                	return $scope.custColor[$scope.name];
                    //return $scope.custColor[j];
                } 
            }
        })
        .attr('class',function(d,i){
            if($scope.selectedDate.length > 0){
                if($scope.selectedDate.indexOf(i) === -1){
                    return 'white1';
                }else{
                    return 'white2';
                }
            }else{
                return 'white';
            }
        })
        .on('click',function(d,i){ 
        	if($scope.selectedDate.length > 0){
                if($scope.selectedDate.indexOf(i) === -1){
                	
                }else{
                    $scope.modaldata = angular.copy($scope.tabledata[i]);
                    return $scope.modalPopup($scope.modaldata,i);
                }
            }else{
            	$scope.modaldata = angular.copy($scope.tabledata[i]);
                return $scope.modalPopup($scope.modaldata,i);
            }
        })
        .on('mouseover',function(d,i){
        	if($scope.selectedDate.length > 0){
                if($scope.selectedDate.indexOf(i) === -1){
                	
                }else{
                    div.transition()        
                    .duration(200)      
                    .style("opacity", .9);      
                	div.html($scope.tabledata[i][yAxisName])    
                    .style("left", (d3.event.pageX) + "px")     
                    .style("top", (d3.event.pageY - 34) + "px");
                }
            }else{
            	div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            	div.html($scope.tabledata[i][yAxisName])    
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 34) + "px");
            }
            
        })
        .on('mouseout',function(){
            div.transition()        
                .duration(500)      
                .style("opacity", 0);
        });
}
    $scope.modalPopup = function(data,i){ 
        if(data.prediction.toLowerCase() == "service faliure" || data.prediction.toLowerCase() == "disk full"
    		|| data.prediction.toLowerCase() == "memory leak" || data.prediction.toLowerCase() == "high memory" 
	   || data.prediction.toLowerCase() == "cpu memory" || data.prediction.toLowerCase() == "response" 
	   || data.prediction.toLowerCase() == "connections"){
            var usrtInfo = {
                "date" : new Date(),
                "userid" : "587456",
                "username" : "Abhijit",
                "action" : "Reboot VM"
            }
            //$rootScope.nodedata =[];
            $scope.nodedata = {
                "userInfo" : usrtInfo,
                "procesedNode" : $scope.tabledata[i]
            };
            var html = '<h4 style="margin-top:20px;"> Predicted Impact To Service</h4>';
            $('#myModal').modal('show');
            $('#my1').html(html);
        }
    }
    
    $scope.restartNetwork = function(){
    	SaveAuditData();
        $('#myModal').modal('hide');
        $('#myModal1').modal('show');
        $timeout( function(){ $('#myModal1').modal('hide'); }, 2000);
    }
   function SaveAuditData(){
		   $http({
				url : http_url+'demo/onap/SaveAuditInfo',
				contentType : "application/json",
				method : 'POST',
				data: $scope.nodedata 
				//data : angular.toJson(objTemp)
			}).then(function(success) {
				console.log(success)
			}, function(err) {
				console.log(err)
			});
   } 
    //svg.call(tip);
}])
.directive('modalPopup',function(){
        return {
            restrict : 'AE',
            scope : {
                modaldata : '=',
                btnclick : '&',
            },
             template : '<div class="modal fade persistmodal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'
                + '<div class="modal-dialog modal-md" role="document">'
                + '<div class="modal-content">'
                + '<div class="modal-body">'
                + '<div class="row">'
                + '<div class="col-md-12 persistclosebtn">'
                + '<h4>Predicted Impact To Service</h4>'
                + '<button type="button" class="btn btn-secondary" data-dismiss="modal" ><img alt="" src="resources/images/Close.png"></button>'
                + '</div>'
                + '</div>'
                + '<div class="row margin-top-20">'
                + '<div class="col-md-7 border-right-dotted">'
                + '<div class="col-md-4" style="top: 20px;">'
                + '<img alt="" src="resources/images/Restart-VM_Normal.png" ng-click="btnclick()" style="cursor:pointer">'
                + '<p>Restart VM</p>'
                + '</div>'
                + '<div class="col-md-4" style="top: 8px;">'
                + '<img alt="" src="resources/images/Rebuild-VM_Normal.png" ng-click="btnclick()" style="cursor:pointer">'
                + '<p>Rebuild VM</p>'
                + '</div>'
                + '<div class="col-md-4" style="top: 15px;">'
                + '<img alt="" src="resources/images/Raise_Ticket_Normal.png" ng-click="btnclick()" style="cursor:pointer">'
                + '<p>Raise Ticket</p>'
                + '</div>'						
                + '</div>'
                + '<div class="col-md-5">'
                + '<p>In most of the cases Restarting the VM works. If it doesn\'t work you should rebuild it. Finally if nothing works Raise a Ticket for human Intervention.</p>'
            	+ '</div>'
            	+ '</div>'
            	+ '</div>'
                + '<div class="modal-footer">'
                + ''
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>'
        };
});
