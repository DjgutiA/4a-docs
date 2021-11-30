const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig = require('../server');

class CarAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = serverConfig.carApiUrl;
    }

    // Car
    async filterCar(carFilter) {
        carFilter = new Object(JSON.parse(JSON.stringify(carFilter)));
        return await this.post(`/cars/filter/`, carFilter);
    }

    async listCar() {
        return await this.get(`/cars/`);
    }

    async getCar(licensePlate) {
        return await this.get(`/car/${licensePlate}`);
    }

    async listBrands() {
        return await this.get(`/brands`);
    }

    async listModel(brand) {
        return await this.get(`/models/${brand}`);
    }

    async createCar(carInput) {
        carInput = new Object(JSON.parse(JSON.stringify(carInput)));
        return await this.post(`/car/`, carInput);
    }

    async updateCar(idCar, carInput) {
        carInput = new Object(JSON.parse(JSON.stringify(carInput)));
        return await this.put(`/car/update/${idCar}`, carInput);
    }

    async deleteCar(idCar) {
        return await this.delete(`/car/delete/${idCar}`);
    }

    // Category
    async listCategory() {
        return await this.get(`/categories`);
    }

    // City
    async listCategory() {
        return await this.get(`/cities`);
    }

    // Availability
    async filterCarAvailability(availabilityFilter) {
        availabilityFilter = new Object(JSON.parse(JSON.stringify(availabilityFilter)));
        return await this.post(`/cars/filter/availability/`, availabilityFilter);
    }

    async filterForCar(idCar) {
        return await this.get(`/availability/${idCar}`);
    }

    async listAvailability() {
        return await this.get(`/cars/filter/availability/`);
    }

    async createAvailability(availabilityInput) {
        availabilityInput = new Object(JSON.parse(JSON.stringify(availabilityInput)));
        return await this.post(`/availability/`, availabilityInput);
    }

    async updateAvailability(availabilityInput) {
        availabilityInput = new Object(JSON.parse(JSON.stringify(availabilityInput)));
        return await this.put(`/availability/update/`, availabilityInput);
    }
}
module.exports = CarAPI;