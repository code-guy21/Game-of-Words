// prettier-ignore

//game object
const game = {
    //lives
        //stores number of attempts user has

    //attempted
        //stored previous attempts into array

    //secret_word
        //secret word that user will attempt to solve

    //secret
        //secret word that will be partially revealed as user correctly guesses

    //dictionary
        //array that stores a list of possible secret words

    //guess
        //function that checks if a character is present in the secret word

    //randomWord
        //function that randomly selects a word from dictionary, sets secret_word to this
        //sets secret to an empty string of the same length

};

// prettier-ignore

// will execute when key is pressed down
document.onkeydown = function (event) {
    //store character into variable
    
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
