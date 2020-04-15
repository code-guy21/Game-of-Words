// prettier-ignore

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
        word: null,
        hidden: [],
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

        /* randomly selects a word from dictionary
        assigns this value to secret.word */
        this.secret.word = this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
        
        //sets secret.hidden to an empty string of the same length
        this.secret.hidden = [...new Array(this.secret.word.length)].map(()=> '_');
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
       
        let matches = 0;
        // check character against characters in secret word
        // if there is match, reveal character in hidden word
        for(let i=0;i<game.secret.word.length;i++){
            if(game.secret.word[i] === keyPress){
                game.secret.hidden[i] = game.secret.word[i];
                matches++;
            }
        }
        //else
        //user will lose a chance/attempt
        if(matches === 0){
            game.lives--;
            console.log('wrong ' + keyPress)
        }
        
        //add character to list of attempted characters
        game.attempted.push(keyPress)
        console.log(game.secret.hidden.join(' '));
    }else{
        //notify user
        console.log('attempted')
    }
            
};
