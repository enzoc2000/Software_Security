// Funzione per validare i dati di input per l'emissione di CO2
export function isValidCO2Amount(value: number): boolean {
    return value >= 0 && value <= 100000; // esempio limite
}