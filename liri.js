require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment")
var fs = require("fs");

function getMeSpotify(song){
    console.log("spotify function");
    if (song === undefined) {
        song = "What's my age again";
      }
    
      spotify.search(
        {
          type: "track",
          query: song,
          limit: 5
        },
        function(err, data) {
          if (err) {
            console.log("Error occurred: " + err);
            return;
          }
    
          var songs = data.tracks.items;
    
          for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists[0].name);
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("-----------------------------------");
          }
        }
      );
}
function getMeMovie(movieName){
    console.log("get me movie info function")
    if (movieName === undefined) {
        movieName = "Mr Nobody";
      }
    
      var urlHit =
        "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    
      axios.get(urlHit).then(
        function(response) {
          var jsonData = response.data;
    
          console.log("Title: " + jsonData.Title);
          console.log("Year: " + jsonData.Year);
          console.log("Rated: " + jsonData.Rated);
          console.log("IMDB Rating: " + jsonData.imdbRating);
          console.log("Country: " + jsonData.Country);
          console.log("Language: " + jsonData.Language);
          console.log("Plot: " + jsonData.Plot);
          console.log("Actors: " + jsonData.Actors);
          console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
      );
}
function getMyBands(artist){
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  console.log(queryURL)
  axios.get(queryURL).then(function(response){
    var data = response.data;
    console.log("data: "+data);
    for(var i=0; i<5;i++){
      //console.log(data[i])
      console.log(data[i].venue.name +"  " +data[i].venue.city +"   " +data[i].venue.country +"  " +moment(data[i].datetime).format("MM/DD/YYYY a"))
      console.log("_________________")
    }
  })
}
function doWhatItSays()
{
  fs.readFile("random.txt","utf8", function(err, data){
    console.log(data);
    var datSpit =data.split(",");
    startLiri(datSpit[0],datSpit[1])
  })
}
function  startLiri(operation, data){
    switch (operation) {
        case "concert-this":
          getMyBands(data);
          break;
        case "spotify-this-song":
          getMeSpotify(data);
          break;
        case "movie-this":
          getMeMovie(data);
          break;
        case "do-what-it-says":
          doWhatItSays();
          break;
        default:
          console.log("LIRI doesn't know that");
        }
}
var operation = process.argv[2];
var data = process.argv.slice(3).join(" ");

startLiri(operation, data)