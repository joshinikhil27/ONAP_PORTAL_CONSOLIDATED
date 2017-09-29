function CSTMRclicked(root,node){
	for(var i=0;i<customer_ids.length;i++){
		if(node.id==customer_ids[i]){
		  //if(!(node.children || node._children)){	
			  onClick_Business("customers/customer/"+node.id);
			  var new_response_json=response;
			  var check=0;
			  for(var key in new_response_json){
			  	if(key=="service-subscriptions"){
					check=1;
				}
			  }
			  if(check==1){	
				cust_subscriptions_ids[node.id]=[];
			  	for(var i=0;i<new_response_json["service-subscriptions"]["service-subscription"].length;i++){
			  		cust_subscriptions_ids[node.id].push(new_response_json["service-subscriptions"]["service-subscription"][i]["service-type"]);
			  	}
			  	specific_customer_graph(node, new_response_json);
				specific_customer_table(new_response_json);
		  	  }
		  //}
		  return 1;
	       }   
	}
  	return 0;	
}