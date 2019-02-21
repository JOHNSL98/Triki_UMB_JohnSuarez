

    var mBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    var BOARD_SIZE = 9;

// Nivel de dificultad
    const DifficultyLevel = {
        Easy: 'Easy',  Harder: 'Harder', Expert: 'Expert'
    }

// Nivel de dificultad actual
    var mDifficultyLevel = DifficultyLevel.Expert;

//Representacion de jugadas del jugador en el tablero
    var HUMAN_PLAYER = 'X';

//Representacion de jugadas del computador en el tablero
    var COMPUTER_PLAYER = 'O';

//Representacion de casillas disponibles en el tablero
    var OPEN_SPOT = ' ';

//Numero aleatorio para siguiente movimiento del computador
    var mRand;

    function TicTacToeGame() {
        // Semilla para el generador de numeros aleatorios
        mRand = Math.floor((Math.random() * (9-1))+1);

    }

    function displayBoard() {

        console.log();

                console.log(mBoard[0] + " | " + mBoard[1] + " | " + mBoard[2]);

                console.log("-----------");

                console.log(mBoard[3] + " | " + mBoard[4] + " | " + mBoard[5]);

                console.log("-----------");

                console.log(mBoard[6] + " | " + mBoard[7] + " | " + mBoard[8]);

                console.log();

    }

// checkForWinner() funcion que retorna Return
// 0 si no hay un ganador o empate
// 1 si es un empate
// 2 si X gano
// 3 si O gano
    function checkForWinner() {

// Verifica ganador en horizontales
        for (var i = 0; i <= 6; i += 3) {

            if (mBoard[i] == HUMAN_PLAYER
                    && mBoard[i + 1] == HUMAN_PLAYER
                    && mBoard[i + 2] == HUMAN_PLAYER) {
                return 2;
            }

            if (mBoard[i] == COMPUTER_PLAYER
                    && mBoard[i + 1] == COMPUTER_PLAYER
                    && mBoard[i + 2] == COMPUTER_PLAYER) {
                return 3;
            }

        }

// Verifica ganador en verticales
        for (var i = 0; i <= 2; i++) {

            if (mBoard[i] == HUMAN_PLAYER
                    && mBoard[i + 3] == HUMAN_PLAYER
                    && mBoard[i + 6] == HUMAN_PLAYER) {
                return 2;
            }

            if (mBoard[i] == COMPUTER_PLAYER
                    && mBoard[i + 3] == COMPUTER_PLAYER
                    && mBoard[i + 6] == COMPUTER_PLAYER) {
                return 3;
            }

        }

// Verifica ganador en verticales
        if ((mBoard[0] == HUMAN_PLAYER
                && mBoard[4] == HUMAN_PLAYER
                && mBoard[8] == HUMAN_PLAYER)
                || (mBoard[2] == HUMAN_PLAYER
                && mBoard[4] == HUMAN_PLAYER
                && mBoard[6] == HUMAN_PLAYER)) {
            return 2;
        }

        if ((mBoard[0] == COMPUTER_PLAYER
                && mBoard[4] == COMPUTER_PLAYER
                && mBoard[8] == COMPUTER_PLAYER)
                || (mBoard[2] == COMPUTER_PLAYER
                && mBoard[4] == COMPUTER_PLAYER
                && mBoard[6] == COMPUTER_PLAYER)) {
            return 3;
        }

// Verifica si hay empate
        for (var i = 0; i < BOARD_SIZE; i++) {

// Si hay una casilla sin movimiento ni humano ni del computador aun no hay ganador ni empate
            if (mBoard[i] != HUMAN_PLAYER && mBoard[i] != COMPUTER_PLAYER) {
                return 0;
            }

        }

// Si ningun caso anterior se presenta, entonces es un empate
        return 1;

    }

