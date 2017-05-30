module.exports = function(sequelize, DataTypes) {
    var Author = sequelize.define("Author", {
            // Giving the Author model a name of type STRING
            username: {
                type: DataTypes.STRING,
                len: [1, 25],
            },
            password: {
                type: DataTypes.STRING,
                len: [1, 15],
            },
            email: {
                type: DataTypes.STRING,
                len: [1, 25],
            }
        },
        // Here we'll pass a second "classMethods" object into the define method
        // This is for any additional configuration we want to give our models
        {
            // We're saying that we want our Author to have Summary
            classMethods: {
                associate: function(models) {
                    // Associating Author with Summary
                    // When an Author is deleted, also delete any associated Summary
                    Author.hasMany(models.Summary);
                    // Author.hasMany(models.Vote);
                    // Author.hasMany(models.Comment);
                },
            },
        });
    return Author;
}

//USERNAME FROM SIGN IN
