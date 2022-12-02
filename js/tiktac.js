'use strict'

/* Variables */

let newGameButton = document.querySelector('#new--game--button');
let saveGameButton = document.querySelector('#save--button');
let resetScore = document.querySelector('#reset--score');
let switchText = document.querySelector('#switchText');
let rows = document.querySelectorAll('.active');
let check = document.querySelector('#checkbox');
let result = document.querySelector('#winner');
let p1 = document.querySelector('#p1');
let p2 = document.querySelector('#p2');

let [playerX, playerO, counter, winner,score] = [[],[],0,false,[0,0]];

let winCombs = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[8,7,6]];


/* check for saved games in localStorage and display saved games if it is*/

if (localStorage.getItem('data')) {
  let data = localStorage.getItem('data');
  data = JSON.parse(data);
  document.querySelector('.saved--game').innerHTML = `Saved game ${data['date']} <div><a onclick="loadGame()">Load saved</a></div> <div><a onclick="removeSaved()">Remove saved</a></div>`;
}

/* Event on Save game Button that callback func with stringify JSON and push variables in localStorage */

saveGameButton.addEventListener('click', () => {

  let data = {};
  for (let el of rows){
    data[el.value] = el.textContent;
  }
  data['moves'] = [playerX, playerO];
  let date = new Date;
  data['date'] = date.toLocaleString();
  data['score'] = score;
  data['counter'] = counter;
  data['check'] = check.checked;
  localStorage.setItem('data',JSON.stringify(data))
  document.querySelector('.saved--game').innerHTML = `Saved game ${data['date']} <div><a onclick="loadGame()">Load saved</a></div> <div><a onclick="removeSaved()">Remove saved</a></div>`;
})

/* Func that load already saved object 'data' from localStorage and pull variables */

function loadGame() {
  let data = localStorage.getItem('data');
  data = JSON.parse(data);
  for (let el of rows){
    el.textContent = data[`${el.value}`]
    el.setAttribute('ready', `${el.textContent != '' ? 'false' : 'true'}`);
  }
  playerX = data['moves'][0];
  playerO = data['moves'][1];
  score = data['score'];
  counter = data['counter'];
  check.checked = data['check'];
  switchText.innerHTML = check.checked ? 'P1 move first' : 'P2 move first';
  p1.innerHTML = `P1: ${score[0]}`
  p2.innerHTML = `P2: ${score[1]}`
  
  if (playerX.length > 2 && compare(winCombs, playerX)) {
    result.innerHTML = 'Player 1 win!';
    winner = true;
  }
  if (playerO.length > 2 && compare(winCombs, playerO)) {
    result.innerHTML = 'Player 2 win!';
    winner = true;
  }
}

/* Func that erase any saved data called 'data' on localStorage*/

function removeSaved() {
  localStorage.removeItem('data');
  document.querySelector('.saved--game').innerHTML = ``;
}

/* Check Priority for first move X or O */

function checkPriority() {
  if(check.checked) {
    reset();
    switchText.innerHTML = 'P1 move first';
    counter = 0;
  }
  else {
    reset();
    switchText.innerHTML = 'P2 move first';
    counter = 1;
  }
}

check.addEventListener('change', checkPriority)

/* Compare function check for player Combination include any winning combination */

function compare(winCombs, playerComb){
            for( let i = 0 ; i < winCombs.length ; i++) {
              let flag = true;
            
              winCombs[i].forEach(element => {
                if (!playerComb.includes(element)) flag = false;
              });
              if (flag) return true;
            }
            return false;
          }

 /* Call for function moveFunction() when click on any cell */

    for (let el of rows) {
        el.addEventListener('click', moveFunction);
    }

/* Function of gameplay */

    function moveFunction() {

                  /* Check for draw */ 

        if((playerO.length + playerX.length) > 7 && !winner){
          result.innerHTML = 'It\'s a draw!';
        }

/* Check X for possibilaty make a move and then check for win */

          if (!(counter % 2) && !winner && this.getAttribute('ready') == 'true') {
          this.setAttribute('ready', 'false');
          this.innerHTML = 'X'
          playerX.push(this.value)
          counter++;
             if (playerX.length > 2 && compare(winCombs, playerX)) {
              result.innerHTML = 'Player 1 win!';
              score[0]++
              p1.innerHTML = `P1: ${score[0]}`
              winner = true;
            }
        }  

/* Check O for possibilaty make a move and then check for win */

          else if ((counter % 2) && !winner && this.getAttribute('ready') == 'true') {
            this.setAttribute('ready', 'false');
            this.innerHTML = 'O'
          playerO.push(this.value)
          counter++;

             if (playerO.length > 2 && compare(winCombs, playerO)) {
                result.innerHTML = 'Player 2 win!';
              winner = true;
              score[1]++
              p2.innerHTML = `P2: ${score[1]}`
             }

         }
        }

  /* Event on new game button erase players arrays, set winner = false, check for who's first to move, erase content from cells */
        
  newGameButton.addEventListener('click', reset)

  function reset(){
    [playerO, playerX, winner] = [[],[],false];
    check.checked ? counter = 0 : counter = 1;
    result.innerHTML = '';
    for (let el of rows) {
                  el.innerHTML = '';
                  el.setAttribute('ready', 'true');
    }
}

/* Event on reset score button with callback func that erase score */

  resetScore.addEventListener('click', () => {
    score = [0,0];
    p1.innerHTML = `P1: ${score[0]}`
    p2.innerHTML = `P2: ${score[1]}`
  })

 /* Function that generate gradient colors and set it on game field background */

function getRandomGradient() {
let getRgb = () => Math.floor(Math.random() * 255);
let bg = `linear-gradient(45deg, rgb(${getRgb()} ${getRgb()} ${getRgb()}), rgb(${getRgb()} ${getRgb()} ${getRgb()}))`;
// document.querySelector('body').style.background = bg;document.querySelector('body').style.background = bg;
document.querySelector('.container').style.background = bg;
}

/* Call for func */

getRandomGradient()