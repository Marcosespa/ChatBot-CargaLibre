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
  
  // Método para obtener los valores asociados a una remesa específica
  async getRemesa(remesaValue: string): Promise<any[]> {
    try {
      // Leer los datos de la hoja 'Remesas'
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Remesas!A:Z', // Ajusta el rango según las columnas que necesites leer
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        throw new Error("La hoja 'Remesas' está vacía o no existe.");
      }

      // Buscar la remesa en la primera columna (Columna A)
      const foundRow = rows.find(row => row[0] === remesaValue);

      if (!foundRow) {
        throw new Error(`No se encontró la remesa con el valor: ${remesaValue}`);
      }

      return foundRow; // Devuelve la fila completa asociada a la remesa
    } catch (error) {
      console.error("Error al buscar la remesa:", error);
      throw error;
    }
  }



}









export default new SheetManager(
  config.spreadsheetId,
  config.privateKey,
  config.clientEmail
);