package com.wendellyv.financialmanager.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wendellyv.financialmanager.enums.IncomeStatus;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "tb_income")
public class Income implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto insert + increment of the id
    private Long id;
    private String title;
    private Double amount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT-3")
    private Instant date;
    private IncomeStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "income_category_id")
    private Category incomeCategory;

    public Income() {
    }

    public Income(String title, Double amount, User user, IncomeStatus status, Category incomeCategory) {
        this.title = title;
        this.amount = amount;
        this.user = user;
        this.incomeCategory = incomeCategory;
        date = Instant.now();
        setStatus(status);
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Instant getDate() {
        return date;
    }

    public User getUser() {
        return user;
    }

    public Category getIncomeCategory() {
        return incomeCategory;
    }

    public void setIncomeCategory(Category incomeCategory) {
        this.incomeCategory = incomeCategory;
    }

    public IncomeStatus getStatus() {
        return status;
    }

    public void setStatus(IncomeStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Income income = (Income) o;
        return Objects.equals(id, income.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
