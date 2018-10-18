package com.bbsn.application.services.widgets.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bbsn.application.services.widgets.repository.ApplicationWidgetRepository;

@RestController
@RequestMapping("/widget")
public class WidgetController {

	@Autowired
	ApplicationWidgetRepository widgetRepository;
	
    @GetMapping("")
    public ResponseEntity<Object> getAllWidgets() {
        return ResponseEntity.ok(widgetRepository.findAll());
    }
}
