const jwt = require('jwt-simple');

module.exports = (app) => {
    const Users = app.libs.db.models.Users;
    const config = app.libs.config;

    app.post('/auth', async (req, res) => {

        //procura o usuario
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });

        //se achou, bate a senha
        if (user) {

            if (Users.isPassword(req.body.password, user.password)) {
                //se esta correto, gera o token.... um hashCode com alguns dados
                const payload = {
                    email: req.body.email
                }

                //retorna o token
                return res.json({
                    token: jwt.encode(payload, config.jwtSecret)
                });
            } else {
                return res.status(500).json({ msg: "Senha invalida"} );
            }
        }
    })
}