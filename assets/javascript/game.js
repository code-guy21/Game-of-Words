// prettier-ignore

//game
const game = {
    //stores number of attempts user has
    lives: 9,

    //stores previous user guesses
    attempted: [],
    
    //secret word that user will attempt to solve
    secret_word: null,

    //secret word that will be partially revealed as user correctly guesses
    secret: null,
    
    //stores a list of possible secret words
    dictionary: [
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
        'test6',
    ] ,
    
    //checks if a specific character is present in the secret word
    guess: function(char) {

    },

    //randomly selects a word from dictionary
    //assigns this value to secret_word
    //sets secret to an empty string of the same length
    randomWord: function() {

    }
};

// prettier-ignore

// main event listener
document.onkeydown = function (event) {
    //store character into variable
    const keyPress = event.key;


    //check character against characters user has already attempted
    if(!game.attempted.includes(keyPress)){
        // check character against characters in secret word
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
