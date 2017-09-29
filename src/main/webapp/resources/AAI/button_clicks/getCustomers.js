function getCustomers(){
     
    var s1 = document.getElementsByName("txtsearch")[0].value;
	
	if( s1.length > 0 )
		{
	    
		 onClick_Business("customers/customer/"+s1);	
		 	var response_json=response;	
			customer_data = [];
			for(var i=0;i<=1;i++){
    			customer_data.push(response_json["global-customer-id"]+"(customers)");
					console.log(customer_data);	
				}
	  			
		     var check=0;
			  for(var key in response_json){
			  	if(key=="service-subscriptions"){
					check=1;
				}
			  }
			  if(check==1){	
				subscriptions_ids[s1]=[];
			  	for(var i=0;i<response_json["service-subscriptions"]["service-subscription"].length;i++){
			  		subscriptions_ids[s1].push(response_json["service-subscriptions"]["service-subscription"][i]["service-type"]);
			  	}
			var return_graph = customer_graph(response_json);
			specific_customer_table(response_json);
			updateGraph(return_graph);
						
		
		        } 
		}
	else{
			
			onClick_Business("customers");
		 	var response_json=response;
			var check=0;
			for(var key in response_json){
				check=1;// customers are present
	        }
			if(check==1){
				customer_ids=[];
				for(var i=0;i<response_json["customer"].length;i++){
					customer_ids.push(response_json["customer"][i]["global-customer-id"]); 
					console.log(customer_ids);				
				}
				var return_graph=root_customer_graph(response_json);
				customers_table(response_json);
				updateGraph(return_graph);
			}
	    }
	
	}
