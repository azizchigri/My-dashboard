package com.bbsn.application.services.widgets.model;

import javax.persistence.Entity;

import org.springframework.web.client.RestTemplate;

import com.bbsn.application.services.model.Services;

@Entity
public class Weather extends Services {
	
	public Weather() {
		super();
		Widget temperature = getTemperatureWidget();
		this.setName("weather");
		this.addWidgets(temperature);
	}
	
	public static String getWeather(String city) {
		final String url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + "8b1ca471f403bb70f50b7c4d69458f97";
		RestTemplate rest = new RestTemplate();
		return rest.getForObject(url, String.class);
	}

	public static Widget getTemperatureWidget()
	{
		Widget wid = new Widget();
		wid.setName("city_temperature");
		wid.setDescription("Affichage de la temperature pour une ville");
		WidgetParam param = new WidgetParam();
		param.setName("city");
		param.setType("string");
		wid.addParams(param);
		return wid;
	}
}
