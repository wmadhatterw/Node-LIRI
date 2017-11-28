// Variables

var fs = require('fs');
var inOne = process.argv[2];
var inTwo = process.argv[3];
var request = require('request');
var Spotify = require('node-spotify-api')
var Twitter = require('twitter')


// Function for Spotify

function getSong(){
	     var spotify = new Spotify({
          id: 'dadff6d037de4238be1b471979f92887',
          secret: 'e6be21f7b21d47f88154479b666abcc9'
     });
     if (inTwo === undefined) {
            inTwo = "superman";
       }
     spotify.search({ type: 'track', query: inTwo}, function(err, data) {
          if (err) {
               return console.log('Error occurred: ' + err);
          }
     
          // console.log(data.tracks.items);

          data.tracks.items.forEach(function(value){
               console.log("Artist Name: " + value.artists[0].name);
               console.log("Song Name: " + value.name);
               console.log("Preview Link: " + value.preview_url);
               console.log("Alumb Name: " + value.album.name);
               console.log("_______________________");
               console.log("");

          })

     });
}

// Function for Twitter



function getTweets(){
var twitterKeys = require("./keys.js");

     // console.log(twitterKeys);

     var client = new Twitter(twitterKeys);
     var limit = {count: 20};

     client.get('statuses/user_timeline', limit, function(error, tweets, response) {
          if (!error) {
               tweets.forEach(function(value){
                    console.log("Tweet: " + value.text);
                    console.log("Date: " + value.created_at);
                    console.log("---------------------------------------------------");
                    console.log("");
               })
          }
     });

};

//Function OMDB API

function getMovie() {
     var queryInput = "Mr. Nobody";
     if (inTwo !== undefined) {
          queryInput = inTwo;
     }
     var movieChoice = queryInput;
	 var movieChoiceArray = movieChoice.split(" ");
	 var movie = movieChoiceArray.join("+");
	               
	 var APIrequest = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=full&apikey=40e9cece";

	               request(APIrequest, function(error, response, body){
	                    if (!error && response.statusCode === 200) {

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
	          }

// // Function Random File

// function getRandom(){
// 	fs.readFile("random.txt", "utf8", function(error, data){
// 		if(error){
// 			console.log(error);
// 		} else{
// 			var dataArray = data.split(',');
// 			var inOne = dataArray[0];
// 			var intwo = dataArray[1];
// 			switch(inOne) {
// 				case "my-tweets":
// 					getTweets();
// 					break;
// 				case "spotify-this-song":
// 					getSong();
// 					break;
// 				case "movie-this":
// 					getMovie();
// 					break;
// 			}
// 		}
// 	});
// };

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
				};









