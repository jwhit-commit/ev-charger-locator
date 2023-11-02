var stations = [];

const stationLookup = async () => {
    try {
        var results = await fetch('/api/search/results', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var jsonResults = await results.json()
        stations = jsonResults.results;
        console.log(stations)
        return stations;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    console.log(stations);
};

// const fetchData = async () => {
//     try {
//         const stations = await stationLookup();
//         console.log(stations);
//     } catch (error) {
//         console.error(error);
//     }
// };
// fetchData();

// console.log(stations);

const searchLocation = async (event) => {
    event.preventDefault();

    const search = document.querySelector('#search').value.trim();
    console.log(search);

    if (search) {
        const response = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({ search }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data)

            // stationsJSON = stationLookup()
            // stations = stationsJSON.results;

            document.location.reload();
        } else {
            alert('Search failed');
        }
    }

};




document.querySelector("#search-form").addEventListener("submit", searchLocation)

stationContainer = document.querySelector('#nearby-stations')

const renderStations = async () => {
    let stations;
    try {
        stations = await stationLookup();
        console.log(stations);
    } catch (error) {
        console.error(error);
        return; // Exit the function in case of an error.
    }

    // Check if there are stations and limit to the first 5 stations.
    const numStationsToDisplay = Math.min(5, stations.length);

    for (let i = 0; i < numStationsToDisplay; i++) {
        const stationCard = document.createElement("div");
        stationCard.classList.add("card"); // Add Bootstrap card class
        stationCard.style.width = "18rem"; // Set a fixed width for the card

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const stationAddress = document.createElement("h5");
        stationAddress.classList.add("card-title");
        const stationCurrent = document.createElement("p");
        const stationVoltage = document.createElement("p");
        const stationConnector = document.createElement("p");
        const stationDist = document.createElement("p");

        stationAddress.textContent = stations[i].address.freeformAddress;
        stationCurrent.textContent = `Current: ${stations[i].chargingPark.connectors[0].currentType}`;
        stationVoltage.textContent = `Voltage: ${stations[i].chargingPark.connectors[0].voltageV}`;
        stationConnector.textContent = `Connector: ${stations[i].chargingPark.connectors[0].connectorType}`;
        stationDist.textContent = `Distance: ${stations[i].dist}`;

        cardBody.appendChild(stationAddress);
        cardBody.appendChild(stationCurrent);
        cardBody.appendChild(stationVoltage);
        cardBody.appendChild(stationConnector);
        cardBody.appendChild(stationDist);

        stationCard.appendChild(cardBody);
        stationContainer.appendChild(stationCard);
    }
};



renderStations();