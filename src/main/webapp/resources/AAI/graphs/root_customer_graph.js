function root_customer_graph(input){
	var props = 0;
    for(var k in input["customer"]){
        props++;
    }
	var final = {"name" : "", "id" : "", "children":[]};
    var obj = JSON.parse(JSON.stringify(final));
	obj.name="Customers";
	obj.id="parent_customers";
	for(var t = 0; t < props; t++){
        obj.children.push ({name:input["customer"][t]["subscriber-name"]+" (Customer)",id:input["customer"][t]["global-customer-id"]});
    }

	console.log("final obj-> "+obj);
	
    return obj;
}