const availabilityResolver = {
    Query: {
        filterCarAvailability: (_, { availabilityFilter, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.filterCarAvailability(availabilityFilter);
            else
                return null
        },
        filterAvailabilityByCar: (_, { id_car, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.filterAvailabilityByCar(id_car);
            else
                return null
        },
        listAvailability: (_, { idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.listAvailability();
            else
                return null
        },

    },
    Mutation: {
        createAvailability: async (_, { availabilityInput, idUser }, { dataSources, userIdToken }) => {
            isAdmin = (await dataSources.userAPI.userDetailById(idUser)).is_superuser
            if (idUser == userIdToken && isAdmin)
                return dataSources.carAPI.createAvailability(availabilityInput);
            else
                return null
        },

        updateAvailability: (_, { availabilityInput, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.updateAvailability(availabilityInput);
            else
                null
        },

    }
};
module.exports = availabilityResolver;