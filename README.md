Travel App Project
Setup
To get the project up and running follow the steps below:

To run in development mode
To start the webpack dev server at port 8081

 $ npm run build-dev

To run in production mode
 $ npm run build-prod

The above step will generate a dist folder with all the files required to run the client side and then start server at port 8081 using the command given below.

 $ npm run start

Configs
Here, we have two separate webpack config files for both development mode(webpack.config.dev.js) and production mode(webpack.config.prod.js )

All the scripts and dependencies are listed in the package.json file.

Note: to get the data from the API, you will need to create a .env file which will store all the URLs and API keys of the used APIs.

API
We have used folllowing APIs:

GeoName for getting the latitude and longitude information
WeatherBit for getting the latitude and longitude information
Pixabay for getting the images of the place
Offline Functionality
The project has service workers set up in webpack to provide the offline functionality. When the service worker is functioning correctly, you will see the below message when you inspect the browser.

Testing
The testing is done using Jest. To run test, enter the command

npm run test.