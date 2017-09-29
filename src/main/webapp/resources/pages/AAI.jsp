 
<script>
    var Cust= ["Name", "UUID"];
    var Pserver= [""];
    var Pnf= [""];

var changeCat = function changeCat(firstList) {
    var newSel = document.getElementById("obj_search");
    //if you want to remove this default option use newSel.innerHTML=""
    newSel.innerHTML="<option value=\"\">Select</option>"; // to reset the second list everytime
    var opt;

      //test according to the selected value
      switch (firstList.options[firstList.selectedIndex].value) {
          case "Cust":
              for (var i=0; len=Cust.length, i<len; i++) {
                    opt = document.createElement("option");
                    opt.value = Cust[i];
                    opt.text = Cust[i];
                    newSel.appendChild(opt);
              }
              break;
          case "Pserver":
              for (var i=0; len=Pserver.length, i<len; i++) {
                    opt = document.createElement("option");
                    opt.value = Pserver[i];
                    opt.text = Pserver[i];
                    newSel.appendChild(opt);
              }
              break;
          case "Pnf":
              for (var i=0; len=Pnf.length, i<len; i++) {
                    opt = document.createElement("option");
                    opt.value = Pnf[i];
                    opt.text = Pnf[i];
                    newSel.appendChild(opt);
              }
              break;
      }

}

</script>
<div>
	<div class="row">
		<div class="col-lg-12">
			<h1 class="page-header">A&AI</h1>
		</div>
		<!-- /.col-lg-12 -->
	</div>
	<!-- /.row -->
	<div class="row">
		<div class="col-md-3">
			<label>Object type : </label> <select class="form-control"
				name="obj_type" id="obj_type" onchange="changeCat(this);">
				<option selected disabled hidden>Select</option>
				<option value="Cust">Customer</option>
				<option value="Pserver">Pserver</option>
				<option value="Pnf">Pnf</option>
			</select>
		</div>
		<div class="col-md-3">
			<label>Search By : </label> <select class="form-control"
				name="obj_search" id="obj_search">
				<option selected disabled hidden>Select</option>
			</select>
		</div>
		<div class="col-md-3">
			<label>Enter text : </label> <input class="form-control" type="text"
				name="txtsearch" value=""></input>
		</div>
	</div>
	<!-- /.row -->
</div>
