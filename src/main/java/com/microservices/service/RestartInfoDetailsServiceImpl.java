package com.microservices.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservices.dao.RestartInfoDetailsDao;
import com.microservices.dao.model.RestartInfoDetails;
import com.microservices.repositories.RestartInfoDetailsRepository;
import com.microservices.web.rest.model.RestartInfoDetailsRestModel;

@Service
public class RestartInfoDetailsServiceImpl implements RestartInfoDetailsService {

	
	@Autowired
	private RestartInfoDetailsRepository restartInfoDetailsRepo;
	
	@Autowired
	private RestartInfoDetailsDao seqDao;
	
		@Override
		public String addRestartInfoDetails(RestartInfoDetailsRestModel obj) {
			
			RestartInfoDetails temp=new RestartInfoDetails();
			temp.setLink1(obj.getLink1());
			temp.setLink2(obj.getLink2());
			temp.setLink3(obj.getLink3());
			
			temp.setResult(obj.getResult());
			temp.setTemperature(obj.getTemperature());
			
			restartInfoDetailsRepo.save(temp);
			
			System.out.println("reocord saved Successfully");
			
			return "Saved Successfully..";
}
}
