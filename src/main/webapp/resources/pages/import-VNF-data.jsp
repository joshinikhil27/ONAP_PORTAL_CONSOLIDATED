
<div>
	<div class="row page-breadcrumb">
		<div class="col-lg-12">
			<span>DCAE > <strong>Load VNF Data</strong></span>
		</div>
		<!-- /.col-lg-12 -->
	</div>
	<!-- /.row -->
	<div class="row margin-top-20">
		<div class="col-lg-12 page-table">
			<div class="panel panel-default">
				<div class="col-md-12 section-header margin-bottom-20">
					<img alt="" src="resources/images/tableicon.png"> <span>Load
						VNF Data</span>
					<div class="pull-right ml-page-search-button" >
						<button class="btn btn-primary" ng-click="importVNFdata()" ng-disabled="showImportVNF">Load VNF Data</button>
						<button class="btn btn-primary" ng-click="RunML()" ng-disabled="showRunML">Run ML
							Prediction Algorithm</button>
					</div>
					<!-- /.panel-heading -->
					<div class="panel-body">
						<non-editable-grid griddata="tabledata"></non-editable-grid>
						<div class="loading" ng-show="showLoading"></div>
						<div class="col-md-12 text-center" ng-if="tabledata == ''">No Record Found</div>
					</div>
					<!-- /.panel-body -->
				</div>
				<!-- /.panel -->

				<!-- /.panel .chat-panel -->
			</div>
		</div>
		<!-- /.row -->
	</div>
