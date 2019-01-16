function myTicTacToe(){
    var player1 = "X";
    var p1Selection = [];
    var player2 = "O";
    var p2Selection = [];
    var slotTaken = [];
    var playerTurn = 0; 
    var turnsCounter = 0;
    var declareWinner = document.getElementById("declare-winner");
    var noWinner = true;
    var tieGame = false;
    declareWinner.innerHTML = "";

    var combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];   // these are the combos to win the game

    var square = document.getElementsByClassName("square");

    var restartbtn = document.getElementById("restart");
    var btn2Player = document.getElementById("two-player-btn");
    var btnVSAI = document.getElementById("vs-ia-btn");
    var boardgame = document.getElementById("boardgame");

   // Which Game Mode to play load function

    btn2Player.addEventListener("click", gameModeLoad2Player);
    btnVSAI.addEventListener("click", gameModeLoadVSAI);
    var selectAGameMode = function(){alert("Please, select a game mode")};
    boardgame.addEventListener("click", selectAGameMode);
    
   
   function gameModeLoad2Player(){
        for (var i = 0 ; i < square.length;i++){
                restart();
                boardgame.removeEventListener("click", selectAGameMode);
                square[i].removeEventListener("click", caseManagement);
                square[i].removeEventListener("click", caseManagementAI);
                square[i].addEventListener("click", caseManagement);
                
            }
    } 

    function gameModeLoadVSAI(){
        for (var i = 0 ; i < square.length;i++){
                restart();
                boardgame.removeEventListener("click", selectAGameMode);
                square[i].removeEventListener("click", caseManagementAI);
                square[i].removeEventListener("click", caseManagement);
                square[i].addEventListener("click", caseManagementAI);
            }
    } 

    // Case Management 2-player Function

    function caseManagement(){
        if (this.innerHTML === "" && noWinner){
            if (playerTurn === 0){
                this.innerHTML = player1;
                this.style.color = "#e75126";
                playerTurn ++;
                turnsCounter = turnsCounter + 1;
                p1Selection.push(parseInt(this.id));
            } else{
                this.innerHTML = player2;
                this.style.color = "#203e84";
                playerTurn --;
                turnsCounter = turnsCounter + 1;
                p2Selection.push(parseInt(this.id));
            }
            if (turnsCounter >=5){
                checkWinner()
            }
        } else if (!noWinner){
            alert("We already have a winner!")
        } else if (tieGame){
            alert("Game tied!")
        } else{ 
            alert("Please select another box")
        }
    }

    // Check Winner Function

    function checkWinner(){
        if (playerTurn == 1){
            slotTaken = p1Selection;
        } else{
            slotTaken = p2Selection;
        }
        for (let i = 0; i < combos.length; i++){
            if(slotTaken.includes(combos[i][0]) && slotTaken.includes(combos[i][1]) && slotTaken.includes(combos[i][2])) {
                var getWinningCombo = combos[i];
                noWinner = false;
                for (var h = 0 ; h < getWinningCombo.length ; h++){
                    square[parseInt(getWinningCombo[h])].style.backgroundColor = "white";
                }
                if (slotTaken == p1Selection) { 
                    document.getElementById('declare-winner').innerHTML = "X Wins!";
                } else{ 
                    document.getElementById('declare-winner').innerHTML = "O Wins!"; 
                }
                break;
            } else {
                if (turnsCounter == 9){
                    document.getElementById('declare-winner').innerHTML = "It's a tie!";
                    tieGame = true;
                }
            }
        }
    }

     // AI player

     function AI (){
        var random = Math.floor(Math.random() * 8);
        while (square[random].innerHTML !== ""){
            random = Math.floor(Math.random() * 8);
        }
        square[random].innerHTML = player2;
        square[random].style.color = "#203e84";
        p2Selection.push(parseInt(square[random].id));
        playerTurn --;
        turnsCounter = turnsCounter + 1 ;
        checkWinner();
    }
    
    // Case Management AI Function

    function caseManagementAI(){
        if (this.innerHTML === "" && noWinner){ 
            this.innerHTML = player1;
            this.style.color = "#e75126";
            turnsCounter = turnsCounter + 1;
            p1Selection.push(parseInt(this.id));
            playerTurn++;
            checkWinnerAI();
            if (noWinner && !tieGame){
                AI();
            }
        } else if (!noWinner){
            alert("We already have a winner!")
        } else if (tieGame){
            alert("Game tied!")
        } else{ 
            alert("Please select another box")
        }
    }

    // Check Winner AI Function

    function checkWinnerAI(){
        if (playerTurn == 1){
            slotTaken = p1Selection;
        } else{
            slotTaken = p2Selection;
        }
        for (let i = 0; i < combos.length; i++){
            if(slotTaken.includes(combos[i][0]) && slotTaken.includes(combos[i][1]) && slotTaken.includes(combos[i][2])) {
                var getWinningCombo = combos[i];
                noWinner = false;
                for (var h = 0 ; h < getWinningCombo.length ; h++){
                    square[parseInt(getWinningCombo[h])].style.backgroundColor = "white";
                }
                if (slotTaken == p1Selection) { 
                    document.getElementById('declare-winner').innerHTML = "X Wins!";
                } else{ 
                    document.getElementById('declare-winner').innerHTML = "AI Wins!"; 
                }
                break;
            } else {
                if (turnsCounter == 9){
                    document.getElementById('declare-winner').innerHTML = "It's a tie!";
                    tieGame = true;
                }
            }
        }
    }


    // Restart Function & Call

    function restart(){
        for (var r = 0 ; r < square.length;r++){
            square[r].innerHTML = "";
            square[r].style.backgroundColor = document.body.style.backgroundColor;
        }
        playerTurn = 0;
        turnsCounter = 0;
        p1Selection = [];
        p2Selection = [];
        declareWinner.innerHTML = "";
        noWinner = true;
        tieGame = false;
    }

    restartbtn.addEventListener("click", restart);

}

window.onload = myTicTacToe;



