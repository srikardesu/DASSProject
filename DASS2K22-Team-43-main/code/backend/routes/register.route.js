const router = require('express').Router();
let spinner = require('../models/spinner');
let dyer = require('../models/dyer');
let weaver = require('../models/weaver');

// adds new user to the database based on the type- spinner, dyer and weaver

router.route('/').post((req, res) => {
  const type = req.body.type
  const data = req.body
  delete data.type

  if(type == 'spinner')
  {
    let user = new spinner(data);
    
        user
            .save()
            .then(user => { res.status(200).json({ 'Status': 'Successful' }) })
            .catch(err => { res.status(400).json({ 'Status': err }); console.log(err) });
  }
  else if(type == 'weaver')
  {
    let user = new weaver(data);
    
    user
        .save()
        .then(user => { res.status(200).json({ 'Status': 'Successful' }) })
        .catch(err => { res.status(400).json({ 'Status': err }); console.log(err) });

  }
  else if(type == 'dyer')
  {
    let user = new dyer(data);
    
    user
        .save()
        .then(user => { res.status(200).json({ 'Status': 'Successful' }) })
        .catch(err => { res.status(400).json({ 'Status': err }); console.log(err) });

  }
        
    });
    module.exports = router;