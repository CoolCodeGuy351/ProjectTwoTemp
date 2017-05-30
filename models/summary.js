module.exports = function(sequelize, DataTypes) {
    var Summary = sequelize.define("Summary", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                Summary.hasMany(models.Vote);
                Summary.hasMany(models.Comment);
                Summary.belongsTo(models.Author);
                Summary.belongsTo(models.Category);
            }
        }
    });
    return Summary;
};