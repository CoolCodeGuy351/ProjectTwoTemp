module.exports = function(sequelize, DataTypes) {
    var Vote = sequelize.define("Vote", {
        voted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        classMethods: {
            associate: function(models) {
                Vote.hasMany(models.Author);
                Vote.hasMany(models.Summary);
            }
        },
    });

    return Vote;
};
