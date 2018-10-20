package com.bbsn.application.services.widgets.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Embeddable
@Table(name = "widget_param")
public class WidgetParam {
	
	public WidgetParam() {
		super();
	}

	public WidgetParam(@NotNull @Size(max = 100) String name, @NotNull @Size(max = 100) String type) {
		super();
		this.name = name;
		this.type = type;
	}

	@NotNull
    @Size(max = 100)
	@Column(name = "widget_param_name")
	private String name;

	@NotNull
    @Size(max = 100)
	@Column(name = "widget_param_type")
	private String type;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
