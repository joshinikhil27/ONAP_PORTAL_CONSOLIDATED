package com.microservices.service;

import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import org.apache.http.HttpResponse;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.att.nsa.cambria.test.clients.CustomCambriaRunner;
import com.att.nsa.cambria.test.clients.CustomEvent;
import com.microservices.SpringBootWebApplication;
import com.microservices.dao.model.VendorEvent;

@Service
public class SingleEventServiceImpl implements ISingleEventService {

	public Collection<CustomEvent> getProcessedEvents(String topicName) throws Exception {
		Queue<CustomEvent> eventQueue=CustomCambriaRunner.getCustomCambriaRunnerInstance().getEventQueue(topicName);
		List<CustomEvent> eventList=new LinkedList<CustomEvent>();
		CustomEvent event=null;
		
		if(eventQueue!=null || !eventQueue.isEmpty())
		{
			while((event=eventQueue.poll())!=null)
			{
				eventList.add(event);
			}
		}
		return eventList;
		
		/*CustomEvent customEvent=new CustomEvent(01, 1, "eventName", new Date(), "sourceName", "priority", "functionalRole", "domain", "reportngEntityName", "reportngEntityID", "eventText");
		List<CustomEvent> eventList=new LinkedList<CustomEvent>();
		eventList.add(customEvent);		
		return eventList;*/
	}

	public HttpResponse storeSrcEvents(String srcEvent,String topicName,String rawEvent) throws Exception {
		HttpResponse httpResponse;
		Map<String, Collection<CustomEvent>> topicWiseSrcEventMap=SpringBootWebApplication.getTopicWiseSrcEventMap();
		
		List<CustomEvent> eventList=null;
		if(topicWiseSrcEventMap.get(topicName)==null)
		{
			eventList=new ArrayList<CustomEvent>();
			topicWiseSrcEventMap.put(topicName, eventList);
		}
		else
			eventList=(List<CustomEvent>)topicWiseSrcEventMap.get(topicName);
		
		CustomEvent customEvent = converJson(srcEvent,rawEvent);
		if(customEvent != null)
		{
			eventList.add(customEvent);
		}
		
		return null;
	}

	public Collection<CustomEvent> getSrcEventsForTopic(String topicName) throws Exception {		
		return SpringBootWebApplication.getTopicWiseSrcEventMap().get(topicName);
	}
	
	public CustomEvent converJson(String json,String rawEvent)
	{
		//JsonElement root=new JsonParser().parse(msg);
		JSONObject jsonObj = new JSONObject(json);
		CustomEvent customEvent = null;
        Iterator<String> keysItr = jsonObj.keys();
        while(keysItr.hasNext()) 
        {
            String key = keysItr.next();
            System.out.println("key "+key);
            Object value = jsonObj.get(key).toString();
            System.out.println("value "+value);
            
            if(key.equals("event"))
            {
            	JSONObject eventJsonObj = new JSONObject(value.toString());
            	JSONObject jsonChildObj = new JSONObject(eventJsonObj.get("commonEventHeader").toString());
            	
			    //JSONObject jsonChildObj = new JSONObject(value.toString());
            	//String sourceID=(String)jsonChildObj.get("sourceId");
			    long eventID=Long.valueOf(((String)jsonChildObj.get("eventId")))==null?0:Long.valueOf(((String)jsonChildObj.get("eventId")));
			    Integer sequence=(Integer)jsonChildObj.get("sequence")==null?0:(Integer)jsonChildObj.get("sequence");
			    String domain=(String)jsonChildObj.get("domain");
			    String eventName="";
			    if(!jsonChildObj.isNull("eventName"))
			     eventName=(String)jsonChildObj.get("eventName");
			    else
			    	eventName=null;
			    
			    String priority=(String)jsonChildObj.get("priority");
			    String reportngEntityName=(String)jsonChildObj.get("reportingEntityName");
			    String sourceName=(String)jsonChildObj.get("sourceName");
			    String reportngEntityID=(String)jsonChildObj.get("reportingEntityId");
			            	
			            	// need to dicuss for below fields currently hard coding
			    String functionalRole="vFirewall";
			    String eventText=rawEvent;//"Event Info";
			    Date timesStamp=new Date(System.currentTimeMillis());
			            	
			    customEvent=new CustomEvent(eventID, sequence, eventName, timesStamp, sourceName, priority, functionalRole, domain, reportngEntityName, reportngEntityID, eventText);								              
			    System.out.println("Event: "+customEvent.toString()+" Addeding into Queue..");
			   // eventQueue.offer(customEvent);
			    System.out.println("Event: "+customEvent.toString()+" Added into Queue..");
			           
			  }								    
            }
			return customEvent;
	}

