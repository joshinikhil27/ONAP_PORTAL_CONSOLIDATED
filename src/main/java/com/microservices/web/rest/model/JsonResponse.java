/********************************************************************************************************************
* 2016 ATT Intellectual Property. All rights reserved.
* 
* Functional Description: JsonResponse.java
* 
* History:
* Ver Name          (attuid)       Date       SEMR        Description
* --- ----------------------       ---------  ----------  ------------------------------------------------------------
* 00  TechMahindra                            xxxx        initial 
* 
* 
* *********************************************************************************************************************
*/
package com.microservices.web.rest.model;
import java.io.Serializable;
/**
* This class represents a common format set for the response send to the client.
* Getters and setters encapsulate the fields of a class by making them accessible 
* only through its public methods and keep the values themselves private.
* @JsonProperty(name), tells Jackson ObjectMapper to map the JSON property name to the annotated Java field's name.
*/

import com.fasterxml.jackson.annotation.JsonProperty;

public class JsonResponse<T> implements Serializable {

	private static final long serialVersionUID = -2934104266393591755L;

	/**
	 * Json property status.
	 */
	@JsonProperty(value = JSONTags.TAG_RESPONSE_STATUS)
	private Boolean status;

	/**
	 * Json property responseDetail.
	 */
	@JsonProperty(value = JSONTags.TAG_RESPONSE_DETAIL)
	private String responseDetail;

	/**
	 * Json property errorCode.
	 */
	@JsonProperty(value = JSONTags.TAG_ERROR_CODE)
	private String errorCode;

	/**
	 * Json property responseBody. It represents the type of generic object.
	 */
	@JsonProperty(value = JSONTags.TAG_RESPONSE_BODY)
	private T responseBody;

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getResponseDetail() {
		return responseDetail;
	}

	public void setResponseDetail(String responseDetail) {
		this.responseDetail = responseDetail;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public T getResponseBody() {
		return responseBody;
	}

	public void setResponseBody(T responseBody) {
		this.responseBody = responseBody;
	}

}