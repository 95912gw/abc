module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user', 
        {
            userID: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            timestamps: true,
            tableName: 'user'
        }
    );
    return user;
}