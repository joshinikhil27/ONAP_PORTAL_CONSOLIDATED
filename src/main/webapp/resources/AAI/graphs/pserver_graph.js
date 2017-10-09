function pserver_graph(node,input){
	console.log(" pservers graph");
	console.log(input);
	var props = 1;
       // props = input["vf-module"].length;
		
	node.children=[];

for(var t = 0; t <1; t++){
		node.children.push({name:input["pservers"]["pserver"][t]["pserver-name"],id:input["pservers"]["pserver"][t]["pserver-id"]}); //this is performed for adding children to the node vf-module

}
	 // node.children[0] is the json element for service-subscriptions.
}

