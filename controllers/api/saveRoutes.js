const router = require('express').Router();
const tt = require("@tomtom-international/web-sdk-services/dist/services-node.min.js");
const { Station, User, UserStation } = require('../../models');

//Search TomTom for specific location by ID
const findStation = (id) => {
        return tt.services.placeById({
            entityId: id,
            key: 'uP52BPEpr8DQqzKvuzzBj9sRnRK8jtiT'
        })
};

//Create new db rows with TT data
const addStation = async (id) => {
    try {
        const stationData = await Station.findOne({ where: { ttid: id } })

        if (!stationData) {
            findStation(id)
            .then(async (res) => {
                const dbStationData = await Station.create({
                    ttid: res.results[0].id,
                    name: res.results[0].poi.name,
                    freeformAddress: res.results[0].address.freeformAddress,
                    lat: res.results[0].position.lat,
                    lon: res.results[0].position.lng
                })
                console.log(dbStationData)
                const dbUserStationData = await UserStation.create({
                    user_id: res.session.user_id,
                    station_id: dbStationData.id
                })
            })
        }
        else {
            findStation(id)
            .then(async (res) => {
            const dbUserStationData = await UserStation.create({
                user_id: res.session.user_id,
                station_id: stationData.id
            })})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

//Structure above function into API call
router.post("/", async (req, res) => {
    try {
        console.log(req.body);

        results = await addStation(req.body.id);
        console.log(results);
        
        // res.status(200).json(userData.location_id);

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});



module.exports = router;
