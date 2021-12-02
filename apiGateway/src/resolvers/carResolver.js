const carResolver = {
    Query: {
        filterCar: (_, { carFilter }, { dataSources }) => {
            return dataSources.carAPI.filterCar(carFilter);
        },
        listCar: (_, __, { dataSources }) => {
            return dataSources.carAPI.listCar();
        },
        getCar: (_, { license_plate }, { dataSources }) => {
            return dataSources.carAPI.getCar(license_plate);
        },
        listBrands: (_, __, { dataSources }) => {
            return dataSources.carAPI.listBrands();
        },
        listModel: (_, { brand }, { dataSources }) => {
            return dataSources.carAPI.listModel(brand);
        },
    },
    Mutation: {
        createCar: (_, { carInput }, { dataSources }) => {
            return dataSources.carAPI.createCar(carInput);
        },
        updateCar: (_, { id_car, carInput }, { dataSources }) => {
            return dataSources.carAPI.updateCar(id_car, carInput);
        },
        deleteCar: (_, { id_car }, { dataSources }) => {
            return dataSources.carAPI.deleteCar(id_car);
        },
    }
};
module.exports = carResolver;