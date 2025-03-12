// src/screens/GameScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons';
import questionsData from '../data.json';
import Timer from '../components/Timer';

export default function GameScreen({ route, navigation }) {
  const { mode, numQuestions, category } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(numQuestions * 30);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animação de fade-in

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex]);

  const playSound = async (type) => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(
        type === 'correct'
          ? require('../../assets/sounds/correct.mp3')
          : require('../../assets/sounds/wrong.wav')
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (error) {
      console.log('Erro ao tocar som:', error);
    }
  };

  const handleTimeUp = () => {
    Alert.alert('Tempo Esgotado!', 'O jogo terminou.');
    navigation.navigate('Result', {
      player1Score,
      player2Score,
      totalQuestions: numQuestions,
      mode,
    });
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.resposta;

    if (isCorrect) playSound('correct');
    else playSound('wrong');

    if (mode === 'single') {
      if (isCorrect) setPlayer1Score(player1Score + 1);
    } else {
      if (currentPlayer === 1 && isCorrect) setPlayer1Score(player1Score + 1);
      if (currentPlayer === 2 && isCorrect) setPlayer2Score(player2Score + 1);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
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

  if (questions.length === 0) return <Text style={styles.loading}>Carregando...</Text>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Timer initialTime={timeLeft} onTimeUp={handleTimeUp} />
      <Text style={styles.questionNumber}>
        Pergunta {currentQuestionIndex + 1}/{numQuestions}
      </Text>
      {mode === 'multiplayer' && (
        <Text style={styles.playerTurn}>
          <Icon name="person" size={20} color="#e74c3c" /> Vez do Jogador {currentPlayer}
        </Text>
      )}
      <Text style={styles.question}>{currentQuestion.pergunta}</Text>
      {currentQuestion.opcoes.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
          <Icon name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>
      ))}
      <Text style={styles.score}>
        <Icon name="star" size={20} color="#f1c40f" /> Pontuação: Jogador 1 - {player1Score} | Jogador 2 - {player2Score}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8', justifyContent: 'center' },
  loading: { fontSize: 20, fontFamily: 'Lato_400Regular', textAlign: 'center' },
  questionNumber: {
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 10,
  },
  playerTurn: {
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
  },
  optionText: {
    fontFamily: 'Lato_400Regular',
    color: '#fff',
    fontSize: 18,
  },
  score: {
    fontSize: 16,
    fontFamily: 'Lato_700Bold',
    color: '#34495e',
    textAlign: 'center',
    marginTop: 20,
  },
});