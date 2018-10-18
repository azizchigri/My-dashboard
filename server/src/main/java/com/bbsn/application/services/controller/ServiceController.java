package com.bbsn.application.services.controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;

import com.bbsn.application.services.model.Weather;
import com.bbsn.application.services.repository.ApplicationServicesRepository;

@RestController
@RequestMapping("/services")
public class ServiceController {

	@Autowired
	ApplicationServicesRepository serviceRepository;
	
    @GetMapping("")
    public ResponseEntity<Object> getAllServices() {
        return ResponseEntity.ok(serviceRepository.findAll());
    }
    
    @GetMapping("/findOne")
    public ResponseEntity<Object> getWidgetByService(@RequestParam("serviceName") String serviceName) {
        return ResponseEntity.ok(serviceRepository.findByName(serviceName));
    }
    
    @PostMapping("/weather")
    public ResponseEntity<Object> getUser(@RequestBody String body) {
		String city, result;
		try {
			JSONObject json = new JSONObject(body);
			city = json.getString("city");
		} catch (JSONException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");
		}
		if (city == null || city.isEmpty())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please provide a city");
		try {
			result = Weather.getWeather(city);
		} catch (RestClientException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("City unknown");
		}
        return ResponseEntity.ok(result);
    }
}
