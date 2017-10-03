var Cust = [ "Name", "UUID" ];
	var Pserver = [ "" ];
	var Pnf = [ "" ];


	var changeCat = function changeCat(firstList) { //debugger;
		var newSel = document.getElementById("obj_search");
		//if you want to remove this default option use newSel.innerHTML=""
		newSel.innerHTML = "<option value=\"\">Search By</option>"; // to reset the second list everytime
		var opt;

		//test according to the selected value
		switch (firstList.options[firstList.selectedIndex].value) {
		case "Cust":
			for (var i = 0; len = Cust.length, i < len; i++) {
				opt = document.createElement("option");
				opt.value = Cust[i];
				opt.text = Cust[i];
				newSel.appendChild(opt);
			}
			break;
		case "Pserver":
			for (var i = 0; len = Pserver.length, i < len; i++) {
				opt = document.createElement("option");
				opt.value = Pserver[i];
				opt.text = Pserver[i];
				newSel.appendChild(opt);
			}
			break;
		case "Pnf":
			for (var i = 0; len = Pnf.length, i < len; i++) {
				opt = document.createElement("option");
				opt.value = Pnf[i];
				opt.text = Pnf[i];
				newSel.appendChild(opt);
			}
			break;
		}

	}