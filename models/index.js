const User = require('./User');

const UserLocation = require('./Locations');
// const Station = require('./Stations');


// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

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
=======
const Location = require('./Location');
const UserLocation = require('./UserLocation');

User.belongsToMany(Location,{
    through: {
      model: UserLocation,
      unique: false
  },
  as: "user_by_location"
});

Location.belongsToMany(User,{
    through: {
      model: UserLocation,
      unique: false
  },
  as: "location_by_user"
});


module.exports = { User, Location, UserLocation };


