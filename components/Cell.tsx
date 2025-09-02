import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

type CellProps = {
  value: 'X' | 'O' | null;
  onPress: () => void;
};

export default function Cell({ value, onPress }: CellProps) {
  return (
    <TouchableOpacity style={styles.cell} onPress={onPress}>
      <Text style={styles.cellText}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: { fontSize: 48, fontWeight: 'bold', color: COLORS.primary },
});
