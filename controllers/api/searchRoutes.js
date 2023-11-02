const router = require('express').Router();
const tt = require("@tomtom-international/web-sdk-services/dist/services-node.min.js");
const { Location, User } = require('../../models');

//Search TomTom for location
const addressSearch = (search) => {
    return tt.services.fuzzySearch({
        key: 'uP52BPEpr8DQqzKvuzzBj9sRnRK8jtiT',
        query: search,
        countrySet: 'US'
    })}

//Search TT for location then add to database
const newLocation = (req,userID) => {
    addressSearch(req)
        .then( async (res) => {
            const dbLocationData = await Location.create({
                freeformAddress: res.results[0].address.freeformAddress,
                lat: res.results[0].position.lat,
                lon: res.results[0].position.lng
                });
            const dbUserData = await User.findOne({ where: { id: userID } });
            dbUserData.location_id = dbLocationData.id;
            await dbUserData.save();
        });
}

// Structure above functions into API call
router.post("/", async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);
        const locationData = await Location.findByPk(userData.location_id); 

        const userID = req.session.user_id
        console.log(req.body);

        if (locationData) {
            locationData = await Location.destroy(locationData);
            newLocation(req.body.search, userID);
            res.status(200).json(req.body.search);
        } 
        else {
            newLocation(req.body.search, userID);
            res.status(200).json(req.body.search);
        }

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;