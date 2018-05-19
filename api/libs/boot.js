module.exports = (app) => {

    //define a porta e a funcao de callback
    connectionCallback = () => {
        console.log(`API pronta para uso na porta ${app.get('port')}`);
    };

    app.libs.db.sequelize.sync().done( () => {

        //manda escutar na porta
        app.listen(app.get('port'), connectionCallback)

    } );

}