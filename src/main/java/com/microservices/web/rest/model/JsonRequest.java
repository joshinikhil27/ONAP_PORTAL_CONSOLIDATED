package com.microservices.web.rest.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JsonRequest<T> implements Serializable {
	private static final long serialVersionUID = 7576436006913504503L;

	/**
	 * Json property requestFrom.
	 */
	@JsonProperty(value = "request_from")
	private String requestFrom;

	/**
	 * Json property requestId.
	 */
	@JsonProperty(value = "request_id")
	private String requestId;
	
	/**
	 * Json property body. It represents the type of generic object.
	 */
	@JsonProperty(value = "request_body")
	private T body;

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}
	
	public T getBody() {
		return body;
	}

	public void setBody(T body) {
		this.body = body;
	}

	public String getRequestFrom() {
		return requestFrom;
	}

	public void setRequestFrom(String requestFrom) {
		this.requestFrom = requestFrom;
	}
}
