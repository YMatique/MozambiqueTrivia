import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import questions from '../data/questions.json';

export default function GameScreen({ route, navigation }) {
  const { mode, categoria } = route.params;
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [tempo, setTempo] = useState(30);
  const perguntas = questions[categoria || 'Historia'];

  useEffect(() => {
    if (tempo > 0) {
      const timer = setInterval(() => setTempo(tempo - 1), 1000);
      return () => clearInterval(timer);
    } else {
      proximaPergunta();
    }
  }, [tempo]);

  const responder = (resposta) => {
    if (resposta === perguntas[perguntaAtual].resposta) {
      setPontuacao(pontuacao + 1);
    }
    proximaPergunta();
  };

  const proximaPergunta = () => {
    if (perguntaAtual + 1 < perguntas.length) {
      setPerguntaAtual(perguntaAtual + 1);
      setTempo(30);
    } else {
      navigation.navigate('Result', { pontuacao, total: perguntas.length });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Tempo: {tempo}s</Text>
      <Text style={styles.pergunta}>{perguntas[perguntaAtual].pergunta}</Text>
      {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
        <Button key={index} title={opcao} onPress={() => responder(opcao)} />
      ))}
      <Text>Pontuação: {pontuacao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  timer: { fontSize: 18, color: 'red' },
  pergunta: { fontSize: 20, marginVertical: 20 },
});