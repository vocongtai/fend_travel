const handleSubmit = (event) => {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("location").value;
  let dataPick = document.getElementById("date").value;
  let imageCity = "";
  let imageCountry = "";
  const resultForm = document.getElementById("results-weather");
  console.log(resultForm);

  //   Client.checkForName(formText);
  console.log(formText);
  console.log(dataPick);
  if (dataPick === "") {
    alert("Please Input date!!");
  } else {
    console.log("::: Form Submitted :::");
    getNameAPI("http://localhost:8081/geoname", { location: formText }).then(
      (data) => {
        // console.log("data: ", data);
        pixabayAPI("http://localhost:8081/pixabay", { place: data.city }).then(
          (imageData) => {
            imageCity = imageData;
            // console.log("imageCity: ", imageCity);
          }
        );
        pixabayAPI("http://localhost:8081/pixabay", {
          place: data.country,
        }).then((imageData) => {
          imageCountry = imageData;
          // console.log("country: ", imageCountry);
        });
        weatherAPI("http://localhost:8081/weather", {
          lat: data.lat,
          long: data.long,
          city: data.city,
        }).then((weather) => {
          // console.log("weather: ", weather);
          for (const iterator of weather.data) {
            if (dataPick !== "") {
              // console.log('weather ',iterator);
              //Update UI
              const cardElement= document.createElement('div');
              cardElement.className="card";
              const imgCityElement=document.createElement('img');
              imgCityElement.src=imageCity;
              imgCityElement.alt="image of city";
              imgCityElement.width="100";

              const cityName=document.createElement('h4');
              cityName.innerHTML=`<b>${data.city}</b>`;

              const weatherStatus=document.createElement('p');
              weatherStatus.innerHTML=`Weather: ${iterator.weather.description}`

              const temp=document.createElement('p');
              temp.innerHTML=`Temp: ${iterator.weather.temp} degree`;
              

              const date=document.createElement('p');
              date.innerHTML=`Date: ${iterator.datetime}`;

              cardElement.appendChild(imgCityElement);
              cardElement.appendChild(cityName);
              cardElement.appendChild(weatherStatus);
              cardElement.appendChild(temp);
              cardElement.appendChild(date);
              console.log(cardElement);
              resultForm.appendChild(cardElement);
            } else {
            }
          }
          
         
        });
      }
    );
  }
};

// CALL to GEONAMES API METHOD TO SERVER

const getNameAPI = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const dataJson = await response.json();
    // console.log(dataJson);
    const newdata = {
      lat: dataJson.geonames[0].lat,
      long: dataJson.geonames[0].lng,
      country: dataJson.geonames[0].countryName,
      city: dataJson.geonames[0].toponymName,
    };
    return newdata;
  } catch (error) {
    console.log(error);
  }
};

/**Call to API Weather to server*/
const weatherAPI = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    // console.log('weather111 ',newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

//Call to API pixabay to server

const pixabayAPI = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const dataJson = await response.json();
    const dataImage = dataJson.hits[0].largeImageURL;
    // console.log(dataImage);
    return dataImage;
  } catch (error) {
    console.log(error);
  }
};

export { handleSubmit };
