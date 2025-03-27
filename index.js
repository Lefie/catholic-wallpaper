
async function getLiturgicalCalendarToday() {
    const url = `http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today`
    
    try {
        const res = await fetch(url)
        const data = await res.json()
        const lit_cal = document.querySelector("#liturgical-calendar-box")
        let date = data.date.split("-")
        let celebrations = data.celebrations
        date = `${date[1]}/${date[2]}`
        const season = data.season
        console.log(`date is ${date}, season is ${season}`)
        console.log(data)

        lit_cal.innerHTML = `
        <div id="lit-cal-content">
            <h3>${date}</h3>
            <p>${season}</p>
        </div>
        `

        if(celebrations.length === 1) {
            document.querySelector("#lit-cal-content").innerHTML += `
            <p>${celebrations[0].title}</p>

            `
        }else {
            for (let celeb of celebrations) {
                console.log(celeb)
                document.querySelector("#lit-cal-content").innerHTML += `
                <p>${celeb.title} </p>
                `
            }
        }
        

        

        

    }catch(err){
        console.log(err)
    }
}

async function fetchWallpaper() {
    try {
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=catholic")
        const data = await res.json()
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    }catch(err){
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
    )`
        document.getElementById("author").textContent = `By: Dodi Achmad`
    }
}

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}



navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

setInterval(getCurrentTime, 1000)
fetchWallpaper()
getLiturgicalCalendarToday()