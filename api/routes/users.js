module.exports = app => {

    const Users = app.libs.db.models.Users;

    app.route('/users')

    /**
     *  POST DO MAL COM CALLBACK HELL...
     
        .post((req, res) => {
            Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(result => {
                if (result) {
                    return res.status(409).json( { msg: "Email already in use" });
                } else {
                    Users.create(req.body)
                        .then(result => {
                            res.json(result);
                        })
                        .catch(error => {
                            res.status(500).json(error);
                        });
                }
            });
        })

     */

     //Para contornar a merda, usamos async para definir blocos e usamos await para esperar as operacoes

        .post(async (req, res) => {

            try {
                const existingUser = await Users.findOne({
                    where: {
                        email: req.body.email
                    }
                });
    
    
                if (existingUser) {
                    return res.status(409).json( { msg: "Email already in use" } );
                }

                const result = await Users.create(req.body);
                res.json(result);

            } catch (error) {
                res.status(500).json(error);
            }
            

        })
        .delete((req, res) => {

        })

}