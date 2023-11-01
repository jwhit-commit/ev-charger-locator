const User = require('./User');
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


