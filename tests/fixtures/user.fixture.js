module.exports = async function(sequelize){
    const User = require('../../models/user')(sequelize);
    try {
        return await User.bulkCreate([{
            last_name:"test",
            first_name:"test",
            email:"test@test.fr",
            password:"test",
        },{
            last_name:"test",
            first_name:"test",
            email:"test-admin@test.fr",
            password:"test",
            role: "admin"
        }]);
    }catch(e){
        console.error(e);
    }
}