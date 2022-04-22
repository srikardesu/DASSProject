const router = require('express').Router();
let spinner = require('../models/spinner');
let dyer = require('../models/dyer');
let weaver = require('../models/weaver');

// Authenticates for login
router.route('/').post((req, res) => {
    console.log("login authentication backend!");
    const email = req.body.email;
    const password = req.body.password;
    spinner.findOne({ email: email, password: password }).then(spinner => {
        // Check if user email exists
        if (!spinner) {
            // User isn't a spinner
            dyer.findOne({ email: email, password: password }).then(dyer => {
                // Check if user email exists
                if (!dyer) {
                    // User isn't a dyer
                    weaver.findOne({ email: email, password: password }).then(weaver => {
                        // Check if user email exists
                        if (!weaver) {
                            return res.status(404).json({
                                error: "Account not found"
                            });
                        }
                        else {
                            console.log(weaver.name);
                            res.send(weaver);
                            return weaver;
                        }
                    });
                }
                else {
                    console.log(dyer.name);
                    res.send(dyer);
                    return dyer;
                }
            })
        }
        else {
            console.log(spinner.name);
            res.send(spinner);
            return spinner;
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;