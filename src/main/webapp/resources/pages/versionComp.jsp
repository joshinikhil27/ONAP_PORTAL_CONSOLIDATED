
<div>
	<div class="row">
		<div class="col-lg-12">
			<h1 class="page-header">Version Comparision</h1>
		</div>
		<!-- /.col-lg-12 -->
	</div>

	<!-- /.row -->
	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default panelBodyBg">
				<div class="panel-heading bg-primary">
					<i class="fa fa-bar-chart-o fa-fw"></i> Version Comparison Result
					<div class="pull-right"></div>
				</div>
				<!-- /.panel-heading -->
				<div class="panel-body">
					<div style="padding:0% 40%;" ng-show="routerFlag" >
						
							<h4>Router Name</h4>
						
						<ul ng-repeat="dt in data.routerList">
							<li><a data-toggle="tab" href=""
								ng-click="getVersions(dt)">{{dt}}</a></li>
						</ul>
						
					</div>
					<div ng-hide="routerFlag">
					<p><a href="" ng-click ="routerFlag=!routerFLag">Back</a></p>
					<br>
					<div class="col-md-4 colBg">
						<label class="text-primary" style="font-size: 17px;margin-bottom:8px;margin-left: 99px;margin-top: 9px;">Attributes</label>
						<div ng-repeat="(index1 , data) in version1">
							<div ng-repeat="(key,value) in data">
								<div ng-if="key == 'date'">
									<hr ng-if="index1==1" class="hr5Black">
									<hr ng-if="index1!=1" class="hr1Gray">
								</div>
								<p>
								<span class="text-primary" ng-if="value == 'Parent'">{{key}}
									- Parent</span> <span class="text-success" style="margin-left: 40px;"
									ng-if="value == 'Child1' || value == 'Child2'">{{key}} -
									Child</span> <span ng-if="value"><span
									style="margin-left: 40px;"
									ng-if="value != 'true' && value != 'Parent' && value != 'Child' && value != 'Child1' && value != 'Child2' && value != 'Child3'">{{key}}</span></span>
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-4 colBg">
						<label class="text-primary" style="font-size: 17px;margin-bottom:8px;margin-left: 99px;margin-top: 9px;">Version</label>
						<div ng-repeat="(index1,data) in version2">
							<div ng-repeat="(key,value) in data track by $index">
								<div ng-if="key == 'date'">
									<hr ng-if="index1==1" class="hr5Black">
									<hr ng-if="index1!=1" class="hr1Gray">
								</div>
								<p>
								<span style="margin-left: 50px;"
									ng-if="value === 'Parent' || value === 'Child1' || value === 'Child2' || value === 'Child3'">--</span>
								<span ng-if="value"><span style="margin-left: 50px;"
									ng-if="value != 'true' && value != 'Parent' && value != 'Child1' && value != 'Child2' && value != 'Child3'">{{value}}</span></span>
								</p>
							</div>
						</div>
					</div>

					<div class="col-md-4 colBg">
						<label class="text-primary" style="font-size: 17px; margin-bottom:8px ; margin-left: 99px; margin-top: 9px;">Version</label>
						<div ng-repeat="(index1,data) in version1">
							<div  ng-repeat="(key,value) in data">
								<div ng-if="key == 'date'">
									<hr ng-if="index1==1" class="hr5Black">
									<hr ng-if="index1!=1" class="hr1Gray">
								</div>
								<p ng-class="data.same ? 'bg-danger' :' '">
								<span style="margin-left: 50px;"
									ng-if="value === 'Parent' || value === 'Child1' || value === 'Child2' || value === 'Child3'">--</span>
								<span  ng-if="value"><span style="margin-left: 50px;"
									ng-if="value != 'true' && value != 'Parent' && value != 'Child1' && value != 'Child2' && value != 'Child3'">{{value}}</span></span>
								</p>
							</div>
						</div>
					</div>
					</div>
				</div>
				<!-- /.panel-body -->
			</div>
			<!-- /.panel -->
		</div>
		<!-- /.col-lg-8 -->
	</div>
	<!-- /.row -->
</div>
<!-- /#page-wrapper -->
