package com.wendellyv.financialmanager.repositories;

import com.wendellyv.financialmanager.entities.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepository extends JpaRepository<Income, Long> {

}
