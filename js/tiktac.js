'use strict'
let check = document.querySelector('#checkbox');
let switcher = document.querySelector('#switcher');
let rows = document.querySelectorAll('.active');
let resetBtn = document.querySelector('#reset--button');
let resetScore = document.querySelector('#reset--score');
let result = document.querySelector('#winner');
let p1 = document.querySelector('#p1');
let p2 = document.querySelector('#p2');

localStorage.setItem('data',JSON.stringify({
  'va':5,
  'as':1
}))
console.log(JSON.parse(localStorage.getItem('data')));


let [playerO, playerX, counter, winner,score] = [[],[],0,false,[0,0]];

check.addEventListener('change', ()=>{
  if(check.checked) {
    reset();
    switcher.innerHTML = 'P1 move first';
    counter = 0;
  }
  else {
    reset();
    switcher.innerHTML = 'P2 move first';
    counter = 1;
  }
 
})

let winCombs = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[8,7,6]];

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
    for (let el of rows) {
        el.addEventListener('click', moveFunction);
        
    }

    function moveFunction() {

        if((playerO.length + playerX.length) > 7 && !winner){
          result.innerHTML = 'It\'s a draw!';
        }
          if (!(counter % 2) && !winner && this.getAttribute('ready') == 'true') {
          this.setAttribute('ready', 'false');
          this.innerHTML = 'X'
          playerX.push(this.value)
          counter++;
          console.log( this.status != 'checked');
             if(playerX.length > 2 && compare(winCombs, playerX)) {
              result.innerHTML = 'Player 1 win!';
              score[0]++
              p1.innerHTML = `P1: ${score[0]}`
              winner = true;
            }
        }  
          else if ((counter % 2) && !winner && this.getAttribute('ready') == 'true') {
            this.setAttribute('ready', 'false');
            this.innerHTML = 'O'
          playerO.push(this.value)
          counter++;
          console.log(this.status);
             if(playerO.length > 2 && compare(winCombs, playerO)) {
                result.innerHTML = 'Player 2 win!';
              winner = true;
              score[1]++
              p2.innerHTML = `P2: ${score[1]}`
             }

         }
        }

  resetBtn.addEventListener('click', reset)

  function reset(){
    [playerO, playerX, counter, winner] = [[],[],0,false]
    result.innerHTML = '';
    for (let el of rows) {
                  el.innerHTML = '';
                  el.setAttribute('ready', 'true');
    }
}
  resetScore.addEventListener('click', () => {
    score = [0,0];
    p1.innerHTML = `P1: ${score[0]}`
    p2.innerHTML = `P2: ${score[1]}`
  })
function getRandomGradient() {

let getRgb = () => Math.floor(Math.random() * 255);

let bg = `linear-gradient(45deg, rgb(${getRgb()} ${getRgb()} ${getRgb()}), rgb(${getRgb()} ${getRgb()} ${getRgb()}))`;
document.querySelector('body').style.background = bg;
}
getRandomGradient()