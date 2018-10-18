package com.bbsn.application.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import com.bbsn.application.services.widgets.model.WidgetConfig;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private int id;
    
    @Column(name = "email")
    @Email(message = "Please provide a valid Email")
    @NotEmpty(message = "Please provide an email")
    private String email;
    
	@Column(name = "password")
    @Length(min = 5, message = "Your password must have at least 5 characters")
    @NotEmpty(message = "Please provide your password")
    private String password;
    
    @Column(name = "username", unique=true)
    @NotEmpty(message = "Please provide your username")
    private String username;
    
    @Column(name = "last_name")
    @NotEmpty(message = "Please provide your last name")
    private String lastName;
    
    @Column(name = "first_name")
    @NotEmpty(message = "Please provide your first name")
    private String firstName;

	@Column(name = "active")
    private int active;
	
	@ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "widget_config", joinColumns = @JoinColumn(name = "user_id"))
	@Builder.Default
	private Set<WidgetConfig> widget = new HashSet<>();
    
    public Set<WidgetConfig> getWidget() {
		return widget;
	}

	public void setWidget(Set<WidgetConfig> widget) {
		this.widget = widget;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		this.username = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

    public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
}
