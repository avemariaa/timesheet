// googleSheetsApi.js
import { google } from 'googleapis';

export async function writeToGoogleSheets(name, department, time, date) {
  try {
    // Authenticate with Google using OAuth 2.0
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json', // Path to your OAuth 2.0 credentials file
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Create a new instance of Google Sheets API
    const sheets = google.sheets({ version: 'v4', auth });

    // Define the spreadsheet ID and range
    const spreadsheetId = 'https://docs.google.com/spreadsheets/d/1SWdcts5hSmIF02AXlMB5-GeUMkMEo6Rbv5O0oduGw9E/';
    const range = 'Sheet1';

    // Define the data to be written to the spreadsheet
    const values = [[name, department, time, date]];

    // Write data to the spreadsheet
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Data written to Google Sheets:', result.data);
  } catch (error) {
    console.error('Error writing data to Google Sheets:', error);
  }
}
