module.exports = function(sequelize, DataTypes) {
    var Vote = sequelize.define("Vote", {
        voted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        classMethods: {
            associate: function(models) {
                Vote.belongsTo(models.Author);
                Vote.belongsTo(models.Summary);
            }
        },
    });

    return Vote;
};
