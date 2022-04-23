const router = require('express').Router();
let yarnPackage = require('../models/YarnPackage');

// Gives all the Yarn Packages
router.route('/').get((req, res) => {
    yarnPackage.find()
    .then(yarnPackage => res.json(yarnPackage))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Return Yarn Package details by ID
router.route('/:id').get((req, res) => {
    // console.log('here');
    yarnPackage.findById(req.params.id)
        .then(yarnPackage => res.json(yarnPackage))
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
    
    const newYarn = new yarnPackage({
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
    yarnPackage.findById(req.params.id)
        .then(yarnPackage => {
            yarnPackage.spinnerID = req.body.spinnerID ? req.body.spinnerID : yarnPackage.spinnerID;
            yarnPackage.countNumber = req.body.countNumber ? req.body.countNumber : yarnPackage.countNumber;
            yarnPackage.twistNumber = req.body.twistNumber ? req.body.twistNumber : yarnPackage.twistNumber;
            yarnPackage.spinDate = req.body.spinDate ? req.body.spinDate : yarnPackage.spinDate;
            yarnPackage.cottonOrigin = req.body.cottonOrigin ? req.body.cottonOrigin : yarnPackage.cottonOrigin;
            yarnPackage.yarnType = req.body.yarnType ? req.body.yarnType : yarnPackage.yarnType;
            yarnPackage.dyerID = req.body.dyerID ? req.body.dyerID : yarnPackage.dyerID;
            yarnPackage.dyeingDate = req.body.dyeingDate ? req.body.dyeingDate : yarnPackage.dyeingDate;
            // if(req.body.colours) 
            yarnPackage.colours = (req.body.colours);
            yarnPackage.specialTreatment = req.body.specialTreatment ? req.body.specialTreatment : yarnPackage.specialTreatment;
            yarnPackage.currentStatus = req.body.currentStatus ? req.body.currentStatus : yarnPackage.currentStatus;
            yarnPackage.weaverID = req.body.weaverID ? req.body.weaverID : yarnPackage.weaverID;
            yarnPackage.save()
                .then(() => res.json('Stock updated Successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Shift Stock
router.route('/shiftstock/:id').post((req, res) => {
    yarnPackage.findById(req.params.id)
        .then(yarnPackage => {
            yarnPackage.spinnerID = yarnPackage.spinnerID;
            yarnPackage.countNumber = yarnPackage.countNumber;
            yarnPackage.twistNumber = yarnPackage.twistNumber;
            yarnPackage.spinDate = yarnPackage.spinDate;
            yarnPackage.cottonOrigin = yarnPackage.cottonOrigin;
            yarnPackage.yarnType = yarnPackage.yarnType;
            yarnPackage.dyerID = req.body.dyerID ? req.body.dyerID : yarnPackage.dyerID;
            yarnPackage.dyeingDate = req.body.dyeingDate ? req.body.dyeingDate : yarnPackage.dyeingDate;
            if(req.body.colours) 
                yarnPackage.colours.push(...req.body.colours);
            yarnPackage.specialTreatment.concat(req.body.specialTreatment);
            yarnPackage.currentStatus = req.body.currentStatus ? req.body.currentStatus : yarnPackage.currentStatus;
            yarnPackage.weaverID = yarnPackage.weaverID;
            yarnPackage.save()
                .then(() => res.json('Stock updated Successfully!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

