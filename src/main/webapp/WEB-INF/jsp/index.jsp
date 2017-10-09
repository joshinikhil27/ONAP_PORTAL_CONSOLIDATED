<!DOCTYPE html>
<html lang="en" ng-app="App">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title ng-bind="'Portal : ' + $state.current.data.pageTitle"></title>

    <!-- Bootstrap Core CSS -->
    <link href="resources/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="resources/vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="resources/dist/css/sb-admin-2.css" rel="stylesheet">
    <link href="resources/css/style.css" rel="stylesheet">
	<link href="resources/css/sdnc_style.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="resources/vendor/morrisjs/morris.css" rel="stylesheet">
<!--     <link href="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.6/nv.d3.css" rel="stylesheet"> -->
    <link href="resources/dist/css/nv.d3.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="resources/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<!--     <script src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script> -->
	
    <!-- <script src = "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.10/angular.min.js"></script> -->
    <script src = "resources/dist/ang-js/angular.min.js"></script>
    <script src="resources/js/dirPagination.js"></script>
<!-- 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> -->
<!-- 	<script src="http://d3js.org/d3.v3.js"></script> -->
	<script src="resources/dist/d3-js/d3.v3.js"></script>
<!-- 	<script type='text/javascript' src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"> </script> -->
	<script type='text/javascript' src="resources/dist/d3-js/d3.tip.v0.6.3.js"> </script>
	<!-- <script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.6/nv.d3.js"> </script> -->
	<script type='text/javascript' src="resources/dist/d3-js/nv.d3.js"> </script>
	<!-- <script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/angularjs-nvd3-directives/0.0.8/angularjs-nvd3-directives.js"> </script> -->
    <script type='text/javascript' src="resources/dist/d3-js/angularjs-nvd3-directives.js"> </script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.8/angular-ui-router.min.js"></script>
    <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.11.0.js"></script>
	<script src="resources/dist/js/moment.js"></script>
    <script src="resources/js/app.js"></script>
    <script src="resources/js/router.js"></script>
    <script src="resources/controllers/dashboard.js"></script>
    <script src="resources/controllers/persistCtrl.js"></script>
    <script src="resources/controllers/restartinfo.js"></script>
    <script src="resources/controllers/summaryCtrl.js"></script>
    <script src="resources/controllers/importVNFCtrl.js"></script>
    
    <script src="resources/controllers/presistDataCtrl.js"></script>
    <script src="resources/controllers/preTestCtrl.js"></script>
    <script src="resources/controllers/versionCompCtrl.js"></script>
    <script src="resources/controllers/versionHistoryCtrl.js"></script>
    <script src="resources/controllers/eventListCtrl.js"></script>
    
     <!-- A&AI  -->
    <!-- <script src="./lib/jquery-1.10.2.min.js"></script> -->

<!--  <script src="resources/AAI/lib/d3.v3.min.js"></script>  -->
<!--  <script src="resources/AAI/lib/d3.v3.min.js"></script> -->

 <script src="resources/AAI/templates/dndTree.js"></script>

 <script src="resources/AAI/button_clicks/getCustomers.js"></script>

 <script src="resources/AAI/button_clicks/clearit.js"></script>

 <script src="resources/AAI/api_calls/onClick_Business.js"></script>

 <script src="resources/AAI/node_clicks/CSTMRclicked.js"></script>
 <script src="resources/AAI/node_clicks/SUBSclicked.js"></script> 
 <script src="resources/AAI/node_clicks/INSTclicked.js"></script>
 <script src="resources/AAI/node_clicks/S_SUBSclicked.js"></script>
 <script src="resources/AAI/node_clicks/VNFclicked.js"></script>
 <script src="resources/AAI/node_clicks/VSRVRclicked.js"></script>

 <script src="resources/AAI/graphs/customers_graph.js"></script> 
 <script src="resources/AAI/graphs/customer_graph.js"></script>
 <script src="resources/AAI/graphs/root_customer_graph.js"></script>
 <script src="resources/AAI/graphs/specific_customer_graph.js"></script>
 <script src="resources/AAI/graphs/specific_subscription_graph.js"></script>
 <script src="resources/AAI/graphs/specific_instance_graph.js"></script>
 <script src="resources/AAI/graphs/vf_module_graph.js"></script>
 <script src="resources/AAI/graphs/pserver_graph.js"></script>
 
<script src="resources/AAI/tables/root_customer_table.js"></script>
 <script src="resources/AAI/tables/generic_vnfs_table.js"></script>
 <script src="resources/AAI/tables/specific_generic_vnf_table.js"></script>
 <script src="resources/AAI/tables/specific_vf_module_table.js"></script>
 <script src="resources/AAI/tables/customers_table.js"></script>
 <script src="resources/AAI/tables/specific_customer_table.js"></script>
 <script src="resources/AAI/tables/specific_subscription_table.js"></script>
 <script src="resources/AAI/tables/specific_s_instance_table.js"></script>
 <script src="resources/AAI/tables/createRow.js"></script>
 <script src="resources/AAI/custjs.js"></script>
 <script src="resources/AAI/tables/vf_module_table.js"></script>
 <script src="resources/AAI/tables/pserver_table.js"></script>
 <script src="resources/AAI/tables/createRow.js"></script>
    <style>
      .symbol {
	    font-family: FontAwesome;
	    font-size: 16px;
	  }
    </style>
