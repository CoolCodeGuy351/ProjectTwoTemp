// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var bcrypt = require('bcryptjs');
// Routes
// =============================================================
// module.exports = {
//     findCountAll: function(req, res, next) {
//         return db.Summary.findAndCountAll({
//             include: [{
//                 model: Category,
//                 required: true,
//                 attributes: [
//                     [db.sequelize.fn('COUNT', sequelize.col('title'), 'count')]
//                 ]
//             }],
//             group: ['title'],
//             orderBy: "count DESC",
//             limit: 4
//         })
//     },
//     search: function() {
//         return db.Summary.findAll({
//                 where: {
//                     title: req.body.search
//                 }
//             })
//             .then(function() {
//                 res.redirect('/category');
//             });

//     }

// }
module.exports = function(app) {

        // Get route for returning summaries of a specific category

        app.get("/category/:category", function(req, res) {
            db.Summary.findAll({
                    where: {
                        category: req.params.category
                    }
                })
                .then(function() {
                    res.redirect('/category');
                });
        });

        // NEED TO TEST THIS OUT
        app.get("/category/top12/:category", function(req, res) {
            db.Summary.findAndCountAll({
                    include: [{
                        model: Category,
                        required: true,
                        attributes: [
                            [db.sequelize.fn('COUNT', sequelize.col('title'), 'count')]
                        ]
                    }],
                    group: ['title'],
                    orderBy: "count DESC",
                    limit: 12
                })
                .then(function() {
                    res.redirect('/category');
                });
        });


        // Get route for retrieving a single title
        //Need to put in object for render as second object
        app.get("/search", function(req, res) {
            db.Summary.findAll({
                    where: {
                        title: req.body.search
                    }
                })
                .then(function() {
                    res.redirect('/category');
                });
        });

        // POST route for saving a new post
        // id should come from local storage
        //category id will have to look up in the category table to find the ID


        app.post("/post", function(req, res) {
            console.log(req.body);
            db.Category.findOne({
                where: {
                    category: req.body.categName
                }
            }).then(function(data) {

                db.Summary.create({
                        title: req.body.title,
                        summary: req.body.summary,
                        CategoryId: data.dataValues.id,
                        AuthorId: req.body.authId
                    })
                    .then(function() {
                        res.redirect('/home');
                    });
            });
        });

        // DELETE route for deleting posts
        //DONE
        app.delete("/delete/posts/:id", function(req, res) {
            db.Summary.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(function() {
                    res.redirect('/home');
                });
        });

        // PUT route for updating posts
        //DONE
        app.put("/posts", function(req, res) {
            db.Summary.update(req.body, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(function() {
                    res.redirect('/category');
                });
        });

        // =============================================================
        //                  LOGIN
        // =============================================================

        // on sign in. going to have to create a link from the login that links to the homepage on the submit click
        // make an if/else statement to send the user an error message or page if they mess up on the sign in.

        app.post('/login', function(req, res) {
            db.Author.findOne({
                where: {
                    username: req.body.user
                }
            }).then(function(data) {
                bcrypt.compare(req.body.pass, data.password, function(err, res) {
                    res.json(data);
                });

            })
        });

        app.post('/register', function(req, res) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                                // Store hash in your password DB. 
                    db.Author.create({
                        username: req.body.username,
                        password: hash,
                        email: req.body.email,
                    }).then(function(data) {
                        res.json(data);
                    });
                });
            });
        });
    }
    // end of module.exports


//on submit button

// var syllables = [],
// var syllableCount = 0
// for (var i = 0; i < syllables.length; i++) {
// var queryURL = "https://wordsapiv1.p.mashape.com/words/" + syllables[i] + "/syllables";
// $.ajax({
//   url: queryURL,
//   method: "GET"
//   }).done(function (syllables) {
//     console.log(syllables.syllables.count)
//     syllableCount += syllables.syllables.count
//   })

//   if (syllableCount === 14) {
//      db.Summary.create({
//               title: req.body.title,
//               summary: req.body.summary
//           })
//           .then(function() {
//               res.redirect('/category');
//           });
//   } else {
// console.log("This isn't 14 syllables, try again")
// }

// }


// }
