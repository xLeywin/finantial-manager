package com.wendellyv.financialmanager.services;

import com.wendellyv.financialmanager.entities.User;
import com.wendellyv.financialmanager.enums.UserRole;
import com.wendellyv.financialmanager.repositories.UserRepository;
import com.wendellyv.financialmanager.services.exceptions.DatabaseException;
import com.wendellyv.financialmanager.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        Optional<User> obj = userRepository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public User insert(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserRole.USER);
        return userRepository.save(user);
    }

    public User update(Long id, User updatedUser) {
        try {
            User currentUser = userRepository.getReferenceById(id);
            updateUser(currentUser, updatedUser);
            return userRepository.save(currentUser);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    public void updateUser(User currentUser, User updatedUser) {
        currentUser.setName(updatedUser.getName());
        currentUser.setEmail(updatedUser.getEmail());
        currentUser.setPassword(updatedUser.getPassword());
    }

    public void deleteById(Long id) {
        try {
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) { // If there's no corresponding id
            throw new ResourceNotFoundException(id);
        } catch (DataIntegrityViolationException e) { // If it has associated items
            throw new DatabaseException(e.getMessage());
        }
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password.");
        }

        return user;
    }
}