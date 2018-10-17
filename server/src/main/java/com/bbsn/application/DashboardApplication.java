package com.bbsn.application;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.bbsn.application.services.model.Services;
import com.bbsn.application.services.repository.ApplicationServicesRepository;
import com.bbsn.application.services.widgets.model.Weather;
import com.bbsn.application.services.widgets.model.Widget;
import com.bbsn.application.services.widgets.repository.ApplicationWidgetRepository;

@SpringBootApplication
public class DashboardApplication {
	
	@Autowired
	ApplicationWidgetRepository widgetRepo;
	
	@Autowired
	ApplicationServicesRepository servicesRepo;
	
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(DashboardApplication.class, args);
    }

    // Initialize the widgets
    @Bean
    @Transactional
    public CommandLineRunner demoData(ApplicationServicesRepository repo) {
    	Widget temperature = Weather.getTemperatureWidget();
    	Services tmp = new Services();
    	tmp.setName("weather");
    	tmp.addWidgets(temperature);
    	List<Services> schema = new ArrayList<Services>();
    	schema.add(tmp);
        return args -> {
        	widgetRepo.save(temperature);
        	servicesRepo.saveAll(schema);
        };
    }
}