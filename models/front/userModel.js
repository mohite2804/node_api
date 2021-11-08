const mysql = require('../../db.js');

exports.login = function(req, cb) {
    let sql = `select * from users where email= "${req.user_name}" and password = "${req.password}"`;
    return mysql.query(sql, cb);
}

exports.getUserDetailByEmail = function(user_name, cb) {
    let sql = `select password,id, fname, mname, lname, mobile_no, email, address from users  where email= "${user_name}"`;
    console.log(sql);
    return mysql.query(sql, cb);
}

exports.getUserDetailById = function(id, cb) {
    let sql = `select * from users where id = "${id}"`;
    return mysql.query(sql, cb);
}


exports.add = function(req, cb) {
    let sql = `INSERT INTO users SET ?`;
    return mysql.query(sql, [req], cb);
}

exports.update = function(req, where, cb) {
    let sql = `UPDATE users SET ? WHERE ?`;
    return mysql.query(sql, [req, where], cb);
}

exports.getAllUsers = function(cb) {
    let sql = `select * from users`;
    return mysql.query(sql, cb);
}