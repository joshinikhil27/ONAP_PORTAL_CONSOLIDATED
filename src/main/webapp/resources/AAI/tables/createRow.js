function createRow(tableid,rowid,data){
	var row = document.createElement("TR");
		        row.setAttribute("id", rowid);
		   	    document.getElementById(tableid).appendChild(row);    	
	for(var i=0;i<data.length;i++){
		var col = document.createElement("TD");
			    var col_data = document.createTextNode(data[i]);
			    col.appendChild(col_data);
			    document.getElementById(rowid).appendChild(col);
	}
}