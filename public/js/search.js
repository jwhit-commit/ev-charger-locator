var stations = [];

const stationLookup = async () => {
    try {
        var results = await fetch('/api/search/results', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var jsonResults = await results.json()
        stations = jsonResults.results;
        return stations;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const searchLocation = async (event) => {
    event.preventDefault();

    const search = document.querySelector('#search').value.trim();

    if (search) {
        const response = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({ search }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (response.ok) {
            
            try {
                const stations = await stationLookup();
            } catch (error) {
                console.error(error);
            }
            renderStations();
            document.location.replace('/search');

        } else {
            alert('Search failed');
        }
    }

};




document.querySelector("#search-form").addEventListener("submit", searchLocation)

stationContainer = document.querySelector('#nearby-stations')

const renderStations = async () => {
    try {
        const stations = await stationLookup();
    } catch (error) {
        console.error(error);
    }

    if (!stations == []) {
        var stationCard = document.createElement("div");
        var stationAddress = document.createElement("h3");
        var stationCurrent = document.createElement("p");
        var stationVoltage = document.createElement("p");
        var stationConnector = document.createElement("p");
        var stationDist = document.createElement("p");

        stationAddress = stations[0].address.freeformAddress;
        stationCurrent = stations[0].chargingPark.connectors[0].currentType;
        stationVoltage = stations[0].chargingPark.connectors[0].voltageV;
        stationConnector = stations[0].chargingPark.connectors[0].connectorType;
        stationDist = stations[0].dist;

        stationContainer.append(stationCard);
        stationCard.append(stationAddress);
        stationCard.append(stationCurrent);
        stationCard.append(stationVoltage);
        stationCard.append(stationConnector);
        stationCard.append(stationDist);
    };
}

renderStations();

const stationFav = async () => {
    try {
        var newStation = await fetch('/api/save', {
            method: 'POST',
            body: JSON.stringify({ id:'xLXDUiug9NIoEAbbp9BSEA' }),
            headers: { 'Content-Type': 'application/json' }
        });
        var jsonStation = await newStation.json()
        console.log(jsonStation)
    }
    catch (err) {
        console.log(err);
        // res.status(500).json(err);
    }
};

// stationFav(); 