const router = require('express').Router();
let fabric = require('../models/Fabric');

// Gives all the Fabrics
router.route('/').get((req, res) => {
    fabric.find()
    .then(fabric => res.json(fabric))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Return Yarn Package details by ID
router.route('/:id').get((req, res) => {
    // console.log('here');
    fabric.findById(req.params.id)
        .then(fabric => res.json(fabric))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add Stock
router.route('/add').post((req, res) => {
    const spinnerID = req.body.spinnerID;
    const countNumber = req.body.countNumber;
    const twistNumber = req.body.twistNumber;
    const spinDate = req.body.spinDate;
    const cottonOrigin = req.body.cottonOrigin;
    const yarnType = req.body.yarnType;
    const dyerID = req.body.dyerID;
    const dyeingDate = req.body.dyeingDate;
    const colours = req.body.colours
    const specialTreatment = req.body.specialTreatment;
    const currentStatus = req.body.currentStatus;
    const weaverID = req.body.weaverID;
    
    const newYarn = new fabric({
        spinnerID,
        countNumber,
        twistNumber,
        spinDate,
        cottonOrigin,
        yarnType,
        dyerID,
        dyeingDate,
        colours,
        specialTreatment,
        currentStatus,
        weaverID
    });

    newYarn.save()
        .then(() => res.json('Yarn Package added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update Stock
router.route('/updatestock/:id').post((req, res) => {
    console.log('here');
    fabric.findById(req.params.id)
        .then(fabric => {
            fabric.spinnerID = req.body.spinnerID ? req.body.spinnerID : fabric.spinnerID;
            fabric.countNumber = req.body.countNumber ? req.body.countNumber : fabric.countNumber;
            fabric.twistNumber = req.body.twistNumber ? req.body.twistNumber : fabric.twistNumber;
            fabric.spinDate = req.body.spinDate ? req.body.spinDate : fabric.spinDate;
            fabric.cottonOrigin = req.body.cottonOrigin ? req.body.cottonOrigin : fabric.cottonOrigin;
            fabric.yarnType = req.body.yarnType ? req.body.yarnType : fabric.yarnType;
            fabric.dyerID = req.body.dyerID ? req.body.dyerID : fabric.dyerID;
            fabric.dyeingDate = req.body.dyeingDate ? req.body.dyeingDate : fabric.dyeingDate;
            // if(req.body.colours) 
            fabric.colours = (req.body.colours);
            fabric.specialTreatment = req.body.specialTreatment ? req.body.specialTreatment : fabric.specialTreatment;
            fabric.currentStatus = req.body.currentStatus ? req.body.currentStatus : fabric.currentStatus;
            fabric.weaverID = req.body.weaverID ? req.body.weaverID : fabric.weaverID;
            fabric.save()
                .then(() => res.json('Stock updated Successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Shift Stock
router.route('/shiftstock/:id').post((req, res) => {
    fabric.findById(req.params.id)
        .then(fabric => {
            fabric.spinnerID = fabric.spinnerID;
            fabric.countNumber = fabric.countNumber;
            fabric.twistNumber = fabric.twistNumber;
            fabric.spinDate = fabric.spinDate;
            fabric.cottonOrigin = fabric.cottonOrigin;
            fabric.yarnType = fabric.yarnType;
            fabric.dyerID = req.body.dyerID ? req.body.dyerID : fabric.dyerID;
            fabric.dyeingDate = req.body.dyeingDate ? req.body.dyeingDate : fabric.dyeingDate;
            if(req.body.colours) 
                fabric.colours.push(...req.body.colours);
            fabric.specialTreatment.concat(req.body.specialTreatment);
            fabric.currentStatus = req.body.currentStatus ? req.body.currentStatus : fabric.currentStatus;
            fabric.weaverID = fabric.weaverID;
            fabric.save()
                .then(() => res.json('Stock updated Successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

