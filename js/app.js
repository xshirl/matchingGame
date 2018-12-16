//array with font awesome symbols
var symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];

var opened = [];
var matched = [];
var clicks = 0;
var stars = 3;
var timer;
var $deck = $(".deck")

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initGame() {
  //creates shuffled array
  var cards = shuffle(symbols);

  //appends cards to deck
  for (var i = 0; i < cards.length; i++) {
    $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
  }
}

initGame();

var cards = [];
//gives each card a unique id
for (var i = 0; i<16; i++) {
  cards.push($(".card")[i]);
  $(cards[i]).attr("id", i);
}

$('.card').on('click', click);

function click() {
  clicks++;
  $('.moves').text(clicks);
  if (opened.length < 2) {

        $(this).addClass('open show');
        opened.push(this);
  }
  //if click on same card, remove card from opened
        if (opened.length === 2 && $(opened[0]).attr('id') === $(opened[1]).attr('id')) {
            matched = [];
    $(opened[1]).removeClass('show open');
            opened = [];

        } else if (opened.length === 2) {
            //if click on two cards, run function check
            setTimeout(check, 1000);
        }

  if (clicks >8 && clicks <16) {
    $('.star-three').hide();
  }
  else if (clicks > 16) {
    $('.star-two').hide();
  }
    }

  function check() {
    while (opened.length === 2) {
        if (opened[0].innerHTML !== opened[1].innerHTML) {
          //if two cards don't match, flip them over
            opened.map(function(card){
                $(card).removeClass('open show');
            });
            opened = [];
        } else {
          // if cards match, give them green color and push to matched array
            opened.map(function(card) {
                $(card).addClass('match');
                matched.push(card);
                if (matched.length === 16) {
          findWinner();

                }
            });



            opened = [];
        }
    }


}

// restarts game
function restartGame() {
  $(".restart").on("click", function() {
      location.reload();
  });
  }

restartGame();

// at the end of the game, the modal pops up with time, number of moves, and star level.
function findWinner() {

  if (matched.length === 16) {

    var modal = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];

    $("#total-moves").text(clicks);
    $("#total-stars").text(stars);

    modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

   $("#play-again-btn").on("click", function() {
       location.reload();
   });

   clearInterval(timer);


 }
}


function startTimer() {
  var clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  });
 }

startTimer();