//getComputerMove(). Retorna
//Se obtiene la casilla donde jugara el computador dependiendo de la dificultad
    function getComputerMove() {
        
        var move;

//Si la dificultad es facil
        if (mDifficultyLevel == DifficultyLevel.Easy) {

//Se calcula un movimiento aleatorio disponible
            do {
                TicTacToeGame();

                move = mRand;

            } while (mBoard[move] == HUMAN_PLAYER || mBoard[move] == COMPUTER_PLAYER);

//Si la dificultad es dificil
        } else if (mDifficultyLevel == DifficultyLevel.Harder) {

// Se evalua si hay un movimiento para que el computador gane
            for (var i = 0; i < BOARD_SIZE; i++) {

                if (mBoard[i] != HUMAN_PLAYER && mBoard[i] != COMPUTER_PLAYER) {

                    var curr = mBoard[i];

                    mBoard[i] = COMPUTER_PLAYER;

                    if (checkForWinner() == 3) {

                        console.log("Computer is moving to 1" + (i + 1));

                        return i;

                    } else {
                        mBoard[i] = curr;
                    }

                }

            }

// De lo contrario de genera un movimiento aleatorio
            do {
                TicTacToeGame();

                move = mRand;

            } while (mBoard[move] == HUMAN_PLAYER || mBoard[move] == COMPUTER_PLAYER);

//Si la dificultad es experto
        } else {

// Se evalua si hay un movimiento para que el computador gane
            for (var i = 0; i < BOARD_SIZE; i++) {

                if (mBoard[i] != HUMAN_PLAYER && mBoard[i] != COMPUTER_PLAYER) {

                    var curr = mBoard[i];

                    mBoard[i] = COMPUTER_PLAYER;

                    if (checkForWinner() == 3) {

                        console.log("Computer is moving to 2" + (i + 1));

                        return i;

                    } else {
                        mBoard[i] = curr;
                    }

                }

            }

// Se evalua si hay un movimiento del computador para evitar que el humano gane
            for (var i = 0; i < BOARD_SIZE; i++) {

                if (mBoard[i] != HUMAN_PLAYER && mBoard[i] != COMPUTER_PLAYER) {

                    var curr = mBoard[i]; // Save the current number

                    mBoard[i] = HUMAN_PLAYER;

                    if (checkForWinner() == 2) {

                        mBoard[i] = COMPUTER_PLAYER;

                        setMove(COMPUTER_PLAYER, i);

                        console.log("Computer is moving to 3" + (i + 1));

                        return i;

                    } else {
                        mBoard[i] = curr;
                    }

                }

            }

//De lo contrario genera un movimiento aleatorio disponible
            do {
                TicTacToeGame();

                move = mRand;

            } while (mBoard[move] == HUMAN_PLAYER || mBoard[move] == COMPUTER_PLAYER);

        }

        console.log("Computer is moving to 4" + (move + 1));

        setMove(COMPUTER_PLAYER, move);

        return move;

    }

//clearBoard()
//Limpia el tablero
    function clearBoard() {

        for (var i = 0; i < BOARD_SIZE; i++) {

            mBoard[i] = OPEN_SPOT;

        }

    }

//setMove()
//Guarda en el tablero un movimiento de un jugador(Humano/computador) en una posicion determinada
//Retorna falso si la casilla esta ocupada, de lo contrario retorna verdadero
    function setMove( player, location) {

        if (mBoard[location] == OPEN_SPOT) {

            if (player == HUMAN_PLAYER) {

                mBoard[location] = HUMAN_PLAYER;

            } else {

                mBoard[location] = COMPUTER_PLAYER;

            }

            return true;

        }

        return false;

    }

    function getDifficultyLevel() {

        return mDifficultyLevel;

    }

    function setDifficultyLevel(mDifficultyLevel) {

        this.mDifficultyLevel = mDifficultyLevel;

    }

    function getBoardOccupant(i) {

        return mBoard[i];

    }

    function getBoardState() {

        return mBoard;

    }

    function setBoardState(charArray) {

        mBoard = charArray;

    }