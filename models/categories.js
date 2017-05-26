module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        classMethods: {
            associate: function(models) {
                Category.belongTo(models.Summary)
            };
        }
    });
    return Comment;
};
