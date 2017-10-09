function VNFclicked(root, node){
	console.log(node.id);
	console.log("VNF");
	
	if(node.id=="70721575-0437-430d-b378-e8c82b88dd71" || node.id=="0387cdd9-1dcf-425b-91c9-35f4260a6510" || node.id=="ee63f168-63c9-4f1a-bfa7-9ff0bc790c10")
	{
					var new_response_json= {  
   "vf-modules":{  
      "vf-module":[  
         {  
            "vf-module-id":"144dec23e-0a2c-4780-b7fc-7aa05be67e8f",
            "vf-module-name":"NY-FW1-Module1(vf-module)",
            "heat-stack-id":"Audi-NY-Firewall1-Module1/12f720d88-287a-4628-9c7e-2bb5df5ba99c",
            "orchestration-status":"active",
            "is-base-vf-module":"true",
            "resource-version":"11494926560",
            "persona-model-id":"1e73b0766-1d82-4b2b-a18a-26a37e4515f9",
            "persona-model-version":"1"
         },
	
		 {  
            "vf-module-id":"344dec23e-0a2c-4780-b7fc-7aa05be67e8f",
            "vf-module-name":"USETE5MMUNJ0102UJZZ01-vjunos0(vserver)",
            "heat-stack-id":"NY-Firewall1-vserver1/2f720d88-287a-4628-9c7e-2bb7df5ba79c",
            "orchestration-status":"active",
            "is-base-vf-module":"true",
            "resource-version":"31494926590",
            "persona-model-id":"3e73b0766-1d82-4b2b-a18a-26a31e4515f1",
            "persona-model-version":"3"
         }
      ]
   }
}

;
					
		
				
				
				var check=0;
					for(var key in new_response_json){
						if(key=="vf-modules"){
							check=1;
						}
					}
					if(check==1){
						for(var i=0;i<(new_response_json["vf-modules"]["vf-module"]).length;i++){
							vf_ids.push[(new_response_json["vf-modules"]["vf-module"][i]["vf-module-name"])]
						}	
						vf_module_graph(node, new_response_json);
						vf_module_table(new_response_json);
						    //specific_subscription_table(new_response_json);
					}
				//}
				return 1;
}
return 0;  
				
			}

	

