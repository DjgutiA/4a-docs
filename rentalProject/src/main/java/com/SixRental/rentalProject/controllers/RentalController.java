package com.SixRental.rentalProject.controllers;
import com.SixRental.rentalProject.models.Rental;
import com.SixRental.rentalProject.repositories.RentalRepository;
import com.SixRental.rentalProject.exceptions.RentalNotFoundException;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RentalController {
    private final RentalRepository rentalRepository;

    public RentalController(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    @PostMapping("/rental")
    Rental newRental(@RequestBody Rental rental){
        return rentalRepository.save(rental);
    }

    @GetMapping("/rental/{id}")
    Rental getRental(@PathVariable String id){
        return rentalRepository.findById(id).orElseThrow(() -> new RentalNotFoundException("No se encontró reserva con el id " + id));
    }

    @DeleteMapping("/rental/{id}")
    Map<String, String> deleteRental(@PathVariable String id){
        Rental rental = rentalRepository.findById(id).orElse(null);
        if (rental == null){
            throw new RentalNotFoundException("No se encontró reserva con el id " + id);
        }
        rentalRepository.deleteById(id);
        HashMap<String, String> response = new HashMap<>();
        response.put("response", id + " deleted");
        return response;
    }

    @PutMapping("/rental/update")
    Rental updateRental(@RequestBody Rental rental){
        Rental rentalDB = rentalRepository.findById(rental.getId()).orElseThrow(() -> new RentalNotFoundException("No se encontró reserva con el id " + rental.getId()));
        rentalDB.setIdCar(rental.getIdCar());
        rentalDB.setIdUser(rental.getIdUser());
        rentalDB.setFinalDate(rental.getFinalDate());
        rentalDB.setStartDate(rental.getStartDate());
        rentalDB.setPrice(rental.getPrice());
        return rentalRepository.save(rentalDB);
    }

    @GetMapping("/rentals/user/{idUser}")
    List<Rental> rentalsListForUser(@PathVariable Integer idUser){
        return rentalRepository.findByIdUser(idUser);
    }

    @GetMapping("/rentals/car/{idCar}")
    List<Rental> rentalsListForCar(@PathVariable Integer idCar){
        return rentalRepository.findByIdCar(idCar);
    }
}
