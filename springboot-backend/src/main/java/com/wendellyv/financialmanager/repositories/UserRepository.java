package com.wendellyv.financialmanager.repositories;

import com.wendellyv.financialmanager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
