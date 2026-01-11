package com.wendellyv.financialmanager.config;

import com.wendellyv.financialmanager.entities.Category;
import com.wendellyv.financialmanager.entities.Expense;
import com.wendellyv.financialmanager.entities.Income;
import com.wendellyv.financialmanager.entities.User;
import com.wendellyv.financialmanager.enums.ExpenseStatus;
import com.wendellyv.financialmanager.enums.IncomeStatus;
import com.wendellyv.financialmanager.repositories.CategoryRepository;
import com.wendellyv.financialmanager.repositories.ExpenseRepository;
import com.wendellyv.financialmanager.repositories.IncomeRepository;
import com.wendellyv.financialmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Arrays;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        User u1 = new User("Caio", "caio232@gmail.com", "61912345");
        User u2 = new User("Maria", "maria54@gmail.com", "245675643d");
        userRepository.saveAll(Arrays.asList(u1, u2));

        Category category1 = new Category("Combustível");
        Category category2 = new Category("Alimentação");
        Category category3 = new Category("Trabalho");
        Category category4 = new Category("Contas mensais");
        categoryRepository.saveAll(Arrays.asList(category1, category2, category3, category4));

        Income income1 = new Income("Salário", 2900.00, u1, IncomeStatus.RECEIVED, category3);
        Income income2 = new Income("Salário", 4000.00, u2, IncomeStatus.RECEIVED, category3);
        Income income3 = new Income("Bônus", 500.00, u1, IncomeStatus.SCHEDULED, category3);
        incomeRepository.saveAll(Arrays.asList(income1, income2, income3));

        Expense expense1 = new Expense("Gasolina", 50.00, u1, ExpenseStatus.PAID, category1);
        Expense expense2 = new Expense("Conta de luz", 150.00, u2, ExpenseStatus.DELAYED, category4);
        Expense expense3 = new Expense("Almoço", 35.00, u1, ExpenseStatus.PAID, category2);
        expenseRepository.saveAll(Arrays.asList(expense1, expense2, expense3));
    }
}
