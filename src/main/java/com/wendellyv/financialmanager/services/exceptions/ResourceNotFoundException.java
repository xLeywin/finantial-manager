package com.wendellyv.financialmanager.services.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(Object id) {
        super("Resource with id " + id + " not found");
    }
}
