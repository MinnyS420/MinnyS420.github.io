
// This code is for a tic-tac-toe game. The board is represented by an array of nine empty strings. The currentPlayer variable stores the player's turn (X or O). The squares variable stores all the squares in the game board. The message variable stores the message that will be displayed to the user. 

// An event listener is added to each square on the board so that when it is clicked, it will check whether there is already a value in that square. If there isn't, it will add the current player's value to the board array and add a class of either 'x' or 'o' to that square. It will then check for a winner and if one exists, display a message saying who won and disable all squares from being clicked again. If there isn't a winner, it will check for a draw and if one exists, display a message saying it's a draw. Otherwise, it will switch players and update the message with whose turn it is now. 

// There are two functions: checkForWinner() which checks whether there are three of the same values in any row, column or diagonal on the board; and checkForDraw() which checks whether all squares have been filled with values (X or O). 

// Lastly, an event listener is added to the reset button so that when clicked, it will reset all variables back to their original state and enable all squares for clicking again.