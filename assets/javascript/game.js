// prettier-ignore

//game
const game = {
    //stores number of attempts user has
    lives: 9,

    //stores previous user guesses
    attempted: [],
    
    //secret object stores secret word
    //hidden version revealed to user
    //number of letters correctly solved
    secret: {
        word: null,
        hidden: null,
        solved: 0,
    },
    
    //stores a list of possible secret words
    dictionary: [
        'dog',
        'cat',
        'hamster',
        'bird',
        'bunny',
        'hedgehog',
    ] ,
    
    //checks if a specific character is present in the secret word
    guess: function(char) {

    },

    randomWord: function() {

        //randomly selects a word from dictionary
        //assigns this value to secret_word
        this.secret.word = this.dictionary[Math.floor(Math.random() * this.dictionary.length)];

        //sets secret to an empty string of the same length
        this.secret.hidden = '_'.repeat(this.secret.word.length);
    }
};

game.randomWord();

// prettier-ignore

// main event listener
document.onkeydown = function (event) {
    //store character into variable
    const keyPress = event.key.toLowerCase();

    //check character against characters user has already attempted
    if(!game.attempted.includes(keyPress)){
       
        // check character against characters in secret word
        for(let i=0;i<game.secret_word.length;i++){

        }
                        //if character is present in secret word
                            //reveal matched characters to user

                        //else
                            //user will lose a chance/attempt

        //add character to list of attempted characters
        game.attempted.push(keyPress)
    }else{
        //notify user
        console.log('attempted')
    }
            
};
