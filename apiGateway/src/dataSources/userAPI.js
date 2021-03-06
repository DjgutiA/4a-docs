const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig = require('../server');

class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = serverConfig.userApiUrl;
    }

    async signUpUser(user) {
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.post(`/user/`, user);
    }

    async userDetailById(userId) {
        return await this.get(`/user/${userId}`);
    }
    async logIn(credentials) {
        credentials = new Object(JSON.parse(JSON.stringify(credentials)));
        return await this.post(`/login/`, credentials);
    }
    async refreshToken(token) {
        token = new Object(JSON.parse(JSON.stringify({ refresh: token })));
        return await this.post(`/refresh/`, token);
    }
}
module.exports = UserAPI;