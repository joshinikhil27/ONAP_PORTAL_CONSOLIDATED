function customers_table(input){

    var tables = document.getElementsByTagName("TABLE");
    for (var i=tables.length-1; i>=0;i-=1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);
	
    var table = document.createElement("TABLE");
    table.setAttribute("id", "Customers");
    document.body.appendChild(table);

    var Th1 = document.createElement("TH");
    Th1.setAttribute("id", "myTh1");
    document.getElementById("Customers").appendChild(Th1);

    var Th2 = document.createElement("TH");
    Th2.setAttribute("id", "myTh2");
    document.getElementById("Customers").appendChild(Th2);

    var Th3 = document.createElement("TH");
    Th3.setAttribute("id", "myTh3");
    document.getElementById("Customers").appendChild(Th3);

    var col1head = document.createElement("TD");
    col1head.setAttribute("id", "TD1");
    var col1head_text = document.createTextNode("Global ID");
    col1head.appendChild(col1head_text);
    document.getElementById("myTh1").appendChild(col1head);

    var col2head = document.createElement("TD");
    col2head.setAttribute("id", "TD1");
    var col2head_text = document.createTextNode("Subscriber Name");
    col2head.appendChild(col2head_text);
    document.getElementById("myTh2").appendChild(col2head);

    var col3head = document.createElement("TD");
    col3head.setAttribute("id", "TD1");
    var col3head_text = document.createTextNode("Subscriber Type");
    col3head.appendChild(col3head_text);
    document.getElementById("myTh3").appendChild(col3head);

    for(var i = 0; i < input["customer"].length; i++){
    	var row = document.createElement("TR");
    	row.setAttribute("id", i);
   		document.getElementById("Customers").appendChild(row);

   		var col1 = document.createElement("TD");
	    var col1_data = document.createTextNode(input["customer"][i]["global-customer-id"]);
	    col1.appendChild(col1_data);
	    document.getElementById(i).appendChild(col1);

	    var col2 = document.createElement("TD");
	    var col2_data = document.createTextNode(input["customer"][i]["subscriber-name"]);
	    col2.appendChild(col2_data);
	    document.getElementById(i).appendChild(col2);
		
	    var col3 = document.createElement("TD");
	    var col3_data = document.createTextNode(input["customer"][i]["subscriber-type"]);
	    col3.appendChild(col3_data);
	    document.getElementById(i).appendChild(col3);
    }
}
