function vf_module_graph(node,input){
	console.log(" vf-modulrgeneric");
	console.log(input);
	var props = 1;
       // props = input["vf-module"].length;
		
	node.children=[];

for(var t = 0; t <2; t++){
		node.children.push({name:input["vf-modules"]["vf-module"][t]["vf-module-name"],id:input["vf-modules"]["vf-module"][t]["vf-module-id"]}); //this is performed for adding children to the node vf-module

}
	 // node.children[0] is the json element for service-subscriptions.
}