</head>
<body>
    <div id="wrapper" class="container">
        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0;background-color:#fff;">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="" class="navbar-brand">
                	<img class="float-left" alt="" width="150px" src="resources/images/logo_onap_2017.png">
                	<img onclick="toggleSidebar()" class="float-left" alt="" width="30px" src="resources/images/hlines.png" style="margin-left: 20px;">
                	<!-- <span class="header-text">SDNC Pretest</span> -->
                </a>
                <a href="index.html" class="navbar-brand">
                	<img alt="" src="resources/images/techM.jpg" style="position: absolute; right: 0; width: 200px;height:40px;margin-top : -10px;margin-left:11px;">
<!--                   <div class="brand-text brand-big hidden-lg-down" style="color:#ffffff;"><span>ECOMP </span><strong>PORTAL</strong></div> -->
                </a>
            </div>            
            <!-- /.navbar-header -->
            <!-- Dashboard header notification icon here -->
            <!-- /.navbar-top-links -->
			<div class="row user-sec">
				<aside class="user-info pull-right">
					<div class="dropdown">
					  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Welcome User
					  <span class="caret"></span></button>
					  <ul class="dropdown-menu">
					    <li><a href="#">Logout</a></li>
					  </ul>
					</div>

				</aside>
			</div>
            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <!-- <li class="sidebar-search">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                    <img alt="" src="resources/images/search.png">
                                </button>
                            </span>
                            </div>
                            /input-group
                        </li> -->
                        <li>
                            <a ui-sref="home"><img alt="" src="resources/images/Dashboard.png"> Home</a>
                        </li>
                         <li>
                            <a href=""><img alt="" src="resources/images/DCAE.png"> DCAE<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a ui-sref="dashboard">Training VNF Data</a>
                                </li>
                                <li>
                                    <a ui-sref="importVNFdata">Load VNF Data</a>
                                </li>
                                <li>
                                    <a ui-sref="summary">Action Summary</a>
                                </li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a href=""><img alt="" src="resources/images/SDNC.png"> SDNC<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a ui-sref="presistData">Create/Update Device Configuration</a>
                                </li>
                                <!-- <li>
                                    <a ui-sref="preTest">Run Pre-Test</a>
                                </li> -->
                                <li>
                                    <a ui-sref="versionHistory">Version History</a>
                                </li>
                                <!-- 
                                <li>
                                    <a ui-sref="versionComp">Version Comparision</a>
                                </li> -->
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a ui-sref="eventList"><img alt="" src="resources/images/VES.png"> VES</a>
                        </li>
                        <li>
                            <a href="http://104.130.165.61:9005/"><img alt="" src="resources/images/MSO.png"> MSO</a>
                        </li>
                       <!--  <li>
                            <a href="http://10.10.221.64:8082/eventList"><i class="fa fa-edit fa-fw"></i> VES</a>
                        </li>
                        <li>
                            <a href="http://10.10.223.67:8282/home"><i class="fa fa-edit fa-fw"></i> SDNC</a>
                        </li> -->
                        <li>
                            <a ui-sref="aandai" ><img alt="" src="resources/images/A&AI.png"> A&AI</a>
                        </li>
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>
        <div id="page-wrapper">
            <div ui-view></div>
        </div> 
        <!-- footer code -->
	        <footer class="footer">
		      <div class="container">
		        <span>&copy; Tech Mahindra - 2017</span>
		      </div>
		    </footer> 
	    <!-- footer code -->  
    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="resources/vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="resources/vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="resources/vendor/metisMenu/metisMenu.min.js"></script>

    <!-- Morris Charts JavaScript -->
<!--     <script src="./vendor/raphael/raphael.min.js"></script> -->
<!--     <script src="./vendor/morrisjs/morris.min.js"></script> -->
<!--     <script src="./data/morris-data.js"></script> -->

    <!-- Custom Theme JavaScript -->
    <script src="resources/dist/js/sb-admin-2.js"></script>
    
    <script>
		 var customer_ids = [];
			var demonstration_ids = [];
			// GLOBAL array of customer ids.
			var cust_subscriptions_ids = []; // // different structure than sigmajs array. This change in structure will be useful when more than one customers are there. 
			var subscriptions_ids = [];
			var inst_cust_subs_ids = [];
			var response = {}; // GLOBAL variable to store the response of API calls. 
			
		</script>
		<script>
		function toggleSidebar()
		{		   
			if($('.sidebar').css('display') == 'none') {
				$('.sidebar').show();
				$('#page-wrapper').css('margin-left', '250px');
			} else {
				$('.sidebar').hide();
				$('#page-wrapper').css('margin-left', '0');
			}					   
		}
		</script>
		


</body>

</html>
