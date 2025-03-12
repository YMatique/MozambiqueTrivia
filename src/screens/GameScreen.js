// src/screens/GameScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import questionsData from '../data.json';
import Timer from '../components/Timer';

export default function GameScreen({ route, navigation }) {
  const { mode, numQuestions, category } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 ou 2 no modo multiplayer
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(numQuestions * 30); // 30s por pergunta

  // Função para embaralhar array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Carregar perguntas
  useEffect(() => {
    let allQuestions = [];
    if (category === 'Aleatório') {
      Object.values(questionsData).forEach((catQuestions) => {
        allQuestions = allQuestions.concat(catQuestions);
      });
    } else {
      allQuestions = questionsData[category];
    }
    const shuffledQuestions = shuffleArray([...allQuestions]).slice(0, numQuestions);
    setQuestions(shuffledQuestions);
  }, [category, numQuestions]);

  // Verificar tempo esgotado
  const handleTimeUp = () => {
    Alert.alert('Tempo Esgotado!', 'O jogo terminou.');
    navigation.navigate('Result', {
      player1Score,
      player2Score,
      totalQuestions: numQuestions,
      mode,
    });
  };

  // Responder pergunta
  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.resposta;

    if (mode === 'single') {
      if (isCorrect) setPlayer1Score(player1Score + 1);
    } else {
      if (currentPlayer === 1 && isCorrect) setPlayer1Score(player1Score + 1);
      if (currentPlayer === 2 && isCorrect) setPlayer2Score(player2Score + 1);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Alternar jogador
    }

    if (currentQuestionIndex + 1 < numQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Result', {
        player1Score,
        player2Score,
        totalQuestions: numQuestions,
        mode,
      });
    }
  };

  if (questions.length === 0) return <Text>Carregando...</Text>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Timer initialTime={timeLeft} onTimeUp={handleTimeUp} />
      <Text style={styles.questionNumber}>
        Pergunta {currentQuestionIndex + 1}/{numQuestions}
      </Text>
      {mode === 'multiplayer' && (
        <Text style={styles.playerTurn}>Vez do Jogador {currentPlayer}</Text>
      )}
      <Text style={styles.question}>{currentQuestion.pergunta}</Text>
      {currentQuestion.opcoes.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.score}>
        Pontuação: Jogador 1 - {player1Score} | Jogador 2 - {player2Score}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8', justifyContent: 'center' },
  questionNumber: { fontSize: 18, color: '#7f8c8d', textAlign: 'center', marginBottom: 10 },
  playerTurn: { fontSize: 20, color: '#e74c3c', textAlign: 'center', marginBottom: 20 },
  question: { fontSize: 24, color: '#2c3e50', textAlign: 'center', marginBottom: 30 },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  optionText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  score: { fontSize: 16, color: '#34495e', textAlign: 'center', marginTop: 20 },
});