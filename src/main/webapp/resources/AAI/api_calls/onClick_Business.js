function onClick_Business(ending_url){
  var data = null;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
     // window.alert("response_json type = "+ typeof (JSON.parse(this.responseText)));
      response=JSON.parse(this.responseText);
    }
  });
  
  var url="https://104.130.165.65:8443/aai/v8/business/"+ending_url;
  
  
  console.log("***-> "+url);
  
  xhr.open("GET", url, false);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-fromappid", "VID");
  xhr.setRequestHeader("x-transactionid", "11112");
  xhr.setRequestHeader("authorization", "Basic VklEOlZJRA==");
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "77728bb2-6533-6e0f-a141-bfecab325c01");

  xhr.send(data);
}