const availabilityTypeDefs = require('./availabilityTypeDefs');
const carTypeDefs = require('./carTypeDefs');
const categoryTypeDefs = require('./categoryTypeDefs');
const cityTypeDefs = require('./cityTypeDefs');
const rentalTypeDefs = require('./rentalTypeDefs');
const userTypeDefs = require('./userTypeDefs');

const schemasArrays = [userTypeDefs, cityTypeDefs, categoryTypeDefs, carTypeDefs, availabilityTypeDefs, rentalTypeDefs];

module.exports = schemasArrays;