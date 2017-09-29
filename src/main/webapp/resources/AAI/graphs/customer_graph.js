function customer_graph(input){
	console.log("inside customer_graph()");
	
	var props = 0;
	
	for(var k in input["service-subscriptions"]["service-subscription"]){
        props++;
    }
	
	var new_response_json = input;
   
    var s2 = document.getElementsByName("txtsearch")[0].value;
	
	var final = {"name" : "", "id" : "", "children":[]};
    var obj = JSON.parse(JSON.stringify(final));
	obj.name = s2;
	obj.id="parent";
	for(var t = 0; t < props; t++){
        obj.children.push ({name:input["service-subscriptions"]["service-subscription"][t]["service-type"]+" (Service)",id:input["service-subscriptions"]["service-subscription"][t]["service-type"]});
    }
	
	console.log("final obj-> "+obj);
	 
	return obj;
}