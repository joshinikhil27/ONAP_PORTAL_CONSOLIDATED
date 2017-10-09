<style>
.node {
    cursor: pointer;
  }

  .overlay{
      background-color:#EEE;
  }
   
  .node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 1.5px;
  }
   
  .node text {
    font-size:10px; 
    font-family:sans-serif;
  }
   
  .link {
    fill: none;
    stroke: #000;
    stroke-width: 0.8px;
  }

  .templink {
    fill: none;
    stroke: red;
    stroke-width: 3px;
  }

  .ghostCircle.show{
      display:block;
  }

  .ghostCircle, .activeDrag .ghostCircle{
       display: none;
  }
  
div.container {
    width: 50%;
    height:50%
    border: 1px solid gray;
}
#newCust #Customers{
    border: 1px solid #ddd;
    width: 80%;
    max-width: 80%;
    margin-bottom: 20px;
    margin-left:100px;
    font-size: 12px;
}

#newCust #Specific_S_Instance{
    border: 1px solid #ddd;
    width: 80%;
    max-width: 80%;
    margin-bottom: 20px;
    margin-left:100px;
    font-size: 12px;
}
#newCust #Specific_Customer{
    border: 1px solid #ddd;
    width: 80%;
    max-width: 80%;
    margin-bottom: 20px;
    margin-left:100px;
    font-size: 12px;
	
}
#newCust #Specific_Generic_vnf{
    border: 1px solid #ddd;
    width: 80%;
    max-width: 80%;
    margin-bottom: 20px;
    margin-left:100px;
    font-size: 12px;
	
}
#newCust #Specific_Subscription{
    border: 1px solid #ddd;
    width: 80%;
    max-width: 80%;
    margin-bottom: 20px;
    margin-left:100px;
    font-size: 12px;
	
}
#newCust #Specific_vf_module{
    border: 1px solid #ddd;
    width: 80%;
    max-width: 80%;
    margin-bottom: 20px;
    margin-left:100px;
    font-size: 12px;
	
}
</style>
<div>
<div class="row page-breadcrumb">
                <div class="col-lg-12">
                    <span>A&AI</span>
                </div>
                <!-- /.col-lg-12 -->
            </div>
	<div class="row">
		<div class="col-lg-12 section-header margin-top-20">
			<span>A & AI</span>
		</div>
	</div>
	<div class="row main-aai">
		<div class="col-md-2 selectdiv">
			<!-- <label>Object type : </label> --> 
			<select name="obj_type" id="obj_type" class="form-control" onchange="changeCat(this)">
				<option selected>Object Type</option>
				<option value="Cust">Customer</option>
				<option value="Pserver" disabled>Pserver</option>
				<option value="Pnf" disabled>Pnf</option>
			</select>
		</div>
		<div class="col-md-2 selectdiv">
			<!-- <label>Search By : </label>  -->
			<select class="form-control"
				name="obj_search" id="obj_search">
				<option selected>Search By</option>
			</select>
		</div>
		<div class="col-md-7 aai-search padding-right-zero pull-right text-right">
		<form class="form-inline">
			<div class="page-search-button">
			<label>Enter text</label> 
			<input class="form-control" type="text"
				name="txtsearch" value=""></input>
				<button type="button" class="btn btn-primary" onclick="getCustomers()" target="graph"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
			</div>	
		</form>			
			
		</div>
		<!-- <div class="col-md-1 padding-zero page-search-button text-right pull-right">
		<button type="button" class="btn btn-primary" onclick="getCustomers()" target="graph"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
		</div> -->
		<!-- <div class="col-md-3">
			<a href="" class="btn btn-primary" onclick="getCustomers()" target="graph">FIND</a>
		</div> 
		class="col-md-12"-->
	</div>
	<div class="clearfix"></div>
		<div class="row">
			<div id="tree-container" ></div>
		</div>
		
		
	<div class="row aai-greport" id="aai-greport" style="display: none;">
		<div class="col-md-3 padding-zero" id="greport-container" style="display: none;">
			<img class="aai-greport-image" alt="" src="resources/images/Title_bg.png">
			<div class="aai-greport-text">Generated Report</div>
		</div>		
		<div class="col-md-5 padding-zero" id="newCust">
			<div class="report-line" id="report-line" style="display: none;"></div>
		</div>			
	</div>
	
	
	
</div> 



<!-- <p style="float: left; margin: 10px 20px; border-spacing: 10px; color: #337ab7; text-decoration: underline">Object
	Search</p>
<br></br>


<p style="float: left; color: #337ab7; margin: 10px 5px">Object type</p>
<select name="obj_type" id="obj_type" onchange="changeCat(this)"
	style="float: left; margin: 10px 0px; width: 10%; border-spacing: 5px; border-radius: 4px;">
	<option selected disabled hidden>Select</option>
	<option value="Cust">Customer</option>
	<option value="Pserver">Pserver</option>
	<option value="Pnf">Pnf</option>
</select>


<p style="float: left; color: #337ab7; margin: 10px 5px 10px 40px">Search
	By</p>
<select name="obj_search" id="obj_search"
	style="width: 10%; float: left; margin: 10px 0px; border-radius: 4px;">
	<option selected disabled hidden>Select</option>
</select>
<input type="text" name="txtsearch" value=""
	style="float: left; border-radius: 4px; margin: 10px 30px 10px 40px; text-align: center"></input> -->


 





</div>
