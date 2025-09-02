import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

type Props = {
  visible: boolean;
  winner: 'X' | 'O' | null;
  onClose: () => void;
};

export default function GameOverModal({ visible, winner, onClose }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.text}>
            {winner ? `Player ${winner} Wins!` : "It's a Draw!"}
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center',
    alignItems:'center',
  },
  modal: {
    width:350,
    padding:20,
    backgroundColor:COLORS.background,
    borderRadius:10,
    alignItems:'center',
    shadowColor:'#000',
    shadowOpacity:0.3,
    shadowRadius:10,
  },
  text: {
    fontSize:20,
    fontWeight:'bold',
    marginBottom:20,
    color:COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:8,
  },
  buttonText: { color:'#fff', fontWeight:'bold' },
});
