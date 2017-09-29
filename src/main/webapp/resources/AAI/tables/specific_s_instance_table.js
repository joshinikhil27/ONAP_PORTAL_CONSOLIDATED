function specific_s_instance_table(input){
	var tables = document.getElementsByTagName("TABLE");
    for (var i=tables.length-1; i>=0;i-=1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);

    var table = document.createElement("TABLE");
    table.setAttribute("id", "Specific_S_Instance");
    document.body.appendChild(table);

    var Th1 = document.createElement("TH");
    Th1.setAttribute("id", "myTh1");
    Th1.colSpan=2;
    document.getElementById("Specific_S_Instance").appendChild(Th1);

    var col1head = document.createElement("TD");
    col1head.setAttribute("id", "TD1");
    var col1head_text = document.createTextNode("Service-Instance: "+input["service-instance-name"]);
    col1head.appendChild(col1head_text);
    document.getElementById("myTh1").appendChild(col1head);

    var i=0;
    for(var key in input){
    	if(key!="relationship-list"){
    		createRow("Specific_S_Instance",i,[key,input[key]]);
    		i++;
    	}
    }
}