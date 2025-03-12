import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { pontuacao, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado Final</Text>
      <Text>Pontuação: {pontuacao} / {total}</Text>
      <Button title="Jogar Novamente" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});