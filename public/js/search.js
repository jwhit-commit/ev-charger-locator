
// const tt = require("@tomtom-international/web-sdk-services/dist/services-node.min.js");



// const chargerSearch = (lon,lat,rad0) => {
//     return tt.services.poiSearch({
//         key: 'uP52BPEpr8DQqzKvuzzBj9sRnRK8jtiT',
//         categorySet: '7309',
//         center: [lon,lat],
//         radius: rad0
//     })
// };

// const addressSearch = (search) => {
//     return tt.services.fuzzySearch({
//         key: 'uP52BPEpr8DQqzKvuzzBj9sRnRK8jtiT',
//         query: search,
//         countrySet: 'US'
//     })}

// const evLocations = (search) => {
//     addressSearch(search)
//     .then((res) => 
//         chargerSearch(res.results[0].position.lng,res.results[0].position.lat,rad0)
//     )
//     .then((res) => 
//         console.log(res)
//     )
// };
// const searchTerm = document.querySelector("#search-city").value;
// const searchFormHandler = async (city) => {
//     //fetch api
//     const response = await fetch('/api/search', {
//         method: 'POST',
//         body: JSON.stringify({
//             searchTerm
//         })
//     })
//     if(response.ok){
//         document.location("/search");
//     } else {
//         alert("Failed to search")
//     }
// }


// var search1 = '100 1st st NE, wessington springs, south dakota';
// var rad0 = 100000;
// evLocations(search1)

const { addressSearch,chargerSearch,evLocations } = require("../utils/ttapi");
document.querySelector("#search-form").addEventListener("submit", searchSubmit)


const searchSubmit = (event) => {
    event.preventDefault();

    const query = document.querySelector("#search").value.trim();

    if (query) {
        addressSearch(query)
    };

    if (query) {
        evLocations(query)
    };


}
