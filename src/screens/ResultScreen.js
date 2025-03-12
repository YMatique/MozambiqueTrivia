// src/screens/ResultScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { player1Score, player2Score, totalQuestions, mode } = route.params;

  const percentage = mode === 'single'
    ? ((player1Score / totalQuestions) * 100).toFixed(2)
    : null;

  const winner = player1Score > player2Score ? 'Jogador 1' : player2Score > player1Score ? 'Jogador 2' : 'Empate';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados</Text>
      {mode === 'single' ? (
        <>
          <Text style={styles.result}>Pontuação: {player1Score}/{totalQuestions}</Text>
          <Text style={styles.result}>Percentagem: {percentage}%</Text>
        </>
      ) : (
        <>
          <Text style={styles.result}>Jogador 1: {player1Score}</Text>
          <Text style={styles.result}>Jogador 2: {player2Score}</Text>
          <Text style={styles.result}>Vencedor: {winner}</Text>
        </>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>Voltar ao Início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8', justifyContent: 'center' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center', marginBottom: 40 },
  result: { fontSize: 24, color: '#34495e', textAlign: 'center', marginVertical: 10 },
  backButton: { backgroundColor: '#3498db', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 40 },
  backButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});