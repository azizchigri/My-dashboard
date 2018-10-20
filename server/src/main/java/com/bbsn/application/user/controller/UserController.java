package com.bbsn.application.user.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bbsn.application.user.model.ApplicationUser;
import com.bbsn.application.user.repository.ApplicationUserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

    private ApplicationUserRepository applicationUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(ApplicationUserRepository applicationUserRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Object> signUp(@RequestBody @Valid ApplicationUser user) {
    	if (applicationUserRepository.findByUsername(user.getUsername()) != null)
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        applicationUserRepository.save(user);
        user.setPassword("");
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/update")
    public ResponseEntity<Object> update(@RequestBody @Valid ApplicationUser user) {
    	ApplicationUser entity = applicationUserRepository.findByUsername(user.getUsername());
    	if (entity == null)
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesn't exist");
        entity.setEmail(user.getEmail());
        entity.setFirstName(user.getFirstName());
        entity.setLastName(user.getLastName());
        if (user.getPassword() != null && !user.getPassword().isEmpty())
        	entity.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        applicationUserRepository.save(entity);
        entity.setPassword("");
        return ResponseEntity.ok(entity);
    }
    
    @PostMapping("/config")
    public ResponseEntity<Object> storeConfig(@RequestBody ApplicationUser user) {
    	ApplicationUser entity = applicationUserRepository.findByUsername(user.getUsername());
    	if (entity == null)
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesn't exist");
    	entity.setWidget(user.getWidget());
        applicationUserRepository.save(entity);
        entity.setPassword("");
        return ResponseEntity.ok(entity);
    }
    
    @GetMapping("")
    public ResponseEntity<Object> getUser(@RequestParam("username") String username) {
    	ApplicationUser entity = applicationUserRepository.findByUsername(username);
    	if (entity == null)
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesn't exist");
        entity.setPassword("");
        return ResponseEntity.ok(entity);
    }
}