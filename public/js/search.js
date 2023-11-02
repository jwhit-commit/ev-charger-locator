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

        const favBtn = document.createElement("button");
        favBtn.classList.add("btn"); // Add a custom class
        favBtn.classList.add("btn-secondary"); // Add a custom class
        favBtn.dataset.ttid = stations[i].id;
        favBtn.textContent = `Save for later`
        
        cardBody.appendChild(stationAddress);
        cardBody.appendChild(stationCurrent);
        cardBody.appendChild(stationVoltage);
        cardBody.appendChild(stationConnector);
        cardBody.appendChild(stationDist);
        cardBody.appendChild(favBtn);
        
        stationCard.appendChild(cardBody);
        cardContainer.appendChild(stationCard);

        favBtn.addEventListener("click", function() {stationFav(stations[i].id)})
    }
    
    // Append the card container to your document
    stationContainer.appendChild(cardContainer);
};

renderStations();



const stationFav = async (ttid) => {
    try {
        var newStation = await fetch('/api/save', {
            method: 'POST',
            body: JSON.stringify({ id: ttid }),
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
