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


    if (!stations == []) {
        var stationCard = document.createElement("div");
        var stationAddress = document.createElement("h1");
        var stationCurrent = document.createElement("p");
        var stationVoltage = document.createElement("p");
        var stationConnector = document.createElement("p");
        var stationDist = document.createElement("p");
        var stationName = document.createElement("p");
        var stationURL = document.createElement("p");
        var stationPhone = document.createElement("p");

        stationAddress = stations[0].address.freeformAddress;
        stationCurrent = stations[0].chargingPark.connectors[0].currentType;
        stationVoltage = stations[0].chargingPark.connectors[0].voltageV;
        stationConnector = stations[0].chargingPark.connectors[0].connectorType;
        stationDist = stations[0].dist;
        stationName = stations[0].poi.classification.name;
        stationURL = stations[0].poi.classification.url;
        stationPhone = stations[0].poi.classification.phone;
        

        stationContainer.append(stationCard);
        stationCard.append(stationAddress);
        stationCard.append(stationCurrent);
        stationCard.append(stationVoltage);
        stationCard.append(stationConnector);
        stationCard.append(stationDist);
        stationCard.append(stationName);
        stationCard.append(stationURL);
        stationCard.append(stationPhone);

    };
}

    // Check if there are stations and limit to the first 5 stations.
    const numStationsToDisplay = Math.min(5, stations.length);

    // Create a container for the cards
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container"); // Add a custom class for the container

    for (let i = 0; i < numStationsToDisplay; i++) {
        const stationCard = document.createElement("div");
        stationCard.classList.add("card"); // Add Bootstrap card class
        stationCard.style.width = "18rem"; // Set a fixed width for the card

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const stationAddress = document.createElement("h5");
        stationAddress.classList.add("card-title", "custom-title-class"); // Add a custom class
        const stationCurrent = document.createElement("p");
        stationCurrent.classList.add("custom-p-class"); // Add a custom class
        const stationVoltage = document.createElement("p");
        stationVoltage.classList.add("custom-p-class"); // Add a custom class
        const stationConnector = document.createElement("p");
        stationConnector.classList.add("custom-p-class"); // Add a custom class
        const stationDist = document.createElement("p");
        stationDist.classList.add("custom-p-class"); // Add a custom class

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
        cardContainer.appendChild(stationCard);
    }

    // Append the card container to your document
    stationContainer.appendChild(cardContainer);
};




renderStations();