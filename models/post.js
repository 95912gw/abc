module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define(
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
    return posts;
    }