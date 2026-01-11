package com.wendellyv.financialmanager.services;

import com.wendellyv.financialmanager.entities.Category;
import com.wendellyv.financialmanager.repositories.CategoryRepository;
import com.wendellyv.financialmanager.services.exceptions.DatabaseException;
import com.wendellyv.financialmanager.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
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
        try{
            Category currentCategory = categoryRepository.getReferenceById(id);
            updateCategory(currentCategory, updatedCategory);
            return categoryRepository.save(currentCategory);
        }
        catch (EntityNotFoundException e){
            throw new ResourceNotFoundException(id);
        }
    }

    public void updateCategory(Category currentCategory, Category updatedCategory) {
        currentCategory.setTitle(updatedCategory.getTitle());
    }

    public void deleteById(Long id) {
        try{
            categoryRepository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e){ // If there's no corresponding id
            throw new ResourceNotFoundException(id);
        }
        catch (DataIntegrityViolationException e){ // If it has associated items
            throw new DatabaseException(e.getMessage());
        }
    }
}
