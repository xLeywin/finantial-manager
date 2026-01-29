package com.wendellyv.financialmanager.config;

import com.wendellyv.financialmanager.entities.Expense;
import com.wendellyv.financialmanager.entities.Income;
import com.wendellyv.financialmanager.entities.User;
import com.wendellyv.financialmanager.enums.ExpenseStatus;
import com.wendellyv.financialmanager.enums.IncomeStatus;
import com.wendellyv.financialmanager.enums.Category;
import com.wendellyv.financialmanager.repositories.ExpenseRepository;
import com.wendellyv.financialmanager.repositories.IncomeRepository;
import com.wendellyv.financialmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Override
    public void run(String... args) throws Exception {
        User u1 = new User("Caio", "caio232@gmail.com", "61912345");
        User u2 = new User("Maria", "maria54@gmail.com", "245675643");
        userRepository.saveAll(Arrays.asList(u1, u2));

        Income income1 = new Income("Salário", 2900.00, u1, IncomeStatus.RECEIVED, Category.SALARY, randomDate(2023, 2024));
        Income income2 = new Income("Salário", 4000.00, u2, IncomeStatus.RECEIVED, Category.SALARY, randomDate(2023, 2024));
        Income income3 = new Income("Bônus", 500.00, u1, IncomeStatus.SCHEDULED, Category.BONUS, randomDate(2022, 2023));
        Income income4 = new Income("Freelance", 1200.00, u2, IncomeStatus.DELAYED, Category.BONUS, randomDate(2022, 2023));
        incomeRepository.saveAll(Arrays.asList(income1, income2, income3, income4));

        Expense expense1 = new Expense("Gasolina", 50.00, u1, ExpenseStatus.PAID, Category.FUEL, randomDate(2023, 2024));
        Expense expense2 = new Expense("Conta de luz", 150.00, u2, ExpenseStatus.DELAYED, Category.HOUSING, randomDate(2023, 2024));
        Expense expense3 = new Expense("Almoço", 35.00, u1, ExpenseStatus.PAID, Category.FOOD, randomDate(2022, 2023));
        Expense expense4 = new Expense("Internet", 39.99, u1, ExpenseStatus.PAID, Category.ENTERTAINMENT, randomDate(2022, 2023));
        expenseRepository.saveAll(Arrays.asList(expense1, expense2, expense3, expense4));
    }

    private Instant randomDate(int startYear, int endYear) {
    long startEpochDay = LocalDate.of(startYear, 1, 1).toEpochDay();
    long endEpochDay = LocalDate.of(endYear, 12, 31).toEpochDay();

        long randomDay = ThreadLocalRandom.current()
                .nextLong(startEpochDay, endEpochDay);

        return LocalDate.ofEpochDay(randomDay)
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant();
    }
}