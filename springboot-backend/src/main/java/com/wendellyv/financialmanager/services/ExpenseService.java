package com.wendellyv.financialmanager.services;

import com.wendellyv.financialmanager.entities.Expense;
import com.wendellyv.financialmanager.repositories.ExpenseRepository;
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
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> findAll() {
        return expenseRepository.findAll();
    }

    public Expense findById(Long id) {
        Optional<Expense> obj = expenseRepository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Expense insert(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense update(Long id, Expense updatedExpense) {
        try{
            Expense currentExpense = expenseRepository.getReferenceById(id);
            updateExpense(currentExpense, updatedExpense);
            return expenseRepository.save(currentExpense);
        }
        catch (EntityNotFoundException e){
            throw new ResourceNotFoundException(id);
        }
    }

    public void updateExpense(Expense currentExpense, Expense updatedExpense) {
        currentExpense.setTitle(updatedExpense.getTitle());
        currentExpense.setAmount(updatedExpense.getAmount());
        currentExpense.setStatus(updatedExpense.getStatus());
    }

    public void deleteById(Long id) {
        try{
            expenseRepository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e){ // If there's no corresponding id
            throw new ResourceNotFoundException(id);
        }
        catch (DataIntegrityViolationException e){ // If it has associated items
            throw new DatabaseException(e.getMessage());
        }
    }
}
