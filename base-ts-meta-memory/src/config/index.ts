import 'dotenv/config';
// import dotenv from 'dotenv';
// dotenv.config();

export const config = {
    PORT: process.env.PORT ?? 3008,
    jwtToken: process.env.jwtToken,
    numberId: process.env.numberId,
    verifyToken: process.env.verifyToken,
    version: "v20.0",
    //sheets
    spreadsheetId: process.env.spreadsheetId,
    privateKey: process.env.privateKey,
    clientEmail: process.env.clientEmail,
};
