function specific_customer_table(input){

    var tables = document.getElementsByTagName("TABLE");
    for (var i=tables.length-1; i>=0;i-=1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);
	
    var table = document.createElement("TABLE");
    table.setAttribute("id", "Specific_Customer");
    document.getElementById("newCust").appendChild(table);

    var Th1 = document.createElement("TH");
    Th1.setAttribute("id", "myTh1");
    Th1.colSpan=2;
    document.getElementById("Specific_Customer").appendChild(Th1);

    var col1head = document.createElement("TD");
    col1head.setAttribute("id", "TD1");
    var col1head_text = document.createTextNode("Customer : "+input["subscriber-name"]);
    col1head.appendChild(col1head_text);
    document.getElementById("myTh1").appendChild(col1head);
    var i=0;
    for(var key in input){
     
    	if(key!="service-subscriptions"){	    
			var row = document.createElement("TR");
		    	    row.setAttribute("id", i);
		   	    document.getElementById("Specific_Customer").appendChild(row);    	
			var col1 = document.createElement("TD");
			    var col1_data = document.createTextNode(key);
			    col1.appendChild(col1_data);
			    document.getElementById(i).appendChild(col1);

			var col2 = document.createElement("TD");
			    var col2_data = document.createTextNode(input[key]);
			    col2.appendChild(col2_data);
			    document.getElementById(i).appendChild(col2);
       }else{
	        var row = document.createElement("TR");
	    	    row.setAttribute("id", i);
	   	    	document.getElementById("Specific_Customer").appendChild(row); 
			var countofsubscriptions=input[key]["service-subscription"].length;
			var col1 = document.createElement("TD");
			    var col1_data = document.createTextNode("#subscriptions");
			    col1.appendChild(col1_data);
			    document.getElementById(i).appendChild(col1);  
			var col2 = document.createElement("TD");
			    var col2_data = document.createTextNode(countofsubscriptions);
			    col2.appendChild(col2_data);
			    document.getElementById(i).appendChild(col2);	
			i++;
			var row = document.createElement("TR");
		    	row.setAttribute("id", i);
		   	    document.getElementById("Specific_Customer").appendChild(row); 
			var col1 = document.createElement("TD");
			    // col1.setAttribute("font-weight","bold");	
			    var col1_data = document.createTextNode("Service-Type");
			    col1.appendChild(col1_data);
			    document.getElementById(i).appendChild(col1);  
			var col2 = document.createElement("TD");
			    // col2.setAttribute("font-weight","bold");
			    var col2_data = document.createTextNode("#instances");
			    col2.appendChild(col2_data);
			    document.getElementById(i).appendChild(col2);	
			i++;		
			for(var j=0;j<countofsubscriptions;j++){
				var row = document.createElement("TR");
			    	    row.setAttribute("id", i);
			   	    document.getElementById("Specific_Customer").appendChild(row); 
				var col1 = document.createElement("TD");
				    var col1_data = document.createTextNode(input[key]["service-subscription"][j]["service-type"]);
				    col1.appendChild(col1_data);
				    document.getElementById(i).appendChild(col1); 
				var check=0;
				for(var k in input[key]["service-subscription"][j]){
					if(k=="service-instances"){
						check=1;
						break;
					}
				}

				var col2 = document.createElement("TD");
				    if(check==1){
				   	 var col2_data = document.createTextNode(input[key]["service-subscription"][j]["service-instances"]["service-instance"].length);
				    }else var col2_data = document.createTextNode(0);
				    col2.appendChild(col2_data);
				    document.getElementById(i).appendChild(col2);	
					
				
				i++;	
		
			}
       }
	
		i++;	    
    }
}
