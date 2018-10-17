package com.bbsn.application.widgets.model;

import javax.persistence.Entity;

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

}
