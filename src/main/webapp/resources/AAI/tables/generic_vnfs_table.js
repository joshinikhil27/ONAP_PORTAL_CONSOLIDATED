function generic_vnfs_table(input, input2){
      
	var tables = document.getElementsByTagName("TABLE");
	for (var i=tables.length-1; i>=0;i-=1)
  		if (tables[i]) tables[i].parentNode.removeChild(tables[i]);
	
	var table = document.createElement("TABLE");
    table.setAttribute("id", "Generic_vnfs");
    document.getElementById("newCust").appendChild(table);

    var Th1 = document.createElement("TH");
    Th1.setAttribute("id", "myTh1");
    document.getElementById("Generic_vnfs").appendChild(Th1);

    var Th2 = document.createElement("TH");
    Th2.setAttribute("id", "myTh2");
    document.getElementById("Generic_vnfs").appendChild(Th2);

    var Th3 = document.createElement("TH");
    Th3.setAttribute("id", "myTh3");
    document.getElementById("Generic_vnfs").appendChild(Th3);

    var serial = document.createElement("TD");
    serial.setAttribute("id", "TD1");
    var serial_text = document.createTextNode("S.No");
    serial.appendChild(serial_text);
    document.getElementById("myTh1").appendChild(serial);

    var c = document.createElement("TD");
    c.setAttribute("id", "TD1");
    var d = document.createTextNode("Generic VNF Name");
    c.appendChild(d);
    document.getElementById("myTh2").appendChild(c);

    var e = document.createElement("TD");
    e.setAttribute("id", "TD1");
    var f = document.createTextNode("Status");
    e.appendChild(f);
    document.getElementById("myTh3").appendChild(e);

    for(var i = 1; i <= input["generic-vnf"].length; i++){
    	var y = document.createElement("TR");
    	y.setAttribute("id", i);
   		document.getElementById("Generic_vnfs").appendChild(y);

   		var serial_no = document.createElement("TD");
	    var serial_data = document.createTextNode(i);
	    serial_no.appendChild(serial_data);
	    document.getElementById(i).appendChild(serial_no);

	    var vnf_label = document.createElement("TD");
	    var vnf_label_data = document.createTextNode(input["generic-vnf"][i-1]["vnf-name"]);
	    vnf_label.appendChild(vnf_label_data);
	    document.getElementById(i).appendChild(vnf_label);

	    var status = document.createElement("TD");
	    if(input2["nodes"][i-1].color == "#00FF00"){
	    	var status_data = document.createTextNode("active");
	    }else if(input2["nodes"][i-1].color == "#FF0000"){
	    	var status_data = document.createTextNode("deleted");
	    }
	    else {
	    	var status_data = document.createTextNode("neutral");
	    }
	    status.appendChild(status_data);
	    document.getElementById(i).appendChild(status);
    }
}