const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
// console.log(typeof endpoint);

const cities = [];
fetch(endpoint)
    .then(blob =>blob.json())
    .then(value => (cities.push(...value)));
// console.log(cities);
function findMatches(reg, cities) {
    return cities.filter( place => {
        const regex = new RegExp(reg,'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayCities() {
    // console.log(this.value);
    const filteredCities = findMatches(this.value, cities);
    let html = filteredCities.map(place => {
        const regex = new RegExp(this.value,'gi');
        const cityName = place.city.replace(regex,`<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

        return `
            <li>
                <span>${cityName}, ${stateName}</span>
                <span>${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');
    // console.log(html);
    suggestions.innerHTML = html;
    
}



const region = document.querySelector('.region');
const suggestions = document.querySelector(".suggestions");

region.addEventListener('input', displayCities);
