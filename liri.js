var keys = require('./keys.js');

var twitter = require('twitter');

var spotify = require('spotify');

var omdb = require('omdb');

var inquirer = require('inquirer');

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
				name: 'movie'
			}

		]).then(function (user){
			console.log('You chose ' + user.movie);
			omdb.get({title: user.movie, type: 'movie'}, {tomatoes: true}, function(err, movie){
				if (err) {
					throw err;
				} else {
				console.log(JSON.stringify(movie, null, 2));	
				console.log('Movie: ' + movie);
				}
			});
			
		});
	} else if (user.commands === 'do-what-it-says') {
		console.log('Ok ' + user.commands);

		var fs = require(fs);
		fs.readFile('random.txt', 'utf8', function(err, data){
			var result = data.split(',').forEach(function (item){
				console.log(item);
			});
		});
		
	}
});

