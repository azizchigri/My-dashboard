package com.bbsn.application.widgets.model;

import javax.persistence.Entity;

import org.springframework.web.client.RestTemplate;

@Entity
public class Weather extends Widget {

	public Weather() {
		super();
		this.name = "weather";
		this.description = "Affichage de la temperature pour une ville";
		WidgetParam param = new WidgetParam();
		param.setName("city");
		param.setType("string");
		this.addParams(param);
	}
	
	public static String getWeather(String city) {
		final String url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + "8b1ca471f403bb70f50b7c4d69458f97";
		RestTemplate rest = new RestTemplate();
		return rest.getForObject(url, String.class);
	}

}
