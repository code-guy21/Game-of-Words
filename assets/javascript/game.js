/**
 * Author:    Alexis San Javier
 * Created:   04.18.2020
 **/

const game = {
	//stores number of attempts user has
	lives: 9,

	/* secret object stores secret word,
    hidden version revealed to user,
    number of letters correctly solved,
    array of previously attempted letters */
	secret: {
		word: '',
		hidden: [],
		solved: 0,
		attempts: [],
	},

	//stores a list of possible secret words
	dictionary: [
		'daenerys',
		'rhaegal',
		'stark',
		'lannister',
		'targaryen',
		'dothraki',
		'arya',
		'direwolf',
		'winterfell',
		'valyrian',
		'cersei',
		'jaime',
		'theon',
		'tyrion',
		'dragonglass',
		'westeros',
		'unsullied',
		'brienne',
		'joffrey',
		'jon',
	],

	// check if character is present in array of attempted characters
	attempted: function (char) {
		return game.secret.attempts.includes(char);
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
		//reset values
		game.lives = 9;
		game.over = false;
		game.secret = {
			word: '',
			hidden: [],
			solved: 0,
			attempts: [],
		};

		/* randomly selects a word from dictionary
        assigns this value to secret.word */
		this.secret.word = this.dictionary[
			Math.floor(Math.random() * this.dictionary.length)
		];

		//sets hidden word to an empty string of the same length
		this.secret.hidden = [...new Array(this.secret.word.length)].map(() => '_');

		//displays hidden word on game screen
		$('#secret').text(game.secret.hidden.join(' '));
		$('#stats').text(game.lives);
	},
};

game.reset();

// main event listener
$('html').keydown(function (event) {
	//if game ended reset it
	if (game.over) {
		game.reset();
		game.over = false;
	} else {
		//store key press into variable
		const keyPress = event.key.toLowerCase();

		//check if character has already been attempted
		if (!game.attempted(keyPress)) {
			// check if character matches any characters in secret word
			let guess = game.guess(keyPress);

			//add character to list of attempts characters
			game.secret.attempts.push(keyPress);
			//reveal current hidden word
			$('#secret').text(game.secret.hidden.join(' '));

			//check if user has guessed every character correctly
			if (guess && game.secret.solved === game.secret.word.length) {
				//reset game if secret word has been solved
				console.log('You Win!');
				game.over = true;
			} else if (!guess) {
				game.lives--;
				$('#stats').text(game.lives);
				console.log('wrong guess lives remaining: ' + game.lives);

				// if user is out of lives, reset game
				if (game.lives === 0) {
					console.log('game over!');
					game.over = true;
				}
			}
		} else {
			//notify user if character has been previously attempted
			console.log(keyPress + ' has been attempted');
		}
	}
});
