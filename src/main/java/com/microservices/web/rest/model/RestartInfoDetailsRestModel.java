package com.microservices.web.rest.model;

import java.util.Date;

public class RestartInfoDetailsRestModel {

	private Date date;
	private String result;
	private String link1;
	private String link2;
	private String link3;
	private String temperature;
	
	public RestartInfoDetailsRestModel() {
		super();
	}
	/*@Override
	public String toString() {
		return "RouterConfigDetailsRestModel [cos_entry_number=" + cos_entry_number + ", destination_address=" + destination_address + ", source_address=" + source_address + ", customer_name=" + customer_name + "]";
	}*/

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

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
	
}
