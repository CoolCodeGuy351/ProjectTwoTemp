module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        classMethods: {
            associate: function(models) {
                Comment.belongsTo(models.Author);
                Comment.belongsTo(models.Summary);
            }
        },
    });
    return Comment;
};
