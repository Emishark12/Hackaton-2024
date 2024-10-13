import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../constants/Theme';

const Modulo = ({ navigation }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);

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

  return (
    <ScrollView style={styles.container}>
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
          <Button title="Mi historia" onPress={() => navigation.navigate('Historia')} color="#EB0029" />
        ) : (
          <Button title="Continuar" onPress={continueHandler} color="#EB0029" />
        )}
      </View>
    </ScrollView>
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
});

export default Modulo;
