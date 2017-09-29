app.controller('dashboardCtrl',function($scope,$http,$filter,$rootScope,$state){
	var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
	
	var x = d3.time.scale()
    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);
	
	//var color = d3.scale.category10();
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	    .tickFormat(d3.time.format("%H")); //d3.time.format("%H:%M")
	    //.ticks(5);
	
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left").ticks(5);
	
	var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.temperature); }); 
	
var parseDate = d3.time.format("%Y%m%d %H:%M %p").parse;
var formatDate = d3.time.format("%H")
//console.log('formatDate '+ formatDate(parseDate('20030201')));

var color = d3.scale.category10();
var svg;
$scope.custColor = ['#0099CC','#51A39D','#B7695C','#CDBB79','#F20075','#93228D','#FF0000','#FFC200']
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


$scope.getdata = function(type,calltype) {
    $('#graph').html('');
    var ddltype = $scope.opttype.selected;
    var network = $scope.networktype.selected;
    
    $scope.type1 = type;
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

    /* Below code for Legend checkboxs */
    if(calltype == "legend"){
        var indexOfDay = $scope.selectedList.indexOf(type); 
        if(indexOfDay === -1) {
            $('#'+type).removeClass('imageCheck').addClass('imageUnCheck');
            $scope.selectedList.push(type)
        } else {
            $('#'+type).removeClass('imageUnCheck').addClass('imageCheck');
            $scope.selectedList.splice(indexOfDay, 1)
        }
    }
    
	/******************** END CODE********************** */    

    /* Generate d3 graph on canvas */
	svg = d3.select("#graph").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	/*********************** END CODE*********************** */
    
    /** Read CSV file using d3 functionality */
    d3.csv("resources/jsonapi/book2.csv", function(error, data) {
		color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
		data.forEach(function(d) {
		   d.date = parseDate(d.date);
		  // console.log('formatDate '+  d.date);
		});
        
        /** Remove some unwanted columns */
		angular.forEach(data[0],function(value,key){
			if(key != "date" && key != "Result" && key != "Link1" && key != "Link2" && key != "Link3" && key != "id"){
				if($scope.legendData.indexOf(key) === -1){
					$scope.legendData.push(key);
				}
			}
        });
		if($scope.legendData.indexOf('Fail') === -1){
			$scope.legendData.push('Fail');
			$scope.legendData.push('Slow');
		}
		
        /*********************** END CODE*********************** */
                
        /** Filter data by using legend check boxes */
        angular.forEach($scope.selectedList,function(value,key){
            angular.forEach(data,function(value1,key1){
                delete data[key1][value];
            }); 
        });
        /*********************** END CODE*********************** */

        /** Filter data by using legend check boxes (Filter only Fail and Slow data) */
        debugger;
        var tempFilter = [];
        angular.forEach(data,function(value1,key1){
            if(value1['Result'] == network && value1['Result'] == network){
            	tempFilter.push(value1);
            }
        });    
        /*********************** END CODE*********************** */

        var filtergraph = [];
        if(tempFilter.length > 0)
        	filtergraph = angular.copy(tempFilter);
        else	
        	filtergraph = angular.copy(data);
        	
        filterDate(filtergraph,ddltype);
	});
};
/** Filter data date wise for display graph */
function filterDate(data,type){

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
        
        $scope.header =[];
        angular.forEach(newdata,function(value,key){
        	if(key == 0){
        		angular.forEach(value,function(value1,key1){
        			$scope.header.push(key1);
            	});
        	}
        });
        
        $scope.tabledata = angular.copy(newdata);
        /** Remove ID column (ID column used only for edit grid rows) */
        angular.forEach(newdata,function(value,key){
        	delete newdata[key]['id'];
        });
        /*********************** END CODE*********************** */
		showNetworkGraph(newdata);
		$scope.$apply(); 
};

