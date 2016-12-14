var keys = require('./keys.js');

var inquirer = require('inquirer');

// Create prompt with list for the command choices

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
		
	}
});

