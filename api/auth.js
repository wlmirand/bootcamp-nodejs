const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

/*
    Modulo para cuidar da autenticacao
*/
module.exports = (app) => {
    const Users = app.libs.db.models.Users;
    const config = app.libs.config;

    const params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
    };

    const strategy = new Strategy(params,

        async (payload, done) => {

            try {
                const user = await Users.findById(payload.id);

                if (user) {
                    return done(null, {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    });
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, null);
            }
        });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate('jwt', config.jwtSession);
        }
    }
};