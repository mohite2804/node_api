const userModel = require('../../models/front/userModel.js');
const icModel = require('../../models/front/icModel.js');


const jwtToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = function(req, res) {
    var password = bcrypt.hashSync(req.fields.password, saltRounds);;
    let input_data = {
        business_partner_master_id: "10",
        parent_id: '0',
        pos_master_id: "32",
        user_type_id: "2",
        business_partner_master_id: "10",
        email: "isuzu_user1@gmail.com",
        mobile_no: "9922992299",
        first_name: "isuzu",
        last_name: "user 1",
        dob: "2000-01-01",
        gender: "M",
        status_id: "1",
        created_at: "2021-01-01",
        password: password,
        city_id: "86",
        state_id: "21",
        pincode_id: "4282",
        language_id: "1"
    }
    userModel.add(input_data, (err, result) => {
        if (err) {
            res.json({
                status: false,
                message: 'Please contact to administrator',
                err: err
            });
        } else {
            res.json({
                status: true,
                message: 'Insert data into table successfully'
            });
        }
    });


}


exports.login = function(req, res) {
    var password_g = bcrypt.hashSync(req.fields.password, saltRounds);
    //console.log(password_g);
    var user_name = req.fields.user_name;
    var password = req.fields.password;

    userModel.getUserDetailByEmail(user_name, (err, result) => {

        if (err) {
            return res.json({
                status: false,
                message: 'Please contact to administrator',
                err: err
            });
        }
        if (result.lenght === 0) {
            return res.json({
                status: false,
                message: 'Incorrect user name'
            });
        }
        var result = result[0];


        bcrypt.compare(password, result.password, (errr, isMatch) => {
            console.log("err" + errr);
            if (err) {
                return res.json({
                    status: false,
                    message: 'Please contact to administrator...',
                    err: errr
                });
            }
            console.log(isMatch);
            if (!isMatch) {
                return res.json({
                    status: false,
                    message: 'Incorrec password'
                });
            }


            const options = {
                subject: `${result.id}`,
                expiresIn: 3600
            }
            const payload = {
                email: result.email
            }
            const token = jwtToken.sign(payload, 'Avinash123', options);
            console.log(result.password);
            delete result.password;
            //console.log(result.password);

            return res.json({
                status: true,
                message: 'get data successfully.',
                result: result,
                token: token
            });
        });



    });
};


exports.updateProfile = function(req, res) {
    var id = req.fields.id;
    var fname = req.fields.fname;
    var mname = req.fields.mname;
    var lname = req.fields.lname;
    var password = req.fields.password;
    var email = req.fields.email;
    var mobile_no = req.fields.mobile_no;
    var address = req.fields.address;
    var input_data = {};
    var where = {};

    if (id) where['id'] = id;

    if (fname) input_data['fname'] = fname;
    if (mname) input_data['mname'] = mname;
    if (lname) input_data['lname'] = lname;
    if (email) input_data['email'] = email;
    if (mobile_no) input_data['mobile_no'] = mobile_no;
    if (address) input_data['address'] = address;


    console.log(input_data);
    console.log(where);
    userModel.update(input_data, where, (err, result) => {
        if (err) {
            return res.json({
                status: false,
                message: 'Please contact to administrator',
                err: err
            });
        }

        return res.json({
            status: true,
            message: 'Profile update successfully'
        });
    });
}


exports.getAllUserss = function(req, res) {
    return res.json({
        status: true,
        message: 'Records get successfully',

    });


}

exports.getAllUsers = function(req, res) {
    userModel.getAllUsers((err, result) => {
        if (err) {
            return res.json({
                status: false,
                message: 'Please contact to administrator',
                err: err
            });
        }
        if (result.lenght === 0) {
            return res.json({
                status: true,
                message: 'Records not available',
                err: err
            });
        }
        return res.json({
            status: true,
            message: 'Records get successfully',
            result: result
        });

    });
}



// exports.login = function(req, res) {
//     passport.authenticate('local', { session: false }, function(err, result, info) {
//         if (err) {
//             res.json({
//                 status: false,
//                 message: 'Please contact to administrator',
//                 err: err
//             });
//         }
//         if (!result) {
//             res.json({
//                 status: false,
//                 message: 'Please contact to administrator',
//                 err: err
//             });
//         }

//         const payload = {
//             username: result.email,
//             full_name: result.full_name
//         }
//         const options = {
//             subject: "${result.user_master_id}",
//             expiresIn: 3600
//         }
//         const token = jwtToken.sign(payload, 'Avinash123', options);

//         res.json({
//             status: true,
//             message: "Login successfully",
//             result: result,
//             token: token

//         });
//         return res;
//     });
// }