const cells=document.querySelectorAll('.cell')
const titleHeader=document.querySelector('#titleheader')
const xplayerDisplay=document.querySelector('#xplayerDisplay')
const oplayerDisplay=document.querySelector('#oplayerDisplay')
const restartbtn = document.querySelector('#restartbtn')
// initialize variables of the game
let player='x'
let isPauseGame =false
let isGameStart = false

// Array of win conditions
const inputcellls = ["", "","",
                   "", "", "",
                   "", "", ""]
                //  array of win conditions  
const winconditions= [
     [0,1,2], [3,4,5],[6.7,8] //rows
     [0,3,6], [1,4,7],[2,5,8 ] //columns
     [0,4,8], [2,4,6] //diagnols
]
// click evemts listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell,index) )
}) 
function tapCell (cell,index) {
    // ensure cell is empty and game isn't pause
    if (cell.textContent == '' &&
        !isPauseGame
    ) {
        isGameStart = true
        updateCell(cell, index)
     //do a random pick if there are no results
     if (!checkwinner()) {
        changePlayer()
     }
        
    }
}
 function updateCell(cell, index) {
    cell.textContent = player
    inputcellls[index] = player 
    cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
 }

 function changePlayer() {
    player = (player == 'X') ? 'O' : 'X'
 }

 function checkwinner() {
    for ( const [a,b,c] of winconditions) {
        // check each winning condition
        if (inputcellls[a] == player &&
            inputcellls[b] == player &&
            inputcellls[c] == player            
        ) {
            declareWinner([a,b,c])
            return true
        }

    }
 }

 function declareWinner(winningIndices) {
titleHeader.textContent = '${player} win'
isPauseGame = true

   // Highlight winning cells
   winningIndices.forEach((index)  =>
    cells[index].style.background = '#2A2343'
 )

 restartbtn.style.visibility = 'visible'
 }
  
 restartbtn.addEventListener('click', () => {
    restartbtn.style.visibility = 'hidden'
    inputcellls.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background=''
    })
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent= 'choose'
 })