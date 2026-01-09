package com.wendellyv.financialmanager.services;

import com.wendellyv.financialmanager.entities.User;
import com.wendellyv.financialmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.get();
    }

    public User insert(User user) {
        return userRepository.save(user);
    }

    public User update(Long id, User updatedUser) {
        User currentUser = userRepository.getReferenceById(id);
        updateUser(currentUser, updatedUser);
        return userRepository.save(currentUser);
    }

    public void updateUser(User currentUser, User updatedUser) {
        currentUser.setName(updatedUser.getName());
        currentUser.setEmail(updatedUser.getEmail());
        currentUser.setPassword(updatedUser.getPassword());
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
