const supertest = require('supertest');
const App = require('../app');
const {sequelize} = require('../models');
let userFixture, categoryFixture;
let request, user, category;

beforeAll(async () => {
    request = supertest(App);
    jest.resetModules();
    userFixture = require('./fixtures/user.fixture');
    categoryFixture = require('./fixtures/category.fixture');
});

beforeEach(async () => {
    sequelize.constructor._cls = new Map();
    sequelize.constructor._cls.set('transaction', await sequelize.transaction());

    user = await userFixture(sequelize);
    category = await categoryFixture(sequelize);

    const userValue = user[0].dataValues;
    const categoryValue = category.dataValues;

    const response = await request.post('/login').set('Content-Type', 'application/json').send({
        email: userValue.email,
        password: userValue.password
    });

    userValue.token = response.body.token;
});

afterEach(async () => {
    await sequelize.constructor._cls.get('transaction').rollback();
});

afterAll(async () => {
    sequelize.close();
})

const authRequest = (endpoint, method = 'get') => {
    return request[method](endpoint).set('Authorization', 'Bearer ' + user.token);
}

describe('Category', () => {
    it('should get all categories', async() => {
        console.log('coco');
    });
});