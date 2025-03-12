// src/screens/ResultScreen.js
import {React, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ResultScreen({ route, navigation }) {
  const { player1Score, player2Score, totalQuestions, mode } = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const percentage = mode === 'single'
    ? ((player1Score / totalQuestions) * 100).toFixed(2)
    : null;

  const winner = player1Score > player2Score ? 'Jogador 1' : player2Score > player1Score ? 'Jogador 2' : 'Empate';

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Resultados</Text>
      {mode === 'single' ? (
        <>
          <Text style={styles.result}>
            <Icon name="score" size={24} color="#34495e" /> Pontuação: {player1Score}/{totalQuestions}
          </Text>
          <Text style={styles.result}>
            <Icon name="percent" size={24} color="#34495e" /> Percentagem: {percentage}%
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.result}>
            <Icon name="person" size={24} color="#34495e" /> Jogador 1: {player1Score}
          </Text>
          <Text style={styles.result}>
            <Icon name="person" size={24} color="#34495e" /> Jogador 2: {player2Score}
          </Text>
          <Text style={styles.result}>
            <Icon name="emoji-events" size={24} color="#f1c40f" /> Vencedor: {winner}
          </Text>
        </>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Voltar ao Início</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8', justifyContent: 'center' },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto_700Bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 40,
  },
  result: {
    fontSize: 24,
    fontFamily: 'Lato_400Regular',
    color: '#34495e',
    textAlign: 'center',
    marginVertical: 10,
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    elevation: 5,
  },
  backButtonText: {
    fontFamily: 'Roboto_700Bold',
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
});