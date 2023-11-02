// const savedLocation = {};

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
        const data = await response.json()
    if (response.ok) {
        console.log(data)

        // const results = await fetch('/api/search/results', {
        //     method: 'GET',
        //     body: "",
        //     headers: { 'Content-Type': 'application/json' }
        // });
        // console.log(results)

        document.location.reload();
      } else {
        alert('Search failed');
      }
    }
    
};


document.querySelector("#search-form").addEventListener("submit", searchLocation)

const stationLookup = async () => {
    try {
    const results = await fetch('/api/search/results', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    return results.json();
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
};

let x = stationLookup();
console.log(x.res)