const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: "103.87.174.174",
//     port: 3306,
//     user: "mypolicy_rew",
//     password: "8^{J@-,(m#Ctz.6J",
//     database: "mypolicy_rewamp_dev"

// });

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "shardha"

});

connection.connect((err) => {
    if (err) {
        //  throw (err);
        console.log('connection fail');
    } else {
        console.log('connection success');
    }
});
module.exports = connection;