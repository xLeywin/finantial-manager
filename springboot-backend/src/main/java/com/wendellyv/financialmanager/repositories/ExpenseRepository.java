package com.wendellyv.financialmanager.repositories;

import com.wendellyv.financialmanager.entities.Expense;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserId(Long userId);
}
