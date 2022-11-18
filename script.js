const weather = {
    "apiKey": "77cc3e27d68a99990c63ff205bb2a97b",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { lon, lat } = data.coord;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure, feels_like } = data.main;
        const { speed } = data.wind;
        console.log(name, country, lon, lat, icon, description, temp, humidity, speed);

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".country").innerText = "(" + country + ")";
        document.querySelector(".altitude").innerText = "(Longitude: " + lon + ", Latitude: " + lat + ")";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".realFeel").innerText = feels_like + "°C";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".wind").innerText = speed + " km/h";
        document.querySelector(".pressure").innerText = pressure + " mbar";
        document.querySelector(".weather").classList.remove("loading");
        // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
};


window.onload = function () {
    document.querySelector(".searchButton").addEventListener("click", function () {
        weather.search();
    });

    document
        .querySelector(".searchBar")
        .addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
                weather.search();
            }
        });


    weather.fetchWeather("Rajkot");
}




