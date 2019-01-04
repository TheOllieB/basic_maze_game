//xxxxxxxxxxxxxxxxxxxxxxxxxx
// Game configuration data
//xxxxxxxxxxxxxxxxxxxxxxxxxx

// This is a numerical representation of the hero game.
// It uses numbers to represent walls, coins, empty space, and hero.
let gameData = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,1,1,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,2,1,1,1,1,3,1,1,1,1,1,1,1,1,2,2,1],
  [1,3,1,1,1,1,1,2,1,1,2,2,1,3,3,1,2,2,1],
  [1,3,1,2,1,1,3,3,3,3,3,3,1,2,2,1,2,2,1],
  [1,2,1,2,1,1,5,1,1,1,2,2,1,2,2,3,3,3,1],
  [1,2,1,2,2,2,3,3,3,3,1,2,2,2,1,3,1,1,1],
  [1,2,1,1,2,2,1,2,1,1,1,1,1,2,1,2,2,2,1],
  [1,2,3,3,3,2,1,3,3,3,3,2,2,2,1,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Specifically, a wall is represented by the number 1,
// a coin is the number 2, empty ground is the number 3,
// and our Hero is the number 5.

const totalCoins = 57;
// In our code below, we want to be able to refer to names of things,
// and not numbers. To make that possible, we set up a few labels.
const WALL   = 1;
const COIN   = 2;
const GROUND = 3;
const HERO = 5;
let map;

// We need to keep track of our Hero's location on the game board.
// And keep track of what direction he is facing.
let hero = {
  x: 6,
  y: 4,
  direction: 'right'
};

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Game map creation functions
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// This function converts gameData into DOM elements.
function createTiles(data) {

  // We'll keep the DOM elements in an array.
  let tilesArray = [];

  // Let's take one row at a time...
  for (let row of data) {

    // Then look at each column in that row.
    for (let col of row) {

      // We create a game tile as a div element.
      let tile = document.createElement('div');

      // We assign every tile the class name tile.
      tile.classList.add('tile');

      // Now, depending on the numerical value,
      // we need to add a more specific class.
      if (col === WALL) {
        tile.classList.add('wall');

      } else if (col === COIN) {
        tile.classList.add('coin');

      } else if (col === GROUND) {
        tile.classList.add('ground');

      } else if (col === HERO) {
        tile.classList.add('hero');

        // For our Hero, we will add yet another
        // class for the direction the hero is facing.
        tile.classList.add(hero.direction);

      }

      // Now that our individual tile is configured,
      // we add it to the tilesArray.
      tilesArray.push(tile);
    }

    // Once we reach the end of a row, we create a br element,
    // which tells the browser to create a line break on the page.
    let brTile = document.createElement('br');

    // We then add that br element to the tilesArray.
    tilesArray.push(brTile);
  }

  // At the end of our function, we return the array
  // of configured tiles.
  return tilesArray;
}

// This function creates a map element, fills it with tiles,
// and adds it to the page.
function drawMap() {
  map = document.createElement('div');

  let tiles = createTiles(gameData);
  for (let tile of tiles) {
    map.appendChild(tile);
  }
    document.body.appendChild(map);  
}


 function gameOver() {
     coinsLeft = document.querySelectorAll('.coin').length;
     const coinsCollected = 57 - coinsLeft;
     document.getElementById("timer").innerHTML = "Well Done! You collected " + coinsCollected + " bitcoin! Try again?"
 }


// This function removes the map element from the page.
function eraseMap() {
  document.body.removeChild(map);
}

//This is the timer function that counts down from 2 minutes currently 
//not working properly(needs a clear setInterval)
window.onload = function() {
  var hour = 1;
  var sec = 59;
  var timer = setInterval(function() {
    document.getElementById("timer").innerHTML = hour + " : " + sec;
    sec--;
    if (sec == 0 && hour != 0) {
      hour--;
      sec = 60;
    }
    else if (hour === 0 && sec === 0) {
        alert("game over");
        //window.location.href='finishpage.html';
        gameOver();
        clearInterval(timer);
      }
  }, 100);
}

//xxxxxxxxxxxxxxxxxxxxxxxx
// Movement functions
//xxxxxxxxxxxxxxxxxxxxxxxx


// Each function does the following:
// - set hero's direction so that we show the correct image
// - check to see if we hit a wall
// - if we didn't hit a wall, set hero's old location to empty space
// - update hero's location
// - draw hero in the new location

function moveDown() {
  hero.direction = 'down';
  if (gameData[hero.y+1][hero.x] !== WALL) {
    gameData[hero.y][hero.x] = GROUND;
    hero.y = hero.y + 1 ;
    gameData[hero.y][hero.x] = HERO;
  }
}

function moveUp() {
  hero.direction = 'up';
  if (gameData[hero.y-1][hero.x] !== WALL) {
    gameData[hero.y][hero.x] = GROUND;
    hero.y = hero.y - 1;
    gameData[hero.y][hero.x] = HERO;
  }
}

function moveLeft() {
  hero.direction = 'left';
  if (gameData[hero.y][hero.x-1] !== WALL) {
    gameData[hero.y][hero.x] = GROUND;
    hero.x = hero.x - 1 ;
    gameData[hero.y][hero.x] = HERO;
  }
}

function moveRight() {
  hero.direction = 'right';
  if (gameData[hero.y][hero.x+1] !== WALL) {
    gameData[hero.y][hero.x] = GROUND;
    hero.x = hero.x + 1 ;
    gameData[hero.y][hero.x] = HERO;
  }
}

// This function sets up the listener for the whole page.
// Specifically, when the user presses a key, it runs this function
// that handles that key press.
function setupKeyboardControls() {
  document.addEventListener('keydown', function (e) {
    // Each time the user moves, we recalculate our Hero's location,
    if (e.keyCode === 37) {         // left arrow is 37
      moveLeft();

    } else if (e.keyCode === 38) {  // up arrow is 38
      moveUp();

    } else if (e.keyCode === 39){   // right arrow is 39
      moveRight();

    } else if (e.keyCode === 40){   // down arrow is 40
      moveDown();
    }

    // After every move, we erase the map and redraw it.
    eraseMap();
    drawMap();
        
  });
}
//xxxxxxxxxxxx
// Testing
//xxxxxxxxxxxx

// Here we test the if the keyboard controls work as hoped 
//this is commented out due to testing being done before the whole web page and its functions were complete:
// function setupKeyboardControls() {
//   document.addEventListener('keydown', function (e) {
//     if (e.keyCode === 37) { 
//       moveLeft();
//       alert("hero moved right");
//     } else if (e.keyCode === 38) {
//       moveUp();
//       alert("hero moved left");
//     } else if (e.keyCode === 39){
//       moveRight();
//       console.log("Hero moved right");
//     } else if (e.keyCode === 40){
//       moveDown();
//       console.log("Hero moved down");
//     }
        
//   });
// }

//xxxxxxxxxxxxxxxxxxxxxxxxxxx
// Main game setup function 
//xxxxxxxxxxxxxxxxxxxxxxxxxxx

function main() {
  // Initialize the game by drawing the map and setting up the
  // keyboard controls.
  drawMap();
  setupKeyboardControls();
}

// Finally, after we define all of our functions, we need to start
// the game.
main();
