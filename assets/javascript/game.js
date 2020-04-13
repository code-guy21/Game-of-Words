// prettier-ignore

//game object
const game = {
    //lives
        //stores number of attempts user has
    lives: 9,
    //attempted
        //stored previous attempts into array
    attempted: [],
    //secret_word
        //secret word that user will attempt to solve
    secret_word: null,
    //secret
        //secret word that will be partially revealed as user correctly guesses
    secret: null,
    //dictionary
        //array that stores a list of possible secret words
    dictionary: [
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
        'test6',
    ] ,
    //guess
        //function that checks if a character is present in the secret word
    guess: function(char) {

    },
    //randomWord
        //function that randomly selects a word from dictionary, sets secret_word to this
        //sets secret to an empty string of the same length
    randomWord: function() {
        
    }
};

// prettier-ignore

// will execute when key is pressed down
document.onkeydown = function (event) {
    //store character into variable
    const keyPress = event.key;

    //check character against characters user has already attempted

        // if user has already attempted that guess
            //notify user

        // else
            // check character against characters in secret word
                //if character is present in secret word
                    //reveal matched characters to user

                //else
                    //user will lose a chance/attempt

            //add character to list of attempted characters
};
