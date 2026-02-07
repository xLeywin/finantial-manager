package com.wendellyv.financialmanager.services;

import com.wendellyv.financialmanager.entities.Expense;
import com.wendellyv.financialmanager.entities.Income;
import com.wendellyv.financialmanager.entities.User;
import com.wendellyv.financialmanager.enums.UserRole;
import com.wendellyv.financialmanager.repositories.IncomeRepository;
import com.wendellyv.financialmanager.repositories.UserRepository;
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
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Income> findAll() {
        return incomeRepository.findAll();
    }

    public Income findById(Long id) {
        Optional<Income> obj = incomeRepository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Income insert(Income income) {
        return incomeRepository.save(income);
    }

    public Income update(Long id, Income updatedIncome) {
        try {
            Income currentIncome = incomeRepository.getReferenceById(id);
            updateIncome(currentIncome, updatedIncome);
            return incomeRepository.save(currentIncome);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    public void updateIncome(Income currentIncome, Income updatedIncome) {
        currentIncome.setTitle(updatedIncome.getTitle());
        currentIncome.setAmount(updatedIncome.getAmount());
        currentIncome.setStatus(updatedIncome.getStatus());
    }

    public void deleteById(Long id) {
        try {
            incomeRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) { // If there's no corresponding id
            throw new ResourceNotFoundException(id);
        } catch (DataIntegrityViolationException e) { // If it has associated items
            throw new DatabaseException(e.getMessage());
        }
    }
    
    public List<Income> findAll(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(userId));

        if (user.getRole() == UserRole.ADMIN) {
            return incomeRepository.findAll();
        }

        return incomeRepository.findByUserId(userId);
    }
}