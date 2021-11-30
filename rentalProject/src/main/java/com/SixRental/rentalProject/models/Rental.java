package com.SixRental.rentalProject.models;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.time.LocalDate;

public class Rental {

    @Id
    private String id;
    private Integer idUser;
    private Integer idCar;
    private LocalDateTime rentalDate;
    private LocalDate startDate;
    private LocalDate finalDate;
    private Integer price;

    public Rental(String id, Integer idUser, Integer idCar, LocalDate startDate, LocalDate finalDate, Integer price) {
        this.id = id;
        this.idUser = idUser;
        this.idCar = idCar;
        this.rentalDate = LocalDateTime.now();
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

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer id_user) {
        this.idUser = id_user;
    }

    public Integer getIdCar() {
        return idCar;
    }

    public void setIdCar(Integer id_car) {
        this.idCar = id_car;
    }

    public LocalDateTime getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(LocalDateTime rentalDate) {
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
                ", id_user=" + idUser +
                ", id_car=" + idCar +
                ", rentalDate=" + rentalDate +
                ", startDate=" + startDate +
                ", finalDate=" + finalDate +
                ", price=" + price +
                '}';
    }
}