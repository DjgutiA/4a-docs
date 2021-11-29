package com.SixRental.rentalProject.repositories;

import com.SixRental.rentalProject.models.Rental;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RentalRepository extends MongoRepository <Rental, String> {
    List<Rental> findByIdUser (Integer idUser);
    List<Rental> findByIdCar (Integer idCar);
}
