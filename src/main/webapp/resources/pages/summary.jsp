
<div> 
<div class="row page-breadcrumb">
      <div class="col-lg-12">
          <span>DCAE > <strong>Action Summary</strong></span>
      </div>
      <!-- /.col-lg-12 -->
  </div> 

            <div class="row margin-top-20">
                <div class="col-lg-12 page-table">
                    <div class="panel panel-default">
			    <div class="col-md-12 section-header margin-bottom-20">
                    <img alt="" src="resources/images/ActionSummary_icon.png"> <span>Action Summary</span>
                    </div>
                    <div class="col-md-12 margin-bottom-5 text-right actionsummary">
                    <img alt="" src="resources/images/email.png">
                    <img alt="" src="resources/images/Print.png">
                    <img alt="" src="resources/images/Exel.png">
                    </div>
                        <!-- <div class="panel-heading panel1">
                            <span class="pull-left panelheading1"><i class="fa fa-bar-chart-o fa-fw"></i> Data Analysis </span>
                            
                        </div> -->
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                        	<table class="table table-bordered">
								<tr class="bg-primary">
									<th class="gridStyle text-center">VNF Source</th>
									<th class="gridStyle text-center">Date</th>
									<th class="gridStyle text-center">User Id</th>
									<th class="gridStyle text-center">Username</th>
									<th class="gridStyle text-center">Action</th>
								</tr>
							    <tr ng-repeat="summ in summary">
								<td class="gridStyle text-center">{{summ.procesedNode.vnfSource}}</td>
							    	<td class="gridStyle text-center">{{summ.userInfo.date | date:'yyyy-MM-dd HH:mm:ss'}}</td>
							    	<td class="gridStyle text-center">{{summ.userInfo.userid}}</td>
							    	<td class="gridStyle text-center">{{summ.userInfo.username}}</td>
							    	<td class="gridStyle text-center">00{{$index+1}}</td>
							    </tr>
							</table>
							<div class="loading" ng-show="showLoading"></div>
							<div class="col-md-12 text-center" ng-if="summary == ''">No Record Found</div>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                    
                    <!-- /.panel .chat-panel -->
                </div>
            </div>
            <!-- /.row -->
        </div>
