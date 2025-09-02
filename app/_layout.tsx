// App.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

type Player = "x" | "o" | null;

export default function App() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState<boolean>(true);

  // Check winner function
  const checkWinner = (board: Player[]): Player | null => {
    const winPatterns: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],  
      [2, 4, 6],
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handlePress = (index: number) => {
    if (board[index]) return;

    const newBoard: Player[] = [...board];
    newBoard[index] = xTurn ? "x" : "o";
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      Alert.alert(`Player ${winner} wins!`);
      resetGame();
      return;
    }

    if (!newBoard.includes(null)) {
      Alert.alert("It's a draw!");
      resetGame();
      return;
    }

    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>Turn: {xTurn ? "Player1" : "Player2"}</Text>
      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  turnText: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 48,
    fontWeight: "bold",
  },
});
