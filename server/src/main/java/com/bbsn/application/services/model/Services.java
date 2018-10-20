package com.bbsn.application.services.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.bbsn.application.services.widgets.model.Widget;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "services")
public abstract class Services {
	
	@Id
	@NotNull
    @Size(max = 100)
	@Column(name = "service_name", unique=true)
	private String name;
	
	@OneToMany
	@JoinColumn(name="service_name")
	private Set<Widget> widgets = new HashSet<Widget>();

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Widget> getWidgets() {
		return widgets;
	}

	public void setWidgets(Set<Widget> widgets) {
		this.widgets = widgets;
	}
	
	public void addWidgets(Widget params) {
		this.widgets.add(params);
	}
}
