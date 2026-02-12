package com.wendellyv.financialmanager.resources;

import com.wendellyv.financialmanager.entities.Expense;
import com.wendellyv.financialmanager.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = { "/expenses", "/expenses/" })
@CrossOrigin(origins = "${frontend.url}")
public class ExpenseResource {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<Expense>> findAll(@RequestParam Long userId) {
    return ResponseEntity.ok(expenseService.findAll(userId));
}

    @GetMapping(value = "/{id}")
    public ResponseEntity<Expense> findById(@PathVariable Long id) {
        Expense obj = expenseService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Expense> insertExpense(@RequestBody Expense expense) {
        expense = expenseService.insert(expense);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(expense.getId())
                .toUri();

        return ResponseEntity.created(uri).body(expense);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) {
        updatedExpense = expenseService.update(id, updatedExpense);
        return ResponseEntity.ok().body(updatedExpense);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}