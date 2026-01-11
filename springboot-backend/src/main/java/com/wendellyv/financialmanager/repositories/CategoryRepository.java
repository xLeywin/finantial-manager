package com.wendellyv.financialmanager.repositories;

import com.wendellyv.financialmanager.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
