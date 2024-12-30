# ChatBot Proyecto: Integración con Meta

Este proyecto consiste en un chatbot avanzado diseñado para CargaLibre. Su propósito principal es facilitar procesos de manera automatizada, incluyendo la consulta de saldos y la enrutación de vehículos. Además, el sistema está optimizado para registrar datos, manejar archivos multimedia, y realizar detecciones de intención. También incluye un despliegue en la nube con costos optimizados y funcionalidades CRM.

## Características principales

1. **Introducción y configuración de Meta**

   - Integración del chatbot con la API de Meta para interactuar con plataformas sociales como WhatsApp y Messenger.
   - Configuración inicial de credenciales y acceso seguro.

2. **Registro de usuarios e historial con Google Sheets**

   - Registro automático de datos de usuario en Google Sheets para un seguimiento organizado.
   - Almacenamiento del historial de interacciones para análisis y mejora continua.
3. **Costos, CRM y despliegue en la nube**
4. 
   - Optimización de costos para el mantenimiento del chatbot.
   - Integración con un sistema CRM para la gestión de relaciones con los clientes.
   - Despliegue del chatbot en la nube para garantizar escalabilidad y disponibilidad.

## Requisitos del proyecto

- **Lenguaje de programación**: JavaScript/Node.js
- **APIs utilizadas**:
  - Meta (WhatsApp y Messenger)
  - Google Sheets API
- **Servicios en la nube**: AWS, Google Cloud o similar

## Instalación y configuración

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/<usuario>/ChatBot-Proyecto.git
   cd ChatBot-Proyecto
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` con las siguientes variables:

   ```env
   META_API_KEY=<clave_meta>
   GOOGLE_SHEETS_CREDENTIALS=<ruta_credenciales_google>
   CLOUD_PROVIDER=<proveedor_cloud>
   ```

4. **Iniciar el servidor:**

   ```bash
   npm start dev
   ```

## Uso

- Configurar la integración con Meta para recibir y enviar mensajes.
- Registrar datos de usuarios en Google Sheets y analizar el historial.
- Manejar archivos multimedia y clasificar intenciones.
- Desplegar el proyecto en la nube y gestionar costos desde un CRM.

## Futuras mejoras

- Integración con múltiples lenguajes para una audiencia global.
- Mejora en la detección de intenciones con algoritmos personalizados.
- Soporte para múltiples canales de comunicación (Telegram, Slack, etc.).

## Contribución

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request en GitHub.

## Licencia

Este proyecto está licenciado bajo la MIT License. Puedes usarlo y modificarlo libremente.

---

Para más información, contacta a [marcosespa24@gmail.com](mailto:marcosespa24@gmail.com).

