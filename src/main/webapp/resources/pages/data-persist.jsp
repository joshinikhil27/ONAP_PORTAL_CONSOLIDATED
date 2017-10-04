 

<style>
.panel {
	margin-bottom: 20px;
	margin-top: 20px;
}
/****************************
*      Background Colors        *
****************************/
.bk-primary {
	background: #325d88;
	color: white;
}

.bk-success {
	background: #93c54b;
	color: white;
}

.bk-warning {
	background: #f47c3c;
	color: white;
}

.bk-danger {
	background: #d9534f;
	color: white;
}

.bk-info {
	background: #29abe0;
	color: white;
}

.bk-amber {
	background: #FFC200;
	color: white;
}

.bk-white, .bk-light {
	background: #fff;
	color: white;
}

.bk-brand {
	background: #37a6c4;
	color: white;
}

.bk-dark {
	background: #222;
	color: white;
}

.bk-blue {
	background: #0010ce;
	color: white;
}

div.tooltip {
	position: absolute;
	text-align: center;
	padding: 8px;
	font: 12px sans-serif;
	background: #222; /* rgba(255,255,255,1); */
	border: 1px solid #ddd;
	border-radius: 8px;
	pointer-events: none;
	color: #ffffff;
}

/* .alert {
	margin-bottom: 0px;
} */
</style>
<div>
<div class="row page-breadcrumb">
      <div class="col-lg-12">
          <span>DCAE > <strong>ML Trainer</strong></span>
      </div>
      <!-- /.col-lg-12 -->
  </div>
  <div class="row">
  	<div class="col-md-6 section-header margin-top-20 margin-bottom-20">
			<span>ML Trainer</span>
		</div>
		<div class="alert alert-info col-md-6 margin-top-20 margin-bottom-20">
			Algorithm : <b>KNN</b> <br>
			Accuracy : Training Algorithms Accuracy is <b>{{accuracy}} %</b>
		</div>
  </div>
	<div class="row">
		<div class="col-lg-9">
			<div class="col-md-4"  ng-repeat="(value,key) in statusCount"
				ng-if="value == 'fail' || value == 'pass' || value =='slow'"> 
				<a href="" ng-click="getCount(key,value)">
					<div class="panel panel-default">
						<div class="ml-image"><img alt="" src="resources/images/{{value}}.png"></div>
						<div class="panel-body text-light">
							<div class="stat-panel text-right">
								<div class="stat-panel-number h1 mlkey {{colorCode[value]}} ">{{key}} </div>
								<div class="stat-panel-title text-uppercase {{colorCode[value]}}">{{(value == 'fail') ? 'predicted failures' : (value == 'slow')? 'predicted congestion' : 'No service impact' }}</div>
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
		<div class="col-lg-3 padding-zero" >
			<div class="col-md-12" ng-show="subBlock"> 
				<a href="" >
					<div class="panel panel-default">
						<div class="panel-body {{colorCode[value]}} text-light">
							<div class="stat-panel">
								<div class="col-md-8 subblock-text">
									<p ng-repeat="(value,key) in subTitleBlock">{{value}}</p></p>
								</div>
								<div class="col-md-4 subblock-border-left">
									<p ng-repeat="(value,key) in subTitleBlock">{{statusCount[key]}}</p>
								</div> 
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
					
	</div>
	<!-- /.row -->

	<div class="col-lg-12 page-table">
		<div class="panel panel-default">
			<div class="col-md-12 section-header">
			<span>VNF Telemetry Data</span>
		</div>
			<!-- /.panel-heading -->
			<div class="panel-body">
				<graph-table tabledata="tabledata" header="header" styleclass="temp"
					callfun="getdata(type,calltype)"></graph-table>
					<div class="loading" ng-show="showLoading"></div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 page-graph">
			<div class="panel panel-default">
				<div class="panel-heading panel1">
					<span class="pull-left panelheading1"><i
						class="fa fa-bar-chart-o fa-fw"></i> Graph</span>
					<div class="pull-right" style="margin-left: 15px;">
						<div class="form-group">
							<select class="form-control" ng-model="opttype.selected"
								ng-change="getdata()">
								<option>All</option>
								<option value="Today">Today</option>
								<option value="LW">Last Week</option>
								<option Value="LM">Last Month</option>
							</select>
						</div>
					</div>
					<div class="pull-right">
						<div class="form-group">
							<select class="form-control" ng-model="charttype.selected"
								ng-change="getdata()">
								<option value="Line">Line Chart</option>
								<option value="Dotted">Dotted Chart</option>
							</select>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
				<!-- /.panel-heading -->
				<div class="panel-body">
					<div class="col-lg-4">
						<div class="panel panel-info">
							<div class="panel-heading panel1">
								<span class="pull-left panelheading1">CPU Analysis </span>
								<div class="clearfix"></div>
							</div>
							<!-- /.panel-heading -->
							<div class="panel-body">
								<div id="graph0"></div>
							</div>
							<!-- /.panel-body -->
						</div>
					</div>
					<div class="col-lg-4">
						<div class="panel panel-info">
							<div class="panel-heading panel1">
								<span class="pull-left panelheading1">Memory Analysis </span>
								<div class="clearfix"></div>
							</div>
							<div class="panel-body">
								<div id="graph1"></div>
							</div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="panel panel-info">
							<div class="panel-heading panel1">
								<span class="pull-left panelheading1">Network Analysis </span>
								<div class="clearfix"></div>
							</div>
							<div class="panel-body">
								<div id="graph2"></div>
							</div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="panel panel-info">
							<div class="panel-heading panel1">
								<span class="pull-left panelheading1">Disk Analysis </span>
								<div class="clearfix"></div>
							</div>
							<div class="panel-body">
								<div id="graph3"></div>
							</div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="panel panel-info">
							<div class="panel-heading panel1">
								<span class="pull-left panelheading1">Number Of Users Analysis </span>
								<div class="clearfix"></div>
							</div>
							<div class="panel-body">
								<div id="graph4"></div>
							</div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="panel panel-info">
							<div class="panel-heading panel1">
								<span class="pull-left panelheading1">Number Of Connections
									Analysis </span>
								<div class="clearfix"></div>
							</div>
							<div class="panel-body">
								<div id="graph5"></div>
							</div>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="panel panel-info">
							<div class="panel-heading panel1">
								<span class="pull-left panelheading1">Flaps Analysis </span>
								<div class="clearfix"></div>
							</div>
							<div class="panel-body">
								<div id="graph6"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /.row -->
</div>
<modal-popup modaldata="tabledata1" btnclick="restartNetwork()"></modal-popup>
<div class="modal fade" id="myModal1" role="dialog">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-body">
				<div class="loadingModal"></div>
			</div>
		</div>
	</div>
</div>
