import { urlCheckURL } from "./urlChecker";


const handleSubmit = (event) => {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url").value;
  //   Client.checkForName(formText);
  console.log(formText);
  console.log("::: Form Submitted :::");
  if (urlCheckURL(formText)) {
    postDataAPI("http://localhost:8081/api", { url: formText }).then((data) => {
      console.log(data);
      /**
       * Update UI
       */
      document.getElementById(
        "agreement"
      ).innerHTML = `Agreement: ${data.agreement}`;
      document.getElementById(
        "confidence"
      ).innerHTML = `confidence: ${data.confidence}`;
      document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
      document.getElementById("model").innerHTML = `Model ${data.model}`;
      document.getElementById(
        "score_tag"
      ).innerHTML = `Score tag: ${data.score_tag}`;
      document.getElementById("errorMsg").innerHTML=""
    });
  } else {
    document.getElementById("errorMsg").innerHTML="Invalid URL. Please check and try agian!!"
    document.getElementById("agreement").innerHTML = "";
    document.getElementById("confidence").innerHTML = "";
    document.getElementById("irony").innerHTML = "";
    document.getElementById("model").innerHTML = "";
    document.getElementById("score_tag").innerHTML = "";
  }
};

/**
 * CALL POST METHOD TO SERVER
 *a
 */
const postDataAPI = async (url = "", data = {}) => {
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
    console.log("Data:", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
