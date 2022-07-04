const {sequelize} = require('../index');

sequelize
    .sync({ force: true })
    .then((result) => console.log("All models were synchronized successfully."))
    .catch((result) => console.error(result, "Error with models synchronization"));