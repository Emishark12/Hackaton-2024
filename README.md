# BANORTEACH - Documentación de la Aplicación

## 1. Descripción del Proyecto

**BANORTEACH** es una aplicación móvil desarrollada en **React Native**, diseñada para ofrecer una experiencia de aprendizaje personalizada sobre educación financiera. Utiliza la plataforma **Google Cloud** y modelos de lenguaje como **Gemini** para generar módulos e historias interactivas adaptadas al usuario, ayudando a mejorar su conocimiento sobre temas financieros clave como inversiones, créditos, ahorros, y más.

El objetivo de la app es mejorar la educación financiera, especialmente en jóvenes y nuevos usuarios, proporcionando rutas guiadas de aprendizaje y actividades interactivas. A través de una encuesta inicial, se determina el nivel de conocimiento del usuario para asignarlo a un módulo adecuado de aprendizaje.

## 2. Tecnologías y Herramientas Utilizadas

- **React Native**: Framework principal para el desarrollo de la app móvil.
- **Google Cloud Platform**: Infraestructura de backend y procesamiento de IA.
- **Gemini (Google Cloud)**: Modelo de lenguaje para generar contenido personalizado.
- **Expo**: Herramienta de desarrollo para pruebas y ejecución de la aplicación.
- **JavaScript**: Lenguaje de programación principal.
- **Node.js**: Para servicios backend y funciones de IA.

## 3. Instalación y Configuración

### Requisitos Previos:

- **Node.js** (versión 14 o superior).
- **Expo CLI**.
- Cuenta de **Google Cloud** con acceso a **Vertex AI**.

### Instrucciones de Instalación:

1. Clona el repositorio del proyecto:
   ```bash
   git clone https://github.com/Emishark12/Hackaton-2024.git
2. Instala las dependencias necesarias
  "react": "^17.0.1",
  "react-native": "^0.64.0",
  "expo": "^42.0.0",
  "expo-linear-gradient": "^10.0.0",
  "galio-framework": "^0.6.5",
  "@expo/vector-icons": "^12.0.0",
  "react-native-modal-dropdown": "^0.6.2",
  "react-native-safe-area-context": "^3.3.2"
3. Configura las variables de entorno en un archivo .env con tu clave de API de Google Cloud:
GOOGLE_CLOUD_API_KEY=fe54e2a8ec6933f639b40abf519110ed1db50ffc
4. Inicia el servidor local usando Expo:
expo start
   
## 4. Uso

### Ejecución de la App:

1. Una vez iniciada la app con **Expo**, escanea el código QR con tu dispositivo móvil usando la app de **Expo Go** (disponible en iOS y Android).
2. Sigue las instrucciones de la app para registrarte y completar la encuesta inicial.

### Funcionalidades Principales:

- **Rutas de Aprendizaje**: Cada módulo contiene lecciones que cubren diferentes niveles de educación financiera, con actividades y evaluaciones para el usuario.
- **Coach Financiero**: Un asistente virtual que proporciona recomendaciones personalizadas basadas en el progreso del usuario.
- **Calculadora de Créditos y Ahorros**: Ayuda a los usuarios a planificar sus finanzas a largo plazo.
- **Recompensas y Tokens**: Los usuarios ganan tokens por completar módulos y pueden canjearlos por beneficios del banco.

## 5. Arquitectura del Proyecto

### Estructura de Carpetas:

- **/assets**: Contiene fuentes, imágenes y otros recursos estáticos.
- **/components**: Componentes reutilizables de la interfaz de usuario.
- **/screens**: Pantallas principales de la aplicación.
- **/services**: Conexiones y funciones relacionadas con la API de Google Cloud.
- **/utils**: Funciones auxiliares y utilidades.

### Principales Patrones:

- **Hooks**: Se utilizan en varios componentes para manejar el estado y los efectos secundarios.
- **Redux** (si aplica): Para la gestión global del estado de la app.

## 6. API

### Google Cloud Vertex AI:

La aplicación utiliza la API de **Vertex AI** para generar contenido dinámico basado en los datos del usuario. Los endpoints principales son:

- **/generateContent**: Genera historias y ejemplos basados en las respuestas del usuario.
  - **Parámetros**: `prompt`, `userData`.
  - **Respuesta**: Texto generado para la lección o actividad.

## 7. Contribución

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una rama con tus cambios.
3. Envía un pull request con una descripción detallada de los mismos.

## 8. Licencia

El proyecto está bajo la licencia **MIT**, lo que permite su libre uso, modificación y distribución, siempre que se mantengan los derechos de autor y el aviso de la licencia original.

## 9. Changelog

- **v1.0.0**: Lanzamiento inicial con funcionalidad de generación de contenido dinámico y rutas de aprendizaje interactivas.
