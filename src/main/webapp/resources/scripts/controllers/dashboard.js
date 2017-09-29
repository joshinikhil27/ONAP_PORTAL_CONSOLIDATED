app.controller('dashboardCtrl',function($scope,$http,$filter,$rootScope){
	var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
	
	var x = d3.time.scale()
    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);
	
	//var color = d3.scale.category10();
	$scope.count = 6;
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom").ticks($scope.count);
	
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left").ticks(5);
	
	var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.temperature); }); 
	
var parseDate = d3.time.format("%Y%m%d").parse;

var color = d3.scale.category10();
var svg;
$scope.custColor = ['#0099CC','#51A39D','#B7695C','#CDBB79','#F20075','#93228D','#FFC200','#FF0000']
$scope.legendData = [];
$scope.selectedList = [];
$scope.selectedDate = [];
$scope.opttype = {
    selected : "All"
}
$scope.charttype = {
    selected : "Dotted"
}

$scope.getdata = function(type,calltype) {
    $('#graph').html('');
    var ddltype = $scope.opttype.selected;
    
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
        console.log(JSON.stringify($scope.temp)); 
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
    d3.csv("./jsonapi/book.csv", function(error, data) {
		color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
		data.forEach(function(d) {
		   d.date = parseDate(d.date);
		});
        
        /** Remove some unwanted columns */
		angular.forEach(data[0],function(value,key){
			if(key != "date" && key != "Result" && key != "Link1" && key != "Link2" && key != "Link3"){
				if($scope.legendData.indexOf(key) === -1){
					$scope.legendData.push(key);
				}
			}
        });
        /*********************** END CODE*********************** */
                
        /** Filter data by using legend checkboxes */
        angular.forEach($scope.selectedList,function(value,key){
            angular.forEach(data,function(value1,key1){
                delete data[key1][value];
            }); 
        });
        /*********************** END CODE*********************** */

        filterDate(data,ddltype);
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
        
        //$scope.count = newdata.length;
        //console.log($scope.count);
        $scope.tabledata = angular.copy(newdata);
		showNetworkGraph(newdata);
		$scope.$apply(); 
};

/** Init function */
$scope.getdata('All');

function showNetworkGraph(data){
    var charttype = $scope.charttype.selected;
	var dataArray = [];
	  var monitor  = color.domain().map(function(name) {
		return {
			name: name,
			values: data.map(function(d) {
				dataArray.push(+d[name]);
				return {date: d.date,result : d.Result,link1:d.Link1,link2:d.Link2,link3:d.Link3, temperature: +d[name]};
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
	      .data(monitor )
	      .enter().append("g")
	      .attr("class", "city");

      if(charttype == "Line"){    
	    city.append("path")
	        .attr("class", "line")
	        .attr("d", function(d) { return line(d.values); })
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
	        	return x(d.date);	// add extra 15 for increase the dist. btwn node and x-axis	
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
				if(d.result === 'Fail'){
					return '#FF0000';
				}else if(d.result === 'Slow'){
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
        .on('click',tip.show);
            
        //.classed('white transparent', true);
}


var tip = d3.tip()
.attr('class', 'd3-tip')
.offset([-10, 0])
.html(function (d) {
	return  ToolTiptemplate(d);
})
svg.call(tip);
function ToolTiptemplate(d){
	tip.hide;
	$rootScope.nodedata = '';
	$rootScope.nodedata = angular.copy(d);
	console.log('ROOT ' + JSON.stringify(d));
	var html ;
	if(d.result == "Fail" || d.result == "Slow"){
		html = '<div><a href="#/restartinfo" style="color:#fff;">'+d.result+' - Restart your network</a></div>';
	}else{
		html = '<div>Result : '+d.result+'</div>';
	}	
   return html;
}
$scope.filterAlreadyAdded = function(item) {
        console.log('filter '+item);
        
};
})
.directive('graphTable',function(){
    return {
        restrict : 'AE',
        scope : {
            tabledata : '=',
            callfun : '&',
            styleclass : '=',
        },
        templateUrl : './directives/graph-data.html',
        link: function($scope, element, attrs) {
           
        }
    };
})
.directive('graphTooltip',function(){
    return {
        restrict : 'AE',
        scope : {
            ttdata : '=',
        },
        template : '<div ng-click="clickMe()">TOOLTIP CODE </div>',
        link: function($scope, element, attrs) {
            $scope.clickMe= function() {
                alert('inside click');
            }
        }
    };
});
