//game
const game = {
	//stores number of attempts user has
	lives: 9,
	//stores previous user guesses
	attempts: [],

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

	// check if character is present in array of attempted characters
	attempted: function (char) {
		return game.attempts.includes(char);
	},

	// check character against characters in secret word
	// if there is match, update character in hidden word, update total solved characters
	guess: function (char) {
		let counter = 0;

		for (let i = 0; i < this.secret.word.length; i++) {
			if (this.secret.word[i] === char) {
				this.secret.hidden[i] = this.secret.word[i];
				this.secret.solved++;
				counter++;
			}
		}

		return counter > 0;
	},

	reset: function () {
		//resets values
		game.lives = 9;
		game.attempts = [];
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

	//check if character has already been attempted
	if (!game.attempted(keyPress)) {
		// check if character matches any characters in secret word
		let match = game.guess(keyPress);

		//add character to list of attempts characters
		game.attempts.push(keyPress);
		//reveal current hidden word
		console.log(game.secret.hidden.join(' '));

		//check if user has guessed every character correctly
		if (match && game.secret.solved === game.secret.word.length) {
			//reset game if secret word has been solved
			console.log('You Win!');
			game.reset();
		} else if (!match) {
			game.lives--;
			console.log('wrong guess lives remaining: ' + game.lives);

			// if user is out of lives, reset game
			if (game.lives === 0) {
				console.log('game over!');
				game.reset();
			}
		}
	} else {
		//notify user if character has been previously attempts
		console.log(keyPress + ' has been attempted');
	}
};
