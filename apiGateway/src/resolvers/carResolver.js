const carResolver = {
    Query: {
        filterCar: (_, { carFilter, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.filterCar(carFilter);
            else
                return null
        },
        listCar: (_, { idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.listCar();
            else
                return null
        },
        getCar: (_, { license_plate, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.getCar(license_plate);
            else
                return null
        },
        listBrands: (_, { idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.listBrands();
            else
                return null
        },
        listModel: (_, { brand, idUser }, { dataSources, userIdToken }) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.listModel(brand);
            else
                return null
        },
    },
    Mutation: {
        createCar: async (_, { carInput, idUser }, { dataSources, userIdToken }) => {
            isAdmin = (await dataSources.userAPI.userDetailById(idUser)).is_superuser
            if (idUser == userIdToken && isAdmin)
                return dataSources.carAPI.createCar(carInput);
            else
                return null
        },
        updateCar: async (_, { id_car, carInput, idUser }, { dataSources, userIdToken }) => {
            isAdmin = (await dataSources.userAPI.userDetailById(idUser)).is_superuser
            if (idUser == userIdToken && isAdmin)
                return dataSources.carAPI.updateCar(id_car, carInput);
            else
                return null
        },
        deleteCar: async (_, { id_car, idUser }, { dataSources, userIdToken }) => {
            isAdmin = (await dataSources.userAPI.userDetailById(idUser)).is_superuser
            if (idUser == userIdToken && isAdmin)
                return dataSources.carAPI.deleteCar(id_car);
            else
                return null
        },
    }
};
module.exports = carResolver;