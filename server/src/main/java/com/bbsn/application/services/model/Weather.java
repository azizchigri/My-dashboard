package com.bbsn.application.services.model;

import javax.persistence.Entity;
import com.bbsn.application.services.widgets.model.Widget;
import com.bbsn.application.services.widgets.model.WidgetParam;

@Entity
public class Weather extends Services {
	
	public Weather() {
		super();
		this.setName("weather");
		this.addWidgets(getTemperatureWidget());
		this.addWidgets(getAdvancedWidget());
	}

	private static Widget getTemperatureWidget()
	{
		Widget wid = new Widget();
		wid.setName("city_temperature");
		wid.setDescription("Affichage de la temperature pour une ville");
		wid.addParams(new WidgetParam("city", "string"));
		return wid;
	}
	
	private static Widget getAdvancedWidget()
	{
		Widget wid = new Widget();
		wid.setName("city_advanced");
		wid.setDescription("Affiche les donnees meteo plus precises pour une ville donnee.");
		wid.addParams(new WidgetParam("city", "string"));
		return wid;
	}
}
