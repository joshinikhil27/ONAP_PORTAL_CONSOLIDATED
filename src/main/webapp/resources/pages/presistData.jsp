
<div class="wrapper"> 
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
                    <strong>Create /Update Device Configuration</strong>
                </div>
                <!-- /.col-lg-12 -->
            </div>
	<br>
		<div class="col-md-12 section-header ves-topic">
			<span>Create /Update Device Configuration</span>
		</div>	
           <!--  <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Persist Data</h1>
                </div>
                /.col-lg-12
            </div> -->
            
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12 presistContainer">
                    <div class="panel panel-default panelBodyBg">
                        <div class="panel-heading bg-primary">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Upload JSON File
                            <div class="pull-right">
                            </div>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                        <!-- upload Window -->
	                       	<div ng-show="!hideUploadMenu" class="col col-lg-6 page-search-button">
	                        	<span>Please select a single file to be uploaded </span><br> <br>
											<form ng-disabled ="uploadSuccessfull" class="file-upload" name="uploadFileForm" method="post"
												enctype="multipart/form-data">
												
   												 <label for="files" class="btn file-upload__label">Choose a File</label>
   												 <input id="files" ng-disabled ="uploadSuccessfull" class="file-upload__input" type="file" name="files[]">
												
												<!-- <input class="btn btn-primary" type="file" id="files" name="files[]" size="50" /> <br /> -->
												<br>
												<br> <input class="btn btn-primary" ng-disabled ="uploadSuccessfull" type="submit" value="Submit"
													ng-click="test(json)" />
											</form>
							</div>
							<!-- text area -->
							<div ng-show="hideUploadMenu" class="col col-lg-6 page-search-button">
	                    	    	<div ng-if="applyConfig" class="form-group">
  										<label for="config">Configuration</label>
 										 <textarea class="form-control" rows="5" id="config">{{configString}}</textarea>
									</div>
									<div ng-if="!applyConfig" class="configModal">
										<input class="btn btn-success marginBottom" ng-click="openModal1()" value="Device Reachability test"/>
										<input class="btn btn-success marginBottom" ng-click="openModal2()" value="Device Health test"/>
										<input class="btn btn-success marginBottom" ng-click="openModal3()" value="Application Test"/>
										<input class="btn btn-success " ng-click="openModal4()" value= "Customer Report"/>
											<div class="modal fade" id="configModal" role="dialog">
										    <div class="modal-dialog modal-sm">
										      <div class="modal-content">
										        	<div class="modal-header">
										       		   <button type="button" class="close" data-dismiss="modal">&times;</button>
										      		    <h4 class="modal-title text-success">Configuration</h4>
										      	 	 </div>
											      	  <div class="modal-body">
											      		  <div style="padding:15px;">
											       		   <p>{{testData}}</p>
											      		  </div>
											       	 </div>
										      </div>
										    </div>
	  										</div> 
									</div>
							</div>
							<!-- text area -->
						<!-- upload Window -->
						<!-- Status Info -->
							<div ng-if="uploadSuccessfull" class="col col-lg-6 page-search-button">
	                        	<div class="col col-lg-6"><img style="width: 68%;height: 68%;" src="{{imageSrc}}"></div>
	                        	<div class="col col-lg-6">
	                        		<p>{{modalLine1}}</p>
         							<p>{{modalLine2}}</p>
         							<button class="btn btn-primary"  ng-repeat="button in nextFunction.buttons" ng-click="button.fn()" data-dismiss="modal" >{{button1}}{{button.fn}}</button>
                     				</div>
	                       	 </div>	
                        <!-- Status Info -->	
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-8 -->
            </div>
            <!-- /.row -->
            <!-- Progress Bar -->
            <hr class="progressBar_Hr">
            <div class="progressBar_Info">Service Test Progress</div>
					 			  
			<div class="checkout-wrap">
			   <ul id="ul" class="checkout-bar">
				    <li id="1" class= " ">
					    <img class="statusImg" id="img_1" src="resources/images/start_01.png">
					    <div id="failedDiv" ng-class="failedFLow?'statusTxtFailed':'statusTxt'" >Start</div>
				    </li>
				    
				    <li id="2" class=" ">
					    <img class="statusImg" id="img_2" src="resources/images/Prepare_config01.png">
					    <div id="failedDiv" ng-class="failedFLow?'statusTxtFailed':'statusTxt'">Prepare Configuration</div>
				    </li>
				    
				    <li id="3" class=" ">
				   		 <img class="statusImg" id="img_3" src="resources/images/Apply_config_01.png">
				   		 <div id="failedDiv" ng-class="failedFLow?'statusTxtFailed':'statusTxt'">Apply Configuartion</div>
				    </li>
				    
				    <li id="4" class="">
					    <img class="statusImg" id="img_4" src="resources/images/Run_test_01.png">
					    <div id="failedDiv" ng-class="failedFLow?'statusTxtFailed':'statusTxt'">Run Test</div>
				    </li>
				    
				    <!-- Success Flow -->
					    <li ng-if="!failedFLow" id="5" class= " ">
						    <img class="statusImg" id="img_5" src="resources/images/Store_config_01.png">
						    <div id="failedDiv" ng-class="failedFLow?'statusTxtFailed':'statusTxt'" >Store Configuration</div>
					    </li>
					    
					    <li ng-if="!failedFLow" id="6" class=" ">
						    <img class="statusImg" id="img_6" src="resources/images/Finish_01.png">
						    <div id="failedDiv" ng-class="failedFLow?'statusTxtFailed':'statusTxt'">Finish</div>
						    <div class="lastElement"></div>
					    </li> 
				    <!-- Success Flow -->
				    
				    <!-- Failure Flow -->
					    <li ng-if="failedFLow" id="7" class= " ">
						    <img class="statusImg" id="img_7" src="resources/images/Retrive_running_01.png">
						    <div id="failedDiv" ng-class="failedFLow?'statusTxtFailed':'statusTxt'" >Retrive Running Configuration</div>
					    </li>
					    
					    <li ng-if="failedFLow" id="8" class=" ">
						    <img class="statusImg" id="img_8" src="resources/images/Restore_config_01.png">
						    <div id="failedDiv" ng-class="failedFLow?'statusTxtFailed':'statusTxt'">Restore Configuration</div>
					    </li> 
					    
					    <li  ng-if="failedFLow" id="9" class=" ">
						    <img class="statusImg" id="img_9" src="resources/images/Finish_01.png">
						    <div id="failedDiv" ng-class="failedFLow?'statusTxtFailed':'statusTxt'">Finish</div>
						    <div class="lastElement"></div>
					    </li> 
			  		<!-- Failure Flow -->		       
			  </ul>
			  
			</div>
			 <!-- Progress Bar -->
			 
			<div class="newoverlay" id="ProgressBar" ng-show="loader">
				<img style = "padding: 18% 50%;" src="resources/images/ajax-loader.gif" />
			</div>
        </div>
        <!-- /#page-wrapper -->
