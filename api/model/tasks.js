/**
 * Cria o modelo de dados
 */
module.exports = (sequelize, DataType) => {

    const Tasks = sequelize.define('Tasks', {
        id: {
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validade: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return Tasks;
}