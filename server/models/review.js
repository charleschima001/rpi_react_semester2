import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Review extends Model {}

Review.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [5, 1024] }
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
    }
}, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: false
});

export { Review };