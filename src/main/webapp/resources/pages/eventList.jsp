
 <div class="wrapper" >
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
                    <span>VES</span>
                </div>
                <!-- /.col-lg-12 -->
            </div>
		
		<br></br>
		<div>
		<div class="col-md-1 padding-zero ves-topic">
		<span>Topic Name:</span>
		</div>		
		<div class="col-md-2 padding-zero page-search-button margin-bottom-20">
			
			<select class="form-control" id="topicList" ng-model="topicList" ng-change="onTopicChange()" >		
			    <option value="unauthenticated.SEC_MEASUREMENT_OUTPUT" >Measurement</option>
			    <option value="unauthenticated.SEC_FAULT_OUTPUT">Fault</option>
			    <option value="unauthenticated.SEC_HEARTBEAT_OUTPUT">HeartBeat</option>
			    <option value="unauthenticated.SEC_STATECHANGE_OUTPUT">StateChange</option>
			    <option value="unauthenticated.SEC_MOBILEFLOW_OUTPUT">MobileFlow</option>
			    <option value="unauthenticated.SEC_OTHER_OUTPUT">Other</option>
			    <option value="unauthenticated.SEC_THRESHOLDCROSSINGALERT_OUTPUT">ThresholdCrossingAlert </option>
			    <option value="unauthenticated.SEC_ROADMTOHP_OUTPUT">Roadmtohp</option>
			    <option value="unauthenticated.SEC_SIPSIGNALING_OUTPUT">SipSignaling</option>
			    <option value="unauthenticated.SEC_VOICEQUALITY_OUTPUT">VocieQuality</option>
			    <option value="unauthenticated.SEC_SYSLOG_OUTPUT">SysLog</option>
			</select>
		</div>
		<div class="col-md-2 padding-zero page-search-button">
		<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
		</div>
		<div class="clearfix"></div>
		<div class="col-md-12 section-header">
			<span>Event List</span>
		</div>		
		<div class="col-md-12 page-table">
		<div class="panel panel-default">
		  <!-- <div class="panel-heading"><label class="text-primary">VNF Telemetry Data</label></div> -->
		  <div class="panel-body">
		  	<div class="table-responsive" ng-if="srcEventList"><!-- ng-if="srcEventList" -->
				<table class="table table-bordered table-sm">	
					<thead class="bg-primary">		
					<tr>
						<th class="text-center"> Event ID </th>
						<th class="text-center"> Time Stamp </th>
						<th class="text-center">  Protocol </th>
						<th class="text-center"> Vendor Name  </th>
						<th class="text-center"> Event Source Name </th>						
						<th class="text-center">Action</th>
					</tr>
					</thead>
					<%-- <c:forEach items="${events}" var="event"> --%>
					<tr  ng-repeat="event in srcevents"> <!-- ng-repeat="event in srcevents" -->
							<td>{{event.eventID}}</td>
							<td>{{event.timeStamp}}</td>
							<td>{{event.protocol}}</td>
							<td>{{event.vendorName}}</td>
							<td>{{event.eventSourceName}}</td>
							<td><!-- data-toggle="modal" data-target="#vesModal" --><a href=""  ng-click="clickVNF(topicList,event.eventID)"><img alt="" src="resources/images/action_icon.png"></a></td>
					</tr>
					<%-- </c:forEach> --%>
				</table>				
				</div>
				<div class="table-responsive" ng-if="!srcEventList"><label class="text-danger">No Record Found!</label></div>
		  </div>
		</div>
		</div>
		<div class="clearfix"></div>
		<div class="row">
			<div class="col-md-12 text-center">
			<img alt="" src="resources/images/VES1.png">				
			</div>
		</div>
		
		
<!-- <script type="text/javascript">
    $(function () {
        $("#ddlFruits").change(function () {
            var selectedText = $(this).find("option:selected").text();
            var selectedValue = $(this).val();
            alert("Selected Text: " + selectedText + " Value: " + selectedValue);
        });
    });
</script> -->
		</div>
		<br></br>
		
		
		</div>
		
<!-- Modal -->
<script id="myModalContent.html" type="text/ng-template">
  
 
   
    
      <!-- Modal content-->
	<div id="vesModal">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" ng-click="cancel()">&times;</button>
          <h4 class="modal-title">View Configuration</h4>
        </div>
        <div class="modal-body">
          <div class="row">
          	<div class="col-md-2"></div>
          	<div class="col-md-8 modal-box">
          		<div class="jsondata">{{vesJson}}</div>
          		<div class="box-header ves-box-header">VES</div>
          	</div>
          	<div class="col-md-2"></div>          	
          </div>
          <div class="row">
          	<div class="col-md-1"></div>
          	<div class="col-md-4 modal-box margin-top-50">
          		<div class="jsondata">{{rawJson}}</div>
          		<div class="box-header vnf-box-header">VNF</div>
          	</div>
          	<div class="col-md-2 modal-arrows">
          		<div class="hr-line"></div>
          		<div class="hr-line-dot"><img alt="" src="resources/images/Dot.png"></div>
          		<div class="hr-line-arrow-right"><img alt="" src="resources/images/arrow_popup01.png"></div>
          		<div class="hr-line-arrow-left"><img alt="" src="resources/images/arrow_popup02.png"></div>
          		<div class="vr-line"></div>
          		<div class="vr-line-dot"><img alt="" src="resources/images/Dot.png"></div>
          		<div class="vr-line-arrow-top-1"><img alt="" src="resources/images/arrow_popup.png"></div>
          		<div class="vr-line-arrow-top-2"><img alt="" src="resources/images/arrow_popup.png"></div>
          	</div>
          	
          	<div class="col-md-4 modal-box margin-top-50">
          		<div><img ng-src="{{imgModel}}" width="200"></div>
          		<div class="box-header ves-box-header">Data Mapping</div>
          	</div>
          	<div class="col-md-1"></div>
          	
          </div>
        </div>
        <div class="modal-footer">          
        </div>
      </div>
       </div>
    
</script>
  		
