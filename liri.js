var keys = require('./keys.js');

var twitter = require('twitter');

var inquirer = require('inquirer');

var http = require('http');

// Create prompt with list for the command choices

var client = new twitter ({
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret
});

inquirer.prompt([

	{
		type: 'checkbox',
		message: 'Choose a request.',
		choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
		name: 'commands'
	}

]).then(function (user){
	if(user.commands === 'my-tweets') {
		console.log('Ok ' + user.commands);
		function getTweets(){
			return http.get({
				host: 'api.twitter.com/oauth2/token',
				path: ''
			});
		}
		
	} else if (user.commands === 'spotify-this-song') {
		console.log('Ok ' + user.commands);
		inquirer.prompt([
			{
				type: 'input',
				message: 'You chose spotify. Now name a song.',
				name: 'song'
			}
		
		]).then(function (user){
			console.log('You chose ' + user.song);
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
		});
	} else if (user.commands === 'do-what-it-says') {
		console.log('Ok ' + user.commands);

		var fs = require(fs);
		fs.readFile('random.txt', 'utf8', function(err, data){
			var result = data.split(',').forEach(function (item){
				console.log(item);
			});
		});
		inquirer.prompt([

			{	
				type: 'input',
				default: result[]
			}

			]).then(function (user){

			});
	}
});

