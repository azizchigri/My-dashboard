package com.bbsn.application.services.widgets.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Embeddable
@Table(name = "widget_config")
public class WidgetConfig {
	
	@NotNull
    @Size(max = 100)
	@Column(name = "widget_conf_name")
	private String name;
	
	@NotNull
    @Size(max = 100)
	@Column(name = "widget_conf_size")
	private String size;
	
	@NotNull
    @Size(max = 100)
	@Column(name = "widget_conf_pos")
	private String position;

	@Column(name = "widget_conf_pref")
	private String preference;
	
	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getPreference() {
		return preference;
	}

	public void setPreference(String preference) {
		this.preference = preference;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String description) {
		this.size = description;
	}
	
	
}
