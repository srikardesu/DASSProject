const router = require('express').Router();
let spinner = require('../models/spinner');

// Gives all the Spinners
router.route('/').get((req, res) => {
    spinner.find()
        .then(spinner => res.json(spinner))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Return Profile details by ID
router.route('/:id').get((req, res) => {
    spinner.findById(req.params.id)
        .then(spinner => res.json(spinner))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/editprofile/').post((req, res) => {
    var _id = req.body._id;
    console.log("_id: " + _id);
    let user = new spinner(req.body);
    
 spinner.findByIdAndUpdate(_id, user, { new: true }, function(
        err,
        user
      ) {
        if (err) {
          console.log("err", err);
          res.status(500).send(err);
        } else {
          console.log("success");
          res.send(user);
        }
      });
    
});

module.exports = router;