	public HttpResponse storeGenericEvents(String rawJson, String protocol, String eventId, String topic)
			throws Exception 
	{
		HttpResponse httpResponse;
		Map<String, Collection<VendorEvent>> topicWiseSrcEventMap=SpringBootWebApplication.getTopicWiseVendorEventListMap();
		
		topic=topic.substring(topic.indexOf(".")+1, topic.length());
		
		List<VendorEvent> eventList=null;
		if(topicWiseSrcEventMap.get(topic)==null)
		{
			eventList=new ArrayList<VendorEvent>();
			topicWiseSrcEventMap.put(topic, eventList);
		}
		else
			eventList=(List<VendorEvent>)topicWiseSrcEventMap.get(topic);
		
		VendorEvent VendorEvent = converToVendorEvent(rawJson,protocol,eventId);
		if(VendorEvent != null)
		{
			eventList.add(VendorEvent);
		}
		SpringBootWebApplication.getEventIdToRawJsonMap().put(topic+":"+eventId, rawJson);
		return null;
	}
		
	public VendorEvent converToVendorEvent(String rawJson,String protocol,String eventId)
	{
		JSONObject jsonObj = new JSONObject(rawJson);
		VendorEvent VendorEvent = null;
        Iterator<String> keysItr = jsonObj.keys();
        String date="",vendorName=null;
        while(keysItr.hasNext()) 
        {
            String key = keysItr.next();
            System.out.println("key "+key);
            Object value = jsonObj.get(key).toString();
            System.out.println("value "+value);
        
            if(key.equals("vendorName"))
            	vendorName=value.toString();
            
            if(protocol.equals("syslog"))
            {            	
            	if(key.equals("sysdate"))
            		date=value.toString();
			}else if(protocol.equals("snmp"))	
			{
				if(key.equals("date"))
            		date=value.toString();
			}
			else if(protocol.equals("netflow"))
			{
				if(key.equals("timeWindow"))
            		date=value.toString();
			}
            
            if(vendorName!=null && date!=null)
            	break;
        }
        
        Date dt=getDate(date,protocol);
        
        VendorEvent event=new VendorEvent(Long.valueOf(eventId), dt, vendorName, protocol);
	event.setEventSourceName("CSR1000v");		
		return event;
	}

	private Date getDate(String date, String protocol) 
	{		
		SimpleDateFormat simpleDateFormat = null;
		Date datte=null;
		try
		{
			if(protocol.equals("syslog"))
			{
				simpleDateFormat=new SimpleDateFormat("MMM dd hh:mm:ss");
				datte=simpleDateFormat.parse(date);
			}
			else if(protocol.equals("netflow"))
			{
				String timeWindowArr [] =date.split(" ", -1);
				String strDate=timeWindowArr[2]+" "+timeWindowArr[3];
				
				simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				datte=simpleDateFormat.parse(strDate);
			}
			else if(protocol.equals("snmp"))
			{
				simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				datte=simpleDateFormat.parse(date);
			}
		}
		catch(ParseException ps)
		{
			ps.printStackTrace();
		}
		return datte;
	}

	public Collection<VendorEvent> getVendorEventsForTopic(String topicName) throws Exception 
	{
		return SpringBootWebApplication.getTopicWiseVendorEventListMap().get(topicName);
	}

	public Map<String, Object> getVendorAndVesEventForTopic(String topicName, String eventID) throws Exception 
	{
		//URL url=this.getClass().getResource("resources/static/images/netflow_smook.png");
		//System.out.println(url);
		Map<String, Object> topicWiseObjListMap=new HashMap<String, Object>();
		String rawJson=SpringBootWebApplication.getEventIdToRawJsonMap().get(topicName+":"+eventID);
		topicWiseObjListMap.put("rawJson", rawJson);

		Collection<CustomEvent> eventList = getProcessedEvents(topicName);
		
		if(eventList!=null && !eventList.isEmpty())
		{	
			if(SpringBootWebApplication.getTopicWiseEventMap().get(topicName)==null)
			{
				SpringBootWebApplication.getTopicWiseEventMap().put(topicName, eventList);
			}		
			else
			{
				Collection<CustomEvent> tempList=SpringBootWebApplication.getTopicWiseEventMap().get(topicName);
				tempList.addAll(eventList);			
			}
		}
		
		Collection<CustomEvent> fetchedEventList=SpringBootWebApplication.getTopicWiseEventMap().get(topicName);
		if(fetchedEventList!=null)
		{
			for(CustomEvent e: fetchedEventList)
			{
				if(String.valueOf(e.getEventID()).equals(eventID))
				{
					String vesJson=e.getEventText();
					topicWiseObjListMap.put("vesJson", vesJson);			
				}
			}
		}
		else
			topicWiseObjListMap.put("vesJson", "Not Available At This Time");	
		
		JSONObject jsonObj = new JSONObject(rawJson);
        Iterator<String> keysItr = jsonObj.keys();
        String protocol="";
        while(keysItr.hasNext()) 
        {
            String key = keysItr.next();
            if(key.equalsIgnoreCase("protocol"))
            {
            	protocol=jsonObj.getString(key).toString();
            	break;
            }
        }
		String imgUrl=SpringBootWebApplication.getProtocolToImgMap().get(protocol.toLowerCase());
		topicWiseObjListMap.put("image", imgUrl);
		return topicWiseObjListMap;
	}
}
