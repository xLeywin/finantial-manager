package com.wendellyv.financialmanager.resources;

import com.wendellyv.financialmanager.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/users")
public class UserResource {

    @GetMapping
    public ResponseEntity<User> findAll(){
        User u  = new User(null, "Caio", "caio232@gmail.com","61912345");
        return ResponseEntity.ok().body(u);
    }
}
