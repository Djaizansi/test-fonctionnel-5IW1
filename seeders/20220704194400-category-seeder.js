'use strict';

const models = require('../models');
const Category = models.Category;
const {faker} = require("@faker-js/faker");

module.exports = {
    async up() {
        await Category.bulkCreate(generateCategory(10), {
            validate: true,
            individualHooks: true
        });
    },

    async down() {
        await Category.destroy({
            where: {},
            truncate: true,
            cascade: true,
            force: true
        });
    }
};

const generateCategory = (n) => {
    const categories = [];
    for (let i = 0; i < n; i++) {
        categories.push({
            name: faker.lorem.words(1)
        });
    }
    return categories;
};
