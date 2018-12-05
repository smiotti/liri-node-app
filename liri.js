
//** Step #7 read and set any environment variables with the dotenv package https://www.npmjs.com/package/dotenv
//** with npm, npm install dotenv
require('dotenv').config();

//** Step #8  import the `keys.js` file and store it in a variable
const keys = require("./keys.js");

//** Step #8 cont - access  keys information
// const spotify = new Spotify(keys.spotify);

//** Include the request npm package to retrieve data from APIs  ( ran'npm install request' to install request package )
const request = require('request');

//** Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
const fs = require('fs');


//** Take two arguments
//** The first will be the action (i.e. 'concert-this', 'spotify-this-song', etc.)
//** The second will be for the specific information to seach on (ie. Artist/Band Name, Song Name, Movie Name, etc. )
const action = process.argv[2];
const searchInfo = process.argv[3];



//  1. `node liri.js concert-this <artist/band name here>`
//    * This will search the Bands in Town Artist Events API (`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`) for an artist and render the following information about each event to the terminal:
//      * Name of the venue
//      * Venue location



//** concert function
function concertThis() {
    const artist = searchInfo;
    const URL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    request(URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
           
            const dataList = JSON.parse(body);
            // console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            // console.log('body:', dataList);

            for (i = 0; i < dataList.length; i++) {
                const details = dataList[i];  
                console.log(`Venue Name: ${details.venue.name}`);
                console.log(`Venue Location: ${details.venue.city}, ${details.venue.region} ${details.venue.country}`);
            }            
        }        
    });
};




// 2. `node liri.js spotify-this-song '<song name here>'`
// * This will show the following information about the song in your terminal/bash window
// * Artist(s)
// * The song's name
// * A preview link of the song from Spotify
// * The album that the song is from
// * If no song is provided then your program will default to "What's My Age Again" by blink-182.
// * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
// * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
// * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
// * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
// * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
// * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).




// 3. `node liri.js movie-this '<movie name here>'`
// * This will output the following information to your terminal/bash window:
// ```
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// ```
// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
// * It's on Netflix!
// * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.




// 4. `node liri.js do-what-it-says`
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Edit the text in random.txt to test out the feature for movie-this and my-tweets






// Step #9 Something like this from Day 2 - 04-stu ....   

//**  Creating a switch-case statement to direct which function gets run.
switch (action) {
    case 'concert-this':
        concertThis();
        break;
    case 'spotify-this-song':
        spotifyThisSong();
        break
    case 'movie-this':
        movieThis();
        break
    case 'do-what-it-says':
        doWhatItSays();
        break
}




// To Do's:

// Need to install 3rd party pacakges:
// (done) npm install request   https://www.npmjs.com/package/request
// (done) npm install dotenv   This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. https://www.npmjs.com/package/dotenv
// (done) npm install --save node-spotify-api  [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).