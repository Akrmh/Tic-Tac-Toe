import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Cell from '../components/Cell';
import GameOverModal from '../components/GameOverModal'; // ✅ import modal
import { checkWinner } from '../utils/checkWinner';
import { COLORS } from '../constants/theme';
import { useRouter } from 'expo-router';

type Player = 'X' | 'O' | null;

export default function GameScreen() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const handlePress = (index: number) => {
    if (board[index] || modalVisible) return; // prevent clicks when modal is open

    const newBoard: Player[] = [...board];
    newBoard[index] = xTurn ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setModalVisible(true);
      return;
    }

    if (!newBoard.includes(null)) {
      setWinner(null); // draw
      setModalVisible(true);
      return;
    }

    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>Turn: {xTurn ? 'X' : 'O'}</Text>
      <View style={styles.board}>
        {board.map((value, index) => (
          <Cell key={index} value={value} onPress={() => handlePress(index)} />
        ))}
      </View>
      <View style={styles.buttons}>
        <Button title="Reset Game" onPress={resetGame} color={COLORS.secondary} />
      </View>

      {/* Modal Component */}
      <GameOverModal
        visible={modalVisible}
        winner={winner}
        onClose={resetGame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  turnText: { fontSize: 22, marginBottom: 20, color: COLORS.text },
  board: { width: 300, height: 300, flexDirection: 'row', flexWrap: 'wrap' },
  buttons: { marginTop: 20, width: '60%', justifyContent: 'space-between', height: 100 },
});
