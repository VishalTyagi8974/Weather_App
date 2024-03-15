const div = document.querySelector("div");
const form = document.querySelector("form");
const fromInput = document.querySelector("form input");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = fromInput.value;
    div.classList.remove("show");
    div.classList.add("hidden");
    const data = await currentWeather(city);
    const icon = document.createElement("img");
    icon.src = data[3];
    div.innerText = "";
    if (data.length === 7) {
        div.append(icon)
        appendDetails(data);
    } else {
        const newH2 = document.createElement("h2");
        newH2.innerHTML = data
        div.append(newH2)
    }
    await setTimeout(() => {

        div.classList.add("show");
        div.classList.remove("hidden");
    }, 150);
    fromInput.value = "";

})

const appendDetails = function (list) {
    const innerDiv = document.createElement("div");
    innerDiv.id = "innerDiv";

    const mosam = document.createElement("h2");
    mosam.id = "text";

    const temp = document.createElement("h2");
    const humidity = document.createElement("h2");


    const city = document.createElement("h3");
    temp.innerHTML = `<span class="sps">Temperature</span><br> ${list[1]}<sup style="font-size:1rem;">&deg;C</sup>`;
    mosam.innerHTML = `${list[2]}`;
    humidity.innerHTML = `<span class="sps">Humidity</span><br> ${list[4]} `
    city.innerHTML = `${list[0]}`.toLocaleUpperCase();

    city.style.margin = "0 2rem";
    mosam.style.textAlign = "center";

    const windSpeed = document.createElement("h2");
    windSpeed.innerHTML = `<span class="sps">Wind Speed</span><br> ${list[5]} <span style="font-size:1rem;">km/h</span> `

    const precipitation = document.createElement("h2");
    precipitation.innerHTML = `<span class="sps">Precipitation</span><br> ${list[6]} <span style="font-size:1rem;">in</span> `

    div.prepend(city);
    div.append(mosam);
    innerDiv.append(temp);
    innerDiv.append(humidity);
    innerDiv.append(windSpeed);
    innerDiv.append(precipitation);
    div.append(innerDiv)

}


const currentWeather = async function (city) {
    try {
        const req = await fetch(`https://api.weatherapi.com/v1/current.json?key=b610d076657b48b9b2473923241403&q=${city}`)
        const data = await req.json();
        const lis = [city, data.current.temp_c, data.current.condition.text, "https:" + data.current.condition.icon, data.current.humidity, data.current.wind_kph, data.current.precip_in];
        return lis;
    }
    catch {
        return "sorry can't fetch data: Invalid city name :("
    }
}
const iconFinder = async function (url) {
    try {
        let src = await fetch(url);
        src = await src.body();
        return src;
    }
    catch {
        return "noIcon";
    }

}