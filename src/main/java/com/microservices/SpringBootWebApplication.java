package com.microservices;

import java.io.File;
import java.io.FileReader;
import java.util.Collection;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.att.nsa.cambria.test.clients.CustomEvent;
import com.microservices.dao.model.VendorEvent;
import com.att.nsa.cambria.test.clients.CustomCambriaRunner;
@SpringBootApplication
public class SpringBootWebApplication {

	private static Map<String, Collection<CustomEvent>> topicWiseEventMap=new ConcurrentHashMap<String, Collection<CustomEvent>>();
	private static Map<String, Collection<CustomEvent>> topicWiseSrcEventMap=new ConcurrentHashMap<String, Collection<CustomEvent>>();
	
	private static Map<String, Collection<VendorEvent>> topicWiseVendorEventListMap=new ConcurrentHashMap<String, Collection<VendorEvent>>();
	private static Map<String,String> eventIdToRawJsonMap=new ConcurrentHashMap<String, String>();
	private static Map<Long,String> eventIdToVesJsonMap=new ConcurrentHashMap<Long, String>();
	private static Map<String, String> protocolToImgMap=new ConcurrentHashMap<String, String>();
	
	public static void main(String[] args) throws Exception {
		SpringApplication.run(SpringBootWebApplication.class, args);
		 
		fillProtocolToImgMap();  
		CustomCambriaRunner.getCustomCambriaRunnerInstance().startProcessing();
	}
	private static void fillProtocolToImgMap() {
		try
		{
			System.out.println(System.getProperty("user.dir"));
			FileReader fileReader=new FileReader(System.getProperty("user.dir")+File.separator+"protocolToImageMapping.properties");
			Properties prop=new Properties();
			prop.load(fileReader);
			
			String snmpImg=prop.getProperty("snmp");
			String netflowImg=prop.getProperty("netflow");
			String syslogImg=prop.getProperty("syslog");
			 String netconf=prop.getProperty("netconf");
			protocolToImgMap.put("snmp", snmpImg);
			protocolToImgMap.put("netflow", netflowImg);
			protocolToImgMap.put("syslog", syslogImg);
		        protocolToImgMap.put("netconf",netconf);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
	}
	public static Map<String, String> getProtocolToImgMap() {
		return protocolToImgMap;
	}
	public static Map<String, Collection<CustomEvent>> getTopicWiseEventMap() {
		return topicWiseEventMap;
	}
	
	public static Map<String, Collection<CustomEvent>> getTopicWiseSrcEventMap() {
		return topicWiseSrcEventMap;
	}

	public static Map<String, Collection<VendorEvent>> getTopicWiseVendorEventListMap() {
		return topicWiseVendorEventListMap;
	}

	public static Map<String, String> getEventIdToRawJsonMap() {
		return eventIdToRawJsonMap;
	}

	public static Map<Long, String> getEventIdToVesJsonMap() {
		return eventIdToVesJsonMap;
	}

}
