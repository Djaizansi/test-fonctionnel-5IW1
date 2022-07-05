'use strict';

const models = require('../models');
const User = models.User;
const {faker} = require("@faker-js/faker");
const UserRole = require("../enum/UserRole");

module.exports = {
    async up() {
        await User.bulkCreate(generateUser(10), {
            validate: true,
            individualHooks: true
        });
    },

    async down() {
        await User.destroy({
            where: {},
            truncate: true,
            cascade: true,
            force: true
        });
    }
};

const generateUser = (n) => {
    const users = [];
    for (let i = 0; i < n ; i++) {
        users.push({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: '123',
            role: i === 9 ? UserRole.ADMIN : UserRole.USER,
        });
    }
    return users;
};
