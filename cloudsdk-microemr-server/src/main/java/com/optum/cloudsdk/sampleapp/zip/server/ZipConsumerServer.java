package com.optum.cloudsdk.sampleapp.zip.server;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.web.client.RestTemplate;
import javax.xml.transform.Source;
@RestController
@SpringBootApplication
public class ZipConsumerServer {

	private static final Logger LOGGER = LoggerFactory.getLogger(ZipConsumerServer.class);

	public Properties getPropValues() throws IOException {
		Properties props = new Properties();

		String configFileName = "zip.properties";

		String zipSoapUrl = null;

		InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream(configFileName);

		if (inputStream != null) {
			props.load(inputStream);

			return props;

		} else {
			throw new FileNotFoundException("property file" + configFileName + "not found in classpath");
		}
	}

	public static void main(String args[]) {
		SpringApplication.run(ZipConsumerServer.class, args);

	}

	@RequestMapping(value = "/zipserver")

	public Source hitService() throws Throwable {
		LOGGER.info("Hit the server service");
		Properties props = getPropValues();
		String endpointLocation = (String) props.get("zipUrl");

		URI uri = URI.create(endpointLocation);
		RestTemplate restTemplate = new RestTemplate();
		Source result=  restTemplate.getForObject(uri,Source.class);
		return result;
		}

	
}
