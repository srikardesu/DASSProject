const router = require('express').Router();
let weaver = require('../models/dyer');

// Get all weavers
router.route('/').get((req, res) => {
    weaver.find()
        .then(weaver => res.json(weaver))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    weaver.findById(req.params.id)
        .then(weaver => res.json(weaver))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/editprofile/').post((req, res) => {
    var _id = req.body._id;
    console.log("_id: " + _id);
    let user = new weaver(req.body);
    
 weaver.findByIdAndUpdate(_id, user, { new: true }, function(
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

