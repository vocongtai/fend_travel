import { urlCheckURL } from "./urlChecker";

const handleSubmit = (event) => {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("location").value;
  let dataPick = document.getElementById("date").value;
  let imageCity = "";
  let imageCountry = "";
  const resultForm = document.getElementById("results");

  //   Client.checkForName(formText);
  console.log(formText);
  console.log(dataPick);
  console.log("::: Form Submitted :::");
  getNameAPI("http://localhost:8081/geoname", { location: formText }).then(
    (data) => {
      console.log("data: ", data);
      pixabayAPI("http://localhost:8081/pixabay", { place: data.city }).then(
        (imageData) => {
          imageCity = imageData;
          console.log("imageCity: ", imageCity);
        }
      );
      pixabayAPI("http://localhost:8081/pixabay", { place: data.country }).then(
        (imageData) => {
          imageCountry = imageData;
          console.log("country: ", imageCountry);
        }
      );
      weatherAPI("http://localhost:8081/weather", {
        lat: data.lat,
        long: data.long,
        city: data.city,
      }).then((weather) => {
        // console.log("weather: ", weather);
        for (const iterator of weather.data) {
          if (dataPick !== "") {
            if (iterator.datetime === dataPick) {
              console.log(iterator);
              //Update UI
              resultForm.innerHTML = "";
              const carddiv = document.createElement("div");
              carddiv.setAttribute("class", "card");
              const imgCityElement = document.createElement("img");
              const imgCountryElement = document.createElement("img");
              imgCityElement.src = imageCity;
              imgCityElement.alt = "image Of city";
              imgCountryElement.src = imageCountry;
              imgCountryElement.alt = "image of country";
              imgCityElement.style.width = "100%";
              imgCountryElement.style.width = "100%";
              const h4Element = document.createElement("h4");
              h4Element.innerHTML = data.city;
              h4Element.style.textAlign = "center";
              const pWeather = document.createElement("p");
              pWeather.innerHTML = `Weather: ${iterator.weather.description}`;
              const pTemp = document.createElement("p");
              pTemp.innerHTML = `Temp: ${iterator.temp}`;
              const showMorebtn = document.createElement("button");
              showMorebtn.innerHTML = "Show more of city";
              carddiv.appendChild(imgCityElement);
              carddiv.appendChild(h4Element);
              carddiv.appendChild(pWeather);
              carddiv.appendChild(pTemp);

              carddiv.appendChild(showMorebtn);
              showMorebtn.addEventListener("click", () => {
                carddiv.appendChild(imgCountryElement);
              });
              resultForm.appendChild(carddiv);
            }
          } else {
            resultForm.innerHTML = "Please enter date!";
          }
        }
      });
    }
  );
};

/**
 * CALL to GEONAMES API METHOD TO SERVER
 *a
 */

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
    console.log(dataJson);
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
    console.log(newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Call to API pixabay to server
 *
 */
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
    console.log(dataImage);
    return dataImage;
  } catch (error) {
    console.log(error);
  }
};

// const postDataAPI = async (url = "", data = {}) => {
//   const response = await fetch(url, {
//     method: "POST",
//     credentials: "same-origin",
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   try {
//     const newData = await response.json();
//     console.log("Data:", newData);
//     return newData;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export { handleSubmit };
