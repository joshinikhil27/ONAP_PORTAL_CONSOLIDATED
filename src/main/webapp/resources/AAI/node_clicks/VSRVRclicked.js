function VSRVRclicked(root, node){
	
	console.log("pserver");
	
					var new_response_json= {  
   "pservers":{  
      "pserver":[  
         {  
            "pserver-id":"144dec23e-0a2c-4780-b7fc-7aa05be11e8f",
            "pserver-name":"DC1-SVR009 (Pserver)",
         }
      ]
   }
}; 
  
              var check=0;
					for(var key in new_response_json){
						if(key=="pservers"){
							check=1;
						}
					}
					if(check==1){
						for(var i=0;i<(new_response_json["pservers"]["pserver"]).length;i++){
							vf_ids.push[(new_response_json["pservers"]["pserver"][i]["pserver-name"])]
						}	
						pserver_graph(node, new_response_json);
						pserver_table(new_response_json);
						    //specific_subscription_table(new_response_json);
					}
				//}
				return 1;
				
				
			}

	

