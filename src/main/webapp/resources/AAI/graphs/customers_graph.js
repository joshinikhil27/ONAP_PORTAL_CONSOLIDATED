function customers_graph(input){
	var props = 0;
    for(var k in input["customer"]){
        props++;
    }
	var final = {"name" : "", "id" : "", "children":[]};
    var obj = JSON.parse(JSON.stringify(final));
	obj.name="customers";
	obj.id="parent_customers";
	for(var i=0;i<new_response_json["service-subscriptions"]["service-subscription"].length;i++){
        obj.children.push ({name:input["customer"][t]["subscriber-name"]+" (customer)",id:input["customer"][t]["global-customer-id"]});
    }

    return obj;
}