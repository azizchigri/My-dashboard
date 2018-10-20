package com.bbsn.application;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.bbsn.application.services.model.CurrencyExchange;
import com.bbsn.application.services.model.Services;
import com.bbsn.application.services.model.Spotify;
import com.bbsn.application.services.model.Steam;
import com.bbsn.application.services.model.Weather;
import com.bbsn.application.services.repository.ApplicationServicesRepository;
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

    @Bean
    @Transactional
    public CommandLineRunner initWidgets(ApplicationServicesRepository repo) {
        return args -> {
        	saveService(new Weather());
        	saveService(new CurrencyExchange());
        	saveService(new Steam());
        	saveService(new Spotify());
        };
    }
    
	public Services saveService(Services service)
	{
		widgetRepo.saveAll(service.getWidgets());
		servicesRepo.save(service);
		return service;
	}
}