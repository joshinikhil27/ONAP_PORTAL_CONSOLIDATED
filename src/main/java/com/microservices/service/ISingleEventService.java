package com.microservices.service;

import java.util.Collection;
import java.util.Map;

import org.apache.http.HttpResponse;

import com.att.nsa.cambria.test.clients.CustomEvent;
import com.microservices.dao.model.VendorEvent;

public interface ISingleEventService {
	
	public Collection<CustomEvent> getProcessedEvents(String topicName) throws Exception;
	
	public HttpResponse storeSrcEvents(String event,String topicName,String rawEvent) throws Exception;
	
	public Collection<CustomEvent> getSrcEventsForTopic(String topicName) throws Exception;
	
	public HttpResponse storeGenericEvents(String rawJson,String protocol,String eventId,String topic) throws Exception;
	
	public Collection<VendorEvent> getVendorEventsForTopic(String topicName) throws Exception;
	
	public Map<String,Object> getVendorAndVesEventForTopic(String topicName,String eventID) throws Exception;
	

	

}
