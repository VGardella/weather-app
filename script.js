function getValues() {
    const cityInput = document.getElementById('citySearch');

    const searchValue = cityInput.value.replaceAll(' ', '-').replaceAll(',','');

    console.log(searchValue);

    cityInput.value = '';

    return searchValue;
}

async function searchData(value) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0d5f71f36b174103b61135645232303&q=${value}`, {mode: 'cors'});
        const cityData = await response.json();
        console.log(cityData);

        document.getElementById('condition').innerHTML = await cityData.current.condition.text;
        document.getElementById('temperature').innerHTML = await `${cityData.current.temp_c}ºC/${cityData.current.temp_c}ºF `;
        document.getElementById('feel').innerHTML = await `${cityData.current.feelslike_c}ºC/ ${cityData.current.feelslike_f}ºF `
        document.getElementById('humidity').innerHTML = await `${cityData.current.humidity}%`;
        document.getElementById('pressure').innerHTML = await `${cityData.current.pressure_mb} miliBars`;
        document.getElementById('wind').innerHTML = await `${cityData.current.wind_kph} Km/h, ${cityData.current.wind_dir}`;
    } catch (error) {
        alert(`Search error! ${error}`)
    }
}

document.getElementById('submitBtn').addEventListener('click', () => {
    const value = getValues();
    searchData(value);
})