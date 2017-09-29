package com.microservices.dao.model;

import java.util.Date;

public class VendorEvent {
	
	long eventID;
	Date timeStamp;
	String vendorName;
	String protocol;
	String eventSourceName;
	public VendorEvent(long eventID, Date timeStamp, String vendorName, String protocol) {
		super();
		this.eventID = eventID;
		this.timeStamp = timeStamp;
		this.vendorName = vendorName;
		this.protocol = protocol;
	}
	public long getEventID() {
		return eventID;
	}
	public void setEventID(long eventID) {
		this.eventID = eventID;
	}
	public Date getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getProtocol() {
		return protocol;
	}
	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}
	public String getEventSourceName() {
		return eventSourceName;
	}
	public void setEventSourceName(String eventSourceName) {
		this.eventSourceName = eventSourceName;
	}
	

}
