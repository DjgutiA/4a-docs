const userResolver = require('./userResolver');
const categoryResolver = require('./categoryResolver');
const cityResolver = require('./cityResolver');
const lodash = require('lodash');
const resolvers = lodash.merge(userResolver, categoryResolver, cityResolver);
module.exports = resolvers;