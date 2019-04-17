
var keys = require("./keys.js");
var divider = "\n------------------------------------------------------------\n\n";
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var search = process.argv[2];
var argvText = process.argv.slice(3).join(" ");


function spotifyFunction(){
  var spotify = new Spotify({
    id: "4b88672aeb7547caa37f286aada495b4",
    secret: "ba99d8e24d1f4731844f118459a29c2e"
  });
   
  spotify.search({ type: 'track', query: argvText }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var spotifyData = [
      "Title: " + data.tracks.items[0].name,
      "Artist: " + data.tracks.items[0].artists[0].name,
      "Popularity: " + data.tracks.items[0].popularity
    ].join("\n\n");
  console.log(spotifyData); 
  fs.appendFile("random.txt", "\n"+spotifyData + divider, function(err) {

    if (err) throw err;
   
  });
  });

}

function movieFunction(){
  var URL = "http://www.omdbapi.com/?t="+ argvText +"&apikey=ff116acf";

  axios.get(URL).then(function(response) {
    var jsonMovieData = response.data;
    var movieData = [
      "Title: " + jsonMovieData.Title,
      "Year: " + jsonMovieData.Year,
      "Genre: " + jsonMovieData.Genre,
      "Rated: " + jsonMovieData.Rated
    ].join("\n\n");

    fs.appendFile("random.txt", "\n"+ movieData + divider, function(err) {

      if (err) throw err;
     
    });
    console.log(movieData);
  });

}
function bandsFunction(){

  var URL = "https://rest.bandsintown.com/artists/" + argvText + "/events?app_id=b571d915-5e31-42d6-977a-128c258387ce";

  axios.get(URL).then(function(response) {
    var jsonBandsData = response.data;
    var bandsData = [
      "Lineup: " + jsonBandsData[0].lineup,
      "State: " + jsonBandsData[0].venue.region,
      "City: " + jsonBandsData[0].venue.city,
      "Venue: " + jsonBandsData[0].venue.name,
      "Date/Time: " + jsonBandsData[0].datetime
    ].join("\n\n");
    fs.appendFile("random.txt", "\n"+ bandsData + divider, function(err) {

      if (err) throw err;
     
    });
    console.log(bandsData);
  });
  
}

if(search ==="spotify-this-song"){
  spotifyFunction();
}
else if(search ==="concert-this"){
bandsFunction();
}
else if(search ==="movie-this"){
movieFunction();
}
else{
console.log("You must make a meet search requirements");
return;
}
