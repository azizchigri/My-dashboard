package com.bbsn.application.services.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bbsn.application.services.model.Services;

public interface ApplicationServicesRepository extends JpaRepository<Services, String> {
	Services findByName(String serviceName);
}