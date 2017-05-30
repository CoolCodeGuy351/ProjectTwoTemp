module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        classMethods: {
            associate: function(models) {
                Category.hasMany(models.Summary)
            },
        }, timestamps: false
    });
    return Category;
};
