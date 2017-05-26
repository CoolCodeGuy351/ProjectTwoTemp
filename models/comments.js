module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        classMethods: {
            associate: function(models) {
                Comment.hasMany(models.Author);
                Comment.hasMany(models.Summary);
            }
        },
    });
    return Comment;
};
