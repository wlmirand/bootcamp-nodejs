const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataType) => {

    const Users = sequelize.define('Users', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING(30),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataType.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Tasks, {
            onDelete: 'CASCADE'
        })
    };

    //Antes de criar o usuario, criptografa a senha com o Hook
    Users.hook('beforeCreate', (user) => {
        const chave = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, chave);
    });

    //Verifica se a senha passada bate com a senha criptografada
    Users.isPassword = (password, encodedPassword) => {
        return bcrypt.compareSync(password, encodedPassword);
    };

    return Users;
}