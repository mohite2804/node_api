const mysql = require('../../db.js');

exports.getIcList = function(cb) {
    let sql = `select * from ic_master`;
    return mysql.query(sql, cb);
}