package com.bbsn.application.services.widgets.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bbsn.application.services.widgets.model.Widget;

public interface ApplicationWidgetRepository extends JpaRepository<Widget, String> {
}

