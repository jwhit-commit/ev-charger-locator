const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model { }

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ttid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        freeformAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        lon: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'location'
    }
);



module.exports = Location;