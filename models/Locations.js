const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserLocation extends Model { }

UserLocation.init(
    {
        location_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        station_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Station',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'UserLocation'
    }

)



module.exports = UserLocation;