$(document).ready(function() {

        var username = $("#username");
        var password = $("#password");

        getUsers();
        
        $(document).on("submit", "#registerForm", registerSubmit);

        function registerSubmit(){

             event.preventDefault();
            // Don't do anything if the name fields hasn't been filled out
            if (!nameInput.val().trim().trim()) {
              return;
            }
            // Calling the upsertAuthor function and passing in the value of the username input
            upsertUser({
              name: username.val().trim(),
              password: password.val().trim()
            });

            // db.Author.create({
            //      name: req.body.title,
            //      password: req.body.summary
            //  })
            // .then(function() {
            //      res.redirect('/category');

            // });

            function upsertUser(userData) {
            $.post("/api/authors", userData)
              .then(getAuthors);
            }

    }

    

});