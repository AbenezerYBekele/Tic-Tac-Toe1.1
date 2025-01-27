import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";

const backgroundImage = require("./background.jpg");

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
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
    if (board.every((square) => square !== null)) {
      return "Tie";
    }
    return null;
  };

  const handlePress = (index) => {
    if (winner) {
      Alert.alert("Game Over", `The game has already ended! Winner: ${winner}`);
      return;
    }
    if (!board[index]) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        Alert.alert(
          "Game Over",
          gameWinner === "Tie" ? "It's a Tie!" : `Winner: ${gameWinner}`
        );
        return;
      }

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.square}
        onPress={() => handlePress(index)}
      >
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
        {board.map((_, index) => renderSquare(index))}
      </View>
      {winner && (
        <Text style={styles.gameOver}>
          {winner === "Tie" ? "It's a Tie!" : `Winner: ${winner}`}
        </Text>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    height: 300,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    overflow: "hidden",
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  squareText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  gameOver: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  newGameButton: {
    marginBottom: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default App;
