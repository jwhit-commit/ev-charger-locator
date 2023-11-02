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
        document.location.reload();
      } else {
        alert('Search failed');
      }
    }
    
};


document.querySelector("#search-form").addEventListener("submit", searchLocation)
