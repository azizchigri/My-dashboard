package com.bbsn.application.widgets.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bbsn.application.widgets.model.Widget;

public interface ApplicationWidgetRepository extends JpaRepository<Widget, String> {
}

