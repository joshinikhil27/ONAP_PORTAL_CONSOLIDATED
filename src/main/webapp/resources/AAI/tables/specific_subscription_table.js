function specific_subscription_table(input){

	var tables = document.getElementsByTagName("TABLE");
    for (var i=tables.length-1; i>=0;i-=1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);

    var table = document.createElement("TABLE");
    table.setAttribute("id", "Specific_Subscription");
    document.getElementById("newCust").appendChild(table);

    var Th1 = document.createElement("TH");
    Th1.setAttribute("id", "myTh1");
    Th1.colSpan=2;
    document.getElementById("Specific_Subscription").appendChild(Th1);

    var col1head = document.createElement("TD");
    col1head.setAttribute("id", "TD1");
    var col1head_text = document.createTextNode("Service-Type: "+input["service-type"]);
    col1head.appendChild(col1head_text);
    document.getElementById("myTh1").appendChild(col1head);

    createRow("Specific_Subscription",0,["resource-version",input["resource-version"]]);
    var check = 0;
	for(var keys in input){
		if(keys=="service-instances"){
			check=1;
			break;
		}
	}
	if(check==1){
    	createRow("Specific_Subscription",1,["#service-instances",input["service-instances"]["service-instance"].length]);
		createRow("Specific_Subscription",2,["Service Instances"]);
		for(var i=0;i<input["service-instances"]["service-instance"].length;i++){
			createRow("Specific_Subscription",i+3,[input["service-instances"]["service-instance"][i]["service-instance-name"],input["service-instances"]["service-instance"][i]["service-instance-id"]]);
		}
	}



}