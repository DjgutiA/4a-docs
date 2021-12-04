const rentalResolver = {
    Query: {
        listRentalByUser: (_, { idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.rentalAPI.listRentalByUser(idUser);
            else
                return null;
        },
        listRentalByCar: (_, { idCar, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.rentalAPI.listRentalByCar(idCar);
            else
                return null;
        },
        getRental: (_, { idRental, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.rentalAPI.getRental(idRental);
            else
                return null;
        },
    },
    Mutation: {
        createRental: async (_, { rentalInput }, { dataSources, userIdToken }) => {
            const availabilityInput = {
                car: rentalInput.idCar,
                start_date: rentalInput.startDate,
                end_date: rentalInput.finalDate,
                is_availability: false,
            }

            let response = await dataSources.carAPI.updateAvailability(availabilityInput);
            if (rentalInput.idUser == userIdToken && response.response)
                return await dataSources.rentalAPI.createRental(rentalInput);
            else
                return null;
        },
        updateRental: async (_, { rentalUpdateInput }, { dataSources, userIdToken }) => {
            let rental = await dataSources.rentalAPI.getRental(rentalUpdateInput.id);
            const availability = {
                car: rental.idCar,
                start_date: rental.startDate,
                end_date: rental.finalDate,
                is_availability: true,
            }
            let response1 = await dataSources.carAPI.updateAvailability(availability);

            const availabilityInput = {
                car: rentalUpdateInput.idCar,
                start_date: rentalUpdateInput.startDate,
                end_date: rentalUpdateInput.finalDate,
                is_availability: false,
            }

            let response2 = await dataSources.carAPI.updateAvailability(availabilityInput);
            if (rentalUpdateInput.idUser == userIdToken && response2.response && response1.response)
                return dataSources.rentalAPI.updateRental(rentalUpdateInput);
            else
                return null;
        },
        deleteRental: async (_, { idRental, idUser }, { dataSources, userIdToken }) => {
            let rental = await dataSources.rentalAPI.getRental(idRental)
            const availability = {
                car: rental.idCar,
                start_date: rental.startDate,
                end_date: rental.finalDate,
                is_availability: true,
            }
            let response = await dataSources.carAPI.updateAvailability(availability);
            if (idUser == userIdToken && response.response)
                return await dataSources.rentalAPI.deleteRental(idRental);
            else
                return null;
        },
    }
};
module.exports = rentalResolver;