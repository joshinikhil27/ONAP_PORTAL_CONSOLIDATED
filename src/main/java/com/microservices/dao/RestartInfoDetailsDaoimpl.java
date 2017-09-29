package com.microservices.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;

@Repository
public class RestartInfoDetailsDaoimpl implements RestartInfoDetailsDao {

	@Autowired
	private MongoOperations mongoOperation;


}
