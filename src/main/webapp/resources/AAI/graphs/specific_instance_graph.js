function specific_instance_graph(node, input){
	var vnf_pos=0;
	
			for(var i=0;i<input["relationship-list"]["relationship"].length;i++){
				if(input["relationship-list"]["relationship"][i]["related-to"]=="generic-vnf"){
					vnf_pos=i;
					break;
				}
			}
		
	
	
		node.children=[];
		//node.children.push({name:"generic-vnf",id:"generic-vnf:"+node.id,children:[]});
		node.children.push({name:input["relationship-list"]["relationship"][vnf_pos]["related-to-property"][0]["property-value"]+" (vnf)",id:input["relationship-list"]["relationship"][vnf_pos]["relationship-data"][0]["relationship-value"]});
		// node.children[0] is the json element for service-instances.
	
}