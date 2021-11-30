package com.SixRental.rentalProject.exceptions;

public class RentalNotFoundException extends RuntimeException{
    public RentalNotFoundException(String message){
        super(message);
    }
}
