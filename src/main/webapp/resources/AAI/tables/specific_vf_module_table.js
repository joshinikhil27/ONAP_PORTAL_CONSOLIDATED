function specific_vf_module_table(input) {
	var tables = document.getElementsByTagName("TABLE");
	for (var i=tables.length-1; i>=0;i-=1)
  		if (tables[i]) tables[i].parentNode.removeChild(tables[i]);

  	var table = document.createElement("TABLE");
    table.setAttribute("id", "Specific_vf_module");
    document.body.appendChild(table);

	var Th = document.createElement("TH");
    Th.setAttribute("id", "myTh");
    Th.colSpan = 2;
    document.getElementById("Specific_vf_module").appendChild(Th);

    var heading = document.createElement("TD");
    heading.setAttribute("id", "TDH");
    var heading_text = document.createTextNode("Vf-module : " + input["vf-module-name"]);
    heading.appendChild(heading_text);
    document.getElementById("myTh").appendChild(heading);

    var count = 0;
    for(var key in input){
    	if(key != "vf-module-name"){
	    	var y = document.createElement("TR");
	    	y.setAttribute("id", count);
	   		document.getElementById("Specific_vf_module").appendChild(y);

	   		var key_value = document.createElement("TD");
		    var key_data = document.createTextNode(key);
		    key_value.appendChild(key_data);
		    document.getElementById(count).appendChild(key_value);

		    var value_value = document.createElement("TD");
		    var value_data = document.createTextNode(input[key]);
		    value_value.appendChild(value_data);
		    document.getElementById(count).appendChild(value_value);
		}
	    count++;
    }	
}