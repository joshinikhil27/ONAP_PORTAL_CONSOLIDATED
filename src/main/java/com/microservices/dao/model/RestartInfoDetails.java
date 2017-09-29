package com.microservices.dao.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "RestartInfoDetails")
public class RestartInfoDetails implements Comparable<RestartInfoDetails> {

	@Id
//"date":"2017-06-21T18:30:00.000Z","result":"Fail","link1":"Restart",
	//"link2":"Raise_Alarm","link3":"None","temperature":5.4
	//private Date date;
	private String result;
	private String link1;
	private String link2;
	private String link3;
	private String temperature;
	

	/*public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}*/

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getLink1() {
		return link1;
	}

	public void setLink1(String link1) {
		this.link1 = link1;
	}

	public String getLink2() {
		return link2;
	}

	public void setLink2(String link2) {
		this.link2 = link2;
	}

	public String getLink3() {
		return link3;
	}

	public void setLink3(String link3) {
		this.link3 = link3;
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	@Override
	public String toString() {
		return "RestartInfoDetails [link1= " + link1 +", link2= " + link2 +", link3= " + link3 + 
				", result= "+result+
				", temperature= " + temperature + "]"; //", date= "+date+
	}

	@Override
	public int compareTo(RestartInfoDetails o) {
		/*if(this.date.before(o.getDate()))
			return 1;
			else if(this.date.equals(o.getDate()))
			return 0;
			else
			return -1;*/
		return 0;
	}

}
