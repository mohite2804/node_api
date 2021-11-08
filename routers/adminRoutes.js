const express = require('express');
const router = express.Router();
const mysql = require('../db.js');
console.log('get admin routes');


router.get('/login', (req, res) => {
    console.log('get login');
    let sql = "select * from admin_user_master where email= 'admin@gmail.com' and password = '4297f44b13955235245b2497399d7a93'";
    mysql.query(sql, (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                status: false,
                message: "Please contact to Administrator.",
                error: err
            });
        } else {
            res.status(200).json({
                status: true,
                message: "Login successfully",
                result: row
            });
        }
    });
});

module.exports = router;