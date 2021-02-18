module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'posts',
        {
            description: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
        },
        {
            timestamps: true,
            underscored: true,
            tableName: "post"
        }
    );
    }