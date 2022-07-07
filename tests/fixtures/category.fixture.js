module.exports = async function(sequelize){
    const Category = require('../../models/category')(sequelize);
    try {
        return await Category.create({
            name: "categoriseeeeeee"
        });
    }catch(e){
        console.error(e);
    }
}