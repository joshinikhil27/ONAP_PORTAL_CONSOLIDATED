<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<div class="pannel pannel-default">
     <header>
			<div class="">
			  <div class="col-md-3">
				<div class="techmlogo"></div>
			  </div>
			  <div class="col-md-9"></div>		  
			  <div class="clearfix"></div>
			</div>
		</header>
			<div class="row page-breadcrumb">
                <div class="col-lg-12">
                    <span>SDNC ></span>
                    <strong>Version History</strong>
                </div>
                <!-- /.col-lg-12 -->
            </div>
<div class="versionHistoryBody">
		<div class="col-lg-12 section-header padding-zero ves-topic">
			<span>Version History</span>
		</div>
		<!-- /.col-lg-12 -->
	

	<!-- /.row -->
	<div class="row padding-zero">
	
		
		<br></br>
		<div class="col-lg-12 padding-zero">
		<div class="col-md-12 page-table padding-zero">
			<div class="panel panel-default">
				
				<!-- /.panel-heading -->
				<div class="panel-body">
				
					<div class="versionHistoryContainer" ng-show="routerFlag">
						<div class="infoBox">
						<div class="infoBox-heading">
							<span>Instructions</span>
						</div>
						<div class="info-body page-search-button">
							<span class="infoSpan">Please click on the below button to view the Version History.	</span>
							
							<ul class="infoButton" ng-repeat="dt in data.routerList">
								<li class="btn btn-primary "><a data-toggle="tab" href=""
									ng-click="getVersionHistory(dt)"><img src="resources/images/router_icon.png"><span class="text-white">{{dt}}</span></a></li>
							</ul>
						</div>
						</div>
					</div>

					<div class="col-md-12 page-table" ng-hide="routerFlag">

						
							
						<!-- 	<ul ><li>{{sample1[0].version_id}}</li></ul> -->
						<div class="table-responsive  page-search-button" >
						<table class="table table-bordered table-sm"> 
						<thead class="bg-primary">	
						<tr>
							<th class="text-center">S.No</th>
							<th class="text-center">ID</th>
							<th class="text-center">Date</th>
							<th class="text-center">Vendor</th>
							<th class="text-center">Model</th>
							<th class="text-center">Action</th>
						</tr>
						</thead>
						 <tr ng-repeat="version in sample1 | unique:'version_id'" >	
						 	<td>{{$index+ 1}}</td>				 
						 	<td>
						 		<a data-toggle="tab" href="" ng-click="getVersionInfo(version.version_id)">{{version.version_id}}</a>
							</td>
							<td>{{ version.date | date : "short" }}</td>	
							<td>Cisco</td>	
							<td>CSR1000v</td>	
							<td><div class="checkbox tableMargin">
  								<label><input type="checkbox" name="select" value="{{version.version_id}}"></label>
                                </div></td>						
						 </tr>						
						</table>
						
						<br> <input class="btn btn-primary pull-right" type="submit" value="Compare Versions"
												ng-click="compareSpecificVersions()" />
						<%-- <ul ng-repeat="version in sample1 | unique:'version_id'">
							<li><a data-toggle="tab" href="" ng-click="getVersionInfo(version.version_id)">{{version.version_id}}
							</a></li>
							<li>{{ version.date | date : "short" }}</li>
							
							<jsp:useBean id="dateValue" class="java.util.Date" />
							<jsp:setProperty name="dateValue" property="time"
								value="${version.date | date : "dd.MM.y"}" />
							<fmt:formatDate value="${dateValue}" pattern="MM/dd/yyyy HH:mm" />
						</ul> --%>

					</div>
				
					<!-- 	<div class="col-md-4 colBg">
						<label class="text-primary" style="font-size: 17px;margin-bottom:8px;margin-left: 99px;margin-top: 9px;">Attributes</label>
						<div ng-repeat="(index1 , data) in temData">
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
						<label class="text-primary" style="font-size: 17px; margin-bottom:8px ; margin-left: 99px; margin-top: 9px;">Latest
							Version</label>
						<div ng-repeat="(index1,data) in temData">
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
					</div> -->

				</div>
				<!-- /.panel-body -->
			</div>
			<!-- /.panel -->
		</div>
		</div>
		<!-- /.col-lg-8 -->
	</div>
	<!-- /.row -->
</div>
<!-- /#page-wrapper -->
</div>
</div>
