package com.bbsn.application.services.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {
	
	public static String getWeather(String city) {
		String url = "http://api.openweathermap.org/data/2.5/weather?q=";
		url += city.replace(' ', '+') + "&APPID=" + "8b1ca471f403bb70f50b7c4d69458f97";
		RestTemplate rest = new RestTemplate();
		return rest.getForObject(url, String.class);
	}
}
