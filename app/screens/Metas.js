import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

renderTabs = () => {
  const { navigation } = this.props;

  return (
    <Block row style={styles.tabs}>
      <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Cursos')}>
        <Block row middle>
          <Ionicons name="book-outline" size={16} style={{ paddingRight: 8 }} />
          <Text size={16} style={styles.tabTitle}>Cursos</Text>
        </Block>
      </Button>
      <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Mis Metas')}>
        <Block row middle>
          <Ionicons name="trending-up-outline" size={16} style={{ paddingRight: 8 }} />
          <Text size={16} style={styles.tabTitle}>Mis Metas</Text>
        </Block>
      </Button>
    </Block>
  )
}

const Metas = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [MetasList, setMetasList] = useState([]);

  const addGoalHandler = () => {
    if (title.trim() && amount.trim()) {
      setMetasList((currentMetas) => [
        ...currentMetas,
        {
          id: Math.random().toString(),
          title,
          amount: parseFloat(amount),
          dueDate,
          progress: 0,
        },
      ]);
      // Reset the input fields
      setTitle('');
      setAmount('');
      setShowDatePicker(false);
      setDueDate(new Date());
    }
  };

  const deleteGoalHandler = (goalId) => {
    setMetasList((currentMetas) => currentMetas.filter((goal) => goal.id !== goalId));
  };

  const updateProgressHandler = (goalId, progress) => {
    setMetasList((currentMetas) =>
      currentMetas.map((goal) =>
        goal.id === goalId ? { ...goal, progress: parseFloat(progress) } : goal
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metas Financieras</Text>
      <TextInput
        placeholder="Título de la meta"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Cantidad de la meta"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Seleccionar Fecha de Vencimiento" onPress={() => setShowDatePicker(true)} color="#EB0029" />
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setDueDate(date);
          }}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Agregar Meta" onPress={addGoalHandler} color="#EB0029" />
      </View>

      <FlatList
        data={MetasList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text>{item.title}</Text>
            <Text>Cantidad: ${item.amount}</Text>
            <Text>Fecha de Vencimiento: {item.dueDate.toLocaleDateString()}</Text>
            <Text>Progreso: {item.progress} / {item.amount}</Text>
            <TextInput
              placeholder="Actualizar Progreso"
              keyboardType="numeric"
              style={styles.progressInput}
              onChangeText={(progress) => updateProgressHandler(item.id, progress)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Eliminar" onPress={() => deleteGoalHandler(item.id)} color="#EB0029" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  progressInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '60%',
  },
  goalItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Metas;