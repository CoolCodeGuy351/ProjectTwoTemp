module.exports = function(sequelize, DataTypes) {
        var Author = sequelize.define("Author", {
                // Giving the Author model a name of type STRING
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [1]
                    }
                },
                username: {
                    type: DataTypes.STRING,
                    len: [4, 25],
                },
                password: {
                    type: DataTypes.STRING,
                    len: [6, 15],
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
                        Author.belongsTo(models.Summary);
                        Author.belongsTo(models.Vote);
                        Author.belongsTo(models.Comment);
                    },
                },
            });
                        return Author;
        }

        //USERNAME FROM SIGN IN
