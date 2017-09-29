function INSTclicked(root, node){
	for(var inst in inst_cust_subs_ids){
		if(inst==node.id){
			console.log("inst");
			//if(!(node.children || node._children)){
				onClick_Business("customers/customer/"+inst_cust_subs_ids[inst][0]+"/service-subscriptions/service-subscription/"+inst_cust_subs_ids[inst][1]+"/service-instances/service-instance/"+inst);
				var new_response_json=response;	
				var check=0;
				for(var key in new_response_json){
					if(key=="relationship-list"){
						for(var i=0;i<new_response_json[key]["relationship"].length;i++){
							if(new_response_json[key]["relationship"][i]["related-to"]=="generic-vnf"){
								check=1;
								break;
							}
						}
					}
				}
				if(check==1){
					specific_instance_graph(node, new_response_json);
					specific_s_instance_table(new_response_json);
				}
			//}
			return 1;
		}
	}
	return 0;
}