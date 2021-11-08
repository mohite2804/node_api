const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const formidable = require('express-formidable');
app.use(formidable());

const frontRoutes = require('./routers/frontRoutes.js');
const adminRoutes = require('./routers/adminRoutes.js');





app.use(cors({ origin: "http://localhost:4200/" }));

app.use('/', frontRoutes);
app.use('/admin', adminRoutes);



app.listen(3000, () => {
    console.log('Server is running');
});