/**
 * Author:    Alexis San Javier
 * Created:   04.18.2020
 **/

const alphabet = [...new Array(26)].map((char, i) =>
	String.fromCharCode(i + 97)
);

const game = {
	//game session
	over: true,
	//stores number of attempts user has
	lives: 7,

	//stores number of wins
	wins: 0,
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
		game.over = false;
		game.lives = 9;
		game.secret = {
			word: '',
			hidden: [],
			solved: 0,
			attempts: [],
		};

		$('#win-lose').css('display', 'none');

		/* randomly selects a word from dictionary
        assigns this value to secret.word */
		this.secret.word = this.dictionary[
			Math.floor(Math.random() * this.dictionary.length)
		];

		//sets hidden word to an empty string of the same length
		this.secret.hidden = [...new Array(this.secret.word.length)].map(() => '_');

		//displays hidden word on game screen
		$('#secret').text(game.secret.hidden.join(' '));
		$('#secret').css('text-decoration', 'none');
		$('#stats').text(game.lives);
		$('#wins').text(game.wins);
	},
};

$('#win-lose').click(function () {
	//play music
	$('#music')[0].play();
	game.reset();
});

// main event listener
$('html').keydown(function (event) {
	//store key press into variable
	const keyPress = event.key.toLowerCase();

	//check if character has already been attempted
	if (!game.over) {
		if (!game.attempted(keyPress) && alphabet.includes(keyPress)) {
			// check if character matches any characters in secret word
			let guess = game.guess(keyPress);

			//add character to list of attempts characters
			game.secret.attempts.push(keyPress);
			//reveal current hidden word
			$('#secret').text(game.secret.hidden.join(' '));

			//check if user has guessed every character correctly
			if (guess && game.secret.solved === game.secret.word.length) {
				//reset game if secret word has been solved
				$('#secret').text(game.secret.hidden.join(' '));
				$('#secret').attr('style', 'text-decoration: underline');
				$('#win-lose').text('continue');
				$('#win-lose').css('display', 'block');
				game.wins++;
				game.lives = 0;
				$('#stats').text(game.lives);
				$('#wins').text(game.wins);
				game.over = true;
			} else if (!guess) {
				game.lives--;
				$('#stats').text(game.lives);

				// if user is out of lives, reset game
				if (game.lives === 0) {
					console.log('game over!');
					$('#secret').text('Game Over');
					$('#secret').attr('style', 'text-decoration: underline');
					$('#win-lose').text('continue');
					$('#win-lose').css('display', 'block');
					game.over = true;
				}
			}
		} else {
			//notify user if character has been previously attempted
			console.log(keyPress + ' has been attempted');
		}
	}
});
