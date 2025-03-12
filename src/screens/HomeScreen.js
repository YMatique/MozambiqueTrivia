import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const categorias = ['Historia', 'Geografia', 'Economia', 'Politica', 'Demografia'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mozambique Trivia</Text>
      <Button
        title="Single Player"
        onPress={() => navigation.navigate('Game', { mode: 'single' })}
      />
      <Button
        title="Multiplayer"
        onPress={() => navigation.navigate('Game', { mode: 'multiplayer' })}
      />
      <Text style={styles.subtitle}>Escolha uma categoria:</Text>
      {categorias.map((cat) => (
        <Button
          key={cat}
          title={cat}
          onPress={() => navigation.navigate('Game', { mode: 'single', categoria: cat })}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  subtitle: { fontSize: 18, marginTop: 20 },
});