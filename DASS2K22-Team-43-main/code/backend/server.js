const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const weaverRouter = require('./routes/weaver.route');
const spinnerRouter = require('./routes/spinner.route');
const dyerRouter = require('./routes/dyer.route');
const loginAuthentication = require('./routes/login.route')
const register = require('./routes/register.route')
const YarnPackage = require('./routes/yarnPackage.route');
const Fabric = require('./routes/fabric.route');

app.use('/login', loginAuthentication);
app.use('/weaver', weaverRouter);
app.use('/spinner', spinnerRouter);
app.use('/dyer', dyerRouter);
app.use('/register', register)
app.use('/yarnPackage', YarnPackage);
app.use('/fabric', Fabric);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app