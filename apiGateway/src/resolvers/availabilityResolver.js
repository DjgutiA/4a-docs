const availabilityResolver = {
    Query: {
        filterCarAvailability: (_, { availabilityFilter }, { dataSources }) => {
            return dataSources.carAPI.filterCarAvailability(availabilityFilter);
        },
        filterForCar: (_, { id_car }, { dataSources }) => {
            return dataSources.carAPI.filterForCar(id_car);
        },
        listAvailability: (_, __, { dataSources }) => {
            return dataSources.carAPI.listAvailability();
        },

    },
    Mutation: {
        createAvailability: (_, { availabilityInput }, { dataSources }) => {
            return dataSources.carAPI.createAvailability(availabilityInput);
        },

        updateAvailability: (_, { availabilityInput }, { dataSources }) => {
            return dataSources.carAPI.updateAvailability(availabilityInput);
        },

    }
};
module.exports = availabilityResolver;