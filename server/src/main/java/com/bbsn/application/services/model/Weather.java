package com.bbsn.application.services.model;

import javax.persistence.Entity;
import com.bbsn.application.services.widgets.model.Widget;
import com.bbsn.application.services.widgets.model.WidgetParam;

@Entity
public class Weather extends Services {
	
	public Weather() {
		super();
		Widget temperature = getTemperatureWidget();
		this.setName("weather");
		this.addWidgets(temperature);
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
