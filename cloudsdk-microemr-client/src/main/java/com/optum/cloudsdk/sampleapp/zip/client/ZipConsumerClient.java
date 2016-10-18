package com.optum.cloudsdk.sampleapp.zip.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import java.net.URI;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.w3c.dom.*;
import javax.xml.transform.Source;

@EnableCircuitBreaker
@RestController
@SpringBootApplication
public class ZipConsumerClient {
	private static final Logger LOGGER = LoggerFactory.getLogger(ZipConsumerClient.class);
	  @Autowired
	  private ZipServiceCB zipService;
	  
	  @Bean
	  public RestTemplate rest(RestTemplateBuilder builder) {
	    return builder.build();
	  }
	  
  @RequestMapping("/zipclient")
  public Source hitService() {
	  LOGGER.info("Hit the client service");
	  return zipService.hitService();
  }

  public static void main(String[] args) {
    SpringApplication.run(ZipConsumerClient.class, args);
  }
}