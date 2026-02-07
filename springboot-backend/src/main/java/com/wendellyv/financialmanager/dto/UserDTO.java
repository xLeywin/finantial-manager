package com.wendellyv.financialmanager.dto;

import com.wendellyv.financialmanager.entities.User;
import com.wendellyv.financialmanager.enums.UserRole;

public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private UserRole role;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public UserRole getRole() {
        return role;
    }
}