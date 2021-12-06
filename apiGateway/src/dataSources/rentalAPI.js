const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig = require('../server');

class RentalAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = serverConfig.rentalApiUrl;
    }

    async listRentalByUser(idUser) {
        return await this.get(`/rentals/user/${idUser}`);
    }

    async listRentalByCar(idCar) {
        return await this.get(`/rentals/car/${idCar}`);
    }

    async getRental(idRental) {
        return await this.get(`/rental/${idRental}`);
    }

    async createRental(rentalInput) {
        rentalInput = new Object(JSON.parse(JSON.stringify(rentalInput)));
        return await this.post(`/rental/`, rentalInput);
    }

    async updateRental(rentalUpdateInput) {
        rentalUpdateInput = new Object(JSON.parse(JSON.stringify(rentalUpdateInput)));
        return await this.put(`/rental/update/`, rentalUpdateInput);
    }

    async deleteRental(idRental) {
        return await this.delete(`/rental/${idRental}`);
    }
}
module.exports = RentalAPI;