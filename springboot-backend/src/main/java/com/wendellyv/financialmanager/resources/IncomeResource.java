package com.wendellyv.financialmanager.resources;

import com.wendellyv.financialmanager.entities.Income;
import com.wendellyv.financialmanager.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = { "/incomes", "/incomes/" })
@CrossOrigin(origins = "${frontend.url}")
public class IncomeResource {

    @Autowired
    private IncomeService incomeService;

    @GetMapping
    public ResponseEntity<List<Income>> findAll(@RequestParam Long userId) {
    return ResponseEntity.ok(incomeService.findAll(userId));
}

    @GetMapping(value = "/{id}")
    public ResponseEntity<Income> findById(@PathVariable Long id) {
        Income obj = incomeService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Income> insertIncome(@RequestBody Income income) {
        income = incomeService.insert(income);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(income.getId())
                .toUri();

        return ResponseEntity.created(uri).body(income);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Income> updateIncome(@PathVariable Long id, @RequestBody Income updatedIncome) {
        updatedIncome = incomeService.update(id, updatedIncome);
        return ResponseEntity.ok().body(updatedIncome);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}