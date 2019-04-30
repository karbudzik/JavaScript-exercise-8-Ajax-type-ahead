// JSON file with USA's cities:    
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// Turning JSON file into an array:
// Note: "..." is "spread" (ES6). This method allows you to insert not one array into another but each element of that array into the other separately.
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

// Finding matches to the written characters:
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex)
    });
}

// Changing population into a number with commas:
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Displaying the matches in the html code:
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join("");
    suggestions.innerHTML = html;
}

// Calling the displayMatches function while typing on the keyboard:
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("input", displayMatches); 