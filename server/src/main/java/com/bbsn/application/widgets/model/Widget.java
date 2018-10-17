package com.bbsn.application.widgets.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "widget")
public abstract class Widget {

	@Id
	@NotNull
    @Size(max = 100)
	@Column(name = "widget_name", unique=true)
	protected String name;
	
	@NotNull
    @Size(max = 100)
	@Column(name = "widget_description")
	protected String description;

	@ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "widget_param", joinColumns = @JoinColumn(name = "widget_name"))
	protected Set<WidgetParam> params = new HashSet<>();

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<WidgetParam> getParams() {
		return params;
	}

	public void setParams(Set<WidgetParam> params) {
		this.params = params;
	}
	
	public void addParams(WidgetParam params) {
		this.params.add(params);
	}
}
