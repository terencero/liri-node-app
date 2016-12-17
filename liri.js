// twitter keys from keys.js
var keys = require('./keys.js');
// inquirer npm package
var inquirer = require('inquirer');
// file system built into nodejs to read random.txt
var fs = require('fs');
// twitter npm/api
var twitter = require('twitter');
// spotify npm/api
var spotify = require('spotify');
// omdb npm/api
var omdb = require('omdb');

var http = require('http');

var doWhatItSays = process.argv[2];


// Create prompt with list for the command choices

var client = new twitter ({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});


inquirer.prompt([

	{
		type: 'list',
		message: 'Choose a request.',
		choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
		name: 'commands'
	}

]).then(function (user){
	if(user.commands === 'my-tweets') {
		console.log('Ok ' + user.commands);
		client.get('statuses/user_timeline', {count: 20, screen_name: '@tro1109'}, function(error, tweets, response){
			if (error) {
				throw error;
			} else {

			var tweetsResults = [];
			for (var i = 0; i < tweets.length; i++) {

				tweetsResults.push(tweets[i].text + ' --created on-- ' + tweets[i].created_at);
				tweetsResults.push('_________________________________________________________');

			}
			console.log(JSON.stringify(tweetsResults, null, 2));
			}
		});
		
	} else if (user.commands === 'spotify-this-song') {
		console.log('Ok ' + user.commands);
		inquirer.prompt([
			{
				type: 'input',
				message: 'You chose spotify. Now name a song.',
				name: 'song',
				default: 'The Sign Ace of Base'
			}
		
		]).then(function (user){
			console.log('You chose ' + user.song);
			spotify.search({ type: 'track', query: user.song }, function(err, data){
				if (err) {
					throw err;
				} else {	
				var artistsName = data.tracks.items[0].artists[0].name;
				var songName = data.tracks.items[0].name;
				var songPreview = data.tracks.items[0].preview_url;
				var albumName = data.tracks.items[0].album.name;

				console.log('Artist(s): ' + artistsName + '\n' + 'Song: ' + songName + '\n' + 'Preview: ' + songPreview + '\n' + 'Album');
				console.log('Song: ' + songName);
				console.log('Preview: ' + songPreview);
				console.log('Album: ' + albumName);
				}
			});	
		});
		
	} else if (user.commands === 'movie-this') {
		console.log('Ok ' + user.commands);
		inquirer.prompt([

			{	
				type: 'input',
				message: 'You chose movie-this. Now name a movie.',
				name: 'movie',
				default: 'Mr. Nobody'
			}

		]).then(function (user){
			console.log('You chose ' + user.movie);
			omdb.get({title: user.movie, type: 'movie'}, {tomatoes: true}, function(err, movie){
				if (err) {
					throw err;
				} else {
				var title = movie.title;
				var year = movie.year;
				var omdbRating = movie.rated;
				var country = movie.countries;
				var plot = movie.plot;
				var actors = movie.actors;
				var rottenRating = movie.tomato.rating;
				var rottenURL = movie.tomato.url;
				console.log('Movie Title: ' + title + '\n' + '________________' + '\n' + 'Movie Produced Year: ' + year + '\n' + '________________' + '\n' + 'Rating: ' + omdbRating + '\n' + '________________' + '\n' + 'Produced in: ' + country + '\n' + '________________' + '\n' + 'Plot: ' + plot + '\n' + '________________' + '\n' + 'Actors: ' + actors + '\n' + '________________' + '\n' + 'Rotten Tomatoes Rating: ' + rottenRating + '\n' + '________________' + '\n' + 'Rotten Tomatoes URL: ' + rottenURL);	
				}
			});
			
		});
	} else if (user.commands === 'do-what-it-says') {
		console.log('Ok ' + user.commands);
		var output;
		
		fs.readFile('random.txt', 'utf8', function(err, data){
			output = data.split(",");

			spotify.search({ type: 'track', query: output[1] }, function(err, data){
				if (err) {
					throw err;
				} else {	
				var artistsName = data.tracks.items[0].artists[0].name;
				var songName = data.tracks.items[0].name;
				var songPreview = data.tracks.items[0].preview_url;
				var albumName = data.tracks.items[0].album.name;

				console.log('Artist(s): ' + artistsName + '\n' + 'Song: ' + songName + '\n' + 'Preview: ' + songPreview + '\n' + 'Album');
				}
			});	
		});
	}
});

