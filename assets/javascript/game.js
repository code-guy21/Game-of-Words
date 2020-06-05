/**
 * Author:    Alexis San Javier
 * Created:   04.18.2020
 **/

//Game object
const game = {
  //tracks if current game is over
  over: true,

  //stores number of guesses avaiable to user
  lives: 7,

  //stores total number of wins
  wins: 0,

  /* stores the secret word,
    hidden version revealed to user,
    number of letters correctly solved,
    array of previously attempted letters */
  secret: {
    word: "",
    hidden: [],
    solved: 0,
    attempts: [],
  },

  //list of secret words
  dictionary: [
    "daenerys",
    "rhaegal",
    "stark",
    "lannister",
    "targaryen",
    "dothraki",
    "arya",
    "direwolf",
    "winterfell",
    "valyrian",
    "cersei",
    "jaime",
    "theon",
    "tyrion",
    "dragonglass",
    "westeros",
    "unsullied",
    "brienne",
    "joffrey",
    "jon",
  ],

  // checks if character is present in array of attempted characters
  attempted: function (char) {
    return game.secret.attempts.includes(char);
  },

  // checks for matching characters in secret word
  guess: function (char) {
    //match counter
    let counter = 0;

    for (let i = 0; i < this.secret.word.length; i++) {
      if (this.secret.word[i] === char) {
        //update hidden word
        this.secret.hidden[i] = this.secret.word[i];
        //update number of characters solved
        this.secret.solved++;
        counter++;
      }
    }

    //return whether any matches were found
    return counter > 0;
  },

  // reset game and generate new secret word
  reset: function () {
    //reset stats
    game.over = false;
    game.lives = 7;
    game.secret = {
      word: "",
      hidden: [],
      solved: 0,
      attempts: [],
    };

    //hide start button
    $("#wl").css("display", "none");

    // randomly selects a word from dictionary
    this.secret.word = this.dictionary[
      Math.floor(Math.random() * this.dictionary.length)
    ];

    //sets hidden word to an empty string of the same length as secret
    this.secret.hidden = [...new Array(this.secret.word.length)].map(() => "_");

    //displays hidden word and stats on game screen
    $("#secret").text(game.secret.hidden.join(" "));
    $("#secret").css("text-decoration", "none");
    $("#lives").text(game.lives);
    $("#wins").text(game.wins);
    $("#guessed").text(game.secret.attempts.join(" "));
  },
};

//Game Listener
$(document).ready(function () {
  //generates alphabet array
  //source: Mariam Sallam
  const alphabet = [...new Array(26)].map((char, i) =>
    String.fromCharCode(i + 97)
  );

  //audio element for music
  let audio = document.createElement("audio");
  audio.setAttribute(
    "src",
    "https://code-guy21.github.io/Game-of-Words/assets/audio/got.mp3"
  );
  audio.setAttribute("crossorigin", "anonymous");

  //music button listener
  $("#music").click(function () {
    let status = $(this);
    if (status.attr("class").split(" ")[1] === "fa-play") {
      audio.play();
      status.attr("class", "fas fa-pause");
    } else {
      audio.pause();
      status.attr("class", "fas fa-play");
    }
  });

  //game reset listener
  $("#wl").click(function () {
    game.reset();
  });

  // key press listener
  $("html").keydown(function (event) {
    //store user guess
    const keyPress = event.key.toLowerCase();

    //check if current game is over
    if (!game.over) {
      //check if character is valid and if user has not attempted it previously
      if (!game.attempted(keyPress) && alphabet.includes(keyPress)) {
        // check if guess is a match
        let guess = game.guess(keyPress);
        // update hidden word
        $("#secret").text(game.secret.hidden.join(" "));

        //add character to list of attempted characters
        game.secret.attempts.push(keyPress);
        $("#guessed").text(game.secret.attempts.join(" "));

        //check if user has guessed full word
        if (guess && game.secret.solved === game.secret.word.length) {
          //notify user
          $("#secret").text(game.secret.hidden.join(" "));
          $("#secret").attr("style", "text-decoration: underline");
          $("#wl").text("continue");
          $("#wl").css("display", "block");

          //update and display new stats
          game.wins++;
          game.lives = 0;
          game.over = true;

          $("#lives").text(game.lives);
          $("#wins").text(game.wins);
        } else if (!guess) {
          //decrease attempts left
          game.lives--;
          $("#lives").text(game.lives);

          //check if user has ran out of attempts
          if (game.lives === 0) {
            console.log("game over!");
            $("#secret").text("Game Over");
            $("#secret").attr("style", "text-decoration: underline");
            $("#wl").text("continue");
            $("#wl").css("display", "block");
            game.over = true;
            game.wins = 0;
          }
        }
      } else {
        console.log(keyPress + " has been attempted");
      }
    }
  });
});
