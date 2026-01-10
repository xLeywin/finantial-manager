package com.wendellyv.financialmanager.services;

import com.wendellyv.financialmanager.entities.Category;
import com.wendellyv.financialmanager.entities.Expense;
import com.wendellyv.financialmanager.repositories.CategoryRepository;
import com.wendellyv.financialmanager.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        Optional<Category> obj = categoryRepository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Category insert(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Long id, Category updatedCategory) {
        Category currentCategory = categoryRepository.getReferenceById(id);
        updateCategory(currentCategory, updatedCategory);
        return categoryRepository.save(currentCategory);
    }

    public void updateCategory(Category currentCategory, Category updatedCategory) {
        currentCategory.setTitle(updatedCategory.getTitle());
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }
}
