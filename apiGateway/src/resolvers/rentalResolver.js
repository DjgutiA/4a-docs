const rentalResolver = {
    Query: {
        listRentalForUser: (_, { idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.rentalAPI.listRentalForUser(idUser);
            else
                return null;
        },
        listRentalForCar: (_, { idCar, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.rentalAPI.listRentalForCar(idCar);
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
        createRental: (_, { rentalInput }, { dataSources, userIdToken }) => {
            if (rentalInput.idUser == userIdToken)
                return dataSources.rentalAPI.createRental(rentalInput);
            else
                return null;
        },
        updateRental: (_, { rentalUpdateInput }, { dataSources, userIdToken }) => {
            if (rentalUpdateInput.idUser == userIdToken)
                return dataSources.rentalAPI.updateRental(rentalUpdateInput);
            else
                return null;
        },
        deleteRental: (_, { idRental, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.rentalAPI.deleteRental(idRental);
            else
                return null;
        },
    }
};
module.exports = rentalResolver;