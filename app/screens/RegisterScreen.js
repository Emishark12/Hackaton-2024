import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const RegistrationScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Navigate to Cursos screen
      navigation.navigate('App');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      </View>
      <View style={styles.formContainer}>
        {step === 1 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu correo electrónico"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Escribe tu contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.label}>Elige tu meta financiera:</Text>
            <Picker
              selectedValue={goal}
              style={styles.picker}
              onValueChange={(itemValue) => setGoal(itemValue)}
            >
              <Picker.Item label="Ahorrar para un viaje" value="viaje" />
              <Picker.Item label="Comprar una casa" value="casa" />
              <Picker.Item label="Planificar la jubilación" value="jubilacion" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 3 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu nombre"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Escribe tu edad"
              placeholderTextColor="#999"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={job}
              style={styles.picker}
              onValueChange={(itemValue) => setJob(itemValue)}
            >
              <Picker.Item label="Selecciona tu ocupación" value="" />
              <Picker.Item label="Estudiante" value="estudiante" />
              <Picker.Item label="Empleado" value="empleado" />
              <Picker.Item label="Desempleado" value="desempleado" />
              <Picker.Item label="Independiente" value="independiente" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    backgroundColor: '#FF0000',
    height: height * 0.15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 100,
    marginTop: 0,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  picker: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF0000',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});


export default RegistrationScreen;
