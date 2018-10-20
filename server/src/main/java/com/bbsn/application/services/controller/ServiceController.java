package com.bbsn.application.services.controller;

import java.io.IOException;

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

import com.bbsn.application.services.model.CurrencyExchange;
import com.bbsn.application.services.model.Spotify;
import com.bbsn.application.services.model.Steam;
import com.bbsn.application.services.repository.ApplicationServicesRepository;
import com.bbsn.application.services.services.CurrencyService;
import com.bbsn.application.services.services.SpotifyService;
import com.bbsn.application.services.services.SteamService;
import com.bbsn.application.services.services.WeatherService;

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
    public ResponseEntity<Object> getWeather(@RequestBody String body) {
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
			result = WeatherService.getWeather(city);
		} catch (RestClientException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("City unknown");
		}
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/exchange")
    public ResponseEntity<Object> getStockExchange(@RequestBody String body) {
		String currency, result, date;
		try {
			JSONObject json = new JSONObject(body);
			currency = json.getString("currency");
			date = json.getString("date");
		} catch (JSONException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");
		}
		if ((currency == null || currency.isEmpty()) && (date == null || date.isEmpty()))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please provide a currency or a date");
		try {
			result = CurrencyService.getExchange(currency, date);
		} catch (RestClientException | JSONException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Currency not found");
		}
		if (result.equals("Not found"))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Currency not found");
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/exchange")
    public ResponseEntity<Object> getCurrencyList() {
        return ResponseEntity.ok(CurrencyExchange.CURRENCY_LIST.toString());
    }
    
    @PostMapping("/steam")
    public ResponseEntity<Object> getGameInfo(@RequestBody String body) {
		String appId, result;
		try {
			JSONObject json = new JSONObject(body);
			appId = json.getString("appId");
		} catch (JSONException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON");
		}
		if (appId == null || appId.isEmpty())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please provide an appId");
		try {
			result = SteamService.getGameInfo(appId);
		} catch (RestClientException | JSONException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Game not found");
		}
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/steam")
    public ResponseEntity<Object> getGameList() {
        return ResponseEntity.ok(Steam.GAME_LIST.toString());
    }
    
    @PostMapping("/spotify/search")
    public ResponseEntity<Object> getGamesInfo(@RequestBody String body) {
		String result;
		try {
			result = SpotifyService.getData(body);
		} catch (IOException | JSONException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can not connect / Bad request (keyword / type)");
		}
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/spotify/filter")
    public ResponseEntity<Object> getFilter() {
        return ResponseEntity.ok(Spotify.FILTERS.toString());
    }
}
