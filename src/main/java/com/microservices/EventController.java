package com.microservices;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.att.nsa.cambria.test.clients.CustomEvent;
import com.microservices.dao.model.VendorEvent;
//import com.sun.xml.internal.ws.policy.privateutil.PolicyUtils.Collections;
import com.microservices.service.ISingleEventService;
import com.microservices.web.rest.model.JsonResponse;

@Controller
@RequestMapping(value = "/event")
public class EventController {
	private static Logger logger = Logger.getLogger(EventController.class);

	@Autowired
	private ISingleEventService singleEventService;
	
	@RequestMapping(value = "/getEventsForTopic/{topicName}", method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse<Map<String,Collection<CustomEvent>>> getEventsForTopic(@PathVariable String topicName) 
	{
		JsonResponse<Map<String, Collection<CustomEvent>>> response = new JsonResponse<Map<String,Collection<CustomEvent>>>();
		try 
		{
			Collection<CustomEvent> eventList = singleEventService.getProcessedEvents(topicName);
			if(eventList==null || eventList.isEmpty())
				eventList=SpringBootWebApplication.getTopicWiseEventMap().get(topicName);
			else
				SpringBootWebApplication.getTopicWiseEventMap().put(topicName, eventList);
			
			Map<String, Collection<CustomEvent>> map=new HashMap<String, Collection<CustomEvent>>();
			map.put("events", eventList);
			response.setResponseBody(map);
		} catch (Exception e) 
		{
			logger.info("Exception in getEventsForTopic()");
			logger.info(e);
		}
		return response;
	}
	
	@RequestMapping(value = "/sourceEvent", method = RequestMethod.POST)
	public HttpResponse storeSourceEvents( @RequestBody String httpRequest,@RequestHeader(value="topicName",defaultValue="foo") String topicName,@RequestHeader(value="rawJson",defaultValue="RAW TEXT") String rawEvent)
	{	
		HttpResponse httpResponse = null;
		try 
		{
			httpResponse=singleEventService.storeSrcEvents(httpRequest,topicName,rawEvent);
		} catch (Exception e) 
		{
			logger.info("Exception in getEventsForTopic()");
			logger.info(e);
		}	
		System.out.println("Received obj "+httpRequest+ "Received header : "+topicName);
		return httpResponse;
	}
	
	
	@RequestMapping(value = "/getSrcEventsForTopic/{topicName}", method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse<Map<String,Collection<CustomEvent>>> getSrcEventsForTopic(@PathVariable String topicName) 
	{
		JsonResponse<Map<String, Collection<CustomEvent>>> response = new JsonResponse<Map<String,Collection<CustomEvent>>>();
		try 
		{
			Collection<CustomEvent> eventList = singleEventService.getSrcEventsForTopic(topicName);		   
			Map<String, Collection<CustomEvent>> map=new HashMap<String, Collection<CustomEvent>>();
			map.put("events", eventList);
			response.setResponseBody(map);
		}
		catch (Exception e) 
		{
			logger.info("Exception in getSrcEventsForTopic()");
			logger.error(e);
		}
		return response;
	}
	
	@RequestMapping(value = "/storeGenericEvent", method = RequestMethod.POST)
	public HttpResponse storeGenericEvent( @RequestBody String httpRequest,@RequestHeader(value="protocol",defaultValue="foo") String protocol,@RequestHeader(value="eventId",defaultValue="RAW TEXT") String eventId,@RequestHeader(value="topic",defaultValue="RAW TEXT") String topic)
	{	
		HttpResponse httpResponse = null;
		try 
		{
			//httpResponse=singleEventService.storeSrcEvents(httpRequest,topicName,rawEvent);
			httpResponse=singleEventService.storeGenericEvents(httpRequest, protocol, eventId, topic);
		} catch (Exception e) 
		{
			logger.info("Exception in getEventsForTopic()");
			logger.info(e);
		}	
		System.out.println("Received obj "+httpRequest+ "Received header : "+topic);
		return httpResponse;
	}
	
	@RequestMapping(value = "/getVendorEventsForTopic/{topicName}", method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse<Map<String,Collection<VendorEvent>>> getVendorEventsForTopic(@PathVariable String topicName) 
	{
		JsonResponse<Map<String, Collection<VendorEvent>>> response = new JsonResponse<Map<String,Collection<VendorEvent>>>();
		try 
		{
			Collection<VendorEvent> eventList = singleEventService.getVendorEventsForTopic(topicName);		   
			Map<String, Collection<VendorEvent>> map=new HashMap<String, Collection<VendorEvent>>();
			map.put("events", eventList);
			response.setResponseBody(map);
		}
		catch (Exception e) 
		{
			logger.info("Exception in getSrcEventsForTopic()");
			logger.error(e);
		}
		return response;
	}
	
	@RequestMapping(value = "/getVendorAndVesEventForTopic/{topicName}/{eventID}", method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse<Map<String,Object>> getVendorAndVesEventForTopic(@PathVariable String topicName,@PathVariable String eventID) 
	{
		JsonResponse<Map<String,Object>> response = new JsonResponse<Map<String,Object>>();
		try 
		{
			/*Collection<CustomEvent> eventList = singleEventService.getSrcEventsForTopic(topicName);		   
			Map<String, Collection<CustomEvent>> map=new HashMap<String, Collection<CustomEvent>>();
			map.put("events", eventList);*/
			topicName=topicName.substring(topicName.indexOf(".")+1,topicName.length());
			Map<String,Object> res=singleEventService.getVendorAndVesEventForTopic(topicName, eventID);
			response.setResponseBody(res);
		}
		catch (Exception e) 
		{
			logger.info("Exception in getSrcEventsForTopic()");
			logger.error(e);
		}
		return response;
	}
}
