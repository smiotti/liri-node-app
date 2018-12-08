# liri-node-app
### Assignment #10 - LIRI BOT

Welcome to *Liri*, your personal search agent for music and movie infomation.  Similar to it's cousin Siri, Liri will take your command line input of a Song Name, Band Name, Artist, or a Movie Name and return usefull information about the band, song, or movie... like what upcoming venues a particular band will be performing.   The data behind this app is made avaible via API calls to the following data repositories:  

* Bands in Town - http://www.artists.bandsintown.com/bandsintown-api
* Spotify - https://www.npmjs.com/package/node-spotify-api
* OMDB - http://www.omdbapi.com

*This application is inteted for developer learning purposes, and not being published commercially, per 3rd party API guidelines.  All API keys/credentials for these data sources must be obtained by the user in order to run this application.*


### How to use Liri:

To use Liri you will need Node installed on your computure.  Open a command line window, and navigate to the root directory of the program.  Liri responds to four different commands. A desription of each command and links to screenshots of the program in action are provided below!  Use the following syntax from your command line to run Liri (without the quotes) -->  *node liri "command" "searchInfo"* 

   * `concert-this` - This will search the Bands in Town Artist Events API for an artist/band and render the following information about each event to the command line:

     * Name of the venue
     * Venue location

      [Example: node liri concert-this Fleetwood Mac](screen_cap/liri_concert-this.gif)

        *If no artist or band is provided, or there are no upcoming events, then Liri will alert the user.*

        [Example: node liri concert-this U2](screen_cap/liri_concert-this_no_data.GIF)


   * `spotify-this-song` - This will search the Spotify API for a song (artist optional) and render the following information about the song to the command line:

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

      [Example: node liri spotify-this-song Dont stand so close to me](screen_cap/liri_spotify-this-song.gif)

        *If you are getting unexpected results, you can strengthen your search by adding the artist name. To do this use a "," between song and artist.*
        
        [Example: node liri spotify-this-song Alone, Heart](screen_cap/liri_spotify-this-song_with_artis.gif)
        
        *If no song is provided then Liri will default to "What's My Age Again" by blink-182.*

        [Example: node liri spotify-this-song ](screen_cap/liri_spotify-this-song_no_data.GIF)


   * `movie-this` - This will search the OMDB API for a movie and render the following information about the movie to the command line:

       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

        [Example: node liri movie-this Top Gun](screen_cap/liri_movie-this.gif)

        *If the user doesn't type a movie in, Liri will output data for the movie 'Mr. Nobody.*

        [Example: node liri movie-this ](screen_cap/liri_movie-this_no_data.gif)


   * `do-what-it-says` - This will take the text inside of random.txt and then use it to call one of LIRI's commands above.

        [Spotify Example: node liri do-what-it-says](screen_cap/liri_do-what-it-says_ex1.gif)

        [Concert Example: node liri do-what-it-says](screen_cap/liri_do-what-it-says_ex2.gif)

        [Movie Example: node liri do-what-it-says](screen_cap/liri_do-what-it-says_ex3.gif)

        *If the random.txt file contains an invalid command, Liri will alert the user.*

        [Invalid Data Example: node liri do-what-it-says](screen_cap/liri_do-what-it-says_invalid.gif)


------
  
To contribute to the project, or get help -->   steve.miotti@dont_bother_emailing!!.com


:bowtie:

 