/** Init function */
$scope.getdata('All');
$scope.modaldata;
function showNetworkGraph(data){
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

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis)
	      .append("text")
	      .attr("x", width)
	      .attr("dx", ".91em")
	      .style("text-anchor", "end")
	      .text("Date");

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("CPU");

	  var city = svg.selectAll(".city")
	      .data(monitor)
	      .enter().append("g")
	      .attr("class", "city");

      if(charttype == "Line"){    
	    city.append("path")
	        .attr("class", "line")
	        .attr("d", function(d,i) {
	        	if(!isNaN(d.values[i].temperature)){
	        		return line(d.values); 
	        	}
	        })
	        .style("stroke", function(d,j) { return $scope.custColor[j] });
      }
	  /* city.append("text")
	      .datum(function(d) {
	      		return {name: d.name, value: d.values[d.values.length - 1]}; 
	    	})
	      .attr("transform", function(d) {
		      	return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
	      	})
	      .attr("x", 3)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.name; }); */

	  city.selectAll("circle")
	    .data(function(d){
		    return d.values;
	     })   
	    .enter()
	    .append("circle")
	    .attr("r", function(){
            if(charttype == "Line"){
                return 4;
            }else{
                return 6;
            }
        })
	    .attr("cx", function(d) {
	    	if(!isNaN(d.temperature)){
	    		debugger;
	        	return x(d.date);	
	        	//return 15 + x(d.date);	// add extra 15 for increase the dist. btwn node and x-axis	
	    	}
	    })
	    .attr("cy", function(d) { 
	    	if(!isNaN(d.temperature)){
	    		return y(d.temperature);
	    	}
	    })
	    .style("fill", function(d,i,j) {
		    if(!isNaN(d.temperature)){
				if($scope.tabledata[i].Result === 'Fail'){
					return '#FF0000';
				}else if($scope.tabledata[i].Result === 'Slow'){
					return "#FFC200";
				}else{
		    		return $scope.custColor[j];
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
    		$scope.modaldata = angular.copy($scope.tabledata[i]);
        	return $scope.modalPopup($scope.modaldata);
        })
	  	.on('mouseover',tip.show)
	  	.on('mouseout', tip.hide);
            
        //.classed('white transparent', true);
}
	$scope.modalPopup = function(data){
		if(data.Result == 'Fail' || data.Result == 'Slow'){
			var html = '<h4> Network Result '+ data.Result + '</h4>';
			$('#myModal').modal('show');
			$('#my1').html(html);
		}
	}
	
	$scope.restartNetwork = function(){
		$('#myModal').modal('hide');
		$state.go('restartinfo');
	}
	
	var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function (d,i) {
		return  ToolTiptemplate(d,i);
	})
	
	
	svg.call(tip);
	function ToolTiptemplate(d,i){
		tip.hide;
		$rootScope.nodedata = '';
		$rootScope.nodedata = angular.copy($scope.tabledata[i]);
		var toolTip = angular.copy($scope.tabledata[i]); 
		var html ;
		if(d.result == "Fail" || d.result == "Slow"){
			html = '<div>'
				 + '<ul>'
				 + '<li>Memory : '+ toolTip.Memory  + '</li>'
				 + '<li>Network : '+ toolTip.Network  + '</li>'
				 + '<li>Disk : '+ toolTip.Disk  + '</li>'
				 + '<li>NumUsers : '+ toolTip.NumUsers  + '</li>'
				 + '<li>No. Connections : '+ toolTip.Noconnections  + '</li>'
				 + '<li>Result : '+ toolTip.Result  + '</li>'
				 + '<li>Link1 : '+ toolTip.Link1  + '</li>'
				 + '<li>Link2 : '+ toolTip.Link2  + '</li>'
				 + '<li>Link3 : '+ toolTip.Link3  + '</li>'
				 + '</ul>'
				 + '<a href="#/restartinfo" style="color:#f49505;">Restart your network</a>'
				 + '</div>'
				 + '<button >Close</button>'
			//html = '<div><a href="#/restartinfo" style="color:#fff;">'+d.result+' - Restart your network</a></div>';
		}else{
			html = '<div>'
				 + '<ul>'
				 + '<li>CPU : '+ toolTip.cpu  + '</li>'
				 + '<li>Memory : '+ toolTip.Memory  + '</li>'
				 + '<li>Network : '+ toolTip.Network  + '</li>'
				 + '<li>Disk : '+ toolTip.Disk  + '</li>'
				 + '<li>NumUsers : '+ toolTip.NumUsers  + '</li>'
				 + '<li>No. Connections : '+ toolTip.Noconnections  + '</li>'
				 + '<li>Result : '+ toolTip.Result  + '</li>'
				 + '<li>Link1 : '+ toolTip.Link1  + '</li>'
				 + '<li>Link2 : '+ toolTip.Link2  + '</li>'
				 + '<li>Link3 : '+ toolTip.Link3  + '</li>'
				 + '</ul>'
				 + '</div>';
		}	
	   return html;
	}
	/*$scope.model = {selected : {}};
	$scope.saveContact = function (idx) { console.log('idx '+ idx);
        $scope.tabledata[idx] = angular.copy($scope.model.selected);
        console.log('selected '+JSON.stringify($scope.griddata));
        $scope.reset();
    };
    $scope.reset = function () {
        $scope.model.selected = {};
    };*/
	$scope.filterAlreadyAdded = function(item) {
	};
})
.directive('gridTable',function(){
    return {
        restrict : 'AE',
        scope : {
            griddata : '=',
            callfun : '&',
        },
        templateUrl : 'resources/directives/editable-grid.html',
        controller : function($scope,$http){
             $scope.getTemplate = function (contact) {
            if (contact.id === $scope.model.selected.id) return 'edit';
                else return 'display';
            };
            $scope.model = {selected : {}};
            $scope.editContact = function (contact) {
                $scope.model.selected = angular.copy(contact);
            };
            
            $scope.saveContact = function (idx) {
            	$scope.editableRow = [];
                $scope.editableRow.push($scope.model.selected);
                console.log('editableRow '+ JSON.stringify($scope.editableRow));
                $scope.griddata[idx] = angular.copy($scope.model.selected);
               /* $http({
					url : 'user/createUserProfile',
					contentType : "application/json",
					method : 'POST',
					 data: objTemp 
					//data : angular.toJson(objTemp)
				}).then(function(success) {
					console.log(success)
				}, function(err) {
					console.log(err)
				});*/
                
                $scope.reset();
            };

            $scope.reset = function () {
                $scope.model.selected = {};
            };
        }
    };
})
/*.directive('graphTable',function(){
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
})*/
.directive('modalPopup',function(){
	    return {
	        restrict : 'AE',
	        scope : {
	            modaldata : '=',
	            btnclick : '&',
	        },
	        template : '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'
	        	+ '<div class="modal-dialog" role="document">'
	        	+ '<div class="modal-content">'
	        	+ '<div class="modal-body"> '
	        	+ '<div style="padding: 20px 24px;" class="col-md-10"><div id="my1"></div><h4 ng-click="btnclick()" style="color:#f49505;cursor : pointer">Please restart your network</h4></div>'
	        	+ '<div style="padding: 20px 24px;" class="col-md-2"><button type="button" class="btn btn-secondary" data-dismiss="modal">X</button></div>'
	        	+ '</div>'
	        	+ '<div class="modal-footer">'
	        	+ ''
	        	+ '</div>'
	        	+ '</div>'
	        	+ '</div>'
	        	+ '</div>'
	    };
});
