
// Setting any environment variables with the dotenv package https://www.npmjs.com/package/dotenv
require('dotenv').config();

// Setting up the Node Spotify API
const Spotify = require('node-spotify-api');

// Import the `keys.js` file and store it in a variable
const keys = require("./keys.js");

// Granting new instance of Spotify access to the keys information
const spotify = new Spotify(keys.spotify);

// Include the request npm package to retrieve data from APIs
const request = require('request');

// Setting up the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
const fs = require('fs');


// Take two user entered arguments from the command line
// The first will be the action (i.e. 'concert-this', 'spotify-this-song', etc.)
// The second will be for the specific information to seach on (ie. Artist/Band Name, Song Name, Movie Name, etc. )
// Second argument will handle spaces in user imput
let action = process.argv[2];
let searchInfo = process.argv.slice(3).join(' ');



// Concert Function
// This function queries Bands in Town Artist Events API with an 'artis' or 'band name' and logs the 'name' and 'location' of the concert venue
function concertThis() {
    const artist = searchInfo;
    const URL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    request(URL, function (err, response, body) {
        // If there is an error in the API query the error code will be logged
        if (err) {
            return console.log(`Error occurred: ${err}`);
        } else {
            const dataList = JSON.parse(body);
            // console.log('body:', dataList);
            console.log(`\n-------------- Concert This ---------------`);
            console.log(`Band Name: ${searchInfo}`);
            console.log(`-------------------------------------------`);

            // If there is no venue information availalbe in Bands in Town, log a warning message to user, otherwise log venue name and location
            if (!Array.isArray([]) || !dataList.length) {
                console.log(`\n !! No Venue Information Availalbe For ${artist} !!`);

            } else {
                for (i = 0; i < dataList.length; i++) {
                    const details = dataList[i];
                    console.log(`\nVenue Name: ${details.venue.name}`);
                    console.log(`Venue Location: ${details.venue.city}, ${details.venue.region} ${details.venue.country}`);
                    console.log(`\n**********************************************`);
                }
            }
        }
    });
};



// spotify function
// This function queries the Spotify API with a 'song name' (or optioanl 'artist') then logs the Song Name, Artist Name, Preview Url and Album Name for that Song/Artis
function spotifyThisSong() {
    let songName;
    // if user does not type a song name at command line, use the song "What's My Age Again" by blink-182, and returning Spotify data
    if (!searchInfo) {
        songName = "What's My Age Again"
    } else {
        songName = searchInfo;
    }
    // spotify package credentials provided via envionment file.  Using Node-spotify package query to search for user provided
    // song name (artis optional) then log returned spotify data.  
    // If there is a query errer log error code.
    spotify.search({ type: 'track,artist', query: songName, market: 'US' }, function (err, data) {
        if (err) {
            return console.log(`Error occurred: ${err}`);
        } else {
            // console.log(data);
            // console.log(JSON.stringify(data.tracks.items[0], null, 2)); 
            console.log('\n************************ Spotify-This-Song *****************************\n')
            console.log(`  Song Name:  ${JSON.stringify(data.tracks.items[0].name)}`);
            console.log(`Artist Name:  ${JSON.stringify(data.tracks.items[0].album.artists[0].name)}`);
            console.log(`Preview Url:  ${JSON.stringify(data.tracks.items[0].href)}`);
            console.log(`      Album:  ${JSON.stringify(data.tracks.items[0].album.name)}`);
            console.log('\n************************************************************************\n')
        }
    });
};



//movie function
// This function queries the OMDB API with a user provided 'movie name' then logs the required related movie information
function movieThis() {
    let movieName;
    // if user does not type a movie name at command line, using the movie "Mr. Nobody", and returning imdb data
    if (!searchInfo) {
        movieName = 'Mr. Nobody'
    } else {
        movieName = searchInfo;
    }

    const movieSource = `http://www.omdbapi.com/?t=${movieName}&apikey=trilogy`;

    // If there is a query errer log error code.
    request(movieSource, function (err, response, body) {
        if (err) {
            return console.log(`Error occurred: ${err}`);
        } else {
            var info = JSON.parse(body);
            // console.log('body:', info);
            console.log('\n************************ Movie This *****************************\n')
            console.log("                  Title of the movie: " + JSON.parse(body).Title);
            console.log("             Year the movie came out: " + JSON.parse(body).Year);
            console.log("            IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log(" Rotton Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("               Language of the movie: " + JSON.parse(body).Language);
            console.log("                 Actors in the movie: " + JSON.parse(body).Actors);
            console.log("                   Plot of the movie: " + JSON.parse(body).Plot);
            console.log('\n******************************************************************\n')
        }
    });
};



// doWhatItSays function
// This function uses the `fs` Node package to read a random.txt file and then uses it to call one of LIRI's commands: 'concert-this', 'spotify-this-song', or 'movie-this'.  
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        // If there is a readFile errer log error code.
        if (err) {
            return console.log(`Error occurred: ${err}`);
        }
        console.log(`\n\nCommand (from random.txt): ${data}\n`);
        let dataArr = data.split(",");
        action = dataArr[0];
        searchInfo = dataArr[1];
        // based on evaluated command from text file, a corresponding function call occurs
        if (action == "concert-this") {
            concertThis();
        } else if (action == "spotify-this-song") {
            spotifyThisSong();
        } else if (action == "movie-this") {
            movieThis();
        } else {
            // if invalid liri command, log user message
            console.log(`\n !! Invalid Liri Command. Check random.txt file. !!\n`);
        }
    })
};



// Creating a switch-case statement to direct which function gets run, based on user input.
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


// toDos:  
// Hide the keys from movie and concert APIs
// Readme markup
// Challenge