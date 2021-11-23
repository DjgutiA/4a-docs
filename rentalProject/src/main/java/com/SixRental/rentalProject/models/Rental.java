package com.SixRental.rentalProject.models;

import org.springframework.data.annotation.Id;

import java.time.Instant;
import java.time.LocalDate;

public class Rental {

    @Id
    private String id;
    private Integer id_user;
    private Integer id_car;
    private Instant rentalDate = Instant.now();
    private LocalDate startDate;
    private LocalDate finalDate;
    private Integer price;

    public Rental(String id, Integer id_user, Integer id_car, Instant rentalDate,
                  LocalDate startDate, LocalDate finalDate, Integer price) {
        this.id = id;
        this.id_user = id_user;
        this.id_car = id_car;
        this.rentalDate = rentalDate;
        this.startDate = startDate;
        this.finalDate = finalDate;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getId_user() {
        return id_user;
    }

    public void setId_user(Integer id_user) {
        this.id_user = id_user;
    }

    public Integer getId_car() {
        return id_car;
    }

    public void setId_car(Integer id_car) {
        this.id_car = id_car;
    }

    public Instant getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(Instant rentalDate) {
        this.rentalDate = rentalDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getFinalDate() {
        return finalDate;
    }

    public void setFinalDate(LocalDate finalDate) {
        this.finalDate = finalDate;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Rental{" +
                "id='" + id + '\'' +
                ", id_user=" + id_user +
                ", id_car=" + id_car +
                ", rentalDate=" + rentalDate +
                ", startDate=" + startDate +
                ", finalDate=" + finalDate +
                ", price=" + price +
                '}';
    }
}