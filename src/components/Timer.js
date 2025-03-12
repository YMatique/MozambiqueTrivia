// src/components/Timer.js
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Timer({ initialTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return <Text style={styles.timer}>Tempo Restante: {formatTime(timeLeft)}</Text>;
}

const styles = StyleSheet.create({
  timer: { fontSize: 20, color: '#e74c3c', textAlign: 'center', marginBottom: 20 },
});