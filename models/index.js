const User = require('./User');
const UserLocation = require('./Locations');


User.hasMany(UserLocation, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

UserLocation.belongsTo(User, {
  foreignKey: 'user_id',
});

// UserLocation.hasMany(Station,{
//   foreignKey: 'location_id',
//   onDelete: 'CASCADE'
// });

// Station.belongsTo(UserLocation,{
//   foreignKey:'location_id',
// })


module.exports = { User, UserLocation};

