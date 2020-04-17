//game
const game = {
	//stores number of attempts user has
	lives: 9,
	//stores previous user guesses
	attempted: [],

	/* secret object stores secret word,
    hidden version revealed to user,
    number of letters correctly solved */
	secret: {
		word: '',
		hidden: [],
		solved: 0,
	},

	//stores a list of possible secret words
	dictionary: ['dog', 'cat', 'hamster', 'bird', 'bunny', 'hedgehog'],

	//checks if a specific character is present in the secret word
	guess: function (char) {},

	reset: function () {
		//resets values
		game.lives = 9;
		game.attempted = [];
		game.secret.word = '';
		game.secret.hidden = [];
		game.secret.solved = 0;

		/* randomly selects a word from dictionary
        assigns this value to secret.word */
		this.secret.word = this.dictionary[
			Math.floor(Math.random() * this.dictionary.length)
		];

		//sets secret.hidden to an empty string of the same length
		this.secret.hidden = [...new Array(this.secret.word.length)].map(() => '_');
	},
};

game.reset();

// main event listener
document.onkeydown = function (event) {
	//store key press into variable
	const keyPress = event.key.toLowerCase();

	//check character against characters user has already attempted
	if (!game.attempted.includes(keyPress)) {
		// set initial character matches to false
		let matches = false;

		// check character against characters in secret word
		// if there is match, update character in hidden word, set matches to true, update total solved characters
		for (let i = 0; i < game.secret.word.length; i++) {
			if (game.secret.word[i] === keyPress) {
				game.secret.hidden[i] = game.secret.word[i];
				game.secret.solved++;
				matches = true;
			}
		}

		//add character to list of attempted characters
		game.attempted.push(keyPress);
		//reveal current hidden word
		console.log(game.secret.hidden.join(' '));

		//check if user has guessed every character correctly
		if (matches && game.secret.solved === game.secret.word.length) {
			//reset game if secret word has been solved
			console.log('You Win!');
			game.reset();
		} else if (!matches) {
			game.lives--;
			console.log('wrong guess lives remaining: ' + game.lives);

			// if user is out of lives, reset game
			if (game.lives === 0) {
				console.log('game over!');
				game.reset();
			}
		}
	} else {
		//notify user if character has been previously attempted
		console.log(keyPress + ' has been attempted');
	}
};
