import { google } from "googleapis";
import { sheets_v4 } from "googleapis/build/src/apis/sheets";
import { config } from "../config";

class SheetManager {
  private sheets: sheets_v4.Sheets;
  private spreadsheetId: string;

  constructor(spreadsheetId: string, privateKey: string, clientEmail: string) {
    const formattedKey = privateKey.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: formattedKey,
        client_email: clientEmail,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = spreadsheetId;
  }

  // Función para crear un usuario y una nueva pestaña
  async createUser(number: string, userData: any): Promise<void> {
    try {
      // Crear timestamp en formato legible
      const now = new Date();
      const timestamp = now.toLocaleString('es-CO', { 
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      // Convertir el objeto userData en un array plano de valores
      const values = [
        number,                    // Columna A: número de teléfono
        userData.name,             // Columna B: nombre
        userData.carType,          // Columna C: tipo de carro
        userData.peso,             // Columna D: peso
        userData.cubicaje,         // Columna E: cubicaje
        userData.placa,            // Columna F: placa
        userData.hojaVida,         // Columna G: hoja de vida
        userData.latitude || '',   // Columna H: latitud
        userData.longitude || '',  // Columna I: longitud
        userData.disponibilidad,   // Columna J: disponibilidad
        timestamp,                 // Columna K: timestamp
      ];

      // Agregar el usuario a la pestaña 'Users'
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Users!A:J',
        valueInputOption: 'RAW',
        requestBody: {
          values: [values],
        },
      });

    } catch (error) {
      console.error("Error al guardar los datos:", error);
      throw error;
    }
  }
}





export default new SheetManager(
  config.spreadsheetId,
  config.privateKey,
  config.clientEmail
);