package com.wendellyv.financialmanager.services;

import com.wendellyv.financialmanager.entities.Expense;
import com.wendellyv.financialmanager.entities.Income;
import com.wendellyv.financialmanager.repositories.ExpenseRepository;
import com.wendellyv.financialmanager.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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
        Expense currentExpense = expenseRepository.getReferenceById(id);
        updateExpense(currentExpense, updatedExpense);
        return expenseRepository.save(currentExpense);
    }

    public void updateExpense(Expense currentExpense, Expense updatedExpense) {
        currentExpense.setTitle(updatedExpense.getTitle());
        currentExpense.setAmount(updatedExpense.getAmount());
        currentExpense.setStatus(updatedExpense.getStatus());
    }

    public void deleteById(Long id) {
        expenseRepository.deleteById(id);
    }
}
