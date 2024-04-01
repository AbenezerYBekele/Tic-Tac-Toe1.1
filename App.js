import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';

const backgroundImage = require('./background.jpg');

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every(square => square !== null)) {
      return 'Tie';
    }
    return null;
  };

  const handlePress = index => {
    if (winner) {
      resetGame();
    } else if (!winner && !board[index]) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      const gameWinner = checkWinner();
      if (gameWinner) {
        setWinner(gameWinner);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    console.log(board);  // Should log an array of 9 null values
    setCurrentPlayer('X');
    console.log(currentPlayer);  // Should log 'X'
    setWinner(null);
    console.log(winner);  // Should log null
  };

  const renderSquare = (index) => {
    return (
        <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
          <Text style={styles.squareText}>{board[index]}</Text>
        </TouchableOpacity>
    );
  };

  return (
      <ImageBackground source={backgroundImage} style={styles.container}>
        <TouchableOpacity style={styles.newGameButton} onPress={resetGame}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        <View style={styles.board}>
          {board.map((square, index) => renderSquare(index))}
        </View>
        <Text style={styles.gameOver}>
          {winner ? (winner === 'Tie' ? "It's a Tie!" : `Winner: ${winner}`) : ''}
        </Text>
      </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  square: {
    width: 100,
    height: 100,
    paddingVertical:20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  squareText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  gameOver: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  newGameButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },

});

export default App;
