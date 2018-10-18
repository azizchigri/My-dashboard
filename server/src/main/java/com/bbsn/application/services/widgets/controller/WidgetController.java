package com.bbsn.application.services.widgets.controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;

import com.bbsn.application.services.model.Weather;
import com.bbsn.application.services.widgets.repository.ApplicationWidgetRepository;

@RestController
@RequestMapping("/widget")
public class WidgetController {

	@Autowired
	ApplicationWidgetRepository widgetRepository;
	
    @GetMapping("")
    public ResponseEntity<Object> getAllWidgets() {
        return ResponseEntity.ok(widgetRepository.findAll());
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
