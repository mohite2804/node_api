var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

const userModel = require('../models/front/userModel.js');
var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = 'Avinash123';



passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    console.log('jwtPayload');
    console.log(jwtPayload);
    userModel.getUserDetailById(jwtPayload.sub, (err, result) => {
        console.log('err');
        console.log(err);
        console.log('result');
        console.log(result);
        if (err) {
            console.log('error aala error');;
            return done(err, false, { message: 'Incorrect password.' });

        }

        if (result.length === 0) {
            return done(null, false, { message: 'Incorrect password.' });


        }

        return done(null, result[0]);
    });
}));