package com.hexaware.cms.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PlayerNotFoundException.class)
    public String handlePlayerNotFound(PlayerNotFoundException ex) {
        return ex.getMessage();
    }
    
    @ExceptionHandler(DataIntegrityViolationException.class)
    public String handleDuplicate(DataIntegrityViolationException ex) {
        return "Duplicate data found. This value must be unique.";
    }
    
}