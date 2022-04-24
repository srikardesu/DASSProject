const router = require('express').Router();
let fabric = require('../models/Fabric');

// Gives all the Fabrics
router.route('/').get((req, res) => {
    fabric.find()
    .then(fabric => res.json(fabric))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Returns Fabric details by ID
router.route('/:id').get((req, res) => {
    // console.log('here');
    fabric.findOne({_id: req.params.id})
        .then(fabric => res.json(fabric))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Create new fabric
router.route('/add').post((req, res) => {
    const yarnPackageNumber = req.body.yarnPackageNumber;      // will reference to the yarn package
    const weaverID = req.body.weaverID;
    const completionDate = req.body.completionDate;
    const length = req.body.length;
    const Colours = req.body.Colours;
    const Sold = req.body.Sold;

    const newFabric = new fabric({
        yarnPackageNumber,
        weaverID,
        completionDate,
        length,
        Colours,
        Sold
    });

    newFabric.save()
        .then(() => res.json('Fabric created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update Fabric
router.route('/updatefabric/:id').post((req, res) => {
    console.log('here');
    fabric.findById(req.params.id)
        .then(fabric => {

            fabric.yarnPackageNumber = req.body.yarnPackageNumber ? req.body.yarnPackageNumber : fabric.yarnPackageNumber;
            fabric.weaverID = req.body.weaverID ? req.body.weaverID : fabric.weaverID;
            fabric.completionDate = req.body.completionDate ? req.body.completionDate : fabric.completionDate;
            fabric.length = req.body.length ? req.body.length : fabric.length;
            fabric.Colours = req.body.Colours ? req.body.Colours : fabric.Colours;
            fabric.Sold = req.body.Sold ? req.body.Sold : fabric.Sold;
            
            fabric.save()
                .then(() => res.json('Fabric updated Successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// Delete Fabric (For testing)
router.route('/deletestock/:id').delete((req,res) => {
    fabric.deleteMany({_id: req.params.id})
        .then(deletedEntry => {
            res.json('Fabric deleted!')
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});

module.exports = router;

