'use strict';

const models = require('../models');
const Project = models.Project;
const {faker} = require("@faker-js/faker");

module.exports = {
    async up(queryInterface) {
        const userResults = await queryInterface.sequelize.query('SELECT * FROM users');
        const categoryResults = await queryInterface.sequelize.query('SELECT * FROM categories');
        await Project.bulkCreate(await generateProject(10, userResults[0], categoryResults[0]), {
            validate: true,
            individualHooks: true
        });
    },

    async down() {
        await Project.destroy({
            where: {},
            truncate: true,
            cascade: true,
            force: true,
        });
    }
};

const generateProject = async (n, users,categories) => {
    const projects = [];
    for (let i = 0; i < n; i++) {
        projects.push({
            title: faker.lorem.sentence(3),
            description: faker.lorem.sentence(8),
            start_date: faker.date.past(),
            end_date: faker.date.future(),
            status: faker.datatype.boolean(),
            user_id: users[parseInt(faker.finance.amount(1,9))].id,
            category_id: categories[parseInt(faker.finance.amount(1,9))].id
        });
    }
    return projects;
};
