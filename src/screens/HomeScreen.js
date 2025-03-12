// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import questionsData from '../data.json';

const categories = Object.keys(questionsData);

export default function HomeScreen({ navigation }) {
  const [mode, setMode] = useState('single'); // single ou multiplayer
  const [numQuestions, setNumQuestions] = useState(15); // padrão 15
  const [category, setCategory] = useState('Aleatório'); // categoria ou aleatório

  const startGame = () => {
    navigation.navigate('Game', { mode, numQuestions, category });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trivia Moçambique</Text>

      <Text style={styles.label}>Modo de Jogo:</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, mode === 'single' && styles.selectedButton]}
          onPress={() => setMode('single')}
        >
          <Text style={styles.buttonText}>Single Player</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, mode === 'multiplayer' && styles.selectedButton]}
          onPress={() => setMode('multiplayer')}
        >
          <Text style={styles.buttonText}>Multiplayer</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Número de Perguntas:</Text>
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

      <Text style={styles.label}>Categoria:</Text>
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

      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Text style={styles.startButtonText}>Iniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f8', justifyContent: 'center' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center', marginBottom: 40 },
  label: { fontSize: 18, color: '#34495e', marginBottom: 10 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  button: { flex: 1, padding: 15, backgroundColor: '#bdc3c7', borderRadius: 10, marginHorizontal: 5 },
  selectedButton: { backgroundColor: '#3498db' },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  picker: { height: 50, width: '100%', backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 },
  startButton: { backgroundColor: '#e74c3c', padding: 20, borderRadius: 15, alignItems: 'center' },
  startButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});