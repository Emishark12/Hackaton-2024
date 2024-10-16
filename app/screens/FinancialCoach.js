import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Curso = ({ navigation }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const texts = [
    "Bienvenido al curso sobre Finanzas Personales. En este curso, aprenderás los fundamentos de cómo manejar tu dinero de manera efectiva.",
    "El primer paso en la gestión de tus finanzas es crear un presupuesto. Un presupuesto te ayuda a planificar tus gastos y a ahorrar para tus objetivos.",
    "Ahora que tienes un presupuesto, es importante seguirlo. Revisa tus gastos mensualmente para asegurarte de que te mantienes dentro de tu presupuesto.",
    "Una buena práctica es reservar una parte de tus ingresos para un fondo de emergencia. Esto te ayudará a estar preparado para imprevistos.",
    "¡Felicidades! Has completado este módulo. Ahora estás listo para poner en práctica lo aprendido.",
  ];

  const continueHandler = () => {
    if (currentTextIndex < texts.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1);
    } else {
      setPointsEarned(100);
    }
  };

  const backHandler = () => {
    navigation.goBack();
  };

  const handleFetchContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://192.168.51.157:3000/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Haz una historia de 50 palabras' }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setResponseText(data.responseText.parts[0].text); // Extracting the text part from the response
    } catch (err) {
      setError('Error fetching content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={backHandler} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#EB0029" />
      </TouchableOpacity>
      <Text style={styles.title}>Curso de Finanzas Personales</Text>
      <Text style={styles.content}>{texts[currentTextIndex]}</Text>
      {pointsEarned > 0 && (
        <Text style={styles.pointsMessage}>¡Ganaste {pointsEarned} puntos!</Text>
      )}
      <View style={styles.buttonContainer}>
        {currentTextIndex === texts.length - 1 ? (
          <Button title="Proceder a la historia" onPress={handleFetchContent} color="#EB0029" />
        ) : (
          <Button title="Continuar" onPress={continueHandler} color="#EB0029" />
        )}
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {responseText && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Historia Generada:</Text>
          <Text style={styles.responseText}>{responseText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#EB0029',
  },
  content: {
    fontSize: 18,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
  pointsMessage: {
    fontSize: 18,
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EB0029',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default Curso;
