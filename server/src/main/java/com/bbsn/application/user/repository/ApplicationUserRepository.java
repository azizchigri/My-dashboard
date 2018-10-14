package com.bbsn.application.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bbsn.application.user.model.ApplicationUser;

public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
    ApplicationUser findByUsername(String username);
}

