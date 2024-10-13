import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const CourseProgress = () => {
  const navigation = useNavigation();
  const [hasPriorKnowledge, setHasPriorKnowledge] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [buttonText, setButtonText] = useState('Enviar Respuestas');
  const [quizCompleted, setQuizCompleted] = useState(false);

  const courseName = 'Introducción a las Finanzas Personales';
  const totalSteps = 5;
  
  const quizSteps = [
    [
      {
        question: '¿Cuál es el primer paso para organizar tus finanzas?',
        options: ['Crear un presupuesto', 'Invertir en la bolsa', 'Ahorrar para la jubilación', 'Comprar una casa'],
        correctAnswer: 'Crear un presupuesto'
      },
      {
        question: '¿Qué porcentaje de tus ingresos deberías ahorrar?',
        options: ['5%', '10%', '20%', '30%'],
        correctAnswer: '20%'
      }
    ],
    [
      {
        question: '¿Qué es un activo?',
        options: ['Una deuda', 'Un ingreso', 'Un bien que genera ingresos', 'Un gasto innecesario'],
        correctAnswer: 'Un bien que genera ingresos'
      },
      {
        question: '¿Qué significa diversificar tu inversión?',
        options: ['Invertir en un solo lugar', 'No invertir nada', 'Invertir en diferentes sectores', 'Gastar todo'],
        correctAnswer: 'Invertir en diferentes sectores'
      }
    ],
    [
      {
        question: '¿Cuál es la principal diferencia entre ahorro e inversión?',
        options: ['El ahorro es para emergencias, la inversión genera rendimiento', 'El ahorro no es seguro', 'La inversión es a corto plazo', 'El ahorro genera más dinero'],
        correctAnswer: 'El ahorro es para emergencias, la inversión genera rendimiento'
      },
      {
        question: '¿Qué herramienta puedes usar para controlar tus gastos?',
        options: ['Una cuenta bancaria', 'Un presupuesto', 'Un préstamo', 'Una tarjeta de crédito'],
        correctAnswer: 'Un presupuesto'
      }
    ],
    [
      {
        question: '¿Qué es el interés compuesto?',
        options: ['Interés generado sobre el capital inicial', 'Interés generado sobre intereses previos', 'Un tipo de interés bajo', 'Interés generado solo por los bancos'],
        correctAnswer: 'Interés generado sobre intereses previos'
      },
      {
        question: '¿Cuál es la regla del 50/30/20?',
        options: ['50% ahorro, 30% gastos fijos, 20% ocio', '50% necesidades, 30% deseos, 20% ahorro', '50% inversión, 30% deuda, 20% ahorro', '50% ocio, 30% necesidades, 20% ahorro'],
        correctAnswer: '50% necesidades, 30% deseos, 20% ahorro'
      }
    ],
    [
      {
        question: '¿Cuál es la diferencia entre un préstamo personal y una hipoteca?',
        options: ['La hipoteca es para la casa, el préstamo personal puede ser para cualquier cosa', 'El préstamo personal tiene intereses más bajos', 'La hipoteca es a corto plazo', 'El préstamo personal no requiere garantía'],
        correctAnswer: 'La hipoteca es para la casa, el préstamo personal puede ser para cualquier cosa'
      },
      {
        question: '¿Qué debes hacer antes de invertir en algo?',
        options: ['Pedir un préstamo', 'Evaluar los riesgos', 'Invertir todo tu dinero', 'Comprar una casa'],
        correctAnswer: 'Evaluar los riesgos'
      }
    ]
  ];

  const quizAnswers = quizSteps[currentStep];

  const steps = Array.from({ length: totalSteps }, (_, i) => ({
    number: i + 1,
    completed: i < currentStep,
  }));

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmitQuiz = () => {
    if (showFeedback) {
      setSelectedAnswers({});
      setShowFeedback(false);
      setButtonText('Enviar Respuestas');
      
      if (currentStep < quizSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setQuizCompleted(true);
      }
    } else {
      setShowFeedback(true);
      setButtonText('Siguiente');
    }
  };

  const handleCreatePersonalizedCourse = () => {
    navigation.navigate('Modulo');
  };

  const handleKnowledgeCheck = (answer) => {
    if (answer === 'No') {
      navigation.navigate('Modulo');
    } else {
      setHasPriorKnowledge(true);
    }
  };

  if (hasPriorKnowledge === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.binQuestionHeader}>¿Tienes conocimientos previos sobre el tema?</Text>
        <TouchableOpacity onPress={() => handleKnowledgeCheck('Sí')} style={styles.yesno}>
          <Text style={styles.yntext}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKnowledgeCheck('No')} style={styles.yesno}>
          <Text style={styles.yntext}>No</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <Text style={styles.genial}>¡Genial! Ya tenemos tu nivel de conocimiento</Text>
        <TouchableOpacity onPress={handleCreatePersonalizedCourse} style={styles.createCourseButton}>
          <Text style={styles.createCourseButtonText}>Crear Curso Personalizado</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Curso: {courseName}</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progreso:</Text>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={['#EB0029', '#FF4500']}
            style={[styles.progressFill, { width: `${((currentStep + 1) / totalSteps) * 100}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      </View>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <View style={[styles.stepCircle, step.completed && styles.stepCompleted, currentStep === index && styles.currentStep]}>
              <Text style={[styles.stepNumber, (step.completed || currentStep === index) && styles.stepNumberCompleted]}>
                {step.number}
              </Text>
            </View>
            {index < steps.length - 1 && <View style={styles.stepConnector} />}
          </View>
        ))}
      </View>

      <View style={styles.quizContainer}>
        {quizAnswers.map((question, index) => (
          <View key={index} style={styles.quizQuestion}>
            <Text style={styles.questionText}>{question.question}</Text>
            {question.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                onPress={() => handleAnswerSelect(index, option)}
                style={[
                  styles.optionButton,
                  selectedAnswers[index] === option && styles.selectedOption,
                  showFeedback &&
                  (option === question.correctAnswer
                    ? styles.correctOption
                    : selectedAnswers[index] === option && styles.incorrectOption)
                ]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity 
          onPress={handleSubmitQuiz} 
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#EB0029',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  progressContainer: {
    padding: 16,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentStep: {
    backgroundColor: '#EB0029',
  },
  stepCompleted: {
    backgroundColor: '#32CD32',
  },
  stepNumber: {
    color: '#666',
    fontWeight: 'bold',
  },
  stepNumberCompleted: {
    color: '#FFF',
  },
  stepConnector: {
    height: 2,
    backgroundColor: '#E0E0E0',
    flex: 1,
    marginTop: -20,
  },
  quizContainer: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  quizQuestion: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#FFDEAD',
  },
  correctOption: {
    backgroundColor: '#32CD32',
  },
  incorrectOption: {
    backgroundColor: '#FF6347',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#EB0029',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createCourseButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#EB0029',
    alignItems: 'center',
    margin: 20,
  },
  createCourseButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  binQuestionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    color: '#fff',
    margin: 20,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#EB0029',
},
yesno: {
    borderWidth: 2,
    borderColor: '#323E48',
    color: '#323E48',
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
},
yntext: {
    color: '#323E48',
    fontSize: 16,
},
yntextHover: {
    color: 'white',
},
genial: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
},


});

export default CourseProgress;