package com.microservices.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.microservices.dao.model.RestartInfoDetails;

public interface RestartInfoDetailsRepository extends MongoRepository<RestartInfoDetails,String> {

	//void save(List<RestartInfoDetails> routerConfigDetailsList);
	//public String save();
	//void find(Router routerObj);

}
