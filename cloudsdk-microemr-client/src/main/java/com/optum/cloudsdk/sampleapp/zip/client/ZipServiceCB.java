package com.optum.cloudsdk.sampleapp.zip.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import org.w3c.dom.Document;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.xml.sax.InputSource;
import java.net.URI;
import java.io.StringReader;
import javax.xml.transform.Source;
import javax.xml.transform.dom.DOMSource;

@Service
public class ZipServiceCB {
	private static final Logger LOGGER = LoggerFactory.getLogger(ZipServiceCB.class);
	private final RestTemplate restTemplate;

	@Value("${server.url}")
	private String serverUrl;

	public ZipServiceCB(RestTemplate rest) {
		this.restTemplate = rest;
	}

	// various properties that can be set to control the circuit breaker
	@HystrixCommand(commandProperties = { @HystrixProperty(name = "execution.isolation.strategy", value = "THREAD"),
			@HystrixProperty(name = "execution.timeout.enabled", value = "true"),
			@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "50000"),
			@HystrixProperty(name = "execution.isolation.thread.interruptOnTimeout", value = "true"),
			@HystrixProperty(name = "fallback.enabled", value = "true"),
			@HystrixProperty(name = "circuitBreaker.enabled", value = "true"),
			@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
			@HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "1000"),
			@HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "10"),
			@HystrixProperty(name = "circuitBreaker.forceOpen", value = "false"),
			// limit number of threads in production with coreSize
			@HystrixProperty(name = "circuitBreaker.forceClosed", value = "false") }, fallbackMethod = "reliable", commandKey = "list", groupKey = "ZipServiceCB", threadPoolKey = "thread-pool-zip-service", threadPoolProperties = {
					@HystrixProperty(name = "coreSize", value = "5") }, ignoreExceptions = {
							IllegalAccessException.class })

	public Source hitService() {
		URI uri = URI.create(serverUrl);
		LOGGER.info("serverUrl" + serverUrl);
		Source result = this.restTemplate.getForObject(uri, Source.class);
		LOGGER.info("result" + result);
		return result;

	}

	public Source reliable() {
		StringBuffer sbuff = new StringBuffer("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
		sbuff.append("<checkZipResponse xmlns=\"http://www.optum.com/cloudsdk/zip\">");
		sbuff.append("<state>PA</state><city>PHILADELPHIA</city></checkZipResponse>");
		try {
			Source doc = loadXML(sbuff.toString());
			return doc;
		} catch (Exception e) {
			return null;
		}

	}

	public static Source loadXML(String xml) throws Exception {
		DocumentBuilder parser = DocumentBuilderFactory.newInstance().newDocumentBuilder();
		Document document = parser.parse(new InputSource(new StringReader(xml)));
		Source source = new DOMSource(document);
		return source;

	}

}
