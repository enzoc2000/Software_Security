
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

// Endpoint per verificare se una stringa è palindroma
app.post('/isPalindrome', (req: Request, res: Response) => {
    const { text } = req.body;

    if (typeof text !== 'string') {
        return res.status(400).json({ error: 'Invalid input. Please provide a string.' });
    }

    const cleanedText = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const isPalindrome = cleanedText === cleanedText.split('').reverse().join('');

    res.json({ text, isPalindrome });
});

// Avvio del server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/**
 * Verifica se una stringa è palindroma.
 * @param text - La stringa da verificare.
 * @returns `true` se la stringa è palindroma, altrimenti `false`.
 */
export function isPalindrome(text: string): boolean {
    if (typeof text !== 'string') {
        throw new Error('Input must be a string');
    }

    // Rimuove caratteri non alfanumerici e converte in minuscolo
    const cleanedText = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    // Verifica se la stringa è uguale alla sua versione invertita
    return cleanedText === cleanedText.split('').reverse().join('');
}