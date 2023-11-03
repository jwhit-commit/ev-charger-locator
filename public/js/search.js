// Define an array to store station data
var stations = [];

// Function to fetch station data from the server
const stationLookup = async () => {
    try {
        var results = await fetch('/api/search/results', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var jsonResults = await results.json();
        stations = jsonResults.results;
        return stations;
    } catch (err) {
        console.error(err);
        // Note: `res.status(500).json(err);` seems like Express.js code and should be handled on the server.
    }
    console.log(stations);
};

// Event listener for form submission
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

// Add an event listener for the form submission
document.querySelector("#search-form").addEventListener("submit", searchLocation);

// Select the container where you want to display the stations
const stationContainer = document.querySelector('#nearby-stations');

// Function to render station data as cards
const renderStations = async () => {
    // Fetch station data
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
    const cardParent = document.createElement("div");
    cardParent.classList.add("card-parent");
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container"); // Add a custom class for the container
    cardParent.appendChild(cardContainer);

    // Loop through stations and create a card for each
    stations.slice(0, 6).forEach((station, index) => {
        const stationCard = document.createElement("div");
        stationCard.classList.add("card"); // Add Bootstrap card class

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const stationAddress = document.createElement("h5");
        stationAddress.classList.add("card-title");
        const stationCurrent = document.createElement("p");
        const stationVoltage = document.createElement("p");
        const stationConnector = document.createElement("p");
        const stationDist = document.createElement("p");
        const stationName = document.createElement("p");
        const cellNum = document.createElement("p");
        const url = document.createElement("a");
        


        stationAddress.textContent = `Address: ${station.address.freeformAddress}`;
        stationCurrent.textContent = `Current: ${station.chargingPark.connectors[0].currentType}`;
        stationVoltage.textContent = `Voltage: ${station.chargingPark.connectors[0].voltageV}`;
        stationConnector.textContent = `Connector: ${station.chargingPark.connectors[0].connectorType}`;
        stationDist.textContent = `Distance: ${station.dist} miles`;
        stationName.textContent = `Name: ${station.poi.name}`;
        cellNum.textContent = `Cell: ${station.poi.phone}`;
        url.href = station.poi.url ;
        url.textContent = `${station.poi.url}`;
        url.target = "_blank";

        cardBody.appendChild(stationAddress);
        cardBody.appendChild(stationCurrent);
        cardBody.appendChild(stationVoltage);
        cardBody.appendChild(stationConnector);
        cardBody.appendChild(stationDist);
        cardBody.appendChild(stationName);
        cardBody.appendChild(cellNum);
        cardBody.appendChild(url);

        stationCard.appendChild(cardBody);
        cardContainer.appendChild(stationCard);
    });

    // Append the card container to your document
    stationContainer.appendChild(cardContainer);

};




renderStations();