package com.bbsn.application;


import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.bbsn.application.widgets.model.Weather;
import com.bbsn.application.widgets.model.Widget;
import com.bbsn.application.widgets.repository.ApplicationWidgetRepository;

@SpringBootApplication
public class DashboardApplication {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(DashboardApplication.class, args);
    }
    
    @Bean
    public CommandLineRunner demoData(ApplicationWidgetRepository repo) {
    	List<Widget> schema = new ArrayList<Widget>();
    	schema.add(new Weather());
        return args -> { 

            repo.saveAll(schema);
        };
    }
}