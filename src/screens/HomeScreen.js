// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import questionsData from '../data.json';

const categories = Object.keys(questionsData);

export default function HomeScreen({ navigation }) {
  const [mode, setMode] = useState('single');
  const [numQuestions, setNumQuestions] = useState(15);
  const [category, setCategory] = useState('Aleatório');
  const [fadeAnim] = useState(new Animated.Value(0)); // Animação de fade-in

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const startGame = () => {
    navigation.navigate('Game', { mode, numQuestions, category });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Trivia Moçambique</Text>

      <Text style={styles.label}>Modo de Jogo:</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, mode === 'single' && styles.selectedButton]}
          onPress={() => setMode('single')}
        >
          <Icon name="person" size={24} color="#fff" />
          <Text style={styles.buttonText}>Single Player</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, mode === 'multiplayer' && styles.selectedButton]}
          onPress={() => setMode('multiplayer')}
        >
          <Icon name="group" size={24} color="#fff" />
          <Text style={styles.buttonText}>Multiplayer</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Número de Perguntas:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={numQuestions}
          style={styles.picker}
          onValueChange={(value) => setNumQuestions(value)}
        >
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
          <Picker.Item label="20" value={20} />
          <Picker.Item label="25" value={25} />
          <Picker.Item label="30" value={30} />
        </Picker>
      </View>

      <Text style={styles.label}>Categoria:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="Aleatório" value="Aleatório" />
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Icon name="play-arrow" size={24} color="#fff" />
        <Text style={styles.startButtonText}>Iniciar Jogo</Text>
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
  label: {
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
    color: '#34495e',
    marginBottom: 10,
  },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#bdc3c7',
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 3,
  },
  selectedButton: { backgroundColor: '#3498db' },
  buttonText: {
    fontFamily: 'Lato_700Bold',
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  picker: { height: 50, width: '100%' },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  startButtonText: {
    fontFamily: 'Roboto_700Bold',
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
});