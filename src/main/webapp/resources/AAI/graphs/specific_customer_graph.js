function specific_customer_graph(node,input){
	
	var props = 0;
        props = (input["service-subscriptions"]["service-subscription"]).length;
	node.children=[];
	//node.children.push({name:"service-subscriptions",id:"service-subscriptions:"+node.id,children:[]});
	for(var t = 0; t < props; t++){

node.children.push({name:input["service-subscriptions"]["service-subscription"][t]["service-type"]+ " (Service)",id:input["service-subscriptions"]["service-subscription"][t]["service-type"]});

	} // node.children[0] is the json element for service-subscriptions.
}