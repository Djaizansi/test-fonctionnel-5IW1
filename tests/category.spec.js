const supertest = require('supertest');
const App = require('../app');
const {sequelize} = require('../models');
const userFixture = require('./fixtures/user.fixture');
const categoryFixture = require('./fixtures/category.fixture');

let request, user, category;

beforeAll(async () => {
    request = supertest(App);
});

beforeEach(async () => {
    sequelize.constructor._cls = new Map();
    sequelize.constructor._cls.set('transaction', await sequelize.transaction());

    user = await userFixture(sequelize);
    category = await categoryFixture(sequelize);

    const response = await request.post('/login').set('Content-Type', 'application/json').send({
        email: user[0].email,
        password: user[0].password
    });

    user.token = response.body.token;
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