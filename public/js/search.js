stationContainer = document.querySelector('#nearby-stations')


// Function to find nearby stations (calls backend API)
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

// Function to render nearby stations into HTML cards on the page
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
    const stationName = document.createElement("p");
    stationName.classList.add("custom-p-class");
    const stationPhone = document.createElement("p");
    stationPhone.classList.add("custom-p-class");
    const stationURL = document.createElement("p");
    stationURL.classList.add("custom-p-class");

    stationAddress.textContent = stations[i].address.freeformAddress;
    stationCurrent.textContent = `Current: ${stations[i].chargingPark.connectors[0].currentType}`;
    stationVoltage.textContent = `Voltage: ${stations[i].chargingPark.connectors[0].voltageV}`;
    stationConnector.textContent = `Connector: ${stations[i].chargingPark.connectors[0].connectorType}`;
    stationDist.textContent = `Distance: ${stations[i].dist}`;
    stationName.textContent = `Station Name: ${stations[i].poi.classification[0].name}`
    stationPhone.textContent = `Station Phone #: ${stations[i].poi.classification[0].url}`
    stationURL.textContent = `Station Website: ${stations[i].poi.classification[0].phone}`

    cardBody.appendChild(stationAddress);
    cardBody.appendChild(stationCurrent);
    cardBody.appendChild(stationVoltage);
    cardBody.appendChild(stationConnector);
    cardBody.appendChild(stationDist);
    cardBody.appendChild(stationName);
    cardBody.appendChild(stationPhone);
    cardBody.appendChild(stationURL);

    stationCard.appendChild(cardBody);
    cardContainer.appendChild(stationCard);
};

// Append the card container to your document
stationContainer.appendChild(cardContainer);


=======
    
    // Check if there are stations and limit to the first 5 stations.
    const numStationsToDisplay = Math.min(5, stations.length);
    
    // Create a container for the cards
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container"); // Add a custom class for the container
    cardContainer.classList.add("row"); 
    
    for (let i = 0; i < numStationsToDisplay; i++) {
        const stationCard = document.createElement("div");
        stationCard.classList.add("card"); // Add Bootstrap card class
        stationCard.classList.add("col-2");
        stationCard.style.width = "18rem"; // Set a fixed width for the card
        
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        
        const stationName = document.createElement('h5')
        stationName.classList.add("card-title", "custom-title-class","h5"); // Add a custom class
        const stationAddress = document.createElement("p");
        stationAddress.classList.add("custom-p-class"); // Add a custom class
        const stationCurrent = document.createElement("p");
        stationCurrent.classList.add("custom-p-class"); // Add a custom class
        const stationVoltage = document.createElement("p");
        stationVoltage.classList.add("custom-p-class"); // Add a custom class
        const stationConnector = document.createElement("p");
        stationConnector.classList.add("custom-p-class"); // Add a custom class
        const stationDist = document.createElement("p");
        stationDist.classList.add("custom-p-class"); // Add a custom class
        
        stationName.textContent = stations[i].poi.name;
        stationAddress.textContent = stations[i].address.freeformAddress;
        stationCurrent.textContent = `Current: ${stations[i].chargingPark.connectors[0].currentType}`;
        stationVoltage.textContent = `Voltage: ${stations[i].chargingPark.connectors[0].voltageV}`;
        stationConnector.textContent = `Connector: ${stations[i].chargingPark.connectors[0].connectorType}`;
        stationDist.textContent = `Distance: ${stations[i].dist}`;

        const favBtn = document.createElement("button");
        favBtn.classList.add("btn","btn-primary"); // Add a custom class
        favBtn.dataset.ttid = stations[i].id;
        favBtn.textContent = `Save for later`
        
        cardBody.appendChild(stationName);        
        cardBody.appendChild(stationAddress);
        cardBody.appendChild(stationCurrent);
        cardBody.appendChild(stationVoltage);
        cardBody.appendChild(stationConnector);
        cardBody.appendChild(stationDist);
        cardBody.appendChild(favBtn);
        
        stationCard.appendChild(cardBody);
        cardContainer.appendChild(stationCard);

        favBtn.addEventListener("click", function() {stationFav(stations[i].id)}) //adds event listener for Fav/Save functionality -- See stationFav() below
    }
    
    // Append the card container to your document
    stationContainer.appendChild(cardContainer);
};

// Function to search for new starting address/location (calls backend API) then renders nearby stations
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

// Add search functionality to search button
document.querySelector("#search-form").addEventListener("submit", searchLocation)

// Renders nearby stations based on saved user location (if logging back in)
renderStations();

// Function to add a saved station to user profile
const stationFav = async (ttid) => {
    try {
        var newStation = await fetch('/api/save', {
            method: 'POST',
            body: JSON.stringify({ id: ttid }),
            headers: { 'Content-Type': 'application/json' }
        });
        var jsonStation = await newStation.json();
    }
    catch (err) {
        console.log(err);
        // res.status(500).json(err);
    }
    await document.location.replace('/search');
};