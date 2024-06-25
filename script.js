const playerForm = document.getElementById('playerForm');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const startBtn = document.getElementById('submit');
const gameBoard = document.getElementById('gameBoard');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.grid-item')
        
let currentPlayer = 'x';
let player1Name = '';
let player2Name = '';
let board = ['', '', '', '', '', '', '', '', '', ''];
let gameActive = true;

//on submit - form get invisible
startBtn.addEventListener('click',function(e){
    e.preventDefault();
    player1Name=player1.value;
    player2Name=player2.value;

    if(player1Name && player2Name){
        gameBoard.style.display='block';
        playerForm.style.display='none';
        messageDiv.textContent=`${player1Name},you're up!`;
    }
});

cells.forEach((cell)=>{
    cell.addEventListener('click', function(){
        const cellIdx=parseInt(cell.id) - 1;

        if(board[cellIdx]=="" && gameActive){
            board[cellIdx] =  currentPlayer;
            cell.textContent=currentPlayer;

            if(checkWin())
                {
                    let winnerName=currentPlayer=='x'? player1Name:player2Name;
                    messageDiv.textContent=`${winnerName} congratulations you won!`;
                    gameActive=false;
                    return;
                }
            if(checkDraw()){
                messageDiv.textContent = 'It is a draw!';
                gameActive = false;
                return; 
            }

            currentPlayer=currentPlayer=='x'? 'o':'x';
            currentPlayerName=currentPlayer=='x'? player2Name:player2Name;
            messageDiv.textContent=`${currentPlayerName},you're up!`;
                
        }

    });
});

function checkWin(){
    const winConditions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    return winConditions.some(condition=>{
        return condition.every(index=>{
            return board[index]==currentPlayer;
        })
    })

}

function checkDraw(){
    return board.every(cell=>{return cell!=''});
}