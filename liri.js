// Variables

var fs = require('fs');
var inOne = process.argv[2];
var inTwo = process.argv[3];
var request = require('request');
var Spotify = require('node-spotify-api')
var Twitter = require('twitter')
var nodeArgs = process.argv;
var movieName = "";
var songTitle = "";



// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
    songTitle = songTitle + "+" + nodeArgs[i];
  }

  else {
    movieName += nodeArgs[i];
    songTitle += nodeArgs[i];
  }
}
// Function for Spotify

function getSong(){
	     var spotify = new Spotify({
          id: 'dadff6d037de4238be1b471979f92887',
          secret: 'e6be21f7b21d47f88154479b666abcc9'
     });
     if (inTwo === undefined) {
            songTitle = "The Sign";
       }
     spotify.search({ type: 'track', query: songTitle, limit: "8"}, function(err, data) {
          if (err) {
               return console.log('Error occurred: ' + err);
          }

          data.tracks.items.forEach(function(value){
               fs.appendFileSync('log.txt', "Spotify THIS: " + "\n" + "Artist Name: " + value.artists[0].name + "\n" +
                    "Song Name: " + value.name + "\n" + "Preview Link: " + value.preview_url +"\n" +
                    "Album Name: " + value.album.name + "\n"+ "=============================" + "\n" + "" +"\n");
               console.log("Artist Name: " + value.artists[0].name);
               console.log("Song Name: " + value.name);
               console.log("Preview Link: " + value.preview_url);
               console.log("Album Name: " + value.album.name);
               console.log("============================");
               console.log("");

          })

     });
}

// Function for Twitter



function getTweets(){
var twitterKeys = require("./keys.js");

     var client = new Twitter(twitterKeys);
     var limit = {count: 20};

     client.get('statuses/user_timeline', limit, function(error, tweets, response) {
          if (!error) {
              
               tweets.forEach(function(value){
                    fs.appendFileSync('log.txt', "Tweet: " + value.text + "\n" + "Date: " +
                         value.created_at + "\n" + "================================" + "\n" + "" +"\n");
                    console.log("Tweet: " + value.text);
                    console.log("Date: " + value.created_at);
                    console.log("===============================================");
                    console.log("");
               })
          }
     });

};

//Function OMDB API
function getMovie() {
     if (inTwo === undefined) {
          movieName = "Mr Nobody";
     }
	               
	 var APIrequest = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&apikey=40e9cece";

      request(APIrequest, function(error, response, body){
           if (!error && response.statusCode === 200) {
                fs.appendFileSync('log.txt', "Movie Title: " + JSON.parse(body).Title +
                     "\n" + "Release Year: " + JSON.parse(body).Year + "\n" +
                     "IMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\n" +
                     "Rotten Tomaties Rating: " + JSON.parse(body).Ratings[1].Value + "\n" +
                     "Country where movie was produced: " + JSON.parse(body).Country + "\n" +
                     "Movie language: " + JSON.parse(body).Language + "\n" + 
                     "Actors: " + JSON.parse(body).Actors + "\n" +
                     "=======================================================" + "\n" + "" +"\n");

                    // Parse the body of the site and recover just the imdbRating
                    console.log("Movie Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
                    console.log("Rotten Tomaties Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country where movie was produced: " + JSON.parse(body).Country);
                    console.log("Movie language: " + JSON.parse(body).Language);
                    console.log("Movie plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("");
             }

      })
};

// Function Random File

function getRandom(){
	fs.readFile("random.txt", "utf8", function(error, data){
		if(error){
			console.log(error);
		} else{
			var dataArray = data.split(',');
			inOne = dataArray[0];         
			songTitle = dataArray[1];
      movieName = dataArray[1];        
		  choose();
		}
	});
};

//  Function for Choosing Commands
function choose(){
  switch(inOne) {
  		case "my-tweets":
  			getTweets();
  			break;
  		case "spotify-this-song":
  			getSong();
  			break;
  		case "movie-this":
  			getMovie();
  			break;
      case "do-what-it-says":
        getRandom();
        break;
      default:
         console.log("Please select from 'my-tweets', 'spotify-this-song', 'movie-this'");
         console.log(" or 'do-what-it-says'")
  }
}
choose();

